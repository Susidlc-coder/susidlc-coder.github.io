/** Local, shared-device rules for the Pan de Cada Día board-game preview. */
export const GAME_VERSION = 1;
export const FINISH_POSITION = 25;
export const PLAYER_COLORS = ['#b56bde', '#df8e63', '#67aaa2', '#8b9be0', '#c782aa', '#b5a269'];
const PHASES = new Set(['ready', 'awaiting-card', 'turn-complete', 'awaiting-retry', 'game-over']);
const MAX_EVENTS = 120;

function insist(condition, message) {
  if (!condition) throw new Error(message);
}

function copy(state) {
  return JSON.parse(JSON.stringify(state));
}

function record(state, event) {
  state.events.push({ turn: state.turn, ...event });
  state.events = state.events.slice(-MAX_EVENTS);
}

export function currentPlayer(state) {
  return state.players[state.current];
}

/** players: 1–6 names, or objects with name and optional id/color. */
export function createGame(players) {
  insist(Array.isArray(players) && players.length >= 1 && players.length <= 6, 'Choose one to six players.');
  const roster = players.map((input, i) => {
    const item = typeof input === 'string' ? { name: input } : input;
    insist(item && typeof item.name === 'string' && item.name.trim(), 'Every player needs a name.');
    const id = item.id == null ? `p${i + 1}` : String(item.id);
    insist(id.length > 0 && id.length <= 80, 'Invalid player ID.');
    const color = item.color || PLAYER_COLORS[i];
    insist(/^#[\da-f]{6}$/i.test(color), 'Player colors must be six-digit hex colors.');
    return { id, name: item.name.trim().slice(0, 40), color, pos: 0, angel: false, skip: 0, amen: false, retry: null };
  });
  insist(new Set(roster.map(p => p.id)).size === roster.length, 'Player IDs must be unique.');
  return {
    version: GAME_VERSION,
    players: roster,
    current: 0,
    phase: 'ready',
    pendingCard: null,
    lastRoll: null,
    turn: 1,
    events: [{ type: 'start', playerId: roster[0].id, turn: 1 }]
  };
}

function finishPlayer(state, player) {
  player.pos = FINISH_POSITION;
  player.angel = true;
  player.skip = 0;
  player.amen = false;
  player.retry = null;
  state.pendingCard = null;
  state.phase = state.players.every(p => p.angel) ? 'game-over' : 'turn-complete';
  record(state, { type: 'angel', playerId: player.id });
  if (state.phase === 'game-over') record(state, { type: 'game-over' });
}

/** One die. Optional value supports deterministic tests and accessible dice input. */
export function rollDie(state, value = Math.floor(Math.random() * 6) + 1) {
  insist(state.phase === 'ready', 'Finish the current card before rolling again.');
  insist(Number.isInteger(value) && value >= 1 && value <= 6, 'The die must show a number from one to six.');
  const next = copy(state);
  const player = currentPlayer(next);
  insist(!player.angel && player.skip === 0 && player.retry === null, 'This player cannot roll yet.');
  const from = player.pos;
  player.pos = Math.min(FINISH_POSITION, player.pos + value);
  next.lastRoll = value;
  record(next, { type: 'roll', playerId: player.id, from, to: player.pos, roll: value });
  if (player.pos === FINISH_POSITION) {
    finishPlayer(next, player);
  } else {
    next.phase = 'awaiting-card';
    next.pendingCard = player.pos;
  }
  return next;
}

/**
 * Complete exactly the card reached with the die (or the due retry).
 * kind:'move', to:N, success:false keeps the activity open for another attempt.
 * kind:'retry', success:false, skipOnFailure:true makes the player miss one
 * upcoming turn and retry this card on their following turn without rolling.
 * A movement ends this turn: no action from its destination is chained.
 */
export function resolveCard(state, resolution = { kind: 'complete' }) {
  insist(state.phase === 'awaiting-card' || state.phase === 'awaiting-retry', 'There is no active card to complete.');
  insist(resolution && ['complete', 'move', 'amen', 'retry'].includes(resolution.kind), 'Unknown card action.');
  const next = copy(state);
  const player = currentPlayer(next);
  const card = next.pendingCard;
  insist(!player.angel && Number.isInteger(card), 'There is no active card to complete.');

  if (resolution.kind === 'move') {
    insist(Number.isInteger(resolution.to) && resolution.to >= 1 && resolution.to <= FINISH_POSITION, 'Invalid destination card.');
  }

  if (resolution.success === false) {
    record(next, { type: 'retry-needed', playerId: player.id, card });
    if (resolution.kind === 'retry' && resolution.skipOnFailure === true) {
      player.retry = card;
      player.skip = 1;
      next.phase = 'turn-complete';
      next.pendingCard = null;
    }
    return next;
  }

  player.retry = null;
  if (resolution.kind === 'amen') {
    player.amen = true;
    player.skip = 1;
    record(next, { type: 'amen', playerId: player.id, card });
  } else if (resolution.kind === 'move') {
    const from = player.pos;
    player.pos = resolution.to;
    record(next, { type: 'move', playerId: player.id, from, to: player.pos, card });
    if (player.pos === FINISH_POSITION) {
      finishPlayer(next, player);
      return next;
    }
  } else {
    record(next, { type: 'card-complete', playerId: player.id, card });
  }
  next.pendingCard = null;
  next.phase = 'turn-complete';
  return next;
}

/**
 * Advance to one player's turn. Completed angels are not in the dice rotation.
 * If that player owes a skipped turn, consume only that turn and return
 * turn-complete, so the interface can show it before advancing again.
 */
export function nextTurn(state) {
  insist(state.phase === 'turn-complete', 'Complete the current turn first.');
  const next = copy(state);
  insist(next.players.some(p => !p.angel), 'Everyone has finished.');
  for (let steps = 1; steps <= next.players.length; steps += 1) {
    const candidate = (next.current + steps) % next.players.length;
    if (!next.players[candidate].angel) {
      next.current = candidate;
      break;
    }
  }
  next.turn += 1;
  next.lastRoll = null;
  next.pendingCard = null;
  const player = currentPlayer(next);
  if (player.skip > 0) {
    const reason = player.amen ? 'amen' : 'retry';
    player.skip -= 1;
    player.amen = false;
    next.phase = 'turn-complete';
    record(next, { type: 'skip', playerId: player.id, reason, card: player.pos, to: player.pos });
  } else if (player.retry !== null) {
    next.phase = 'awaiting-retry';
    next.pendingCard = player.retry;
    record(next, { type: 'retry-turn', playerId: player.id, card: player.retry });
  } else {
    next.phase = 'ready';
    record(next, { type: 'turn', playerId: player.id });
  }
  return next;
}

/** Only a player who has finished can rescue someone waiting in AMEN. */
export function rescuePlayer(state, angelId, targetId) {
  insist(state.phase !== 'game-over', 'Everyone has finished.');
  const angel = state.players.find(p => p.id === angelId);
  const target = state.players.find(p => p.id === targetId);
  insist(angel && angel.angel, 'Only a finished player can be an angel.');
  insist(target && !target.angel && target.amen && target.skip === 1, 'This player is not waiting in AMEN.');
  const next = copy(state);
  const rescued = next.players.find(p => p.id === targetId);
  rescued.amen = false;
  rescued.skip = 0;
  record(next, { type: 'rescue', angelId, playerId: targetId, card: rescued.pos, to: rescued.pos });
  return next;
}

export function serializeGame(state) {
  validateState(state);
  return JSON.stringify(state);
}

/** Reject stale versions and malformed saves instead of restoring unsafe turns. */
export function restoreGame(saved) {
  const parsed = typeof saved === 'string' ? JSON.parse(saved) : copy(saved);
  validateState(parsed);
  return parsed;
}

function validateState(state) {
  insist(state && state.version === GAME_VERSION, 'This saved game uses an unsupported version.');
  insist(Array.isArray(state.players) && state.players.length >= 1 && state.players.length <= 6, 'Invalid saved players.');
  insist(Number.isInteger(state.current) && state.current >= 0 && state.current < state.players.length, 'Invalid saved player turn.');
  insist(PHASES.has(state.phase), 'Invalid saved phase.');
  insist(Number.isSafeInteger(state.turn) && state.turn >= 1, 'Invalid saved turn number.');
  insist(state.lastRoll === null || (Number.isInteger(state.lastRoll) && state.lastRoll >= 1 && state.lastRoll <= 6), 'Invalid saved die.');
  insist(Array.isArray(state.events) && state.events.length <= MAX_EVENTS, 'Invalid saved event history.');
  insist(state.events.every(e => e && typeof e.type === 'string' && Number.isSafeInteger(e.turn) && e.turn >= 1), 'Invalid saved event.');
  insist(new Set(state.players.map(p => p.id)).size === state.players.length, 'Duplicate saved player IDs.');
  for (const p of state.players) {
    insist(p && typeof p.id === 'string' && p.id.length > 0 && p.id.length <= 80, 'Invalid saved player ID.');
    insist(typeof p.name === 'string' && p.name.trim().length > 0 && p.name.length <= 40, 'Invalid saved player name.');
    insist(typeof p.color === 'string' && /^#[\da-f]{6}$/i.test(p.color), 'Invalid saved player color.');
    insist(Number.isInteger(p.pos) && p.pos >= 0 && p.pos <= FINISH_POSITION, 'Invalid saved position.');
    insist(typeof p.angel === 'boolean' && p.angel === (p.pos === FINISH_POSITION), 'Invalid saved angel.');
    insist(p.skip === 0 || p.skip === 1, 'Invalid saved skipped turn.');
    insist(typeof p.amen === 'boolean' && (!p.amen || (p.skip === 1 && p.pos >= 1 && !p.angel)), 'Invalid saved AMEN status.');
    insist(p.retry === null || (Number.isInteger(p.retry) && p.retry >= 1 && p.retry <= 24 && p.retry === p.pos && !p.angel), 'Invalid saved retry.');
    insist(!p.angel || (p.skip === 0 && !p.amen && p.retry === null), 'A finished angel cannot be waiting.');
    insist(!p.amen || p.retry === null, 'AMEN and a retry cannot be pending together.');
  }
  const player = currentPlayer(state);
  const waiting = state.phase === 'awaiting-card' || state.phase === 'awaiting-retry';
  insist(waiting ? (state.pendingCard === player.pos && player.pos >= 1 && player.pos <= 24 && !player.angel && player.skip === 0) : state.pendingCard === null, 'Invalid saved active card.');
  insist(state.phase !== 'ready' || (!player.angel && player.skip === 0 && player.retry === null), 'Invalid saved ready turn.');
  insist(state.phase !== 'awaiting-retry' || player.retry === state.pendingCard, 'Invalid saved retry turn.');
  insist(state.phase !== 'awaiting-card' || player.retry === null, 'Invalid saved card turn.');
  insist((state.phase === 'game-over') === state.players.every(p => p.angel), 'Invalid saved ending.');
}

/** Optional mutable facade for a simple browser view. */
export class GameEngine {
  constructor(players) { this.state = createGame(players); }
  get player() { return currentPlayer(this.state); }
  roll(value) { return (this.state = rollDie(this.state, value)); }
  resolve(resolution) { return (this.state = resolveCard(this.state, resolution)); }
  next() { return (this.state = nextTurn(this.state)); }
  rescue(angelId, targetId) { return (this.state = rescuePlayer(this.state, angelId, targetId)); }
  serialize() { return serializeGame(this.state); }
  static restore(saved) {
    const engine = Object.create(GameEngine.prototype);
    engine.state = restoreGame(saved);
    return engine;
  }
}
