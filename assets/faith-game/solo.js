import { createGame, rollDie, resolveCard, nextTurn } from './engine.js';
import { randomDie } from './random.js';

/** Single-player adapter; the shared rules and saved-state format stay unchanged. */
export function createSoloGame(name = 'Tú') {
  return createGame([name]);
}

function requireSolo(state) {
  if (!state || state.players?.length !== 1) {
    throw new Error('The solo game needs exactly one player.');
  }
}

/** Resume card19 writing and return older backward-move saves to the die. */
export function normalizeSoloState(state) {
  requireSolo(state);
  const player = state.players[0];
  const previousEvent = state.events.at(-2), lastEvent = state.events.at(-1);
  const backwardPrompt = state.phase === 'awaiting-card' && state.pendingCard === player.pos
    && lastEvent?.type === 'move' && lastEvent.to === player.pos && lastEvent.to < lastEvent.from;
  if (backwardPrompt) {
    const next = JSON.parse(JSON.stringify(state));
    next.phase = 'turn-complete';
    next.pendingCard = null;
    return nextTurn(next);
  }
  const omittedPrompt = state.phase === 'ready' && state.pendingCard === null
    && previousEvent?.type === 'move' && previousEvent.to === player.pos
    && previousEvent.card === 9 && previousEvent.to === 19 && lastEvent?.type === 'turn';
  if (!omittedPrompt && player.retry !== 19 && !(state.phase === 'awaiting-retry' && state.pendingCard === 19)) return state;
  const next = JSON.parse(JSON.stringify(state));
  next.players[0].retry = null;
  next.players[0].skip = 0;
  next.players[0].amen = false;
  next.phase = 'awaiting-card';
  next.pendingCard = player.pos;
  return next;
}

function settleTurn(state) {
  let next = state;
  // Advance a completed turn. A legacy non-card19 skip may need two advances.
  while (next.phase === 'turn-complete') next = nextTurn(next);
  return next;
}

/** One click rolls fairly; an unfinished card is returned without rolling. */
export function advanceAndRoll(state, value) {
  const next = settleTurn(normalizeSoloState(state));
  if (next.phase === 'awaiting-card' || next.phase === 'awaiting-retry') return next;
  return rollDie(next, value === undefined ? randomDie() : value);
}

/**
 * Complete the card, then prepare the next action without a Next Turn button.
 * Normal completion and AMEN return ready. A jump to19 opens its writing prompt.
 * A backward move returns to the die after walking. Destination moves never chain.
 * In this solo version AMEN is an informational saint popup, with no lost turn.
 * Its sending square is retained. The view controls the popup and its dismissal.
 */
export function completeSoloCard(state, resolution = { kind: 'complete' }) {
  const current = normalizeSoloState(state);
  // Personal writing has no incorrect-answer state or retry punishment.
  if (current.pendingCard === 19 && resolution.success === false) return current;
  const action = resolution.kind === 'amen' || (current.pendingCard === 19 && resolution.kind === 'retry')
    ? { ...resolution, kind: 'complete' } : resolution;
  const next = resolveCard(current, action);
  if (action.kind === 'move' && action.to === 19 && action.success !== false) {
    next.phase = 'awaiting-card';
    next.pendingCard = action.to;
    return next;
  }
  return settleTurn(next);
}
