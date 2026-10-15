(()=>{
// Home, Music and Pan de Cada Dia share the same compact navigation and lighting control.
const headerMedia=matchMedia('(max-width:669px)');
const header=document.querySelector(':is(.homepage,.moradas-page,.music-page) .header');
const light=header?.querySelector('.light-toggle');
const utilities=header?.querySelector('.header-utilities');
const navigation=header?.querySelector('#navigation');
function placeLight(){if(light&&utilities&&navigation)(headerMedia.matches?navigation:utilities).append(light);}
headerMedia.addEventListener('change',placeLight);placeLight();
})();
