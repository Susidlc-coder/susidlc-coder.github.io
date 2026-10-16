/** A slim, persistent scrollbar; native touch, wheel and keyboard scrolling stay intact. */
export function bindWordBankScroll(bank) {
  const rail=bank.parentElement.querySelector('.word-bank-scrollbar');
  if(!rail)return ()=>{};
  const thumb=rail.querySelector('.word-bank-scroll-thumb');
  const main=bank.closest('.card-main');
  let activePointer=null,grabOffset=0;
  function sync(){
    if(main&&bank.clientHeight>0&&!matchMedia('(max-width:640px)').matches){
      const available=Math.max(92,main.getBoundingClientRect().bottom-bank.getBoundingClientRect().top-8);
      bank.style.maxHeight=`${Math.min(255,Math.floor(available))}px`;
    }else bank.style.removeProperty('max-height');
    const range=bank.scrollHeight-bank.clientHeight;
    rail.hidden=bank.clientHeight===0||range<=1;
    if(rail.hidden)return;
    const height=Math.min(rail.clientHeight,Math.max(22,rail.clientHeight*bank.clientHeight/bank.scrollHeight));
    thumb.style.height=`${height}px`;
    thumb.style.transform=`translateY(${(rail.clientHeight-height)*bank.scrollTop/range}px)`;
  }
  function move(event){
    if(event.pointerId!==activePointer)return;
    const travel=rail.clientHeight-thumb.getBoundingClientRect().height;
    if(travel<=0)return;
    const fraction=(event.clientY-rail.getBoundingClientRect().top-grabOffset)/travel;
    bank.scrollTop=Math.max(0,Math.min(1,fraction))*(bank.scrollHeight-bank.clientHeight);
    sync();
  }
  function start(event){
    if(event.button!==0||rail.hidden)return;
    event.preventDefault();
    bank.focus({preventScroll:true});
    activePointer=event.pointerId;
    const bounds=thumb.getBoundingClientRect();
    grabOffset=event.target===thumb?event.clientY-bounds.top:bounds.height/2;
    rail.setPointerCapture(activePointer);
    move(event);
  }
  function stop(){activePointer=null;}
  bank.classList.add('has-scroll-rail');
  bank.addEventListener('scroll',sync,{passive:true});
  rail.addEventListener('pointerdown',start);
  rail.addEventListener('pointermove',move);
  rail.addEventListener('pointerup',stop);
  rail.addEventListener('pointercancel',stop);
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(sync):null;
  observer?.observe(bank);
  if(main)observer?.observe(main);
  window.addEventListener('resize',sync);
  const frame=requestAnimationFrame(sync);
  return ()=>{
    cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',sync);
    bank.removeEventListener('scroll',sync);bank.classList.remove('has-scroll-rail');bank.style.removeProperty('max-height');
    rail.removeEventListener('pointerdown',start);rail.removeEventListener('pointermove',move);
    rail.removeEventListener('pointerup',stop);rail.removeEventListener('pointercancel',stop);
  };
}
