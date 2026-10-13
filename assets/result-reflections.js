import {CHAPTER_READINGS} from './chapter-recommendations.js?v=20261013-story-adapted-meanings-1';
import {RESULT_VERSES} from './result-verses.js?v=20261013-story-adapted-meanings-1';
import {REVIEWED_PROFILES} from './recommendation.js?v=20261013-story-adapted-meanings-1';
import {THEME_LABELS_ES,THEME_LABELS_EN} from './poem-word-semantics.js?v=20261013-story-adapted-meanings-1';
// Editorial affinities, not psychological probabilities. Every candidate must
// Chapters retain 95% and verses 90% of their best semantic match. Recent
// verse history only breaks close matches; it never admits unrelated verses.
// Cross-content coherence only breaks close matches; song scoring is unchanged.
export const CONNECTION_RULES={minimumRelevance:.95,journeyWeight:.9,coherenceWeight:.1,verseRelevance:.9,recentVersePenalty:.045};
const cosine=(a,b)=>{const na=Math.hypot(...Object.values(a)),nb=Math.hypot(...Object.values(b));return na&&nb?Object.entries(a).reduce((s,[k,v])=>s+v*(b[k]||0),0)/na/nb:0;};
const rank=(items,key,w)=>items.map((item,index)=>({item,index,score:cosine(w,item[key])})).sort((a,b)=>b.score-a.score||a.index-b.index);
const badgeES={perseverancia:'Perseverancia',autenticidad:'Autenticidad',creacion:'Creación',introspeccion:'Reflexión',confianza:'Confianza',renacer:'Renacer',transicion:'Transición',suspension:'Suspensión',culminacion:'Culminación',busqueda:'Búsqueda',refugio:'Refugio',calma:'Calma',contemplacion:'Contemplación',duda:'Duda',incertidumbre:'Incertidumbre',aprendizaje:'Aprendizaje',esperanza:'Esperanza',despedida:'Despedida',compasion:'Compasión',entrega:'Entrega',identidad:'Identidad',amor:'Amor',dolor:'Dolor',libertad:'Libertad',paciencia:'Paciencia'};
export function selectReflections(weights,lang='es',songTitle='',recentVerses=[]) {
 const w=Object.fromEntries(Object.entries(weights||{}).filter(([,v])=>Number.isFinite(v)&&v>0));
 const song=REVIEWED_PROFILES[songTitle]||{};
 const chapters=rank(CHAPTER_READINGS,'profile',w),verses=rank(RESULT_VERSES,'themes',w);
 const near=list=>list.filter(r=>r.score>=list[0].score*CONNECTION_RULES.minimumRelevance);
 let best=null;
 const verseCandidates=verses.filter(v=>v.score>=verses[0].score*CONNECTION_RULES.verseRelevance);
 for(const c of near(chapters))for(const v of verseCandidates){
  // Only shared themes present in the visitor's choices can add coherence.
  const supported=p=>Object.fromEntries(Object.entries(p).filter(([tag])=>w[tag]>0));
  const coherence=(cosine(supported(song),supported(c.item.profile))+cosine(supported(song),supported(v.item.themes))+cosine(supported(c.item.profile),supported(v.item.themes)))/3;
  const score=CONNECTION_RULES.journeyWeight*(c.score+v.score)/2+CONNECTION_RULES.coherenceWeight*coherence-(recentVerses.includes(v.item.id)?CONNECTION_RULES.recentVersePenalty:0);
  if(!best||score>best.score)best={c,v,score,coherence};
 }
 const chapter=best.c.item,verse=best.v.item,suffix=lang==='en'?'EN':'ES';
 const common=Object.keys(w).filter(t=>song[t]&&chapter.profile[t]&&verse.themes[t]&&w[t]>=Math.max(...Object.values(w))*.65);
 // When no literal three-way overlap exists, label the journey's strongest
 // meaning instead of inventing a common spiritual interpretation.
 const themes=(common.length?common:Object.keys(w)).sort((a,b)=>w[b]-w[a]||a.localeCompare(b));
 const theme=themes[0]||'introspeccion';
 const labels=lang==='en'?THEME_LABELS_EN:THEME_LABELS_ES;
 const singleES={suenos:'Sueños',alegria:'Alegría',compania:'Compañía',adaptacion:'Adaptación',gratitud:'Gratitud',memoria:'Memoria',distraccion:'Inquietud',ciclo:'Ciclos',escape:'Salida',supervivencia:'Supervivencia',piano:'Expresión'};
 const singleEN={encierro:'Confinement',cueva:'Refuge',piano:'Expression',renacer:'Renewal',mundo:'Discovery',escape:'Release',cielo:'Sky',distraccion:'Restlessness',refugio:'Safety',despedida:'Closure',autenticidad:'Authenticity',compasion:'Compassion',desarraigo:'Displacement',suspension:'Suspension',envidia:'Envy'};
 const raw=lang==='es'?(badgeES[theme]||singleES[theme]||theme):(singleEN[theme]||labels[theme]||theme);
 const label=(raw||theme).charAt(0).toUpperCase()+(raw||theme).slice(1);
 return {
  theme:{id:theme,label,sharedByAll:common.includes(theme)},
  evidence:{version:'bounded-coherence-v2',recentVerse:recentVerses.includes(verse.id),archiveEvidence:verse.archiveEvidence||null,chapterScore:best.c.score,chapterBest:chapters[0].score,verseScore:best.v.score,verseBest:verses[0].score,coherence:best.coherence,sharedThemes:common},
  reading:{author:lang==='es'?'Las Moradas · Santa Teresa de Jesús':'The Interior Castle · Saint Teresa of Ávila',id:chapter.id,title:chapter['title'+suffix],summary:chapter['fullSummary'+suffix]||chapter['summary'+suffix],url:chapter['url'+suffix]},
  verse:{id:verse.id,reference:verse['reference'+suffix],text:verse['text'+suffix],version:verse['version'+suffix],source:verse['source'+suffix],context:verse['context'+suffix]}
 };
}
