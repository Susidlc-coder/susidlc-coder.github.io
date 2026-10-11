import {pages,originals} from './landing-atlas-data.js?v=20261011-approved-start-again-1';
import {POEM_EN} from './poem-translations.js?v=20261011-approved-start-again-1';
import {createPoemReader} from './poem-reader.js?v=20261011-approved-start-again-1';
const root=document.querySelector('#susi-poems');
const reader=createPoemReader({root,pages,originals,translations:POEM_EN,lang:document.documentElement.lang});
root.querySelectorAll('[data-landing-read]').forEach(button=>button.addEventListener('click',()=>reader.open(Number(button.dataset.landingRead))));
const dialog=root.querySelector('[data-reading]');
root.querySelector('[data-close-reading]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
