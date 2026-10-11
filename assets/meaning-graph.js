// Typed, directed relationships. One hop only; inferred meaning is deliberately
// weaker than the word's reviewed source context. No embeddings or external API.
export const MEANING_RELATIONS=Object.freeze([
 {from:'transicion',to:'adaptacion',weight:.22,type:'related'},
 {from:'culminacion',to:'despedida',weight:.22,type:'related'},
 {from:'suspension',to:'vuelo',weight:.18,type:'imagery'},
 {from:'insomnio',to:'noche',weight:.12,type:'setting'},
 {from:'compasion',to:'entrega',weight:.10,type:'related'},
 {from:'perseverancia',to:'lucha',weight:.10,type:'related'},
 {from:'renacer',to:'esperanza',weight:.10,type:'related'}
]);
export function expandMeaning(profile){const result={...profile};for(const edge of MEANING_RELATIONS)if(profile[edge.from])result[edge.to]=Math.max(result[edge.to]||0,profile[edge.from]*edge.weight);return result;}
export function explainMeaning(profile){return MEANING_RELATIONS.filter(e=>profile[e.from]&&(!profile[e.to]||profile[e.to]<profile[e.from]*e.weight)).map(e=>({...e,contribution:profile[e.from]*e.weight}));}
