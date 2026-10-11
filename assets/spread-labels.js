// Reposition the existing words; keep the same poems, choices and geometry.
// Safe horizontal boxes are inscribed in each polygon before fitting the text.
function intervals(points,y){
 const xs=[];
 for(let i=0;i<points.length;i++){
  const a=points[i],b=points[(i+1)%points.length];
  if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));
 }
 xs.sort((a,b)=>a-b);return xs.reduce((r,x,i)=>{if(i%2===0&&xs[i+1]>x)r.push([x,xs[i+1]]);return r;},[]);
}
function intersection(a,b){return a.flatMap(x=>b.map(y=>[Math.max(x[0],y[0]),Math.min(x[1],y[1])]).filter(z=>z[1]>z[0]));}
const contourCache=new WeakMap();
function polygon(cell){const numbers=cell.d.match(/-?\d+(?:\.\d+)?/g)?.map(Number)||[];const points=[];for(let i=0;i<numbers.length;i+=2)points.push([numbers[i],numbers[i+1]]);return points;}
function contains(points,x,y){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
function outerContour(cells){
 if(contourCache.has(cells))return contourCache.get(cells);
 const polygons=cells.map(polygon),segments=[];
 const inFigure=(x,y)=>polygons.some(p=>contains(p,x,y));
 for(const points of polygons)for(let i=0;i<points.length;i++){
  const a=points[i],b=points[(i+1)%points.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);if(length<.01)continue;
  const x=(a[0]+b[0])/2,y=(a[1]+b[1])/2,nx=-dy/length*.8,ny=dx/length*.8;
  if(inFigure(x+nx,y+ny)!==inFigure(x-nx,y-ny))segments.push([a,b]);
 }
 contourCache.set(cells,segments);return segments;
}
function distanceToSegment(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy);}
function rectangleClearance(center,halfW,halfH,a,b){
 const endpointDistance=p=>Math.hypot(Math.max(0,Math.abs(p[0]-center.x)-halfW),Math.max(0,Math.abs(p[1]-center.y)-halfH));
 return Math.min(endpointDistance(a),endpointDistance(b),distanceToSegment({x:center.x-halfW,y:center.y-halfH},a,b),distanceToSegment({x:center.x+halfW,y:center.y-halfH},a,b),distanceToSegment({x:center.x-halfW,y:center.y+halfH},a,b),distanceToSegment({x:center.x+halfW,y:center.y+halfH},a,b));
}
export function safeLabelBoxes(cell,scale=1){
 if(/[^MLZmlz\d.,\s-]/.test(cell.d))return [cell.box];
 const nums=cell.d.match(/-?\d+(?:\.\d+)?/g)?.map(Number)||[];
 const points=[];for(let i=0;i<nums.length;i+=2)points.push([nums[i],nums[i+1]]);
 if(points.length<3)return [cell.box];
 const ys=points.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys),boxes=[cell.box];
 const pad=4/scale;
 for(const h of [...new Set([cell.box.h,22/scale,34/scale])]){
  if(h+pad*2>=bottom-top)continue;
  for(let n=0;n<13;n++){
   const y=top+pad+h/2+(bottom-top-pad*2-h)*n/12;
   let spans=intervals(points,y-h/2);
   for(let k=1;k<=8&&spans.length;k++)spans=intersection(spans,intervals(points,y-h/2+h*k/8));
   for(const [left,right]of spans)if(right-left>pad*2+12/scale)boxes.push({x:left+pad,y:y-h/2,w:right-left-pad*2,h});
  }
 }
 return boxes;
}
export function spreadLabels(assigned,cells,fit,scale=1,shape='',compact=false){
 const words=assigned.filter(c=>!c.decorative);
 if(words.length<2)return assigned;
 const allBoxes=cells.map(c=>safeLabelBoxes(c,scale));
 const contour=outerContour(cells),frame=(compact?32:30)/scale;
 const boundaryCells=cells.map(cell=>{const points=polygon(cell);return points.some((a,i)=>{const b=points[(i+1)%points.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);if(length<.01)return false;return [.25,.5,.75].some(t=>{const x=a[0]+dx*t,y=a[1]+dy*t;return contour.some(([u,v])=>distanceToSegment({x,y},u,v)<.1);});});});
 const interiorBoxes=allBoxes.map(boxes=>boxes.flatMap(box=>{
  const center={x:box.x+box.w/2,y:box.y+box.h/2},radius=Math.hypot(box.w,box.h)/2;
  const nearby=[];let closest=Infinity;
  for(const [a,b]of contour){const distance=distanceToSegment(center,a,b);closest=Math.min(closest,distance);if(distance<=frame+radius)nearby.push({a,b,distance});}
  return closest>=frame+5.75/scale?[{box,center,nearby}]:[];
 }));
 const bounds={left:Math.min(...cells.map(c=>c.box.x)),right:Math.max(...cells.map(c=>c.box.x+c.box.w)),top:Math.min(...cells.map(c=>c.box.y)),bottom:Math.max(...cells.map(c=>c.box.y+c.box.h))};
 const position=box=>({x:(box.x+box.w/2-bounds.left)/(bounds.right-bounds.left),y:(box.y+box.h/2-bounds.top)/(bounds.bottom-bounds.top)});
 const options=words.map(w=>cells.flatMap((c,i)=>(!compact&&boundaryCells[i]?[]:interiorBoxes[i]).flatMap(({box,center,nearby})=>{
  const fitted=fit({text:w.word,dest:w.dest},{...c,box});if(!fitted)return [];
  const halfW=(fitted.width??Math.min(box.w,Math.max(...fitted.lines.map(l=>l.length))*fitted.size*.52))/2,halfH=fitted.size*fitted.lines.length*.57;
  const radius=Math.hypot(halfW,halfH);
  // Reserve the margin around the whole word, not only its center point.
  for(const {a,b,distance}of nearby)if(distance<=frame+radius&&rectangleClearance(center,halfW,halfH,a,b)<frame)return [];
  return [{i,box,fit:fitted}];
 })));
 const slots=new Array(cells.length).fill(null);
 function place(j,visited){for(const option of options[j]){if(visited.has(option.i))continue;visited.add(option.i);if(slots[option.i]===null||place(slots[option.i].j,visited)){slots[option.i]={j,...option};return true;}}return false;}
 words.map((_,j)=>j).sort((a,b)=>options[a].length-options[b].length||a-b).forEach(j=>place(j,new Set()));
 const retained=slots.filter(Boolean).sort((a,b)=>a.j-b.j);
 const placements=retained.map(p=>({...p,word:words[p.j].word,dest:words[p.j].dest}));
 const cost=(candidate,j)=>{
  const p=position(candidate.box);
  const crowding=placements.reduce((sum,other,k)=>{if(k===j)return sum;const q=position(other.box);return sum+1/(.025+(p.x-q.x)**2+(p.y-q.y)**2);},0);
  // Readability wins when two placements offer essentially the same spacing.
  const gravity=(compact?22:180)*((p.x-.5)**2+(p.y-.5)**2);
  const original=cells[candidate.i].box;
  const localCenter=compact?0:18*((candidate.box.x+candidate.box.w/2-original.x-original.w/2)**2/(original.w**2)+(candidate.box.y+candidate.box.h/2-original.y-original.h/2)**2/(original.h**2));
  return (compact?1:.48)*crowding+gravity+localCenter+.15*Math.max(0,24-candidate.fit.screenSize);
 };
 for(let pass=0;pass<4;pass++){
  let changed=false;
  for(let j=0;j<placements.length;j++){
   const occupied=new Set(placements.filter((_,k)=>k!==j).map(p=>p.i));
   let best=placements[j],score=cost(best,j);
   for(const candidate of options[placements[j].j])if(!occupied.has(candidate.i)){
    const next=cost(candidate,j);if(next<score-.01){best=candidate;score=next;}
   }
   if(best!==placements[j]){placements[j]={...placements[j],...best};changed=true;}
  }
  if(!changed)break;
 }
 const byCell=new Map(placements.map(p=>[p.i,p]));
 return cells.map((cell,i)=>{const p=byCell.get(i);return p?{...cell,word:p.word,dest:p.dest,box:p.box,fit:p.fit}:{...cell,decorative:true};});
}
