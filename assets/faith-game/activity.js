/** Check authored activities. Personal examples are checked only for presence. */
export function activityStatus(card, draft, lang) {
  const a = card.activity;
  if (card.type === 'fill' || card.type === 'order') {
    const expected=card.type==='fill'?a.answers[lang]:a.items[lang];
    if(!Array.isArray(draft.slots)||draft.slots.length!==expected.length)return {complete:false,correct:false};
    const complete=draft.slots.every(v=>Number.isInteger(v)&&v>=0&&v<expected.length);
    return {complete,correct:complete&&draft.slots.every((v,i)=>card.type==='fill'?a.words[lang][v]===expected[i]:v===i)};
  }
  if (card.type === 'classify') return {complete:a.items.every(x=>Boolean(draft.choices[x.id])),correct:a.items.every(x=>draft.choices[x.id]===x.category)};
  if (card.type === 'match') return {complete:a.pairs.every(x=>Boolean(draft.matches[x.id])),correct:a.pairs.every(x=>draft.matches[x.id]===x.id)};
  if (card.type === 'examples') {
    const entries=draft.examples||{};
    const complete=a.categories.every(cat=>Array.from({length:a.perCategory},(_,i)=>i).every(i=>String(entries[`${cat.id}-${i}`]??'').trim().length>0));
    return {complete,correct:false};
  }
  return {complete:false,correct:false};
}
