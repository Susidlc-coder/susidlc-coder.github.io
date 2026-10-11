import {spreadLabels} from './spread-labels.js?v=20261011-approved-social-1';
// Maximum matching: a word labels at most one cell; cells without a fitting
// source word remain decorative. The shape and animated color surfaces persist.
export const normalizeWord=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
export const meaningfulTokens=s=>normalizeWord(s).split(/\s+/).filter(w=>!['un','una','el','la','los','las','de','del','en','a','al','que','y','mi','me','no','the','a','an','of','in','to','my'].includes(w));
export function assignUniqueWords(cells,words,{fit,label=w=>w.text,excluded=[],scale=1,shape='',compact=false }){
 const blocked=new Set(excluded.flatMap(meaningfulTokens)),seen=new Set(),sourceTokens=new Set();
 const bank=words.filter(w=>{const key=normalizeWord(label(w));const tokens=meaningfulTokens(w.text);if(tokens.some(t=>blocked.has(t)||sourceTokens.has(t))||seen.has(key))return false;seen.add(key);tokens.forEach(t=>sourceTokens.add(t));return true;});
 const candidates=bank.map((w,j)=>cells.map((c,i)=>({i,fit:fit(w,c),distance:Math.abs(i-(j+.5)*cells.length/bank.length)})).filter(x=>x.fit).sort((a,b)=>a.distance-b.distance));
 const slots=new Array(cells.length).fill(null);
 function place(j,visited){for(const c of candidates[j]){if(visited.has(c.i))continue;visited.add(c.i);if(slots[c.i]===null||place(slots[c.i].j,visited)){slots[c.i]={j,fit:c.fit};return true}}return false}
 bank.map((_,j)=>j).sort((a,b)=>candidates[a].length-candidates[b].length||a-b).forEach(j=>place(j,new Set()));
 const assigned=cells.map((cell,i)=>slots[i]===null?{...cell,decorative:true}:{...cell,word:bank[slots[i].j].text,dest:bank[slots[i].j].dest,fit:slots[i].fit});
 return spreadLabels(assigned,cells,fit,scale,shape,compact);
}
