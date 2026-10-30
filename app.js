(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const CH=[['Kick','KICK'],['Snare','SNRE'],['Clap','CLAP'],['Hat','HAT'],['Open','OPEN'],['Tom','TOM'],['Sub','SUB'],['Acid','ACID'],['Stab','STAB']];
const NCH=CH.length,ACI=7,STI=8,NK={6:'s',7:'an',8:'bn'},VK={6:'sv',7:'av',8:'bv'},NBASE={6:24,7:36,8:48};
const SUBI=6,VEL=[0,.45,.75,1];
const SC={'Pent. menor':[0,3,5,7,10,12,15,17],'Menor':[0,2,3,5,7,8,10,12],'Mayor':[0,2,4,5,7,9,11,12],'Cromática':[0,1,2,3,4,5,6,7]};
const NN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const SKINS=[['neon','Neon'],['auto','Auto'],['dark','Oscuro'],['light','Claro'],['orange','Naranja'],['sub','Violeta'],['green','Verde']];
const DIVS=[['1/16',1],['1/8',2],['1/8.',3],['1/4',4]];
const CHC=['#ff764d','#ffd24d','#b6e35a','#4de0c8','#4db8ff','#a98bff','#ff6ad5','#a6f03d','#c58bff'];
const MEL=i=>i>=SUBI,melCh=()=>MEL(S.ch)?S.ch:SUBI;
const velAt=(p,i,st)=>i<SUBI?p.d[i][st]:(p[NK[i]][st]>=0?p[VK[i]][st]:0);
const nname=m=>NN[m%12]+(Math.floor(m/12)-1);
const mf=m=>440*Math.pow(2,(m-69)/12);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mk=()=>fixP({d:CH.slice(0,6).map(()=>new Array(16).fill(0)),s:new Array(16).fill(-1),sv:new Array(16).fill(2)});
const NST=32;
const ok16=(a,f,lo,hi)=>Array.from({length:NST},(_,i)=>{const v=a&&a[i];return typeof v==='number'&&isFinite(v)?Math.max(lo,Math.min(hi,Math.round(v))):f});
/* per-step extras for all 7 tracks: accent (0/1), ratchet (1-4), nudge (-2..2 eighths of a step). Todas las filas guardan 32 pasos (proyectos de 16 se amplían solos); solo ACID puede usar LEN hasta 32 */
function fixP(p){p.d=Array.from({length:6},(_,r)=>ok16(p.d&&p.d[r],0,0,3));p.s=ok16(p.s,-1,-1,24);p.sv=ok16(p.sv,2,1,3);
  p.an=ok16(p.an,-1,-1,24);p.av=ok16(p.av,2,1,3);p.asl=ok16(p.asl,0,0,1);p.bn=ok16(p.bn,-1,-1,24);p.bv=ok16(p.bv,2,1,3);
  const A=(a,f,lo,hi)=>Array.from({length:NCH},(_,r)=>Array.from({length:NST},(_,i)=>{const v=a&&a[r]&&a[r][i];return typeof v==='number'&&isFinite(v)?Math.max(lo,Math.min(hi,Math.round(v))):f}));
  p.ac=A(p.ac,0,0,1);p.rt=A(p.rt,1,1,4);p.nd=A(p.nd,0,-2,2);return p}
const EQB=[{g:'el',f:'fl',t:'lowshelf',df:120,lo:30,hi:400,n:'Graves',ic:'🔈'},{g:'e2',f:'f2',t:'peaking',df:350,lo:100,hi:1200,n:'Medio-graves',ic:'🥁'},
  {g:'em',f:'ef',t:'peaking',df:1000,lo:300,hi:5000,n:'Medios',ic:'🎙'},{g:'e4',f:'f4',t:'peaking',df:3500,lo:1500,hi:10000,n:'Medio-agudos',ic:'🔔'},{g:'eh',f:'fh',t:'highshelf',df:6000,lo:3000,hi:16000,n:'Agudos',ic:'✨'}];
const EQD={};EQB.forEach(b=>{EQD[b.g]=0;EQD[b.f]=b.df});
const gv=(o,k,d)=>o[k]==null?d:o[k];
const DEF=Object.assign({vol:.8,pan:0,mute:false,solo:false,tn:.5,dc:.5,flt:1,drv:0,rev:0,dly:0,prob:1,len:16,br:.35,gl:0,sc:0},EQD);

const FXD={rev:{on:true,size:.4,mix:.3,pre:.2,damp:.6,lo:.35},dly:{on:true,div:2,fb:.4,mix:.25,tone:.45,pp:false},sc:{on:true,amt:.55,rel:.3,att:.1},
  cho:{on:false,mode:'cho',rate:.35,depth:.5,fb:.3,mix:.4},flt:{on:false,type:'lowpass',freq:.55,res:.3,div:3,depth:.5,shape:'sine'},cr:{on:false,bits:.45,down:.25,mix:.5},cmp:{on:false,thr:.6,ratio:.25,att:.15,rel:.3,mk:.2}};
const SONGD={on:false,len:16,bars:[0,0,1,1,0,0,1,1,2,2,3,3,2,2,3,3].concat(new Array(16).fill(-1))},LANED=()=>({bpm:120,loop:4,vol:.8,on:new Array(32).fill(0)});
const S={awave:'sawtooth',song:SONGD,lanes:{a1:LANED(),a2:LANED()},bar:0,em:'step',aud:true,tab:'seq',ch:0,pat:0,pp:0,playPat:0,bpm:110,play:false,g:0,chain:false,chainSet:[1,1,0,0],subSel:0,root:4,scale:'Pent. menor',wave:'sine',layer:true,
  swing:0,mdrive:.1,mcut:1,mvol:.8,lim:.3,rev:{on:true,size:.4,mix:.3},dly:{on:true,div:2,fb:.4,mix:.25},sc:{on:true,amt:.55,rel:.3},skin:'neon',style:'abl',lcdv:'info',stage:false,ui3:false,meq:Object.assign({},EQD)};
const EQSTYLE=[[[21.6093,0,"hp",48,1.09],[13918.629,0,"bell",24,1.09]],[[71.646,0,"hp",24,1.09],[226.707,-9.5,"bell",24,1.09],[7584.727,-5.5,"bell",24,.1964],[17716.707,0,"lp",24,1.09]],[[529.551,0,"hp",24,1.09]],[[7584.727,0,"hp",24,1.09]],[[2359.98,0,"hp",24,1.09]],[[52.072,0,"hp",24,1.09]],[[145.476,0,"lp",24,1.09]],[],[],[]].map(a=>a.map(([f,g,t,s,q])=>({on:1,f,g,t,s,q})));
const CHDEF=i=>Object.assign({},DEF,{eqb:EQSTYLE[i].map(b=>({...b}))},i===SUBI?{vol:.85,sc:1}:i===ACI?{vol:.62,sc:1,tn:.35,br:.6,gl:.5,dc:.35,dly:.15}:i===STI?{vol:.5,sc:1,tn:.5,br:.4,dc:.35,rev:.3,dly:.25}:{});
let C=CH.map((_,i)=>CHDEF(i));
C[1].rev=.2;C[2].rev=.3;C[4].dly=.3;C[4].rev=.15;
let P=[mk(),mk(),mk(),mk()];
(()=>{const a=P[0];[0,4,8,12].forEach(i=>{a.d[0][i]=2});a.d[0][0]=3;[4,12].forEach(i=>{a.d[1][i]=3});[2,6,10,14].forEach(i=>{a.d[3][i]=2});a.d[2][12]=2;a.d[3][15]=1;
  [[0,0],[3,0],[6,3],[8,0],[10,7],[14,5]].forEach(([i,o])=>{a.s[i]=o});a.sv[0]=3;
  const b=P[1];[0,3,6,10,12].forEach(i=>{b.d[0][i]=2});[4,12].forEach(i=>{b.d[1][i]=3});for(let i=0;i<16;i+=2)b.d[3][i]=i%4?1:2;b.d[4][15]=2;b.d[5][7]=2;
  [[0,0],[2,0],[5,12],[7,10],[11,0],[13,3]].forEach(([i,o])=>{b.s[i]=o});
  [[2,0],[3,12,0,1],[6,7],[7,10,0,1],[10,0],[11,3],[14,5,1]].forEach(([i,n,a,s])=>{b.an[i]=n;if(a)b.ac[ACI][i]=1;if(s)b.asl[i]=1});
  [[2,0],[6,0,1],[10,0],[11,12,0,1],[14,3]].forEach(([i,n,ac,sl])=>{a.an[i]=n;if(ac)a.ac[ACI][i]=1;if(sl)a.asl[i]=1});a.bn[6]=0;a.bn[14]=3;b.bn[6]=0;b.bn[14]=5;
  const c=P[2];[0,4,8,12].forEach(i=>{c.d[0][i]=2});[4,12].forEach(i=>{c.d[2][i]=2});for(let i=0;i<16;i++)c.d[3][i]=i%2?2:1;[2,6,10,14].forEach(i=>{c.d[4][i]=2});
  [[0,0],[2,0],[3,12,1],[6,3],[7,7,0,1],[10,0,1],[11,10],[14,5]].forEach(([i,n,a,s])=>{c.an[i]=n;if(a)c.ac[ACI][i]=1;if(s)c.asl[i]=1});
  const e=P[3];[0,4,8,12].forEach(i=>{e.d[0][i]=2});[4,12].forEach(i=>{e.d[1][i]=3});[2,6,10,14].forEach(i=>{e.d[4][i]=2});[3,7,11,15].forEach(i=>{e.d[3][i]=1});e.bn[2]=0;e.bn[6]=0;e.bn[10]=3;e.bn[14]=5;
  [[0,0],[3,0],[8,0],[11,7]].forEach(([i,o])=>{e.s[i]=o})})();

/* storage: per viewer only */
const SAVE=['awave','song','lanes','hum','mres','mhp','mmid','mmf','mair','mwid','aud','cho','flt','cr','cmp','bpm','swing','mdrive','mcut','mvol','lim','root','scale','wave','layer','chain','chainSet','rev','dly','sc','skin','style','lcdv','ui3','meq'];
function saveMessage(t){const e=$('#saveState');if(e)e.textContent=t}
const save=()=>{try{const s={};SAVE.forEach(k=>{s[k]=S[k]});localStorage.setItem('pulsostudio1',JSON.stringify({P,C,S:s}));saveMessage('Guardado en este dispositivo · '+new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}))}catch(e){saveMessage('No se pudo guardar en este dispositivo')}}
let st;const saveSoon=()=>{clearTimeout(st);saveMessage('Cambios pendientes de guardar…');st=setTimeout(save,300)};
try{const r=localStorage.getItem('pulsostudio1')||localStorage.getItem('pocketsub2');if(r){const o=JSON.parse(r);
  if(o.P&&o.P.length===4&&o.P.every(p=>p.d&&p.d.length===6&&p.s&&p.sv))P=o.P;
  if(o.C&&o.C.length>=7)C=C.map((c,i)=>Object.assign({},c,o.C[i]||{}));
  if(o.S)SAVE.forEach(k=>{if(o.S[k]!==undefined)S[k]=o.S[k]})}}catch(e){}
if(!S.ui3){S.skin='neon';S.style='abl';S.ui3=true}
P.forEach(fixP);fixSong();C.forEach((c,i)=>{c.len=clamp(Math.round(+c.len)||16,1,i===ACI?32:16)});
S.meq=Object.assign({},EQD,S.meq);
function fixSong(){const g=S.song||{};S.song={on:!!g.on,len:[8,16,32].includes(g.len)?g.len:16,bars:ok16x32(g.bars)};
  const L=S.lanes||{};S.lanes={};['a1','a2'].forEach(id=>{const x=L[id]||{},d=LANED();S.lanes[id]={bpm:clamp(+x.bpm||120,40,240),loop:[1,2,4,8].includes(x.loop)?x.loop:4,vol:typeof x.vol==='number'?clamp(x.vol,0,1):.8,on:Array.from({length:32},(_,i)=>x.on&&x.on[i]?1:0)}})}
function ok16x32(a){return Array.from({length:32},(_,i)=>{const v=a&&a[i];return typeof v==='number'&&v>=-1&&v<=3?Math.round(v):(a?-1:SONGD.bars[i])})}
const MSX={hum:0,mres:0,mhp:0,mmid:.5,mmf:.45,mair:.5,mwid:.5};
const mergeFx=()=>{Object.keys(FXD).forEach(k=>{S[k]=Object.assign({},FXD[k],S[k])});for(const k in MSX)if(typeof S[k]!=='number')S[k]=MSX[k]};mergeFx();

/* ---------- audio ---------- */
let ctx=null,LIVE=null,noise,M={},chs=[],subV=null,ohV=null;
const CV=new Map();
const curve=a=>{const key=Math.round(a*1000);if(CV.has(key))return CV.get(key);const n=2048,c=new Float32Array(n),k=a*70;for(let i=0;i<n;i++){const x=i*2/(n-1)-1;c[i]=(1+k)*x/(1+k*Math.abs(x))}CV.set(key,c);return c};
const SAFE=(()=>{const n=2048,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i*2/(n-1)-1;c[i]=Math.abs(x)<.8?x:Math.sign(x)*(.8+.2*Math.tanh((Math.abs(x)-.8)/.2))}return c})();
const setShape=(sh,a)=>{if(a>0){sh.curve=curve(a);sh.oversample='4x'}else{sh.curve=null;sh.oversample='none'}};
function build(){
  /* master: headroom -> subsonic HPF -> drive 4x -> LPF -> EQ -> limiter -> makeup -> safety clip -> vol */
  M.in=ctx.createGain();M.in.gain.value=.5;
  M.hp=ctx.createBiquadFilter();M.hp.type='highpass';M.hp.frequency.value=25;M.hp.Q.value=.6;
  M.sh=ctx.createWaveShaper();
  M.lp=ctx.createBiquadFilter();M.lp.type='lowpass';M.lp.Q.value=.7;
  M.limIn=ctx.createGain();M.lim=mkLim();
  M.mk=ctx.createGain();M.mk.gain.value=1.7;
  M.clip=ctx.createWaveShaper();M.clip.curve=SAFE;M.clip.oversample='4x';
  M.vol=ctx.createGain();M.ana=ctx.createAnalyser();M.ana.fftSize=2048;M.ana.smoothingTimeConstant=.75;
  buildFx();M.in.connect(M.hp);M.hp.connect(M.ch.i);M.ch.o.connect(M.cr.i);M.cr.o.connect(M.fl.i);M.fl.o.connect(M.sh);M.sh.connect(M.lp);M.eq=mkEq();buildMs();M.lp.connect(M.mhp);M.mhp.connect(M.mmid);M.mmid.connect(M.mair);M.mair.connect(M.eq.i);M.eq.o.connect(M.cmp);M.cmp.connect(M.cmk);M.cmk.connect(M.wsp);M.wmg.connect(M.limIn);M.limIn.connect(M.lim);M.lim.connect(M.mk);M.mk.connect(M.clip);M.clip.connect(M.vol);
  M.vol.connect(ctx.destination);M.vol.connect(M.ana);
  /* reverb: HPF send (no sub mud) -> pre-delay -> dark IR -> damping */
  M.rIn=ctx.createGain();M.rHp=ctx.createBiquadFilter();M.rHp.type='highpass';M.rHp.frequency.value=220;M.rPre=ctx.createDelay(.2);M.rPre.delayTime.value=.022;
  M.conv=ctx.createConvolver();M.rLp=ctx.createBiquadFilter();M.rLp.type='lowpass';M.rLp.frequency.value=7000;M.rRet=ctx.createGain();
  M.rIn.connect(M.rHp);M.rHp.connect(M.rPre);M.rPre.connect(M.conv);M.conv.connect(M.rLp);M.rLp.connect(M.rRet);M.rRet.connect(M.in);
  /* delay: HPF send too */
  M.dIn=ctx.createGain();M.dHp=ctx.createBiquadFilter();M.dHp.type='highpass';M.dHp.frequency.value=200;
  /* stereo delay: two lines, self or cross feedback (ping-pong) */
  M.dRet=ctx.createGain();M.dmg=ctx.createChannelMerger(2);const G=()=>ctx.createGain(),LP=()=>{const f=ctx.createBiquadFilter();f.type='lowpass';return f};
  M.dL=ctx.createDelay(2);M.dR=ctx.createDelay(2);M.dlpL=LP();M.dlpR=LP();M.inL=G();M.inR=G();M.sL=G();M.sR=G();M.xLR=G();M.xRL=G();
  M.dIn.connect(M.dHp);M.dHp.connect(M.inL);M.dHp.connect(M.inR);M.inL.connect(M.dL);M.inR.connect(M.dR);M.dL.connect(M.dlpL);M.dR.connect(M.dlpR);
  M.dlpL.connect(M.sL);M.sL.connect(M.dL);M.dlpR.connect(M.sR);M.sR.connect(M.dR);M.dlpL.connect(M.xLR);M.xLR.connect(M.dR);M.dlpR.connect(M.xRL);M.xRL.connect(M.dL);
  M.dlpL.connect(M.dmg,0,0);M.dlpR.connect(M.dmg,0,1);M.dmg.connect(M.dRet);M.dRet.connect(M.in);
  M.lg={};['a1','a2'].forEach(id=>{M.lg[id]=ctx.createGain();M.lg[id].connect(M.in)});
  chs=[];
  CH.forEach(()=>{const c={};c.in=ctx.createGain();c.sh=ctx.createWaveShaper();c.lp=ctx.createBiquadFilter();c.lp.type='lowpass';c.lp.Q.value=.6;
    c.vol=ctx.createGain();c.mg=ctx.createGain();c.dk=ctx.createGain();c.pan=ctx.createStereoPanner?ctx.createStereoPanner():ctx.createGain();
    c.ana=ctx.createAnalyser();c.ana.fftSize=2048;c.ana.smoothingTimeConstant=.75;c.rs=ctx.createGain();c.ds=ctx.createGain();
    c.in.connect(c.sh);c.sh.connect(c.lp);c.eq=mkEq();c.lp.connect(c.eq.i);c.eq.o.connect(c.vol);c.vol.connect(c.mg);c.mg.connect(c.dk);c.dk.connect(c.pan);
    c.pan.connect(M.in);c.pan.connect(c.ana);c.pan.connect(c.rs);c.rs.connect(M.rIn);c.pan.connect(c.ds);c.ds.connect(M.dIn);chs.push(c)});
  const b=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;noise=b;
  setIR();applyAll();if(ctx===LIVE||!LIVE){anaLive=true;if(S.tab!=='mix'&&S.tab!=='eq')anaOn(false)}
}
function ensure(){if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;try{ctx=new AC({latencyHint:'interactive',sampleRate:48000})}catch(e){try{ctx=new AC({latencyHint:'interactive'})}catch(e2){ctx=new AC()}}iosFix();build();LIVE=ctx;const c0=ctx;loadCr(c0).then(()=>{if(ctx===c0){if(S.play)c0._pend=1;else{swapCr();swapLim()}}});queueWarm()}if(ctx.state==='suspended')ctx.resume();return true}
/* dark, decaying stereo IR: noise through a one-pole LPF that closes over time */
function setIR(){if(!ctx)return;const sr=ctx.sampleRate,len=Math.floor(sr*(.3+S.rev.size*2.2)),b=ctx.createBuffer(2,len,sr);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);let y=0;for(let i=0;i<len;i++){const r=i/len,a=.9-.78*r;y+=a*((Math.random()*2-1)-y);d[i]=y*Math.pow(1-r,2.4)/Math.sqrt(a)}}M.conv.buffer=b}
/* ---------- fx engine (master inserts + sends) ---------- */
const FDIV=[['1/8',.5],['1/4',1],['1/2',2],['1 c',4],['2 c',8]];
const CRW="registerProcessor('crush',class extends AudioWorkletProcessor{static get parameterDescriptors(){return[{name:'bits',defaultValue:8,minValue:1,maxValue:16},{name:'down',defaultValue:1,minValue:1,maxValue:64}]}constructor(){super();this.h=[0,0];this.c=[0,0]}process(I,O,P){const i=I[0],o=O[0];if(!i||!i.length)return true;const st=Math.pow(2,P.bits[0]-1),dn=P.down[0];for(let ch=0;ch<o.length;ch++){const x=i[ch]||i[0],y=o[ch];let c=this.c[ch]||0,h=this.h[ch]||0;for(let n=0;n<y.length;n++){if(c<=0){h=Math.round(x[n]*st)/st;c+=dn}c--;y[n]=h}this.c[ch]=c;this.h[ch]=h}return true}});registerProcessor('lal',class extends AudioWorkletProcessor{static get parameterDescriptors(){return[{name:'drive',defaultValue:1,minValue:0,maxValue:16},{name:'ceil',defaultValue:.79,minValue:.1,maxValue:1}]}constructor(){super();const L=Math.max(32,Math.round(sampleRate*.003));this.L=L;this.dl=new Float32Array(L);this.dr=new Float32Array(L);this.w=0;this.ab=new Float64Array(L).fill(1);this.ai=0;this.sum=L;this.g=1;this.rel=1-Math.exp(-1/(sampleRate*.08));this.C=L+2;this.qv=new Float32Array(this.C);this.qi=new Float64Array(this.C);this.qh=0;this.qn=0;this.n=0}process(I,O,P){const o=O[0],oL=o[0],oR=o[1]||o[0],i=I[0],has=!!(i&&i.length),iL=has?i[0]:null,iR=has?(i[1]||i[0]):null,drv=P.drive[0],c=P.ceil[0],L=this.L,C=this.C,qv=this.qv,qi=this.qi;for(let k=0;k<oL.length;k++){let a=has?iL[k]*drv:0,b=has?iR[k]*drv:0;if(!(a-a===0))a=0;if(!(b-b===0))b=0;const pk=Math.max(Math.abs(a),Math.abs(b)),req=pk>c?c/pk:1,n=this.n++;while(this.qn&&qv[(this.qh+this.qn-1)%C]>=req)this.qn--;const bi=(this.qh+this.qn)%C;qv[bi]=req;qi[bi]=n;this.qn++;while(qi[this.qh]<n-L){this.qh=(this.qh+1)%C;this.qn--}const h=qv[this.qh];this.sum+=h-this.ab[this.ai];this.ab[this.ai]=h;this.ai=(this.ai+1)%L;const avg=this.sum/L;let g=this.g;g=avg<g?avg:g+(avg-g)*this.rel;if(!(g>0))g=1e-4;this.g=g;const w=this.w,dl=this.dl[w],dr=this.dr[w];this.dl[w]=a;this.dr[w]=b;this.w=(w+1)%L;oL[k]=dl*g;if(oR!==oL)oR[k]=dr*g;if(!(g-g===0)){this.g=1;this.sum=L;this.ab.fill(1);this.qn=0}}return true}})";
let CRURL=null;try{CRURL=URL.createObjectURL(new Blob([CRW],{type:'text/javascript'}))}catch(e){}
const loadCr=c=>(c.audioWorklet&&CRURL)?c.audioWorklet.addModule(CRURL).then(()=>{c._crOK=true}).catch(()=>{}):Promise.resolve();
const crBits=v=>2+Math.round(v*14),crDown=v=>1+Math.round(v*v*39);
const STC=new Map();
const stair=b=>{if(STC.has(b))return STC.get(b);const n=4096,c=new Float32Array(n),st=Math.pow(2,b-1);for(let i=0;i<n;i++){const x=i*2/(n-1)-1;c[i]=Math.round(x*st)/st}STC.set(b,c);return c};
function blk(){const i=ctx.createGain(),dry=ctx.createGain(),wet=ctx.createGain(),o=ctx.createGain();wet.gain.value=0;i.connect(dry);dry.connect(o);wet.connect(o);return{i,dry,wet,o}}
function mkCrNode(){if(ctx._crOK){try{const n=new AudioWorkletNode(ctx,'crush',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});n._wk=true;return n}catch(e){}}const w=ctx.createWaveShaper();w.curve=stair(8);return w}
function swapCr(){if(!ctx||!M.cr||M.crN._wk||!ctx._crOK)return;const n=mkCrNode();if(!n._wk)return;try{M.cr.i.disconnect(M.crN)}catch(e){}try{M.crN.disconnect()}catch(e){}M.cr.i.connect(n);n.connect(M.cr.wet);M.crN=n;applyMaster()}
/* brick-wall look-ahead limiter (worklet); DynamicsCompressor until the module loads */
function mkLim(){if(ctx._crOK){try{const n=new AudioWorkletNode(ctx,'lal',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});n._wk=true;return n}catch(e){}}
  const c=ctx.createDynamicsCompressor();c.knee.value=0;c.ratio.value=20;c.attack.value=.002;c.release.value=.12;return c}
function swapLim(){if(!ctx||!M.lim||M.lim._wk||!ctx._crOK)return;const n=mkLim();if(!n._wk)return;try{M.limIn.disconnect()}catch(e){}try{M.lim.disconnect()}catch(e){}M.limIn.connect(n);n.connect(M.mk);M.lim=n;applyMaster()}
/* master tone + stereo width (L'=a*L+b*R, R'=b*L+a*R) */
function buildMs(){const B=t=>{const f=ctx.createBiquadFilter();f.type=t;return f};M.mhp=B('highpass');M.mhp.Q.value=.7;M.mmid=B('peaking');M.mmid.Q.value=.9;M.mair=B('highshelf');M.mair.frequency.value=9000;
  M.wsp=ctx.createChannelSplitter(2);M.wmg=ctx.createChannelMerger(2);M.wLL=ctx.createGain();M.wLR=ctx.createGain();M.wRL=ctx.createGain();M.wRR=ctx.createGain();
  M.wsp.connect(M.wLL,0);M.wsp.connect(M.wRL,0);M.wsp.connect(M.wLR,1);M.wsp.connect(M.wRR,1);M.wLL.connect(M.wmg,0,0);M.wLR.connect(M.wmg,0,0);M.wRL.connect(M.wmg,0,1);M.wRR.connect(M.wmg,0,1)}
const msHp=v=>v<=0?10:20*Math.pow(50,v),msMf=v=>Math.round(150*Math.pow(40,v)),msMg=v=>(v-.5)*24,msAir=v=>(v-.5)*24,msW=v=>v*2;
function applyMs(t){const T=(p,v)=>p.setTargetAtTime(v,t,.02);T(M.lp.Q,.7+S.mres*14);T(M.mhp.frequency,msHp(S.mhp));T(M.mmid.frequency,msMf(S.mmf));T(M.mmid.gain,msMg(S.mmid));T(M.mair.gain,msAir(S.mair));
  const w=msW(S.mwid),a=(1+w)/2,b=(1-w)/2;T(M.wLL.gain,a);T(M.wRR.gain,a);T(M.wLR.gain,b);T(M.wRL.gain,b)}
function buildFx(){
  /* chorus / flanger: 2 modulated delays, opposite LFO phase -> stereo */
  M.ch=blk();M.dLc=ctx.createDelay(.06);M.dRc=ctx.createDelay(.06);M.cfbL=ctx.createGain();M.cfbR=ctx.createGain();M.cmg=ctx.createChannelMerger(2);
  M.ch.i.connect(M.dLc);M.ch.i.connect(M.dRc);M.dLc.connect(M.cfbL);M.cfbL.connect(M.dLc);M.dRc.connect(M.cfbR);M.cfbR.connect(M.dRc);
  M.dLc.connect(M.cmg,0,0);M.dRc.connect(M.cmg,0,1);M.cmg.connect(M.ch.wet);
  M.lfo=ctx.createOscillator();M.lgL=ctx.createGain();M.lgR=ctx.createGain();M.lfo.connect(M.lgL);M.lfo.connect(M.lgR);M.lgL.connect(M.dLc.delayTime);M.lgR.connect(M.dRc.delayTime);M.lfo.start();M.lfoT0=ctx.currentTime;
  /* bitcrusher */
  M.cr=blk();M.crN=mkCrNode();M.cr.i.connect(M.crN);M.crN.connect(M.cr.wet);
  /* LFO filter (tempo synced) */
  M.fl=blk();M.flt=ctx.createBiquadFilter();M.fl.i.connect(M.flt);M.flt.connect(M.fl.wet);
  M.lfo2=ctx.createOscillator();M.lg2=ctx.createGain();M.lfo2.connect(M.lg2);M.lg2.connect(M.flt.detune);M.lfo2.start();M.lfo2T0=ctx.currentTime;
  /* compressor */
  M.cmp=ctx.createDynamicsCompressor();M.cmp.knee.value=6;M.cmk=ctx.createGain();
}
function applyFx(t){const T=(p,v,tc)=>p.setTargetAtTime(v,t,tc||.02);
  const R=S.rev;T(M.rRet.gain,R.on?R.mix:0);T(M.rPre.delayTime,.002+R.pre*.1);T(M.rLp.frequency,1500*Math.pow(14000/1500,R.damp));T(M.rHp.frequency,60*Math.pow(800/60,R.lo));
  const D=S.dly,fb=D.fb*.85,tone=800*Math.pow(10,D.tone);T(M.dRet.gain,D.on?D.mix:0);T(M.dlpL.frequency,tone);T(M.dlpR.frequency,tone);
  T(M.inR.gain,D.pp?0:1);T(M.sL.gain,D.pp?0:fb);T(M.sR.gain,D.pp?0:fb);T(M.xLR.gain,D.pp?fb:0);T(M.xRL.gain,D.pp?fb:0);
  const H=S.cho,fl=H.mode==='fla',amp=(fl?.0025:.006)*H.depth,base=fl?.0035:.016;T(M.dLc.delayTime,base);T(M.dRc.delayTime,base);T(M.lgL.gain,amp);T(M.lgR.gain,-amp);
  T(M.lfo.frequency,.05*Math.pow(100,H.rate));T(M.cfbL.gain,(fl?.88:.35)*H.fb);T(M.cfbR.gain,(fl?.88:.35)*H.fb);T(M.ch.wet.gain,H.on?H.mix:0);T(M.ch.dry.gain,H.on?1-H.mix*.5:1);
  const F=S.flt;M.flt.type=F.type;M.lfo2.type=F.shape==='saw'?'sawtooth':F.shape;T(M.flt.frequency,60*Math.pow(300,F.freq));T(M.flt.Q,.5+F.res*14);T(M.lg2.gain,F.depth*3600);
  T(M.fl.wet.gain,F.on?1:0);T(M.fl.dry.gain,F.on?0:1);
  const X=S.cr;if(M.crN._wk){M.crN.parameters.get('bits').setValueAtTime(crBits(X.bits),t);M.crN.parameters.get('down').setValueAtTime(crDown(X.down),t)}else M.crN.curve=stair(crBits(X.bits));
  T(M.cr.wet.gain,X.on?X.mix:0);T(M.cr.dry.gain,X.on?1-X.mix:1);
  const Q=S.cmp;T(M.cmp.threshold,Q.on?-40+Q.thr*40:0);T(M.cmp.ratio,Q.on?1+Q.ratio*19:1);T(M.cmp.attack,.001+Q.att*.1);T(M.cmp.release,.03+Q.rel*.97);T(M.cmk.gain,Q.on?Math.pow(10,Q.mk*18/20):1)}
function applyDelay(){if(!ctx)return;const t=ctx.currentTime,dt=DIVS[S.dly.div][1]*60/S.bpm/4;M.dL.delayTime.setTargetAtTime(dt,t,.05);M.dR.delayTime.setTargetAtTime(dt,t,.05);M.lfo2.frequency.setTargetAtTime(S.bpm/60/FDIV[S.flt.div][1],t,.05)}
function applyMaster(){if(!ctx)return;const t=ctx.currentTime;setEq(M.eq,S.meq,t);if(M._drv!==S.mdrive){M._drv=S.mdrive;setShape(M.sh,S.mdrive)}
  M.lp.frequency.setTargetAtTime(180*Math.pow(110,S.mcut),t,.02);M.vol.gain.setTargetAtTime(S.mvol*.9,t,.02);if(M.lim._wk){M.lim.parameters.get('drive').setTargetAtTime(Math.pow(10,S.lim*12/20),t,.02);M.mk.gain.setTargetAtTime(1,t,.02)}else{M.lim.threshold.value=-6-S.lim*18;M.mk.gain.setTargetAtTime(1.7,t,.02)}
  applyMs(t);applyFx(t);applyDelay()}
function applyLanes(){if(!ctx||!M.lg)return;const t=ctx.currentTime;['a1','a2'].forEach(id=>M.lg[id].gain.setTargetAtTime(S.lanes[id].vol,t,.02))}
let anaLive=true;function anaOn(on){if(!ctx||!chs.length||on===anaLive)return;anaLive=on;chs.forEach(c=>{try{if(on)c.pan.connect(c.ana);else c.pan.disconnect(c.ana)}catch(e){}})}
function applyAll(){CH.forEach((_,i)=>applyCh(i));applyMaster();applyLanes()}

/* voice bus per hit; disconnects itself when its last source ends (no timers) */
const dst=(i,v)=>{const g=ctx.createGain();g.gain.value=v;g.connect(chs[i].in);g._n=0;return g};
const reg=(d,s)=>{d._n++;s.onended=()=>{if(--d._n<=0){try{d.disconnect()}catch(e){}}}};
const env=(g,t,pk,len)=>{g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(pk,t+.0015);g.gain.exponentialRampToValueAtTime(.001,t+len)};
const nsrc=(d,t,len)=>{const s=ctx.createBufferSource();s.buffer=noise;s.loop=true;s.start(t,Math.random()*.9);s.stop(t+len+.05);reg(d,s);return s};
const osc=(d,t,end,type)=>{const o=ctx.createOscillator();if(type)o.type=type;o.start(t);o.stop(end);reg(d,o);return o};
/* fade a running voice out fast at t (mono sub, hat choke) */
function choke(v,t){if(!v||v.end<=t)return;v.gs.forEach(g=>{const p=g.gain;if(p.cancelAndHoldAtTime)p.cancelAndHoldAtTime(t);else{p.cancelScheduledValues(t);p.setValueAtTime(p.value,t)}p.setTargetAtTime(0,t,.004)});
  v.srcs.forEach(s=>{try{s.stop(t+.03)}catch(e){}});v.end=t}
const HATR=[2,3,4.16,5.43,6.79,8.21];
/* one synth graph, used live (fallback) and to pre-render cached voices; lv: 0-2 velocity, 3 accent */
function synth(x,out,i,t,lv,nz,srcs,pp){const m=.6+pp.tn,dm=.5+pp.dc,pv=1+(lv-2)*.012,bv=[.72,.86,1,1.22][lv];
  const G=()=>x.createGain(),F=(ty,f,q)=>{const b=x.createBiquadFilter();b.type=ty;b.frequency.value=f;if(q!=null)b.Q.value=q;return b};
  const O=(ty,stp)=>{const o=x.createOscillator();if(ty)o.type=ty;o._stp=stp;srcs.push(o);return o};
  const N=stp=>{const z=x.createBufferSource();z.buffer=nz;z.loop=true;z._stp=stp;z._off=Math.random()*.9;srcs.push(z);return z};
  const E=(g,pk,len,at)=>{g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(pk,t+(at||.0015));g.gain.exponentialRampToValueAtTime(.001,t+len)};
  let len;
  if(i===0){len=.42*dm;const f0=42*m*pv,o=O('',len+.05),g=G();
    o.frequency.setValueAtTime(f0*4.4,t);o.frequency.exponentialRampToValueAtTime(f0*1.8,t+.011);o.frequency.exponentialRampToValueAtTime(f0,t+.075+.06*dm);
    E(g,1,len,.0008);o.connect(g);g.connect(out);
    const n=N(.016),bp=F('bandpass',3600*bv,.8),gc=G();E(gc,.42*bv,.014,.0005);n.connect(bp);bp.connect(gc);gc.connect(out)}
  else if(i===1){len=.2*dm;const n=N(len+.05),hp=F('highpass',1100*m*(.85+.15*bv)),g=G();E(g,.7*bv,len);n.connect(hp);hp.connect(g);g.connect(out);
    const o=O('triangle',.25),g2=G();o.frequency.setValueAtTime(240*m*pv,t);o.frequency.exponentialRampToValueAtTime(185*m*pv,t+.03);E(g2,.5,.11*dm);o.connect(g2);g2.connect(out)}
  else if(i===2){len=.22*dm;const n=N(len+.08),bp=F('bandpass',1500*m*(.9+.1*bv),1.1),g=G();g.gain.setValueAtTime(0,t);
    [0,.012,.024].forEach(z=>{g.gain.linearRampToValueAtTime(.8,t+z+.001);g.gain.exponentialRampToValueAtTime(.05,t+z+.01)});g.gain.linearRampToValueAtTime(.7,t+.037);g.gain.exponentialRampToValueAtTime(.001,t+.036+len);n.connect(bp);bp.connect(g);g.connect(out)}
  else if(i===3||i===4){len=(i===3?.06:.32)*dm;const mix=G();mix.gain.value=.16;
    HATR.forEach(r=>{const q=O('square',len+.05);q.frequency.value=40*m*r;q.connect(mix)});
    const bp=F('bandpass',Math.min(18000,10000*m*(.9+.1*bv)),.9),hp=F('highpass',7000*m),n=N(len),gn=G();gn.gain.value=.25;n.connect(gn);gn.connect(hp);
    const g=G();E(g,.5,len);mix.connect(bp);bp.connect(hp);hp.connect(g);g.connect(out)}
  else{len=.32*dm;const f0=95*m*pv,o=O('',len+.05),g=G();o.frequency.setValueAtTime(f0*2.6,t);o.frequency.exponentialRampToValueAtTime(f0*1.25,t+.02);o.frequency.exponentialRampToValueAtTime(f0,t+.2);E(g,.9,len);o.connect(g);g.connect(out)}
  srcs.forEach(z=>{if(z._off!=null)z.start(t,z._off);else z.start(t);z.stop(t+z._stp)});
  return len}
/* voice cache: rendered offline at 4x, soft-saturated, then decimated with a windowed-sinc FIR (no aliasing) */
const VC=new Map(),NZ=new Map(),FIRS={},SMP=new Array(6).fill(null),SMPN=new Array(6).fill('');let OSF=4;
const vKey=(i,sr,lv)=>i+'|'+sr+'|'+C[i].tn.toFixed(3)+'|'+C[i].dc.toFixed(3)+'|'+lv;
const RRN=i=>(i>=1&&i<=4)?2:1;
function fir(f){if(FIRS[f])return FIRS[f];const N=15*f+1|1,h=new Float32Array(N),fc=.45/f;let sm=0;
  for(let k=0;k<N;k++){const q=k-(N-1)/2,w=.42-.5*Math.cos(2*Math.PI*k/(N-1))+.08*Math.cos(4*Math.PI*k/(N-1));h[k]=(q?Math.sin(2*Math.PI*fc*q)/(Math.PI*q):2*fc)*w;sm+=h[k]}
  for(let k=0;k<N;k++)h[k]/=sm;return FIRS[f]=h}
function decim(d,f){const h=fir(f),N=h.length,hf=(N-1)/2,n=Math.floor(d.length/f),o=new Float32Array(n);
  for(let j=0;j<n;j++){const c=j*f;let a=0;const k0=Math.max(0,hf-c),k1=Math.min(N,d.length-c+hf);for(let k=k0;k<k1;k++)a+=h[k]*d[c+k-hf];o[j]=a}return o}
function noiseFor(x){const r=x.sampleRate;if(NZ.has(r))return NZ.get(r);const b=x.createBuffer(1,r,r),d=b.getChannelData(0);for(let k=0;k<d.length;k++)d[k]=Math.random()*2-1;NZ.set(r,b);return b}
const SAT=[1.4,1.2,0,0,0,1.3];
async function renderVoice(i,lv,sr,pp){const OC=window.OfflineAudioContext||window.webkitOfflineAudioContext,dm=.5+pp.dc;OSF=Math.max(1,Math.min(OSF,Math.floor(192000/sr)));
  const dur=[.42*dm,Math.max(.25,.2*dm),.22*dm+.08,.06*dm,.32*dm,.32*dm][i]+.08;let x,f=OSF;
  for(;;){try{x=new OC(1,Math.ceil(dur*sr*f),sr*f);break}catch(e){if(f<=1)throw e;f=f/2;OSF=f}}
  const srcs=[];synth(x,x.destination,i,0,lv,noiseFor(x),srcs,pp);
  const rb=await new Promise((res,rej)=>{x.oncomplete=e=>res(e.renderedBuffer);const p=x.startRendering();if(p&&p.then)p.then(res,rej)});
  const d=rb.getChannelData(0),k=SAT[i];if(k){const nk=Math.tanh(k);for(let j=0;j<d.length;j++)d[j]=Math.tanh(d[j]*k)/nk}
  const o=f>1?decim(d,f):d;let end=o.length;while(end>1&&Math.abs(o[end-1])<3e-5)end--;
  const b=x.createBuffer(1,end,sr);b.getChannelData(0).set(o.subarray(0,end));return b}
let warming=null,warmAgain=false,wq=0;
function warmAll(sr){if(warming){warmAgain=true;return warming}
  warming=(async()=>{do{warmAgain=false;const want=new Set();
    for(let i=0;i<6;i++){if(SMP[i])continue;const pp={tn:C[i].tn,dc:C[i].dc};
      for(let lv=0;lv<4;lv++)for(let r=0;r<RRN(i);r++){const k=vKey(i,sr,lv)+'|'+r;want.add(k);if(!VC.has(k)){try{VC.set(k,await renderVoice(i,lv,sr,pp))}catch(e){}}}}
    for(const k of [...VC.keys()])if(!want.has(k))VC.delete(k)}while(warmAgain);warming=null})();return warming}
function queueWarm(){clearTimeout(wq);wq=setTimeout(()=>{if(LIVE){warmAll(LIVE.sampleRate);warmStab(LIVE.sampleRate)}},150)}
function drumLive(i,t,v,lv){const d=dst(i,v),srcs=[],len=synth(ctx,d,i,t,lv,noise,srcs,C[i]);srcs.forEach(z=>reg(d,z));if(i===4)ohV={gs:[d],srcs,end:t+len+.05}}
function drum(i,t,v){const lv=v<.6?0:v<.9?1:v<1.15?2:3;if(i===3)choke(ohV,t);
  const smp=SMP[i];let buf=smp;
  if(!buf){buf=VC.get(vKey(i,ctx.sampleRate,lv)+'|'+(RRN(i)>1&&Math.random()<.5?1:0));if(!buf){queueWarm();return drumLive(i,t,v,lv)}}
  const z=ctx.createBufferSource(),g=ctx.createGain();z.buffer=buf;
  const rate=smp?Math.pow(2,(C[i].tn-.5)*2)*(1+(lv-2)*.008):1+(Math.random()-.5)*.006;z.playbackRate.value=rate;
  let dur=buf.duration/rate;const gv0=smp?v*.9:v;g.gain.setValueAtTime(gv0,t);
  if(smp&&C[i].dc<.97){const L=.03+C[i].dc*C[i].dc*2.2;if(L<dur){g.gain.setValueAtTime(gv0,t+L*.5);g.gain.exponentialRampToValueAtTime(gv0*.001+1e-5,t+L);dur=L+.01}}
  z.connect(g);g.connect(chs[i].in);z.onended=()=>{try{g.disconnect()}catch(e){}};z.start(t);z.stop(t+dur+.01);
  if(i===4)ohV={gs:[g],srcs:[z],end:t+dur}}
let lastF=0;
function sub(off,t,v,ac){
  const leg=!!(subV&&subV.end>t+.002);choke(subV,t);
  const p=C[SUBI],f=mf(24+S.root+off),len=.12+p.dc*1.1,d=dst(SUBI,v),lp=ctx.createBiquadFilter(),g=ctx.createGain(),end=t+len+.05,o=osc(d,t,end,S.wave);
  const gl=p.gl>0&&lastF&&leg,gT=t+.02+p.gl*.16,pf=lastF,glide=(fr,mul)=>{if(gl){fr.setValueAtTime(pf*mul,t);fr.exponentialRampToValueAtTime(f*mul,gT)}else fr.setValueAtTime(f*mul,t)};
  glide(o.frequency,1);lastF=f;
  lp.type='lowpass';lp.frequency.value=S.wave==='sine'?20000:Math.min(20000,(120+Math.pow(p.br,2)*7000)*(.75+.35*Math.min(v,1.3))*(ac?1.5:1));
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.85,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+len);
  o.connect(lp);lp.connect(g);g.connect(d);const gs=[g],srcs=[o];
  /* +1 octave layer: makes the sub audible on phones/small speakers */
  if(S.layer){const o2=osc(d,t,end),g2=ctx.createGain();glide(o2.frequency,2);
    g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(.28,t+.008);g2.gain.exponentialRampToValueAtTime(.001,t+len*.9);o2.connect(g2);g2.connect(d);gs.push(g2);srcs.push(o2)}
  subV={gs,srcs,end}
}
/* acid 303: mono, resonant LP with env, accent, slide (legato glide) */
let acV=null,lastAF=0;
function acid(off,t,v,ac,sl){const leg=!!(sl&&acV&&acV.end>t-.01&&lastAF);choke(acV,t);
  const p=C[ACI],f=mf(NBASE[ACI]+S.root+off),spb=60/S.bpm/4,gate=spb*(sl?1.02:.35+p.dc*.9),end=t+gate+.08,d=dst(ACI,v),o=osc(d,t,end,S.awave),lp=ctx.createBiquadFilter(),g=ctx.createGain();
  if(leg){o.frequency.setValueAtTime(lastAF,t);o.frequency.exponentialRampToValueAtTime(f,t+.06)}else o.frequency.setValueAtTime(f,t);lastAF=f;
  const base=70*Math.pow(70,p.tn),peak=Math.min(15000,base*(1+p.gl*9*(ac?1.7:1)));lp.type='lowpass';lp.Q.value=1+p.br*19;
  if(leg)lp.frequency.setValueAtTime(base*1.2,t);else{lp.frequency.setValueAtTime(peak,t);lp.frequency.setTargetAtTime(base,t+.003,.025+p.dc*.28*(ac?.6:1))}
  const lvl=.42*(ac?1.3:1);if(leg)g.gain.setValueAtTime(lvl,t);else{g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(lvl,t+.004)}
  g.gain.setValueAtTime(lvl,t+gate);g.gain.linearRampToValueAtTime(0,t+gate+.03);o.connect(lp);lp.connect(g);g.connect(d);acV={gs:[g],srcs:[o],end}}
/* stab: detuned saw minor-7 chord through a plucky LP; pre-rendered per note/setting (8 oscillators live only until cached) */
function stabG(x,out,t,root,ac,p,keep){const len=.1+p.dc*1.4,end=t+len+.08,lp=x.createBiquadFilter(),g=x.createGain(),cut=250*Math.pow(24,p.tn);
  lp.type='lowpass';lp.Q.value=1.5;lp.frequency.setValueAtTime(Math.min(16000,cut*(ac?3.4:2.4)),t);lp.frequency.setTargetAtTime(cut,t+.004,len*.3);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(ac?.6:.48,t+.005);g.gain.exponentialRampToValueAtTime(.001,t+len);lp.connect(g);g.connect(out);
  const dt=4+p.br*30;[0,3,7,10].forEach(iv=>[-dt,dt].forEach(c=>{const o=x.createOscillator(),og=x.createGain();o.type='sawtooth';o.frequency.value=mf(root+iv);o.detune.value=c;og.gain.value=.09;o.connect(og);og.connect(lp);o.start(t);o.stop(end);if(keep)keep(o)}));return len}
const SVC=new Map(),SVQ=new Set();
const sKey=(root,ac,p,sr)=>root+'|'+(ac?1:0)+'|'+p.tn.toFixed(2)+'|'+p.dc.toFixed(2)+'|'+p.br.toFixed(2)+'|'+sr;
async function stabRender(key,root,ac,p,sr){if(SVQ.has(key))return;SVQ.add(key);try{const OC=window.OfflineAudioContext||window.webkitOfflineAudioContext,len=.1+p.dc*1.4,x=new OC(1,Math.ceil((len+.1)*sr),sr);
  stabG(x,x.destination,0,root,ac,{tn:p.tn,dc:p.dc,br:p.br});const b=await new Promise((res,rej)=>{x.oncomplete=e=>res(e.renderedBuffer);const q=x.startRendering();if(q&&q.then)q.then(res,rej)});
  SVC.set(key,b);if(SVC.size>96)SVC.delete(SVC.keys().next().value)}catch(e){}SVQ.delete(key)}
function stab(off,t,v,ac){const p=C[STI],root=NBASE[STI]+S.root+off,sr=ctx.sampleRate,key=sKey(root,ac,p,sr),b=SVC.get(key),d=dst(STI,v);
  if(b){const z=ctx.createBufferSource();z.buffer=b;z.connect(d);reg(d,z);z.start(t);return}
  stabG(ctx,d,t,root,ac,p,o=>reg(d,o));stabRender(key,root,ac,p,sr)}
/* warm the stab cache for every chord the patterns use */
function warmStab(sr){const p=C[STI],seen=new Set();P.forEach(q=>q.bn.forEach((n,i)=>{if(n<0)return;const ac=!!q.ac[STI][i],root=NBASE[STI]+S.root+n,k=sKey(root,ac,p,sr);if(!seen.has(k)&&!SVC.has(k)){seen.add(k);stabRender(k,root,ac,p,sr)}}))}
function mel(i,off,t,v,ac,sl){if(i===SUBI)sub(off,t,v,ac);else if(i===ACI)acid(off,t,v,ac,sl);else stab(off,t,v,ac)}
/* smooth sidechain: ~3 ms dip, exponential recovery (no clicks) */
function duck(t){const any=C.some(x=>x.solo);if(!S.sc.on||C[0].mute||(any&&!C[0].solo))return;C.forEach((p,i)=>{if(!p.sc||i===0)return;const g=chs[i].dk.gain;
  if(g.cancelAndHoldAtTime)g.cancelAndHoldAtTime(t);else g.cancelScheduledValues(t);
  g.setTargetAtTime(1-S.sc.amt,t,.001+S.sc.att*.03);g.setTargetAtTime(1,t+.015,(.04+S.sc.rel*.45)/3)})}
function audition(vv){if(!S.aud||!ensure())return;const t=ctx.currentTime+.005;vv=vv||VEL[2];if(S.ch<SUBI)drum(S.ch,t,vv);else mel(S.ch,SC[S.scale][S.subSel],t,vv,vv>1,false)}

/* ---------- sequencer ---------- */
let nextT=0,cur=0,timer=null,queue=[];
const nextPat=p=>{for(let k=1;k<=4;k++){const j=(p+k)%4;if(S.chainSet[j])return j}return p};
function playStep(g,t,pi,spb){spb=spb||60/S.bpm/4;const p=P[pi],hum=S.hum||0;let h=0;
  for(let i=0;i<NCH;i++){const c=C[i],st=g%c.len;let note=0;const vl=velAt(p,i,st);if(i>=SUBI)note=p[NK[i]][st];
    if(!vl||Math.random()>c.prob)continue;
    const ac=p.ac[i][st],rt=p.rt[i][st]||1;let t0=t+(p.nd[i][st]||0)*spb/8,v=VEL[vl]*(ac?1.3:1);
    if(hum){t0+=(Math.random()*2-1)*hum*.012;v*=1+(Math.random()*2-1)*hum*.22}
    for(let r=0;r<rt;r++){const tr=t0+r*spb/rt,vr=v*(r?1-.1*r:1);if(i<SUBI){drum(i,tr,vr);if(i===0)duck(tr)}else mel(i,note,tr,vr,!!ac,i===ACI&&!r&&!!p.asl[st])}
    h|=1<<i}
  return h}
function sched(g,t){const h=S.playPat>=0?playStep(g,t,S.playPat):0;queue.push({g,t,pp:S.playPat,h,b:S.song.on?Math.floor(g/16)%S.song.len:-1});if(queue.length>96)queue.splice(0,queue.length-96)}
function tick(){const spb=60/S.bpm/4;if(nextT<ctx.currentTime-.05)nextT=ctx.currentTime+.03;
  while(nextT<ctx.currentTime+.2){
    S.playPat=patFor(cur,S.playPat);if(S.song.on&&cur%16===0)lanesAt(Math.floor(cur/16)%S.song.len,nextT);
    sched(cur,nextT+((cur%2)?S.swing*spb*.4:0));nextT+=spb;cur++}}
function patFor(g,pp){if(S.song.on)return S.song.bars[Math.floor(g/16)%S.song.len];if(S.chain){if(g%16===0)return g===0?(S.chainSet[S.pat]?S.pat:nextPat(S.pat)):nextPat(pp);return pp}return S.pat}
/* audio lanes: bar-synced playback, rate-stretched to tempo */
const LB={a1:null,a2:null},LN={a1:'',a2:''},liveSrc=new Set();
function lanesAt(bar,t,x){x=x||ctx;['a1','a2'].forEach(id=>{const L=S.lanes[id],b=LB[id];if(!b||!L.on[bar])return;const bo=60/L.bpm*4,off=(bar%L.loop)*bo;if(off>=b.duration)return;
  const s=x.createBufferSource();s.buffer=b;s.playbackRate.value=S.bpm/L.bpm;s.connect(M.lg[id]);s.start(t,off);s.stop(t+60/S.bpm*4+.005);if(x===LIVE){liveSrc.add(s);s.onended=()=>liveSrc.delete(s)}})}
function audioWatch(){const c=ctx,t0=c.currentTime,w0=performance.now();setTimeout(()=>{if(ctx!==c||!S.play)return;const dt=(c.currentTime-t0)*1000,dw=performance.now()-w0;if(c.state!=='running'||dt<dw*.5){flash('SIN AUDIO: REVISA SALIDA DE SONIDO');setTimeout(()=>flash(c.state+' · '+c.sampleRate+' Hz'),1700)}},1500)}
function start(){if(!ensure())return;audioWatch();cur=0;lastF=0;lastAF=0;queue=[];S.pp=S.pat;nextT=ctx.currentTime+.06;S.play=true;if(wk)wk.postMessage(25);else timer=setInterval(tick,25);tick();kick();upd()}
function stop(){if(wk)wk.postMessage(0);clearInterval(timer);timer=null;S.play=false;queue=[];liveSrc.forEach(s=>{try{s.stop()}catch(e){}});liveSrc.clear();if(ctx&&acV)choke(acV,ctx.currentTime);if(ctx&&subV)choke(subV,ctx.currentTime);if(ctx&&ctx._pend){ctx._pend=0;setTimeout(()=>{if(!S.play){swapCr();swapLim()}},120)}upd();if(S.tab==='song')paintSongPH()}
let wk=null;try{wk=new Worker(URL.createObjectURL(new Blob(['let t=0;onmessage=e=>{clearInterval(t);if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}'],{type:'text/javascript'})));wk.onmessage=()=>{if(S.play&&ctx)tick()}}catch(e){wk=null}

/* ---------- ui loop + meters ---------- */
let looping=false,lastHv=0;const lv=new Array(NCH+1).fill(0),mb=new Uint8Array(256);
const peak=a=>{a.getByteTimeDomainData(mb);let m=0;for(let i=0;i<256;i++){const x=Math.abs(mb[i]-128);if(x>m)m=x}return m/128};
let pulse=0,glowOn=false,chipsLit=false,glowEl=null,rnLed=[],chipLed=[],mtEl=[];const fl=new Array(NCH).fill(0),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function loop(){const now=ctx?ctx.currentTime:0;
  while(queue.length&&queue[0].t<=now){const q=queue.shift();S.g=q.g;S.gt=q.t;S.pp=q.pp;if(q.b!==S.bar){S.bar=q.b;if(S.tab==='song')paintSongPH()}if(!RM){if(q.h&1)pulse=1;for(let i=0;i<NCH;i++)if(q.h>>i&1)fl[i]=1}ph()}
  if(pulse||glowOn){pulse*=.86;if(pulse<.02)pulse=0;glowEl.style.opacity=(pulse*.55).toFixed(2);glowOn=!!pulse}
  let lit=false;for(let i=0;i<NCH;i++){fl[i]*=.8;if(fl[i]<.01)fl[i]=0;if(fl[i])lit=true}
  if(lit||chipsLit){const vis=S.tab==='canal',pv=S.tab==='pads';for(let i=0;i<NCH;i++){const o=fl[i].toFixed(2);if(rnLed[i])rnLed[i].style.opacity=o;if(vis&&chipLed[i])chipLed[i].style.opacity=o;if(pv&&padEl[i])padEl[i].style.opacity=o}}chipsLit=lit;
  const tN=performance.now(),hv=tN-lastHv>=32;if(hv){lastHv=tN;drawLcd()}
  if(hv&&S.tab==='mix'&&ctx){for(let i=0;i<=NCH;i++){const pk=peak(i<NCH?chs[i].ana:M.ana);lv[i]=Math.max(pk,lv[i]*.78);const h=Math.min(100,Math.pow(lv[i],.6)*100)/100;if(mtEl[i]&&Math.abs(h-(mtEl[i]._h||0))>.004){mtEl[i]._h=h;mtEl[i].style.transform='scaleY('+h.toFixed(3)+')'}}}
  if(hv&&S.tab==='eq'&&ctx)drawEq();
  if(hv&&S.tab==='fx'&&ctx)drawFxLive();
  if(S.play||S.tab==='mix'||(S.tab==='eq'&&ctx)||(S.tab==='fx'&&ctx)||(S.lcdv!=='info'&&ctx)||pulse||chipsLit)requestAnimationFrame(loop);else looping=false}
function kick(){if(!looping){looping=true;requestAnimationFrame(loop)}}

/* ---------- views ---------- */
const grid=$('#grid'),rows=[];let pgOff=0;const gs=b=>+b.dataset.s+pgOff;
grid.innerHTML=CH.map((c,ch)=>`<div class="trk" id="trk${ch}" style="--c:${CHC[ch]}"><div class="rh"><button class="rn" data-i="${ch}"><b class="led"></b>${c[1]}</button><span class="ri" id="ri${ch}"></span><div class="seg ms"><button class="m" data-i="${ch}" aria-label="Mute ${c[0]}">M</button><button class="s" data-i="${ch}" aria-label="Solo ${c[0]}">S</button></div></div>`+
  `<div class="cells">${Array.from({length:16},(_,i)=>`<button class="step${i%4===0?' beat':''}" data-c="${ch}" data-s="${i}" aria-label="${c[0]} paso ${i+1}"><span class="n">${i+1}</span><span class="v"></span><span class="x"></span></button>`).join('')}</div></div>`).join('');
CH.forEach((_,ch)=>rows.push($$('#trk'+ch+' .step')));
const trkEl=CH.map((_,ch)=>$('#trk'+ch)),riEl=CH.map((_,ch)=>$('#ri'+ch)),trM=trkEl.map(t=>t.querySelector('.m')),trS=trkEl.map(t=>t.querySelector('.s')),cN=rows.map(r=>r.map(b=>b.querySelector('.n'))),cV=rows.map(r=>r.map(b=>b.querySelector('.v'))),cX=rows.map(r=>r.map(b=>b.querySelector('.x')));
glowEl=document.createElement('div');glowEl.className='glow';grid.prepend(glowEl);rnLed=$$('.rn .led',grid);
let lpT=0,lpDone=false,paint=null,suppressPaintClick=false;
function stepUnder(e){const t=document.elementFromPoint(e.clientX,e.clientY),b=t&&t.closest('#grid .step');return b&&grid.contains(b)?b:null}
function paintCell(ch,i,on){const p=P[S.pat],drumCh=ch<SUBI,a=drumCh?p.d[ch]:p[NK[ch]],was=velAt(p,ch,i)>0;if(was===on)return false;
  if(drumCh){if(on)a[i]=2;else{a[i]=0;clrX(p,ch,i)}}
  else if(on){a[i]=SC[S.scale][S.subSel];p[VK[ch]][i]=2}
  else{a[i]=-1;clrX(p,ch,i);if(ch===ACI)p.asl[i]=0}
  const vel=velAt(p,ch,i),active=vel>0,k=i-pgOff;if(k<0||k>15)return true;const b=rows[ch][k],ac=active&&p.ac[ch][i],rt=active?p.rt[ch][i]:1,nd=active?p.nd[ch][i]:0;
  b.classList.toggle('on',active);b.classList.toggle('out',i>=C[ch].len);b.classList.toggle('ac',!!ac);b.dataset.v=vel;
  cN[ch][k].textContent=(!drumCh&&active)?NN[(S.root+p[NK[ch]][i])%12]:i+1;cV[ch][k].style.width=vel?vel*28+'%':'0';
  cX[ch][k].textContent=(ac?'!':'')+(rt>1?'⋮':'')+(nd?(nd>0?'›':'‹').repeat(Math.abs(nd)):'')+(active&&ch===ACI&&p.asl[i]?'↗':'');return true}
function paintStep(s,i){if(s.seen.has(i))return;s.seen.add(i);paintCell(s.ch,i,s.on)}
function paintSpan(s,to){const d=Math.sign(to-s.last);if(!d)return;for(let i=s.last+d;d>0?i<=to:i>=to;i+=d)paintStep(s,i);s.last=to}
function beginPaint(s,e,b){if(S.em!=='step'||+b.dataset.c!==s.ch||gs(b)===s.i)return false;
  if(grid.classList.contains('focus')&&(S.ch!==s.ch||innerWidth<360))return false;
  const dx=Math.abs(e.clientX-s.x),dy=Math.abs(e.clientY-s.y);if(dx<10||dx<dy*1.25)return false;
  clearTimeout(lpT);s.drag=true;s.on=velAt(P[S.pat],s.ch,s.i)===0;s.seen=new Set();setCh(s.ch);snap();
  try{grid.setPointerCapture(e.pointerId)}catch(err){}
  paintStep(s,s.i);s.last=s.i;paintSpan(s,gs(b));return true}
grid.addEventListener('pointerdown',e=>{const b=e.target.closest('.step');if(!b||!e.isPrimary||e.button!==0)return;lpDone=false;suppressPaintClick=false;clearTimeout(lpT);
  const s={id:e.pointerId,first:b,ch:+b.dataset.c,i:gs(b),x:e.clientX,y:e.clientY,last:gs(b),drag:false,long:false,on:false,seen:null};paint=s;
  lpT=setTimeout(()=>{if(paint===s&&!s.drag){s.long=true;lpDone=true;cyc(s.ch,s.i)}},420)});
grid.addEventListener('pointermove',e=>{const s=paint;if(!s||s.id!==e.pointerId||s.long)return;const b=stepUnder(e);if(!b||+b.dataset.c!==s.ch)return;
  if(!s.drag){beginPaint(s,e,b);return}paintSpan(s,gs(b))});
function finishPaint(e){const s=paint;if(!s||s.id!==e.pointerId)return;clearTimeout(lpT);
  if(s.drag){suppressPaintClick=true;updGrid();renderChips();save();if(s.on)audition();setTimeout(()=>{suppressPaintClick=false},0)}
  paint=null}
['pointerup','pointercancel','pointerleave'].forEach(ev=>grid.addEventListener(ev,finishPaint));
grid.addEventListener('contextmenu',e=>{if(e.target.closest('.step'))e.preventDefault()});
grid.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.classList.contains('step')){if(suppressPaintClick){suppressPaintClick=false;return}if(lpDone){lpDone=false;return}haptic();hit(+b.dataset.c,gs(b));return}
  const i=+b.dataset.i;if(b.classList.contains('m'))toggleMS(i,'m');else if(b.classList.contains('s'))toggleMS(i,'s');else if(b.classList.contains('rn'))selectCh(i)});const focusPages=$('#focusPages'),focusPageButtons=$$('#focusPages button');
const setFocusPage=page=>{grid.dataset.page=String(page);focusPageButtons.forEach((b,i)=>b.setAttribute('aria-pressed',i===page))};
$('#focB').addEventListener('click',e=>{const on=grid.classList.toggle('focus');e.currentTarget.setAttribute('aria-pressed',on);focusPages.hidden=!on;dragHint.hidden=!on||S.em!=='step';if(on){setFocusPage(0);e.currentTarget.textContent='🔍 Vista táctil activa'}else{delete grid.dataset.page;e.currentTarget.textContent='🔍 Vista táctil'}});
focusPageButtons.forEach(b=>b.addEventListener('click',()=>setFocusPage(+b.dataset.page)));
function setCh(ch){if(S.ch!==ch){const m=MEL(S.ch)!==MEL(ch)||MEL(ch);S.ch=ch;renderChips();updSteppers();renderCanal();if(m)renderNotes()}}
const clrX=(p,ch,i)=>{p.ac[ch][i]=0;p.rt[ch][i]=1;p.nd[ch][i]=0},NDC=[0,1,2,-2,-1];
function haptic(){try{if(navigator.vibrate)navigator.vibrate(8)}catch(e){}}
function hit(ch,i){haptic();setCh(ch);const p=P[S.pat],on=velAt(p,ch,i)>0;
  if(S.em==='sl'&&on){if(ch!==ACI){flash('SLIDE: SOLO ACID');return}snap();p.asl[i]=p.asl[i]?0:1;audition();updGrid();save();return}
  if((S.em==='acc'||S.em==='rt'||S.em==='nd')&&on){snap();if(S.em==='acc')p.ac[ch][i]=p.ac[ch][i]?0:1;else if(S.em==='rt')p.rt[ch][i]=p.rt[ch][i]%4+1;else p.nd[ch][i]=NDC[(NDC.indexOf(p.nd[ch][i])+1)%5];
    audition(p.ac[ch][i]?VEL[2]*1.3:VEL[2]);updGrid();save();return}
  snap();
  if(ch<SUBI){const a=p.d[ch];a[i]=a[i]?0:2;if(a[i])audition();else clrX(p,ch,i)}
  else{const off=SC[S.scale][S.subSel],a=p[NK[ch]];if(a[i]===off){a[i]=-1;clrX(p,ch,i);if(ch===ACI)p.asl[i]=0}else{a[i]=off;p[VK[ch]][i]=2;audition()}}
  updGrid();renderChips();save()}
function cyc(ch,i){setCh(ch);const p=P[S.pat];snap();
  if(ch<SUBI){const a=p.d[ch];if(a[i])a[i]=a[i]%3+1}else if(p[NK[ch]][i]>=0)p[VK[ch]][i]=p[VK[ch]][i]%3+1;
  updGrid();save()}
function updGrid(){const p=P[S.pat],any=C.some(x=>x.solo);document.documentElement.style.setProperty('--ch',CHC[S.ch]);
  rows.forEach((r,ch)=>{const c=C[ch],len=c.len,sub=MEL(ch),tr=trkEl[ch];
    tr.classList.toggle('sel',ch===S.ch);tr.classList.toggle('mt',c.mute||(any&&!c.solo));
    riEl[ch].textContent=[len!==16?len+' PASOS':'',c.prob<1?Math.round(c.prob*100)+'%':''].filter(Boolean).join(' · ');
    trM[ch].setAttribute('aria-pressed',c.mute);trS[ch].setAttribute('aria-pressed',c.solo);
    r.forEach((b,k)=>{const i=k+pgOff,vel=velAt(p,ch,i),on=vel>0,ac=on&&p.ac[ch][i],rt=on?p.rt[ch][i]:1,nd=on?p.nd[ch][i]:0;
      b.classList.toggle('on',on);b.classList.toggle('out',i>=len);b.classList.toggle('ac',!!ac);
      cN[ch][k].textContent=(sub&&on)?NN[(S.root+p[NK[ch]][i])%12]:i+1;cV[ch][k].style.width=vel?vel*28+'%':'0';b.dataset.v=vel;
      cX[ch][k].textContent=(ac?'!':'')+(rt>1?'⋮':'')+(nd?(nd>0?'›':'‹').repeat(Math.abs(nd)):'')+(on&&ch===ACI&&p.asl[i]?'↗':'')})});
  grid.dataset.em=S.em;ph()}
const phL=new Array(NCH).fill(-1);
function ph(){const same=S.play&&S.pp===S.pat;rows.forEach((r,ch)=>{const i0=same?S.g%C[ch].len:-1,idx=i0>=pgOff&&i0<pgOff+16?i0-pgOff:-1;if(idx===phL[ch])return;
    if(phL[ch]>=0)r[phL[ch]].classList.remove('ph');if(idx>=0)r[idx].classList.add('ph');phL[ch]=idx});
  if(S.play&&S.chain&&S.pp!==lastPP){lastPP=S.pp;renderPbar()}updLcd()}
let lastPP=-1,fm=0,ft='';
function flash(t){ft=t;fm=performance.now()+1600;updLcd();setTimeout(updLcd,1650)}
const lsEl=$('#lsteps');lsEl.innerHTML=Array.from({length:16},(_,i)=>`<i${i%4===0?' class="b"':''}></i>`).join('');const lsC=[...lsEl.children];let lsLast=-1;
const l1El=$('#l1'),l2El=$('#l2'),lbEl=$('#lb'),bpEl=$('#bpmv span'),plEl=$('#play'),uc=['','',-1,null];
function updLcd(){const pl=S.play?S.pp:S.pat,a=`<b>${S.play?'▶':'■'}</b>${CH[S.ch][1]} · ${S.song.on?'♪'+String((S.play?S.bar:0)+1).padStart(2,'0')+'/'+S.song.len+' · ':'PAT '}${pl>=0?'ABCD'[pl]:'–'}${S.chain&&!S.song.on?' · CADENA':''}`;if(a!==uc[0]){uc[0]=a;l1El.innerHTML=a}
  const sg=S.play?S.g%16:-1;if(sg!==lsLast){if(lsLast>=0)lsC[lsLast].classList.remove('on');if(sg>=0)lsC[sg].classList.add('on');lsLast=sg}
  const b=performance.now()<fm?ft:S.play?`PASO ${String(S.g%16+1).padStart(2,'0')}/16`:'LISTO';if(b!==uc[1]){uc[1]=b;l2El.textContent=b}
  if(uc[2]!==S.bpm){uc[2]=S.bpm;lbEl.textContent=S.bpm;bpEl.textContent=S.bpm}
  if(uc[3]!==S.play){uc[3]=S.play;plEl.setAttribute('aria-pressed',S.play);plEl.textContent=S.play?'■ Stop':'▶ Play'}}

const has=i=>i<SUBI?P[S.pat].d[i].some(Boolean):P[S.pat][NK[i]].some(x=>x>=0);
let chipEl=null;
function renderChips(){if(!chipEl){$('#chipsCan').innerHTML=CH.map((c,i)=>`<div class="chip" style="--c:${CHC[i]}"><button class="nm" data-i="${i}">${c[1]}<i></i><b class="led"></b></button><div class="seg ms"><button class="m" data-i="${i}" aria-label="Mute ${c[0]}">M</button><button class="s" data-i="${i}" aria-label="Solo ${c[0]}">S</button></div></div>`).join('');
    chipLed=$$('#chipsCan .led');chipEl=$$('#chipsCan .chip').map(el=>({nm:el.querySelector('.nm'),m:el.querySelector('.m'),s:el.querySelector('.s')}))}
  chipEl.forEach((e,i)=>{e.nm.classList.toggle('has',has(i));e.nm.setAttribute('aria-pressed',S.ch===i);e.m.setAttribute('aria-pressed',C[i].mute);e.s.setAttribute('aria-pressed',C[i].solo)})}
function toggleMS(i,k){if(k==='m')C[i].mute=!C[i].mute;else C[i].solo=!C[i].solo;applyAll();renderChips();updMixUI();updGrid();save()}
function selectCh(i){S.ch=i;renderChips();renderNotes();updGrid();updSteppers();renderCanal();audition()}
const chipClick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
  if(b.classList.contains('m'))toggleMS(i,'m');else if(b.classList.contains('s'))toggleMS(i,'s');else selectCh(i)};
$('#chipsCan').addEventListener('click',chipClick);

function renderNotes(){const el=$('#notes'),m=melCh();$('.nrow').hidden=!MEL(S.ch);$('#nlab').textContent='NOTA '+CH[m][1];$('#nlab').parentElement.style.setProperty('--c',CHC[m]);
  el.innerHTML=SC[S.scale].map((o,i)=>`<button class="fn" data-i="${i}" aria-pressed="${S.subSel===i}">${nname(NBASE[m]+S.root+o)}</button>`).join('')}
$('#notes').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.subSel=+b.dataset.i;setCh(melCh());renderNotes();updGrid();audition()});

function renderPbar(){$('#pts').innerHTML='ABCD'.split('').map((l,i)=>`<div class="seg${S.play&&S.chain&&S.pp===i?' pl':''}"><button data-i="${i}" aria-pressed="${S.pat===i}">${l}</button><button class="pc" data-i="${i}" aria-pressed="${!!S.chainSet[i]}" aria-label="Incluir ${l} en la cadena">CADENA</button></div>`).join('');
  $('#pchips').innerHTML='ABCD'.split('').map((l,i)=>`<button data-i="${i}" aria-pressed="${S.pat===i}"${S.play&&S.pp===i?' class="pl"':''} aria-label="Patrón ${l}">${l}</button>`).join('');
  $('#chain').setAttribute('aria-pressed',S.chain)}
$('#pchips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.pat=+b.dataset.i;upd();save()});
$('#pts').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
  if(b.classList.contains('pc'))S.chainSet[i]=S.chainSet[i]?0:1;else S.pat=i;upd();save()});
$('#chain').addEventListener('click',()=>{S.chain=!S.chain;upd();save()});
$('#dup').addEventListener('click',()=>{snap();const n=(S.pat+1)%4;P[n]=JSON.parse(JSON.stringify(P[S.pat]));S.pat=n;flash('COPIA → '+'ABCD'[n]+' · ↶');upd();save()});

function updSteppers(){const c=C[S.ch],big=C[ACI].len>16;$('#lenv').textContent='LEN '+c.len;$('#stepPg').hidden=!big;if(!big&&pgOff)setPg(0);$('#prbv').textContent='PROB '+Math.round(c.prob*100)+'%'}
function stepK(k,d){if(k==='bpm'){S.bpm=clamp(S.bpm+d,60,200);applyDelay()}else if(k==='len')C[S.ch].len=clamp(C[S.ch].len+d,1,S.ch===ACI?32:16);
  else C[S.ch].prob=clamp(Math.round(C[S.ch].prob*100+d*5)/100,0,1);updLcd();updSteppers();updGrid();saveSoon()}
function hold(btn,fn){let t,iv;const stop=()=>{clearTimeout(t);clearInterval(iv)};
  btn.addEventListener('pointerdown',e=>{e.preventDefault();fn();stop();t=setTimeout(()=>{iv=setInterval(fn,90)},380)});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>btn.addEventListener(ev,stop));
  btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})}
$$('.hd').forEach(b=>hold(b,()=>stepK(b.dataset.k,+b.dataset.d)));
$('#lenv').addEventListener('click',()=>{const c=C[S.ch];c.len=S.ch===ACI&&c.len===16?32:16;updSteppers();updGrid();saveSoon()});
function setPg(n){pgOff=n*16;$$('#stepPg button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pg===n));updGrid()}
$('#stepPg').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setPg(+b.dataset.pg)});
$('#prbv').addEventListener('click',()=>{C[S.ch].prob=1;updSteppers();saveSoon()});
let taps=[];$('#bpmv').addEventListener('click',()=>{const n=performance.now();if(taps.length&&n-taps[taps.length-1]>2000)taps=[];taps.push(n);if(taps.length>5)taps.shift();
  if(taps.length>1){S.bpm=clamp(Math.round(60000/((taps[taps.length-1]-taps[0])/(taps.length-1))),60,200);applyDelay();updLcd();saveSoon()}});

$('#play').addEventListener('click',()=>{S.play?stop():start()});
const updAud=()=>{const b=$('#aud');b.setAttribute('aria-pressed',S.aud);b.textContent=S.aud?'🔊':'🔇';b.setAttribute('aria-label',S.aud?'Sonar al pulsar: sí':'Sonar al pulsar: no')};
$('#aud').addEventListener('click',()=>{S.aud=!S.aud;updAud();flash(S.aud?'SONAR AL PULSAR: SÍ':'SONAR AL PULSAR: NO');save()});updAud();
$('#clear').addEventListener('click',()=>{snap();flash('BORRADO · ↶');const p=P[S.pat];if(S.ch<SUBI)p.d[S.ch].fill(0);else p[NK[S.ch]].fill(-1);if(S.ch===ACI)p.asl.fill(0);p.ac[S.ch].fill(0);p.rt[S.ch].fill(1);p.nd[S.ch].fill(0);upd();save()});
$('#rand').addEventListener('click',()=>{snap();const p=P[S.pat],sc=SC[S.scale],RN=Math.max(16,C[S.ch].len);
  if(S.ch<SUBI){const dens=[.3,.2,.12,.55,.12,.1][S.ch];for(let i=0;i<RN;i++)p.d[S.ch][i]=(Math.random()<dens||(S.ch===0&&i%4===0&&Math.random()<.7))?1+Math.floor(Math.random()*3):0}
  else{const ch=S.ch,dn=ch===ACI?.65:ch===STI?.18:.45,n=p[NK[ch]],v=p[VK[ch]];for(let i=0;i<RN;i++){n[i]=Math.random()<dn?sc[Math.floor(Math.random()*(ch===ACI?sc.length:5))]:-1;v[i]=1+Math.floor(Math.random()*3);if(ch===ACI)p.asl[i]=n[i]>=0&&Math.random()<.2?1:0}if(ch===ACI&&n[0]<0)n[0]=0}
  const ch=S.ch,on=i=>velAt(p,ch,i)>0;p.ac[ch].fill(0);p.rt[ch].fill(1);p.nd[ch].fill(0);
  for(let i=0;i<RN;i++){if(!on(i))continue;if(ch===3&&Math.random()<.12)p.rt[ch][i]=Math.random()<.3?3:2;if((ch===0||ch===1||ch===ACI)&&Math.random()<.18)p.ac[ch][i]=1}
  upd();save()});
/* edit mode, euclid, copy/paste */
const sheet=$('#sheet'),modeB=$('#modeB'),ML={step:'Paso',acc:'Acento',rt:'Redoble',nd:'Nudge',sl:'Slide',prob:'Prob.',euc:'Euclíd.'};
function setSheet(o){sheet.hidden=!o;modeB.setAttribute('aria-expanded',o)}
modeB.addEventListener('click',e=>{e.stopPropagation();setSheet(sheet.hidden)});
document.addEventListener('click',e=>{if(!sheet.hidden&&!e.target.closest('#sheet'))setSheet(false)});
$('#emode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.em=b.dataset.m;$$('#emode button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  modeB.textContent='Modo: '+ML[S.em]+' ▾';modeB.setAttribute('aria-pressed',S.em!=='step');dragHint.hidden=!grid.classList.contains('focus')||S.em!=='step';if(S.em!=='prob'&&S.em!=='euc')setSheet(false);
  $('#probX').hidden=S.em!=='prob';$('#euc').hidden=S.em!=='euc';$('#modeX').hidden=S.em!=='prob'&&S.em!=='euc';
  flash({step:'TOCAR: PASO',acc:'TOCAR: ACENTO',rt:'TOCAR: REDOBLE',nd:'TOCAR: NUDGE',sl:'TOCAR: SLIDE (ACID)',prob:'PROBABILIDAD DE LA PISTA',euc:'EUCLÍDEO: + / − / ↻'}[S.em]);updGrid()});
let eucK=4,eucR=0;
function euclid(){snap();const p=P[S.pat],ch=S.ch,n=C[ch].len,k=clamp(eucK,0,n);eucK=k;eucR=eucR%n;
  for(let i=0;i<Math.max(16,n);i++){const on=i<n&&k>0&&((((i-eucR)%n+n)%n)*k)%n<k;
    if(ch<SUBI)p.d[ch][i]=on?(p.d[ch][i]||2):0;else{const a=p[NK[ch]];if(on){if(a[i]<0){a[i]=SC[S.scale][S.subSel];p[VK[ch]][i]=2}}else a[i]=-1}
    if(!on)clrX(p,ch,i)}
  $('#eucv').textContent='◎ Euclid '+k;flash('EUCLID '+k+'/'+n+(eucR?' ↻'+eucR:''));updGrid();renderChips();save()}
$('#euc').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.e;
  if(a==='-1')eucK=Math.max(0,eucK-1);else if(a==='1')eucK=Math.min(C[S.ch].len,eucK+1);else if(a==='r')eucR=(eucR+1)%C[S.ch].len;euclid()});
let CB=null;const cl=o=>JSON.parse(JSON.stringify(o));
function rowGet(p,ch){return{v:Array.from({length:NST},(_,i)=>velAt(p,ch,i)),s:MEL(ch)?p[NK[ch]].slice():null,sl:ch===ACI?p.asl.slice():null,ac:p.ac[ch].slice(),rt:p.rt[ch].slice(),nd:p.nd[ch].slice()}}
function rowSet(p,ch,r){const off=SC[S.scale][S.subSel];if(ch<SUBI)p.d[ch]=r.v.slice();else{p[NK[ch]]=r.s?r.s.slice():r.v.map(v=>v?off:-1);p[VK[ch]]=r.v.map(v=>v||2);if(ch===ACI)p.asl=r.sl?r.sl.slice():new Array(NST).fill(0)}
  p.ac[ch]=r.ac.slice();p.rt[ch]=r.rt.slice();p.nd[ch]=r.nd.slice()}
$('#cpT').addEventListener('click',()=>{CB={t:'trk',r:rowGet(P[S.pat],S.ch)};$('#paste').disabled=false;flash('PISTA '+CH[S.ch][1]+' COPIADA')});
$('#cpP').addEventListener('click',()=>{CB={t:'pat',p:cl(P[S.pat])};$('#paste').disabled=false;flash('PATRÓN '+'ABCD'[S.pat]+' COPIADO')});
$('#paste').addEventListener('click',()=>{if(!CB)return;snap();if(CB.t==='pat')P[S.pat]=fixP(cl(CB.p));else rowSet(P[S.pat],S.ch,CB.r);
  flash('PEGADO EN '+(CB.t==='pat'?'PAT '+'ABCD'[S.pat]:CH[S.ch][1])+' · ↶');upd();save()});

/* ---------- tabs ---------- */
const TG={crear:['seq','pads'],song:['song'],mezcla:['mix','fx','eq','canal'],file:['file']},TL={seq:'Secuenciador',pads:'Pads',mix:'Mix',fx:'FX',eq:'EQ',canal:'Canal'},lastT={crear:'seq',mezcla:'mix'};
function showTab(t){S.tab=t;$('#msBar').hidden=t!=='fx';$('#modeB').hidden=t!=='seq';if(t!=='seq')setSheet(false);window.scrollTo(0,0);const g=Object.keys(TG).find(k=>TG[k].includes(t));if(lastT[g])lastT[g]=t;
  $$('#tabs button').forEach(b=>{const active=b.dataset.g===g;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;b.setAttribute('aria-controls','t-'+(active?t:TG[b.dataset.g][0]));if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  const sb=$('#subs');sb.hidden=TG[g].length<2;sb.setAttribute('role','tablist');sb.setAttribute('aria-label',g==='mezcla'?'Herramientas de mezcla':'Herramientas de creación');sb.innerHTML=TG[g].map(n=>`<button type="button" role="tab" id="subtab-${n}" data-t="${n}" aria-controls="t-${n}" aria-selected="${n===t}" tabindex="${n===t?0:-1}">${TL[n]}</button>`).join('');
  ['seq','pads','song','mix','fx','eq','canal','file'].forEach(n=>{const p=$('#t-'+n);p.hidden=n!==t;p.setAttribute('role','tabpanel');if(n===t)p.setAttribute('aria-labelledby',TG[g].length>1?'subtab-'+t:'tab-'+g)});anaOn(t==='mix'||t==='eq');if(t==='pads')renderPads();if(t==='song')renderSong();if(t==='eq'){eqDirty=true;renderEq();kick()}if(t==='file')renderSlots();
  if(t==='canal'){renderCanal();renderKits()};if(t==='mix'){updMixUI();kick()}if(t==='fx'){FXDEF.forEach(d=>{fxCv[d.id]=null;drawFxG(d.id)});kick()}upd()}
function moveTabByKey(e,root){if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const a=[...root.querySelectorAll('[role="tab"]')];if(!a.length)return;let i=a.indexOf(document.activeElement);if(e.key==='Home')i=0;else if(e.key==='End')i=a.length-1;else i=(i+(e.key==='ArrowRight'?1:-1)+a.length)%a.length;e.preventDefault();a[i].click();a[i].focus()}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){const g=b.dataset.g;showTab(lastT[g]||TG[g][0])}});
$('#subs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)showTab(b.dataset.t)});
$('#tabs').addEventListener('keydown',e=>moveTabByKey(e,e.currentTarget));
$('#subs').addEventListener('keydown',e=>moveTabByKey(e,e.currentTarget));

/* ---------- mixer ---------- */
function drag(el,vert,fn,reset){let last=0,on=false;
  const pos=e=>{const r=el.getBoundingClientRect();fn(clamp(vert?1-(e.clientY-r.top-9)/(r.height-18):(e.clientX-r.left-5)/(r.width-10),0,1))};
  el.addEventListener('pointerdown',e=>{e.preventDefault();const n=Date.now();if(n-last<300){last=0;reset();return}last=n;on=true;el.setPointerCapture(e.pointerId);pos(e)});
  el.addEventListener('pointermove',e=>{if(on)pos(e)});const off=()=>{on=false};el.addEventListener('pointerup',off);el.addEventListener('pointercancel',off)}
const toDb=v=>v<.001?'-∞ dB':(20*Math.log10(v)>-.05?'0.0':(20*Math.log10(v)).toFixed(1))+' dB';
const DBT=[[1,'0'],[.708,'-3'],[.5,'-6'],[.25,'-12'],[0,'-∞']].map(([v,l])=>`<span${v===1?' class="z"':''} style="bottom:${v*100}%">${l}</span>`).join('');
function buildMix(){let h='';
  for(let i=0;i<=NCH;i++){const ms=i===NCH,nm=ms?'MST':CH[i][1];
    h+=`<div class="mc" id="mc${i}" style="--c:${ms?'var(--fg)':CHC[i]}"><div class="fw"><div class="meter" aria-hidden="true"><i id="mt${i}"></i></div><div class="fad" id="fad${i}"><div class="cap" id="cap${i}"></div><div class="dbs" aria-hidden="true">${DBT}</div></div></div><span class="fv" id="fv${i}"></span>`+
    `<div class="pn" id="pn${i}"${ms?' style="visibility:hidden"':''}><b id="pb${i}"></b></div>`+
    (ms?`<div class="seg ms" style="visibility:hidden"><button tabindex="-1">M</button><button tabindex="-1">S</button></div>`:`<div class="seg ms"><button class="m" data-i="${i}" aria-pressed="false" aria-label="Mute ${CH[i][0]}">M</button><button class="s" data-i="${i}" aria-pressed="false" aria-label="Solo ${CH[i][0]}">S</button></div>`)+
    `<button class="nm2" data-i="${i}">${nm}</button></div>`}
  $('#mix').innerHTML=h;mtEl=[];for(let i=0;i<=NCH;i++)mtEl.push($('#mt'+i));
  for(let i=0;i<=NCH;i++){
    drag($('#fad'+i),true,v=>{if(i<NCH){C[i].vol=v;applyCh(i)}else{S.mvol=v;applyMaster()}updMixUI();saveSoon()},()=>{if(i<NCH){C[i].vol=.8;applyCh(i)}else{S.mvol=.8;applyMaster()}updMixUI();saveSoon()});
    if(i<NCH)drag($('#pn'+i),false,v=>{C[i].pan=v*2-1;applyCh(i);updMixUI();saveSoon()},()=>{C[i].pan=0;applyCh(i);updMixUI();saveSoon()})}}
$('#mix').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.tabIndex<0)return;const i=+b.dataset.i;
  if(b.classList.contains('m'))toggleMS(i,'m');else if(b.classList.contains('s'))toggleMS(i,'s');
  else if(b.classList.contains('nm2')){if(i===NCH)showTab('fx');else{S.ch=i;showTab('canal');renderChips();renderNotes();updGrid();updSteppers()}}});
function updMixUI(){updDock();['k_ms_mvol','b_ms_mvol'].forEach(id=>{const mv=$('#'+id);if(mv)mv.value=Math.round(S.mvol*1000)});['o_ms_mvol','ob_ms_mvol'].forEach(id=>{const o=$('#'+id);if(o)o.textContent=toDb(S.mvol*.9)});
  for(let i=0;i<=NCH;i++){const v=i<NCH?C[i].vol:S.mvol,cap=$('#cap'+i);if(!cap)return;
    cap.style.bottom=`calc((100% - 18px) * ${v})`;$('#fv'+i).textContent=toDb(v);
    if(i<NCH){$('#pb'+i).style.left=`calc((100% - 10px) * ${(C[i].pan+1)/2})`;
      const any=C.some(x=>x.solo);$('#mc'+i).classList.toggle('mt',C[i].mute||(any&&!C[i].solo));
      const m=$('#mc'+i+' .m'),s=$('#mc'+i+' .s');m.setAttribute('aria-pressed',C[i].mute);s.setAttribute('aria-pressed',C[i].solo)}}}


/* ---------- dock Directo: volumen, M/S y macros siempre a mano ---------- */
let dockOK=false;
const DKM=[['dj','DJ'],['rev:mix','Reverb'],['dly:mix','Delay'],['ms:mdrive','Drive'],['sc:amt','Sidechain'],['ms:mvol','Master']];
function buildDock(){
  $('#dkM').innerHTML=DKM.map(([k,l])=>{const dj=k==='dj';return`<div class="k"><label for="dm_${k.replace(':','_')}">${l} <output id="do_${k.replace(':','_')}"></output></label><input id="dm_${k.replace(':','_')}" data-m="${k}" type="range" min="${dj?-100:0}" max="${dj?100:1000}" value="0"></div>`}).join('');
  $('#dkM').addEventListener('input',e=>{const el=e.target,k=el.dataset.m;if(!k)return;if(k==='dj'){djSet(el.value/100);$('#do_dj').textContent=djOut(S.mhp>0?S.mhp/.8:S.mcut<1?(S.mcut-1)/.75:0)}else{const[id,key]=k.split(':');setFxVal(id,key,el.value/1000)}});
  (()=>{let last=0,lastEl=null;$('#dkM').addEventListener('pointerup',e=>{const el=e.target;if(el.type!=='range')return;const n=Date.now();
    if(lastEl===el&&n-last<300){const k=el.dataset.m;if(k==='dj'){el.value=0;djSet(0)}else{const[id,key]=k.split(':');setFxVal(id,key,fxDef(id,key))}last=0}else{last=n;lastEl=el}})})();
  dockOK=true;updDock()}
function updDock(){if(!dockOK)return;
  DKM.forEach(([k])=>{const id=k.replace(':','_'),inp=$('#dm_'+id),out=$('#do_'+id);if(!inp||document.activeElement===inp&&k!=='dj'&&false)return;
    if(k==='dj'){const v=S.mhp>0?S.mhp/.8:S.mcut<1?(S.mcut-1)/.75:0;if(document.activeElement!==inp)inp.value=Math.round(v*100);out.textContent=djOut(v)}
    else{const[a,b]=k.split(':'),v=fxObj(a)[b];if(document.activeElement!==inp)inp.value=Math.round(v*1000);out.textContent=FXI[a].k.find(x=>x[0]===b)[2](v)}})}
/* ---------- knobs: channel + fx ---------- */
const K={};
const kn=(k,l,v)=>`<div class="k"><label for="k_${k}">${l} <output id="o_${k}">${Math.round(v*100)}</output></label><input id="k_${k}" data-k="${k}" type="range" min="0" max="100" value="${Math.round(v*100)}"></div>`;
['dc','tn','br','gl','flt','drv','rev','dly'].forEach(n=>{K['c_'+n]=v=>{C[S.ch][n]=v;applyCh(S.ch);if(((n==='dc'||n==='tn')&&S.ch<SUBI)||S.ch===STI)queueWarm()}});
const KA=[['tn','Corte'],['br','Resonancia'],['gl','Envolvente'],['dc','Caída'],['flt','Filtro'],['drv','Drive'],['rev','Reverb'],['dly','Delay']];
const KB=[['tn','Brillo'],['dc','Caída'],['br','Desafine'],['flt','Filtro'],['drv','Drive'],['rev','Reverb'],['dly','Delay']];
const KD=[['dc','Caída'],['tn','Tono'],['flt','Filtro'],['drv','Drive'],['rev','Reverb'],['dly','Delay']];
const KS=[['dc','Largo'],['br','Brillo'],['gl','Glide'],['flt','Filtro'],['drv','Drive'],['rev','Reverb'],['dly','Delay']];
/* kits de sonido (6 baterías) y presets melódicos: solo mueven los mandos de Canal */
const KITS=[['Original',[[.5,.5,1,0,0,0],[.5,.5,1,0,.2,0],[.5,.5,1,0,.3,0],[.5,.5,1,0,0,0],[.5,.5,1,0,.15,.3],[.5,.5,1,0,0,0]]],
  ['808',[[.85,.3,1,.15,0,0],[.45,.45,1,.1,.2,0],[.5,.5,1,.05,.3,0],[.25,.6,1,0,0,0],[.5,.6,1,0,.1,.1],[.7,.35,1,.1,0,0]]],
  ['909',[[.5,.5,1,.35,0,0],[.4,.6,1,.2,.15,0],[.4,.55,1,.15,.25,0],[.2,.7,1,0,0,0],[.45,.65,1,0,.1,.1],[.5,.5,1,.15,0,0]]],
  ['Lo-fi',[[.45,.4,.6,.3,0,0],[.5,.4,.5,.3,.25,0],[.5,.4,.5,.25,.3,.1],[.3,.4,.45,.2,0,0],[.5,.35,.45,.2,.15,.2],[.55,.35,.55,.25,.1,0]]],
  ['Seco',[[.22,.5,1,.1,0,0],[.2,.55,1,.1,0,0],[.2,.5,1,.05,.05,0],[.12,.6,1,0,0,0],[.25,.6,1,0,0,0],[.25,.5,1,.05,0,0]]],
  ['Techno',[[.6,.45,1,.55,0,0],[.35,.65,1,.3,.1,0],[.35,.6,1,.25,.2,.1],[.15,.8,1,.1,0,0],[.4,.75,1,.15,.1,.2],[.45,.55,1,.3,0,0]]]];
const KP=['dc','tn','flt','drv','rev','dly'];
const PRE={[SUBI]:[['Sub sine',{w:'sine',dc:.6,br:.2,gl:0,flt:1,drv:0}],['Saw sucio',{w:'sawtooth',dc:.5,br:.6,gl:0,flt:.6,drv:.35}],['Pluck',{w:'triangle',dc:.25,br:.5,gl:0,flt:1,drv:.1}],['808 largo',{w:'sine',dc:.9,br:.15,gl:.4,flt:1,drv:.2}],['Glide',{w:'square',dc:.55,br:.4,gl:.8,flt:.7,drv:.2}]],
  [ACI]:[['Clásico',{w:'sawtooth',tn:.35,br:.6,gl:.5,dc:.35,flt:1,drv:.2}],['Squelch',{w:'square',tn:.3,br:.8,gl:.7,dc:.25,flt:1,drv:.3}],['Suave',{w:'sawtooth',tn:.5,br:.3,gl:.3,dc:.5,flt:1,drv:0}],['Duro',{w:'sawtooth',tn:.45,br:.5,gl:.8,dc:.2,flt:1,drv:.6}]],
  [STI]:[['Rave',{tn:.6,dc:.35,br:.4,flt:1,drv:.1,rev:.3,dly:.25}],['Seco corto',{tn:.5,dc:.15,br:.2,rev:.1,dly:0}],['Pad largo',{tn:.35,dc:.9,br:.5,rev:.5,dly:.2}],['Dub',{tn:.4,dc:.5,br:.3,rev:.3,dly:.4}]]};
function renderPresets(){const sub=MEL(S.ch),list=sub?PRE[S.ch]:KITS;
  $('#presetT').textContent=sub?'Presets · '+CH[S.ch][1]:'Kits de sonido';$('#presetN').textContent=sub?'este canal':'6 baterías';
  $('#presetRow').innerHTML=list.map((x,i)=>`<button type="button" class="pre" data-i="${i}">${x[0]}</button>`).join('');
  $('#presetNote').textContent=sub?'Cambia onda, filtro y envolvente de este canal. Ajusta a tu gusto con los mandos.':'Cambia tono, caída, filtro, drive y envíos de las 6 baterías a la vez. "Original" lo deja como al principio.'}
$('#presetRow').addEventListener('click',e=>{const b=e.target.closest('.pre');if(!b)return;const i=+b.dataset.i,ch=S.ch;
  if(MEL(ch)){const [n,o]=PRE[ch][i];Object.keys(o).forEach(k=>{if(k==='w'){if(ch===ACI)S.awave=o.w;else S.wave=o.w}else C[ch][k]=o[k]});flash('PRESET: '+n.toUpperCase())}
  else{const [n,v]=KITS[i];v.forEach((r,d)=>KP.forEach((k,j)=>{C[d][k]=r[j]}));flash('KIT: '+n.toUpperCase())}
  applyAll();queueWarm();renderCanal();audition();save()});
function renderCanal(){const c=C[S.ch],sub=MEL(S.ch);renderPresets();
  $('#canT').textContent='Canal · '+CH[S.ch][1];$('#canKn').innerHTML=(S.ch===ACI?KA:S.ch===STI?KB:sub?KS:KD).map(([k,l])=>kn('c_'+k,l,c[k])).join('');
  const sc=$('#scTog');sc.hidden=S.ch===0;sc.setAttribute('aria-pressed',!!c.sc);$('#subx').hidden=!sub;$('#smpx').hidden=sub;$('#smpN').textContent=(!sub&&SMPN[S.ch])||'Sintetizado';$('#smpX').disabled=sub||!SMP[S.ch];
  const wv=S.ch===ACI?S.awave:S.wave;$('#waves').hidden=S.ch===STI;$$('#waves button').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.w===wv);b.hidden=S.ch===ACI&&(b.dataset.w==='sine'||b.dataset.w==='triangle')});
  $('#oct').hidden=S.ch!==SUBI;$('#oct').setAttribute('aria-pressed',S.layer);$('#subxT').textContent=S.ch===SUBI?'Sub bass':S.ch===ACI?'Acid 303 · tonalidad':'Stab · tonalidad'}
const idb=()=>new Promise((res,rej)=>{try{const r=indexedDB.open('pocketsub',1);r.onupgradeneeded=()=>r.result.createObjectStore('smp');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}});
const idbDo=(mode,fn)=>idb().then(db=>new Promise((res,rej)=>{const tx=db.transaction('smp',mode),q=fn(tx.objectStore('smp'));tx.oncomplete=()=>res(q&&q.result);tx.onerror=()=>rej(tx.error)}));
async function renderKits(){const sel=$('#kitList');if(!sel)return;const prev=sel.value;let keys=[];try{keys=await idbDo('readonly',st=>st.getAllKeys())||[]}catch(e){}const names=keys.filter(k=>typeof k==='string'&&k.startsWith('kit:')).map(k=>k.slice(4)).sort((a,b)=>a.localeCompare(b,'es'));sel.replaceChildren(new Option(names.length?'Elige un kit':'Aún no hay kits',''));names.forEach(n=>sel.add(new Option(n,n)));sel.value=names.includes(prev)?prev:'';$('#kitLoad').disabled=!sel.value;$('#kitDel').disabled=!sel.value}
$('#kitList').addEventListener('change',()=>{$('#kitLoad').disabled=!$('#kitList').value;$('#kitDel').disabled=!$('#kitList').value;$('#kitName').value=$('#kitList').value});
$('#kitSave').addEventListener('click',async()=>{const name=$('#kitName').value.trim().slice(0,32);if(!name){flash('ESCRIBE UN NOMBRE');$('#kitName').focus();return}try{const smp=[];let total=0;for(let i=0;i<6;i++){const r=await idbDo('readonly',st=>st.get(i));if(r&&r.ab){total+=r.ab.byteLength;smp.push({name:r.name,ab:r.ab})}else smp.push(null)}if(total>24e6){flash('KIT DEMASIADO GRANDE · MÁX. 24 MB');return}const sound=C.slice(0,6).map(c=>({tn:c.tn,dc:c.dc,drv:c.drv}));await idbDo('readwrite',st=>st.put({name,sound,smp,date:Date.now()},'kit:'+name));await renderKits();$('#kitList').value=name;$('#kitLoad').disabled=false;$('#kitDel').disabled=false;flash('KIT GUARDADO')}catch(e){flash('NO HAY ESPACIO PARA GUARDAR EL KIT')}});
$('#kitLoad').addEventListener('click',async()=>{const name=$('#kitList').value;if(!name)return;if(S.play){flash('DETÉN PLAY PARA CAMBIAR KIT');return}try{const k=await idbDo('readonly',st=>st.get('kit:'+name));if(!k||!Array.isArray(k.sound)||k.sound.length!==6||!k.sound.every(x=>x&&typeof x==='object'))throw new Error('bad');const decoded=[];for(let i=0;i<6;i++){const sm=k.smp&&k.smp[i];if(sm&&sm.ab){const buf=await decodeAB(sm.ab);if(buf.duration>8.05)throw new Error('long');decoded.push({buf,name:sm.name||'Sample',ab:sm.ab})}else decoded.push(null)}const val=(x,d)=>Number.isFinite(+x)?+x:d;for(let i=0;i<6;i++){C[i].tn=clamp(val(k.sound[i].tn,.5),0,1);C[i].dc=clamp(val(k.sound[i].dc,.5),0,1);C[i].drv=clamp(val(k.sound[i].drv,0),0,1);const sm=decoded[i];if(sm){SMP[i]=sm.buf;SMPN[i]=sm.name;await idbDo('readwrite',st=>st.put({name:sm.name,ab:sm.ab},i))}else{SMP[i]=null;SMPN[i]='';await idbDo('readwrite',st=>st.delete(i))}}applyAll();queueWarm();save();renderCanal();flash('KIT APLICADO: '+name.toUpperCase().slice(0,18))}catch(e){flash('NO SE PUDO CARGAR EL KIT')}});
let kitDelArmed=false;$('#kitDel').addEventListener('click',async()=>{const b=$('#kitDel'),name=$('#kitList').value;if(!name)return;if(!kitDelArmed){kitDelArmed=true;b.textContent='¿Seguro?';setTimeout(()=>{kitDelArmed=false;b.textContent='Eliminar'},3000);return}try{await idbDo('readwrite',st=>st.delete('kit:'+name));kitDelArmed=false;await renderKits();$('#kitName').value='';flash('KIT ELIMINADO')}catch(e){flash('NO SE PUDO ELIMINAR')}});
function decodeAB(ab){const OC=window.OfflineAudioContext||window.webkitOfflineAudioContext,x=LIVE||new OC(1,1,48000);return new Promise((res,rej)=>{const p=x.decodeAudioData(ab.slice(0),res,rej);if(p&&p.then)p.then(res,rej)})}
async function setSmp(i,name,ab,keep){const b=await decodeAB(ab);if(b.duration>8.05)throw new Error('long');SMP[i]=b;SMPN[i]=name;if(keep)try{await idbDo('readwrite',st=>st.put({name,ab},i))}catch(e){}}
(async()=>{let any=false;for(let i=0;i<6;i++){try{const r=await idbDo('readonly',st=>st.get(i));if(r&&r.ab){await setSmp(i,r.name,r.ab,false);any=true}}catch(e){}}if(any&&S.tab==='canal')renderCanal();renderKits()})();
$('#smpL').addEventListener('click',()=>$('#smpF').click());
$('#smpF').addEventListener('change',async e=>{if(laneTgt){const id=laneTgt;laneTgt=null;return loadLane(id,e)}const f=e.target.files&&e.target.files[0];e.target.value='';const i=S.ch;if(!f||i>=SUBI)return;if(f.size>12e6){flash('ARCHIVO MUY GRANDE');return}
  try{await setSmp(i,f.name.replace(/\.[^.]+$/,'').slice(0,24),await f.arrayBuffer(),true);flash('SAMPLE EN '+CH[i][1]);renderCanal();audition()}catch(err){flash(err&&err.message==='long'?'MÁX. 8 SEGUNDOS':'AUDIO NO VÁLIDO')}});
$('#smpX').addEventListener('click',async()=>{const i=S.ch;if(i>=SUBI)return;SMP[i]=null;SMPN[i]='';try{await idbDo('readwrite',st=>st.delete(i))}catch(e){}renderCanal();queueWarm();flash('SAMPLE QUITADO')});
$('#scTog').addEventListener('click',()=>{C[S.ch].sc=C[S.ch].sc?0:1;renderCanal();save()});
$('#waves').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(S.ch===ACI)S.awave=b.dataset.w;else S.wave=b.dataset.w;renderCanal();audition();save()});
$('#oct').addEventListener('click',()=>{S.layer=!S.layer;renderCanal();save()});
const rs=$('#root'),ss=$('#scale');
NN.forEach((n,i)=>{const o=document.createElement('option');o.value=i;o.textContent=n+'1';rs.appendChild(o)});
Object.keys(SC).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=k;ss.appendChild(o)});
rs.addEventListener('change',()=>{S.root=+rs.value;renderNotes();updGrid();if(S.tab==='pads')renderPads();save()});
ss.addEventListener('change',()=>{S.scale=ss.value;S.subSel=0;renderNotes();updGrid();if(S.tab==='pads')renderPads();save()});

/* ---------- FX panel: cards + live mini graphs ---------- */
const pct=v=>Math.round(v*100)+'%';
const MSD={hum:0,swing:0,mdrive:.1,mcut:1,lim:.3,mvol:.8,mres:0,mhp:0,mmid:.5,mmf:.45,mair:.5,mwid:.5};
const FXDEF=[
 {id:'ms',n:'Master',ic:'🎚',c:'#9fb0c8',k:[['mcut','Low pass',v=>v>=.999?'Off':fmtF(Math.round(Math.min(20000,180*Math.pow(110,v))))],['mres','Resonancia LP',pct],['mhp','High pass',v=>v<=0?'Off':fmtF(Math.round(msHp(v)))],
   ['mmid','Medios',v=>{const g=msMg(v);return(g>0?'+':'')+g.toFixed(1)+' dB'}],['mmf','Frec. medios',v=>fmtF(msMf(v))],['mair','Brillo',v=>{const g=msAir(v);return(g>0?'+':'')+g.toFixed(1)+' dB'}],
   ['mwid','Ancho estéreo',v=>Math.round(msW(v)*100)+'%'],['mdrive','Drive',pct],['swing','Swing',pct],['hum','Humanizar',pct],['lim','Limitador',v=>'+'+(v*12).toFixed(1)+' dB'],['mvol','Volumen',v=>toDb(v*.9)]]},
 {id:'rev',n:'Reverb',ic:'🌫',c:'#a98bff',k:[['size','Tamaño',v=>(.3+v*2.2).toFixed(1)+' s'],['mix','Mezcla',pct],['pre','Pre-delay',v=>Math.round(2+v*100)+' ms'],['damp','Tono',v=>fmtF(Math.round(1500*Math.pow(14000/1500,v)))],['lo','Corte graves',v=>fmtF(Math.round(60*Math.pow(800/60,v)))]]},
 {id:'dly',n:'Delay',ic:'📡',c:'#4db8ff',seg:[['div',DIVS.map((d,i)=>[i,d[0]])]],tog:['pp','Ping-pong ↔'],k:[['fb','Feedback',pct],['mix','Mezcla',pct],['tone','Tono',v=>fmtF(Math.round(800*Math.pow(10,v)))]]},
 {id:'sc',n:'Sidechain',ic:'🦶',c:'#ff764d',k:[['amt','Cantidad',pct],['att','Ataque',v=>Math.round(1+v*30)+' ms'],['rel','Suelta',v=>Math.round((.04+v*.45)*1000)+' ms']],note:'El kick baja los canales marcados en Canal (el Sub viene marcado).'},
 {id:'cho',n:'Chorus / Flanger',ic:'🌀',c:'#4de0c8',seg:[['mode',[['cho','Chorus'],['fla','Flanger']]]],k:[['rate','Velocidad',v=>(.05*Math.pow(100,v)).toFixed(2)+' Hz'],['depth','Profundidad',pct],['fb','Feedback',pct],['mix','Mezcla',pct]]},
 {id:'flt',n:'Filtro LFO',ic:'〰️',c:'#ffd24d',seg:[['type',[['lowpass','LP'],['highpass','HP'],['bandpass','BP']]],['shape',[['sine','∿'],['triangle','⋀'],['square','⊓'],['saw','⩘']]],['div',FDIV.map((d,i)=>[i,d[0]])]],
   k:[['freq','Frecuencia',v=>fmtF(Math.round(60*Math.pow(300,v)))],['res','Resonancia',pct],['depth','LFO',v=>'±'+(v*3).toFixed(1)+' oct']]},
 {id:'cr',n:'Bitcrusher',ic:'👾',c:'#ff6ad5',k:[['bits','Bits',v=>crBits(v)+' bit'],['down','Reducir',v=>'÷'+crDown(v)],['mix','Mezcla',pct]]},
 {id:'cmp',n:'Compresor',ic:'🗜',c:'#b6e35a',k:[['thr','Umbral',v=>(-40+v*40).toFixed(0)+' dB'],['ratio','Ratio',v=>(1+v*19).toFixed(1)+':1'],['att','Ataque',v=>Math.round(1+v*100)+' ms'],['rel','Suelta',v=>Math.round((.03+v*.97)*1000)+' ms'],['mk','Ganancia',v=>'+'+(v*18).toFixed(1)+' dB']]}];
const FXI={};FXDEF.forEach(d=>{FXI[d.id]=d});
const fxObj=id=>id==='ms'?S:S[id],fxDef=(id,k)=>id==='ms'?MSD[k]:FXD[id][k];
let fxCol=null;const fxCv={};
function fxCard(d){const o=fxObj(d.id),on=d.id==='ms'||o.on;
  const segs=(d.seg||[]).map(([key,opts])=>`<div class="seg fxs" data-fx="${d.id}" data-key="${key}">${opts.map(([v,l])=>`<button data-v="${v}" aria-pressed="${String(o[key])===String(v)}">${l}</button>`).join('')}</div>`).join('');
  const tog=d.tog?`<button class="tg" data-fx="${d.id}" data-act="tog" data-key="${d.tog[0]}" aria-pressed="${!!o[d.tog[0]]}">${d.tog[1]}</button>`:'';
  const kn2=d.k.map(([key,l,f])=>`<div class="k"><label for="k_${d.id}_${key}">${l} <output id="o_${d.id}_${key}">${f(o[key])}</output></label><input id="k_${d.id}_${key}" data-fx="${d.id}" data-key="${key}" type="range" min="0" max="1000" value="${Math.round(o[key]*1000)}"></div>`).join('');
  return`<div class="fxc${on?' on':''}" id="fx_${d.id}" style="--c:${d.c}"><div class="fxh"><span class="fxi" aria-hidden="true">${d.ic}</span><h3>${d.n}</h3>${tog}${d.id==='ms'?'':`<button class="tg" data-fx="${d.id}" data-act="on" aria-pressed="${on}">${on?'On':'Off'}</button>`}</div>`+
    `<canvas class="fxg" id="g_${d.id}" aria-hidden="true"></canvas><details class="fxmore"><summary>Parámetros avanzados</summary><div class="fxparams">${segs}<div class="knobs">${kn2}</div>${d.note?`<p class="note">${d.note}</p>`:''}</div></details></div>`}
function renderFxNav(){$('#fxNav').innerHTML=FXDEF.map(d=>{const on=d.id==='ms'||fxObj(d.id).on;return`<button data-go="${d.id}" class="${on?'on':''}" style="--c:${d.c}"><i></i>${d.ic} ${d.n.split(' ')[0]}</button>`}).join('')}
function renderFx(){fxCol=null;$('#fxList').innerHTML=FXDEF.map(fxCard).join('');renderFxNav();FXDEF.forEach(d=>{fxCv[d.id]=null;drawFxG(d.id)})}
function rerenderCard(id){const el=$('#fx_'+id);if(!el)return;const open=!!el.querySelector('.fxmore')?.open;el.outerHTML=fxCard(FXI[id]);const next=$('#fx_'+id);if(next&&next.querySelector('.fxmore'))next.querySelector('.fxmore').open=open;fxCv[id]=null;renderFxNav();drawFxG(id)}
function fxColors(){if(fxCol)return fxCol;const cs=getComputedStyle(document.documentElement);return fxCol={fg:cs.getPropertyValue('--lcdfg').trim()||'#3ee6d0',bg:cs.getPropertyValue('--lcd').trim(),font:getComputedStyle(document.body).fontFamily}}
function fxCanvas(id){let o=fxCv[id];if(!o){const cv=$('#g_'+id);if(!cv)return null;const r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1,w=Math.round(r.width*d),h=Math.round(r.height*d);if(!w)return null;
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}o=fxCv[id]={cv,g:cv.getContext('2d'),W:w,H:h,d}}return o}
const fxSeed=n=>{const x=Math.sin(n*12.9898)*43758.5453;return x-Math.floor(x)};
function drawFxG(id){const C2=fxCanvas(id);if(!C2)return;const{g,W,H,d}=C2,k=fxColors(),col=FXI[id].c,o=fxObj(id),now=ctx?ctx.currentTime:performance.now()/1000;
  g.clearRect(0,0,W,H);g.lineJoin='round';g.font=`${9*d}px ${k.font}`;g.fillStyle=k.fg;g.globalAlpha=.55;
  const lab=(s,x,y)=>{g.globalAlpha=.6;g.fillStyle=k.fg;g.fillText(s,x,y);g.globalAlpha=1};
  if(id==='rev'){const span=3,pre=(.002+o.pre*.1)/span*W,len=(.3+o.size*2.2)/span*W,hh=(H-8)*(.35+o.mix*.65);
    g.globalAlpha=1;g.fillStyle=col;for(let x=0;x<len;x+=3*d){const r=x/len,a=Math.pow(1-r,2.4)*(.55+.45*fxSeed(x));g.globalAlpha=.25+.6*(1-r);g.fillRect(pre+x,H-4-hh*a,2*d,hh*a)}
    g.globalAlpha=1;g.fillStyle=k.fg;g.fillRect(2*d,H-4-(H-8),2*d,H-8);lab('pre '+Math.round(2+o.pre*100)+'ms',pre+6*d,12*d)}
  else if(id==='dly'){const dt=DIVS[o.div][1]*60/S.bpm/4,span=2.2,mid=o.pp?H/2:H-4,fb=o.fb*.85;g.globalAlpha=.3;g.fillStyle=k.fg;g.fillRect(0,mid,W,d);
    g.globalAlpha=1;g.fillStyle=k.fg;const hm=o.pp?H/2-6:H-10;g.fillRect(3*d,mid-hm,3*d,hm);
    for(let n=1;n<24;n++){const x=n*dt/span*W;if(x>W)break;const a=(.35+.65*o.mix)*Math.pow(fb,n-1);if(a<.02)break;const h=Math.min(1,a)*hm,up=!o.pp||n%2;g.fillStyle=col;g.globalAlpha=.9;g.fillRect(x,up?mid-h:mid,4*d,h)}
    g.globalAlpha=1;lab(o.pp?'L ↑  R ↓':Math.round(dt*1000)+' ms',W-60*d,12*d)}
  else if(id==='sc'){const beat=60/S.bpm,ta=.001+o.att*.03,tr=(.04+o.rel*.45)/3;g.strokeStyle=col;g.lineWidth=2*d;g.beginPath();
    for(let x=0;x<=W;x+=2*d){const t=(x/W)*beat*2%beat;let v=1-o.amt*(1-Math.exp(-t/ta));if(t>.015)v=1-(1-(1-o.amt*(1-Math.exp(-.015/ta))))*Math.exp(-(t-.015)/tr);const y=6+(1-v)*(H-12);x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
    if(S.play&&ctx){const ph=((now-nextT)/beat%2+2)%2/2;g.globalAlpha=.8;g.fillStyle=k.fg;g.fillRect(ph*W,0,2*d,H);g.globalAlpha=1}lab('-'+Math.round(o.amt*100)+'%',4*d,H-6*d)}
  else if(id==='cho'){const rate=.05*Math.pow(100,o.rate),A=(H/2-6)*(.2+o.depth*.8);g.lineWidth=2*d;
    [[col,1],[k.fg,-1]].forEach(([c,s],j)=>{g.strokeStyle=c;g.globalAlpha=j?.45:1;g.beginPath();for(let x=0;x<=W;x+=2*d){const y=H/2-s*A*Math.sin(x/W*Math.PI*4);x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()});
    const ph=((now-(M.lfoT0||0))*rate)%2,x=ph/2*W;g.globalAlpha=1;g.fillStyle=col;g.beginPath();g.arc(x,H/2-A*Math.sin(ph*Math.PI*2),4*d,0,7);g.fill();lab(rate.toFixed(2)+' Hz',W-60*d,12*d)}
  else if(id==='flt'&&fltN){const base=60*Math.pow(300,o.freq),rate=S.bpm/60/FDIV[o.div][1],oct=o.depth*3,ph=((now-(M.lfo2T0||0))*rate)%1;
    const sh=o.shape==='sine'?Math.sin(ph*2*Math.PI):o.shape==='triangle'?1-4*Math.abs(ph-.5):o.shape==='square'?(ph<.5?1:-1):2*ph-1,cur=clamp(base*Math.pow(2,o.on&&ctx?sh*oct:0),20,20000);
    fltN.type=o.type;fltN.Q.value=.5+o.res*14;const resp=f=>{fltN.frequency.value=f;fltN.getFrequencyResponse(FF,EM,EP);g.beginPath();for(let i=0;i<160;i++){const x=i/159*W,db=20*Math.log10(EM[i]||1e-6),y=clamp(H*.35-db*(H*.03),2,H-2);i?g.lineTo(x,y):g.moveTo(x,y)}};
    g.globalAlpha=.18;g.fillStyle=col;const x0=fx2(clamp(base/Math.pow(2,oct),20,20000),W),x1=fx2(clamp(base*Math.pow(2,oct),20,20000),W);g.fillRect(x0,0,x1-x0,H);
    g.globalAlpha=1;g.strokeStyle=col;g.lineWidth=2.2*d;resp(cur);g.stroke();lab(fmtF(Math.round(cur)),4*d,12*d)}
  else if(id==='cr'){const st=Math.max(1,Math.round(Math.pow(2,(crBits(o.bits)-2)/2))),dn=crDown(o.down),N=240;g.strokeStyle=k.fg;g.globalAlpha=.35;g.lineWidth=1.5*d;g.beginPath();
    for(let i=0;i<=N;i++){const x=i/N*W,y=H/2-Math.sin(i/N*Math.PI*2)*(H/2-6);i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
    g.globalAlpha=1;g.strokeStyle=col;g.lineWidth=2*d;g.beginPath();let h=0;for(let i=0;i<=N;i++){if(i%dn===0)h=Math.round(Math.sin(i/N*Math.PI*2)*st)/st;const x=i/N*W,y=H/2-h*(H/2-6);i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}
  else if(id==='cmp'){const thr=-40+o.thr*40,ra=1+o.ratio*19,mk=o.mk*18,X=v=>(v+48)/48*(W-30*d),Y=v=>H-4-(v+48)/48*(H-8);
    g.strokeStyle=k.fg;g.globalAlpha=.3;g.lineWidth=d;g.beginPath();g.moveTo(X(-48),Y(-48));g.lineTo(X(0),Y(0));g.stroke();
    g.globalAlpha=1;g.strokeStyle=col;g.lineWidth=2.2*d;g.beginPath();for(let i=-48;i<=0;i+=1){const out=Math.min(18,(i>thr?thr+(i-thr)/ra:i)+mk);i>-48?g.lineTo(X(i),Y(Math.min(0,out))):g.moveTo(X(i),Y(Math.min(0,out)))}g.stroke();
    const gr=ctx&&M.cmp&&o.on?Math.min(24,-M.cmp.reduction):0;g.fillStyle=k.fg;g.globalAlpha=.2;g.fillRect(W-18*d,4,12*d,H-8);g.globalAlpha=1;g.fillStyle=col;g.fillRect(W-18*d,4,12*d,(H-8)*gr/24);lab('GR '+gr.toFixed(1),W-80*d,H-6*d)}
  else if(id==='ms'&&msN){const msY=db=>clamp(H*.55-db*(H*.03),2,H-2);g.globalAlpha=.25;g.fillStyle=k.fg;g.fillRect(0,msY(0),W,d);
    msN.lp.frequency.value=Math.min(20000,180*Math.pow(110,o.mcut));msN.lp.Q.value=.7+o.mres*14;msN.hp.frequency.value=msHp(o.mhp);msN.mid.frequency.value=msMf(o.mmf);msN.mid.gain.value=msMg(o.mmid);msN.air.gain.value=msAir(o.mair);
    const db=new Float32Array(160);[msN.lp,msN.hp,msN.mid,msN.air].forEach(n=>{n.getFrequencyResponse(FF,EM,EP);for(let i=0;i<160;i++)db[i]+=20*Math.log10(EM[i]||1e-6)});
    g.beginPath();for(let i=0;i<160;i++){const x=i/159*W,y=msY(db[i]);i?g.lineTo(x,y):g.moveTo(x,y)}g.globalAlpha=1;g.strokeStyle=col;g.lineWidth=2.2*d;g.stroke();g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.globalAlpha=.15;g.fillStyle=col;g.fill();
    let pk=0;if(ctx&&M.ana)pk=peak(M.ana);msPk=Math.max(pk,msPk*.8);const lv=msPk>0?20*Math.log10(msPk):-60,w=clamp((lv+48)/48,0,1)*(W-8*d);
    g.globalAlpha=.25;g.fillStyle=k.fg;g.fillRect(4*d,4*d,W-8*d,5*d);g.globalAlpha=1;g.fillStyle=lv>-1?'#e5484d':col;g.fillRect(4*d,4*d,w,5*d);lab((msPk>0?lv.toFixed(1):'-∞')+' dB',4*d,22*d);const ml=$('#msLvl');if(ml){ml.style.transform='scaleX('+(w/(W-8*d)).toFixed(3)+')';ml.classList.toggle('hot',lv>-1)}}
  else if(id==='ms'){let pk=0;if(ctx&&M.ana)pk=peak(M.ana);msPk=Math.max(pk,msPk*.8);const db=msPk>0?20*Math.log10(msPk):-60,w=clamp((db+48)/48,0,1)*(W-8*d);
    g.globalAlpha=.2;g.fillStyle=k.fg;g.fillRect(4*d,H/2-8*d,W-8*d,16*d);g.globalAlpha=1;g.fillStyle=db>-1?'#e5484d':col;g.fillRect(4*d,H/2-8*d,w,16*d);lab('SALIDA '+(msPk>0?db.toFixed(1):'-∞')+' dB',4*d,14*d)}
  g.globalAlpha=1}
let msPk=0,fltN=null,msN=null;try{const OC=window.OfflineAudioContext||window.webkitOfflineAudioContext,oc=new OC(1,128,44100);fltN=oc.createBiquadFilter();const B=t=>{const f=oc.createBiquadFilter();f.type=t;return f};msN={lp:B('lowpass'),hp:B('highpass'),mid:B('peaking'),air:B('highshelf')};msN.hp.Q.value=.7;msN.mid.Q.value=.9;msN.air.frequency.value=9000}catch(e){}
const FXLIVE=['sc','cho','flt','cmp','ms'];
function drawFxLive(){FXLIVE.forEach(drawFxG)}
$('#fxNav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const el=$('#fx_'+b.dataset.go);if(el){const det=el.querySelector('.fxmore');if(det)det.open=true;el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}});
$('#fxList').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const box=b.closest('[data-fx]')||b,id=box.dataset.fx,o=fxObj(id);if(!o)return;
  if(b.dataset.act==='on')o.on=!o.on;else if(b.dataset.act==='tog')o[b.dataset.key]=!o[b.dataset.key];
  else if(box.classList.contains('fxs')){const key=box.dataset.key,v=b.dataset.v;o[key]=typeof FXD[id][key]==='number'?+v:v}else return;
  applyMaster();rerenderCard(id);save()});
function setFxVal(id,key,v){const o=fxObj(id);o[key]=v;const f=FXI[id].k.find(x=>x[0]===key),txt=f[2](v);
  [['k_','o_'],['b_','ob_']].forEach(([ki,oi])=>{const inp=$('#'+ki+id+'_'+key),out=$('#'+oi+id+'_'+key);if(inp&&+inp.value!==Math.round(v*1000))inp.value=Math.round(v*1000);if(out)out.textContent=txt});
  applyMaster();if(key==='mvol')updMixUI();else updDock();drawFxG(id);saveSoon()}
$('#fxList').addEventListener('input',e=>{const el=e.target;if(!el.dataset.key||!el.dataset.fx)return;setFxVal(el.dataset.fx,el.dataset.key,el.value/1000)});
const MSB=[['mvol','Vol'],['mcut','LP'],['mhp','HP']];
function renderMsBar(){const d=FXI.ms;$('#msBar').innerHTML='<span class="mt"><b>🎚</b>MST</span>'+MSB.map(([key,l])=>{const f=d.k.find(x=>x[0]===key)[2];
  return`<div class="k"><label for="b_ms_${key}">${l} <output id="ob_ms_${key}">${f(S[key])}</output></label><input id="b_ms_${key}" data-key="${key}" type="range" min="0" max="1000" value="${Math.round(S[key]*1000)}"></div>`}).join('')+'<span class="lvl" aria-hidden="true"><i id="msLvl"></i></span>'}
$('#msBar').addEventListener('input',e=>{const el=e.target;if(el.dataset.key)setFxVal('ms',el.dataset.key,el.value/1000)});
(()=>{let last=0,lastEl=null;$('#msBar').addEventListener('pointerup',e=>{const el=e.target;if(el.type!=='range')return;const n=Date.now();
  if(lastEl===el&&n-last<300){setFxVal('ms',el.dataset.key,MSD[el.dataset.key]);last=0}else{last=n;lastEl=el}})})();

$('#fxList').addEventListener('change',e=>{if(e.target.dataset.fx==='rev'&&e.target.dataset.key==='size')setIR()});
(()=>{let last=0,lastEl=null;$('#fxList').addEventListener('pointerup',e=>{const el=e.target;if(el.type!=='range'||!el.dataset.fx)return;const n=Date.now();
  if(lastEl===el&&n-last<300){const id=el.dataset.fx,key=el.dataset.key,v=fxDef(id,key);fxObj(id)[key]=v;el.value=Math.round(v*1000);el.dispatchEvent(new Event('input',{bubbles:true}));if(key==='size')setIR();last=0}else{last=n;lastEl=el}})})();
window.addEventListener('resize',()=>{for(const k in fxCv)fxCv[k]=null;if(S.tab==='fx')FXDEF.forEach(d=>drawFxG(d.id))});
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.k;if(!k||!K[k])return;K[k](e.target.value/100);const o=$('#o_'+k);if(o)o.textContent=e.target.value;saveSoon()});

/* ---------- skins ---------- */
function skin(n){S.skin=n;if(n==='auto')document.documentElement.removeAttribute('data-skin');else document.documentElement.setAttribute('data-skin',n);
  $$('#skins button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===n));eqCol=null;fxCol=null;if(S.tab==='fx')FXDEF.forEach(d=>drawFxG(d.id));readCols();drawLcd()}
SKINS.forEach(s=>{const b=document.createElement('button');b.className='sk';b.dataset.k=s[0];b.textContent=s[1];b.addEventListener('click',()=>{skin(s[0]);save()});$('#skins').appendChild(b)});

/* ---------- visuals, style, stage, undo, iOS ---------- */
const cv=$('#scope'),cx=cv.getContext('2d'),tb=new Uint8Array(2048),fbin=new Uint8Array(1024),cols={fg:'#43e3f2',led:'#22d3ee',font:'monospace'};
function readCols(){const cs=getComputedStyle(document.documentElement);cols.fg=cs.getPropertyValue('--lcdfg').trim()||cols.fg;cols.led=cs.getPropertyValue('--led').trim()||cols.led;cols.font=getComputedStyle(cv).fontFamily||'monospace'}
let cvDirty=true;function fit(){if(!cvDirty)return;cvDirty=false;const r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1,w=Math.round(r.width*d),h=Math.round(r.height*d);if(w&&(cv.width!==w||cv.height!==h)){cv.width=w;cv.height=h}}
const lcdPk=new Float32Array(48);
function drawLcd(){if(S.lcdv==='info')return;fit();const W=cv.width,H=cv.height;if(!W)return;cx.clearRect(0,0,W,H);const d=window.devicePixelRatio||1;
  cx.fillStyle=cols.fg;cx.globalAlpha=.08;for(let i=1;i<8;i++)cx.fillRect(Math.round(i*W/8),0,1,H);for(let i=1;i<4;i++)cx.fillRect(0,Math.round(i*H/4),W,1);cx.globalAlpha=1;
  if(S.lcdv==='wave'){cx.globalAlpha=.3;cx.fillRect(0,Math.round(H/2),W,1);cx.globalAlpha=1;
    const lw=Math.max(1.5,H/30);cx.strokeStyle=cols.fg;cx.lineJoin='round';cx.beginPath();
    if(ctx){M.ana.getByteTimeDomainData(tb);let s=0;for(let i=1;i<1024;i++){if(tb[i-1]<128&&tb[i]>=128){s=i;break}}
      for(let i=0;i<1024;i+=2){const x=i/1023*W,y=H/2-(tb[s+i]-128)/128*H*.46;i?cx.lineTo(x,y):cx.moveTo(x,y)}}
    else{cx.moveTo(0,H/2);cx.lineTo(W,H/2)}cx.globalAlpha=.22;cx.lineWidth=lw*3.2;cx.stroke();cx.globalAlpha=1;cx.lineWidth=lw;cx.stroke()}
  else{const B=40,bw=W/B,ny=ctx?ctx.sampleRate/2:22050,lab=10*d;if(ctx)M.ana.getByteFrequencyData(fbin);
    const gr=cx.createLinearGradient(0,H,0,0);gr.addColorStop(0,cols.led);gr.addColorStop(1,cols.fg);
    cx.globalAlpha=.1;cx.fillStyle=cols.led;cx.fillRect(0,0,Math.log(120/30)/Math.log(16000/30)*W,H-lab);cx.globalAlpha=1;
    for(let b=0;b<B;b++){const f0=30*Math.pow(16000/30,b/B),f1=30*Math.pow(16000/30,(b+1)/B),i0=Math.floor(f0/ny*1024),i1=Math.max(i0+1,Math.ceil(f1/ny*1024));
      let m=0;if(ctx)for(let i=i0;i<i1&&i<1024;i++)m=Math.max(m,fbin[i]);
      const v=m/255,hh=H-lab-2,h=Math.max(1,v*v*hh);lcdPk[b]=Math.max(v*v,lcdPk[b]-.024);
      cx.fillStyle=gr;cx.globalAlpha=.9;cx.fillRect(b*bw+1,H-lab-h,Math.max(1,bw-2),h);
      cx.globalAlpha=1;cx.fillStyle=cols.fg;cx.fillRect(b*bw+1,H-lab-lcdPk[b]*hh-2*d,Math.max(1,bw-2),1.5*d)}
    cx.font=`${8*d}px ${cols.font}`;cx.globalAlpha=.6;cx.fillStyle=cols.fg;
    [[100,'100'],[1000,'1k'],[10000,'10k']].forEach(([f,l])=>{const x=Math.log(f/30)/Math.log(16000/30)*W;cx.fillText(l,Math.min(x+2*d,W-18*d),H-2*d)});cx.globalAlpha=1}}
const LV=[['info',''],['wave','ONDA'],['spec','ESPECTRO · 30 Hz – 16 kHz']];
function setLcd(v){cvDirty=true;if(!LV.some(x=>x[0]===v))v='info';S.lcdv=v;$('#lcd').dataset.v=v;$('#md').textContent=LV.find(x=>x[0]===v)[1];drawLcd();kick()}
const lcdNext=()=>{const i=LV.findIndex(x=>x[0]===S.lcdv);setLcd(LV[(i+1)%3][0]);saveSoon()};
$('#lcd').addEventListener('click',lcdNext);
$('#lcd').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();lcdNext()}});
window.addEventListener('resize',()=>{cvDirty=true;drawLcd()});
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{readCols();drawLcd()})}catch(e){}

function setStyle(n){if(n!=='hw'&&n!=='abl')n='hw';S.style=n;document.documentElement.setAttribute('data-style',n);
  $$('#styles [data-st]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.st===n));readCols()}
$$('#styles [data-st]').forEach(b=>b.addEventListener('click',()=>{setStyle(b.dataset.st);save()}));
let wl=null;
function setStage(on){S.stage=on;const de=document.documentElement;
  if(on){de.setAttribute('data-stage','');showTab('seq');
    try{const p=de.requestFullscreen&&de.requestFullscreen();if(p&&p.catch)p.catch(()=>{})}catch(e){}
    reqWL()}
  else{de.removeAttribute('data-stage');
    try{if(document.fullscreenElement){const p=document.exitFullscreen();if(p&&p.catch)p.catch(()=>{})}}catch(e){}
    try{if(wl)wl.release()}catch(e){}wl=null}
  $('#stage').setAttribute('aria-pressed',on);setTimeout(()=>{cvDirty=true;drawLcd()},80)}
$('#stage').addEventListener('click',()=>setStage(!S.stage));
$('#stageX').addEventListener('click',()=>setStage(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.stage)setStage(false)});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&S.stage)setStage(false)});

const UNDO=[],REDO=[],HMAX=100;
const hBtn=()=>{$('#undo').disabled=!UNDO.length;$('#redo').disabled=!REDO.length};
function snap(){UNDO.push(JSON.stringify(P));if(UNDO.length>HMAX)UNDO.shift();REDO.length=0;hBtn()}
function hGo(from,to,msg){if(!from.length)return;to.push(JSON.stringify(P));P=JSON.parse(from.pop());P.forEach(fixP);hBtn();flash(msg);upd();save()}
$('#undo').addEventListener('click',()=>hGo(UNDO,REDO,'DESHECHO'));
$('#redo').addEventListener('click',()=>hGo(REDO,UNDO,'REHECHO'));
document.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey)||e.altKey||e.key.toLowerCase()!=='z')return;const t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)&&t.type!=='range')return;
  e.preventDefault();e.shiftKey?hGo(REDO,UNDO,'REHECHO'):hGo(UNDO,REDO,'DESHECHO')});

function iosFix(){try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
  try{const n=800,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=(o,s)=>{for(let i=0;i<s.length;i++)b[o+i]=s.charCodeAt(i)};
    w(0,'RIFF');v.setUint32(4,36+n,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
    v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,'data');v.setUint32(40,n,true);b.fill(128,44);
    let s='';b.forEach(x=>{s+=String.fromCharCode(x)});const a=new Audio('data:audio/wav;base64,'+btoa(s));a.loop=true;a.setAttribute('playsinline','');
    const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}

/* ---------- EQ pro: hasta 8 bandas tipo Pro-Q (campana, shelf, cortes hasta 96 dB/oct, notch) ---------- */
let eqTgt=0,eqBand=0;
const eqObj=()=>eqTgt<NCH?C[eqTgt]:S.meq;
const EQMAXB=8,FMIN=10,FMAX=24000,EQR=24,EQFS=48000;
const BCOL=['#ff764d','#ffd24d','#4de0c8','#4db8ff','#c58bff','#ff7ac8','#9be15d','#ffa94d'];
const EQC={bell:'peaking',ls:'lowshelf',hs:'highshelf',hp:'highpass',lp:'lowpass',nt:'notch'};
const EQN={bell:['Campana','🔔'],ls:['Shelf grave','🔈'],hs:['Shelf agudo','✨'],hp:['Corte grave','⛰'],lp:['Corte agudo','🪽'],nt:['Notch','🎯']};
const isCut=t=>t==='hp'||t==='lp',hasG=t=>t==='bell'||t==='ls'||t==='hs',hasQ=t=>t==='bell'||t==='nt';
function eqbOf(o){if(!Array.isArray(o.eqb)){const a=[];EQB.forEach(b=>{const g=gv(o,b.g,0);if(g)a.push({on:1,t:b.t==='lowshelf'?'ls':b.t==='highshelf'?'hs':'bell',f:gv(o,b.f,b.df),g,q:1.1,s:24})});o.eqb=a}return o.eqb}
const bwQ=n=>{const N=2*n,a=[];for(let k=1;k<=n;k++)a.push(1/(2*Math.cos(Math.PI*(2*k-1)/(2*N))));return a};
function mkEq(x){x=x||ctx;const e={x,i:x.createGain(),o:x.createGain(),sig:'',ns:[]};e.i.connect(e.o);return e}
function eqBuild(e,list){try{e.i.disconnect()}catch(_){}e.ns.forEach(a=>a.forEach(n=>{try{n.disconnect()}catch(_){}}));
  e.ns=list.map(b=>{const T=EQC[b.t];if(isCut(b.t))return bwQ(b.s/12).map(q=>{const n=e.x.createBiquadFilter();n.type=T;n.Q.value=20*Math.log10(q);return n});
    const n=e.x.createBiquadFilter();n.type=T;return[n]});
  let prev=e.i;e.ns.forEach(a=>a.forEach(n=>{prev.connect(n);prev=n}));prev.connect(e.o)}
let eqDefaultOn=(()=>{try{return localStorage.getItem('pulsoEqDefaultOn')!=='0'}catch(e){return true}})();
function setEq(e,o,t){const list=eqbOf(o).filter(b=>b.on&&eqDefaultOn),sig=(eqDefaultOn?'1':'0')+list.map(b=>b.t+(isCut(b.t)?b.s:'')).join(),rb=sig!==e.sig;if(rb){e.sig=sig;eqBuild(e,list)}
  const mx=e.x.sampleRate*.45;list.forEach((b,k)=>{const f=clamp(b.f,FMIN,mx);e.ns[k].forEach(n=>{if(rb)n.frequency.value=f;else n.frequency.setTargetAtTime(f,t,.02);
    if(hasG(b.t)){if(rb)n.gain.value=b.g;else n.gain.setTargetAtTime(b.g,t,.02)}
    if(hasQ(b.t)){if(rb)n.Q.value=b.q;else n.Q.setTargetAtTime(b.q,t,.02)}})})}
function applyCh(i){if(!ctx)return;const c=chs[i],p=C[i],t=ctx.currentTime,any=C.some(x=>x.solo);setEq(c.eq,p,t);
  if(c._drv!==p.drv){c._drv=p.drv;setShape(c.sh,p.drv)}c.lp.frequency.setTargetAtTime(180*Math.pow(110,p.flt),t,.02);c.vol.gain.setTargetAtTime(p.vol,t,.02);
  if(c.pan.pan)c.pan.pan.setTargetAtTime(i===SUBI?0:p.pan,t,.02);c.rs.gain.setTargetAtTime(p.rev,t,.02);c.ds.gain.setTargetAtTime(p.dly,t,.02);
  c.mg.gain.setTargetAtTime((p.mute||(any&&!p.solo))?0:1,t,.01)}
/* respuesta en frecuencia calculada en JS (RBJ) para dibujar la curva */
function bqCo(T,f,g,Q){const w=2*Math.PI*f/EQFS,c=Math.cos(w),s=Math.sin(w),A=Math.pow(10,g/40);let b0,b1,b2,a0,a1,a2,al;
  if(T==='lowshelf'||T==='highshelf'){al=s/2*Math.SQRT2;const sq=2*Math.sqrt(A)*al;
    if(T==='lowshelf'){b0=A*((A+1)-(A-1)*c+sq);b1=2*A*((A-1)-(A+1)*c);b2=A*((A+1)-(A-1)*c-sq);a0=(A+1)+(A-1)*c+sq;a1=-2*((A-1)+(A+1)*c);a2=(A+1)+(A-1)*c-sq}
    else{b0=A*((A+1)+(A-1)*c+sq);b1=-2*A*((A-1)+(A+1)*c);b2=A*((A+1)+(A-1)*c-sq);a0=(A+1)-(A-1)*c+sq;a1=2*((A-1)-(A+1)*c);a2=(A+1)-(A-1)*c-sq}}
  else{al=s/(2*Q);
    if(T==='peaking'){b0=1+al*A;b1=-2*c;b2=1-al*A;a0=1+al/A;a1=-2*c;a2=1-al/A}
    else if(T==='notch'){b0=1;b1=-2*c;b2=1;a0=1+al;a1=-2*c;a2=1-al}
    else if(T==='lowpass'){b0=(1-c)/2;b1=1-c;b2=b0;a0=1+al;a1=-2*c;a2=1-al}
    else{b0=(1+c)/2;b1=-(1+c);b2=b0;a0=1+al;a1=-2*c;a2=1-al}}
  return[b0/a0,b1/a0,b2/a0,a1/a0,a2/a0]}
function bqDb(co,fr){const w=2*Math.PI*fr/EQFS,c1=Math.cos(w),s1=Math.sin(w),c2=Math.cos(2*w),s2=Math.sin(2*w),nr=co[0]+co[1]*c1+co[2]*c2,ni=-(co[1]*s1+co[2]*s2),dr=1+co[3]*c1+co[4]*c2,di=-(co[3]*s1+co[4]*s2);return 10*Math.log10((nr*nr+ni*ni)/(dr*dr+di*di)+1e-30)}
const bandCos=b=>isCut(b.t)?bwQ(b.s/12).map(q=>bqCo(EQC[b.t],b.f,0,q)):[bqCo(EQC[b.t],b.f,hasG(b.t)?b.g:0,b.q)];
const FF=new Float32Array(160).map((_,i)=>20*Math.pow(1000,i/159)),EM=new Float32Array(160),EP=new Float32Array(160);
const NP=220,EF=new Float32Array(NP).map((_,i)=>FMIN*Math.pow(FMAX/FMIN,i/(NP-1)));
const fx2=(f,W)=>Math.log(f/FMIN)/Math.log(FMAX/FMIN)*W,x2f=(x,W)=>FMIN*Math.pow(FMAX/FMIN,clamp(x/W,0,1)),g2y=(g,H)=>H/2-g/EQR*(H/2-8);
const fmtF=f=>f>=1000?(f/1000).toFixed(f>=10000?1:2).replace(/\.?0+$/,'')+' kHz':Math.round(f)+' Hz',fmtG=g=>(g>0?'+':'')+(+g).toFixed(1)+' dB';
const ecv=$('#eqc'),ecx=ecv.getContext('2d');
let eqCol=null,eqDirty=true;const SPF=new Float32Array(1024);
function eqColor(){if(eqCol)return eqCol;const cs=getComputedStyle(document.documentElement);return eqCol={c:eqTgt<NCH?CHC[eqTgt]:cs.getPropertyValue('--lcdfg').trim(),fg:cs.getPropertyValue('--lcdfg').trim(),bg:cs.getPropertyValue('--lcd').trim(),font:getComputedStyle(document.body).fontFamily}}
function drawSpec(W,H,col,d){if(!ctx)return;const a=eqTgt<NCH?chs[eqTgt].ana:M.ana;if(!a)return;a.getFloatFrequencyData(SPF);const ny=ctx.sampleRate/2,N=SPF.length,step=Math.max(2,Math.round(3*d));
  ecx.beginPath();ecx.moveTo(0,H);for(let x=0;x<=W;x+=step){const f=x2f(x,W),b=f/ny*N,i=Math.floor(b),fr=b-i,v0=SPF[Math.min(i,N-1)],v1=SPF[Math.min(i+1,N-1)];
    let db=v0+(v1-v0)*fr;if(!isFinite(db))db=-120;const y=H-clamp((db+100)/80,0,1)*(H-6);ecx.lineTo(x,y)}ecx.lineTo(W,H);ecx.closePath();
  ecx.globalAlpha=.28;ecx.fillStyle=col.c;ecx.fill();ecx.globalAlpha=.55;ecx.lineWidth=1.2*d;ecx.strokeStyle=col.fg;ecx.stroke();ecx.globalAlpha=1}
const hY=(b,H)=>g2y(hasG(b.t)?b.g:0,H);
function eqHandles(W,H){return eqbOf(eqObj()).map((b,i)=>({x:fx2(b.f,W),y:hY(b,H),i}))}
function curveOf(list){const db=new Float32Array(NP);list.forEach(b=>{if(!b.on)return;bandCos(b).forEach(co=>{for(let i=0;i<NP;i++)db[i]+=bqDb(co,EF[i])})});return db}
function drawEq(){const d=window.devicePixelRatio||1;if(eqDirty){const r=ecv.getBoundingClientRect(),w=Math.round(r.width*d),h=Math.round(r.height*d);if(!w)return;eqDirty=false;if(ecv.width!==w||ecv.height!==h){ecv.width=w;ecv.height=h}}
  const W=ecv.width,H=ecv.height;if(!W)return;const L=eqbOf(eqObj()),k=eqColor();ecx.clearRect(0,0,W,H);drawSpec(W,H,k,d);
  ecx.font=`${10*d}px ${k.font}`;ecx.lineWidth=d;
  [[20,'20'],[50,'50'],[100,'100'],[200,'200'],[500,'500'],[1000,'1k'],[2000,'2k'],[5000,'5k'],[10000,'10k'],[20000,'20k']].forEach(([f,l])=>{const x=fx2(f,W);ecx.globalAlpha=/^(100|1k|10k)$/.test(l)?.22:.1;ecx.fillStyle=k.fg;ecx.fillRect(x,0,d,H);ecx.globalAlpha=.55;ecx.fillText(l,x+3*d,H-4*d)});
  [-24,-12,0,12,24].forEach(g=>{const y=g2y(g,H);ecx.globalAlpha=g?.12:.35;ecx.fillStyle=k.fg;ecx.fillRect(0,y,W,d);if(g){ecx.globalAlpha=.5;ecx.fillText((g>0?'+':'')+g,3*d,y-2*d)}});
  ecx.globalAlpha=1;
  const sel=L[eqBand];if(sel&&sel.on){const bd=curveOf([sel]);ecx.beginPath();ecx.moveTo(0,H/2);for(let i=0;i<NP;i++)ecx.lineTo(i/(NP-1)*W,g2y(clamp(bd[i],-EQR,EQR),H));ecx.lineTo(W,H/2);ecx.closePath();ecx.globalAlpha=.3;ecx.fillStyle=BCOL[eqBand];ecx.fill();ecx.globalAlpha=1}
  const db=curveOf(L);ecx.beginPath();for(let i=0;i<NP;i++){const x=i/(NP-1)*W,y=g2y(clamp(db[i],-EQR,EQR),H);i?ecx.lineTo(x,y):ecx.moveTo(x,y)}
  ecx.strokeStyle=k.c;ecx.lineWidth=2.5*d;ecx.stroke();
  ecx.textAlign='center';ecx.textBaseline='middle';ecx.font=`bold ${9*d}px ${k.font}`;
  eqHandles(W,H).forEach(h=>{const b=L[h.i],on=b.on,s=h.i===eqBand,r=(s?11:8)*d;ecx.globalAlpha=on?1:.35;ecx.beginPath();ecx.arc(h.x,h.y,r,0,7);ecx.fillStyle=BCOL[h.i];ecx.fill();
    ecx.lineWidth=(s?3:1.5)*d;ecx.strokeStyle=s?k.fg:k.bg;ecx.stroke();ecx.fillStyle='#0b0f17';ecx.fillText(h.i+1,h.x,h.y+.5*d)});
  ecx.globalAlpha=1;ecx.textAlign='start';ecx.textBaseline='alphabetic'}
const eqMod=o=>eqbOf(o).some(b=>b.on);
const f2s=f=>Math.round(Math.log(f/FMIN)/Math.log(FMAX/FMIN)*1000),s2f=s=>FMIN*Math.pow(FMAX/FMIN,s/1000),q2s=q=>Math.round(Math.log(q/.1)/Math.log(180)*100),s2q=s=>.1*Math.pow(180,s/100);
function renderBand(){const o=eqObj(),L=eqbOf(o);if(eqBand>=L.length)eqBand=L.length-1;const b=L[eqBand],has=!!b;
  $('#eqB').innerHTML=L.map((x,i)=>`<button data-b="${i}" style="--c:${BCOL[i]}" aria-pressed="${i===eqBand}" aria-label="Banda ${i+1}: ${EQN[x.t][0]}"><span>${i+1}</span><small>${x.on?EQN[x.t][1]:'⏻'}</small></button>`).join('')+(L.length<EQMAXB?`<button data-add="1" aria-label="Añadir banda" style="--c:var(--on)"><span>＋</span></button>`:'');
  $('#eqBn').textContent=has?(eqBand+1)+' · '+EQN[b.t][0]:'— toca ＋ o doble toque en la curva';
  $('#eqCtl').hidden=!has;if(!has)return;
  $('#eqTy').innerHTML=Object.keys(EQN).map(t=>`<button data-t="${t}" aria-pressed="${b.t===t}" title="${EQN[t][0]}">${EQN[t][1]}</button>`).join('');
  $('#eqSl').hidden=!isCut(b.t);$('#eqSl').innerHTML=[12,24,48,96].map(s=>`<button data-s="${s}" aria-pressed="${b.s===s}">${s} dB/oct</button>`).join('');
  $('#eqOn').setAttribute('aria-pressed',!!b.on);$('#eqOn').textContent=b.on?'ON':'OFF';
  $('#kg').hidden=!hasG(b.t);$('#kq').hidden=!hasQ(b.t);
  $('#eq_f').value=f2s(b.f);$('#eo_f').textContent=fmtF(b.f);$('#eq_g').value=b.g;$('#eo_g').textContent=fmtG(b.g);$('#eq_q').value=q2s(b.q);$('#eo_q').textContent=(+b.q).toFixed(2)}
function renderEq(){const b=CH.map((c,i)=>[c[1],CHC[i],C[i]]).concat([['MST','#9fb0c8',S.meq]]);
  $('#eqT').innerHTML=b.map(([l,c,o],i)=>`<button data-i="${i}" style="--c:${c}" class="${eqMod(o)?'mod':''}" aria-pressed="${eqTgt===i}">${l}</button>`).join('');
  renderBand();drawEq()}
function eqApply(){if(eqTgt<NCH)applyCh(eqTgt);else applyMaster();const bt=$('#eqT [data-i="'+eqTgt+'"]');if(bt)bt.classList.toggle('mod',eqMod(eqObj()));drawEq();saveSoon()}
function setBand(i,p){const b=eqbOf(eqObj())[i];if(!b)return;if(p.f!=null)b.f=clamp(+p.f,FMIN,FMAX);if(p.g!=null)b.g=clamp(Math.round(p.g*2)/2,-EQR,EQR);if(p.q!=null)b.q=clamp(+p.q,.1,18);if(p.s!=null)b.s=p.s;if(p.on!=null)b.on=p.on;if(p.t!=null){b.t=p.t;if(isCut(p.t)&&!b.s)b.s=24}
  eqApply();if(i===eqBand)renderBand()}
function addBand(f,g,t){const L=eqbOf(eqObj());if(L.length>=EQMAXB){flash('MAX 8 BANDAS');return}
  t=t||(f<40?'hp':f>14000?'lp':'bell');L.push({on:1,t,f:clamp(f,FMIN,FMAX),g:hasG(t)?clamp(Math.round((g||0)*2)/2,-EQR,EQR):0,q:1.1,s:t==='hp'||t==='lp'?24:24});eqBand=L.length-1;eqApply();renderBand()}
function delBand(){const L=eqbOf(eqObj());if(eqBand<0||!L[eqBand])return;L.splice(eqBand,1);eqBand=Math.min(eqBand,L.length-1);eqApply();renderBand()}
$('#eqT').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;eqTgt=+b.dataset.i;eqCol=null;eqBand=0;renderEq()});
$('#eqB').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.add){addBand(1000,0,'bell');return}eqBand=+b.dataset.b;renderBand();drawEq()});
$('#eqTy').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setBand(eqBand,{t:b.dataset.t})});
$('#eqSl').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setBand(eqBand,{s:+b.dataset.s})});
$('#eqOn').addEventListener('click',()=>{const b=eqbOf(eqObj())[eqBand];if(b)setBand(eqBand,{on:b.on?0:1})});
$('#eqDel').addEventListener('click',delBand);
function paintEqStyle(){const b=$('#eqStyle');if(!b)return;b.setAttribute('aria-pressed',String(!eqDefaultOn));b.textContent=eqDefaultOn?'EQ BYPASS · NO':'EQ BYPASS · SÍ'}
$('#eqStyle').addEventListener('click',()=>{eqDefaultOn=!eqDefaultOn;try{localStorage.setItem('pulsoEqDefaultOn',eqDefaultOn?'1':'0')}catch(e){}paintEqStyle();applyAll();flash(eqDefaultOn?'EQ ACTIVA':'BYPASS ACTIVADO')});
(()=>{const g=$('#eq_g'),f=$('#eq_f'),q=$('#eq_q');
  g.addEventListener('input',()=>setBand(eqBand,{g:+g.value}));f.addEventListener('input',()=>setBand(eqBand,{f:s2f(+f.value)}));q.addEventListener('input',()=>setBand(eqBand,{q:s2q(+q.value)}));
  let lg=0;g.addEventListener('pointerup',()=>{const n=Date.now();if(n-lg<300){setBand(eqBand,{g:0});lg=0}else lg=n})})();
const EQP={flat:()=>[],bass:()=>[{t:'ls',f:120,g:6}],mud:()=>[{t:'bell',f:350,g:-5}],air:()=>[{t:'hs',f:8000,g:5}],nosub:()=>[{t:'hp',f:35,s:96}],nobass:()=>[{t:'hp',f:150,s:96}]};
$('#eqP').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const o=eqObj(),L=eqbOf(o);
  if(b.dataset.p==='flat')L.length=0;else EQP[b.dataset.p]().forEach(x=>{if(L.length<EQMAXB)L.push({on:1,t:x.t,f:x.f,g:x.g||0,q:1.1,s:x.s||24})});
  eqBand=Math.max(0,L.length-1);if(!L.length)eqBand=0;eqApply();renderBand()});
(()=>{let drag=null,lastTap=0,lx=0,ly=0;const pt=e=>{const r=ecv.getBoundingClientRect(),d=window.devicePixelRatio||1;return{x:(e.clientX-r.left)*d,y:(e.clientY-r.top)*d,W:ecv.width,H:ecv.height,d}};
  ecv.addEventListener('pointerdown',e=>{const p=pt(e);let best=null,bd=1e9;eqHandles(p.W,p.H).forEach(h=>{const dd=Math.hypot(h.x-p.x,h.y-p.y);if(dd<bd){bd=dd;best=h}});
    const now=Date.now(),dbl=now-lastTap<320&&Math.hypot(p.x-lx,p.y-ly)<30*p.d;lastTap=now;lx=p.x;ly=p.y;
    if(best&&bd<26*p.d){drag=best;eqBand=best.i;renderBand();drawEq();ecv.setPointerCapture(e.pointerId)}
    else if(dbl){addBand(x2f(p.x,p.W),clamp((p.H/2-p.y)/(p.H/2-8)*EQR,-EQR,EQR),null);lastTap=0}
    e.preventDefault()});
  ecv.addEventListener('pointermove',e=>{if(!drag)return;const p=pt(e),b=eqbOf(eqObj())[drag.i];if(!b)return;
    setBand(drag.i,hasG(b.t)?{f:x2f(p.x,p.W),g:clamp((p.H/2-p.y)/(p.H/2-8)*EQR,-EQR,EQR)}:{f:x2f(p.x,p.W)})});
  ecv.addEventListener('wheel',e=>{const b=eqbOf(eqObj())[eqBand];if(!b||!hasQ(b.t))return;e.preventDefault();setBand(eqBand,{q:b.q*(e.deltaY<0?1.12:1/1.12)})},{passive:false});
  const end=()=>{drag=null};ecv.addEventListener('pointerup',end);ecv.addEventListener('pointercancel',end)})();
window.addEventListener('resize',()=>{eqDirty=true;if(S.tab==='eq')drawEq()});

/* ---------- save / load / export ---------- */
const SK='pulsostudio_slots',PROJ=['awave','song','lanes','hum','mres','mhp','mmid','mmf','mair','mwid','cho','flt','cr','cmp','bpm','swing','mdrive','mcut','mvol','lim','root','scale','wave','layer','chain','chainSet','rev','dly','sc','meq'];
const getSlots=()=>{try{const a=JSON.parse(localStorage.getItem(SK)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}};
const putSlots=a=>{try{localStorage.setItem(SK,JSON.stringify(a));return true}catch(e){return false}};
const fname=()=>($('#pname').value||'pulso-studio').replace(/[^\w\- áéíóúñÁÉÍÓÚÑ]+/g,'').trim()||'pulso-studio';
function project(name){const s={};PROJ.forEach(k=>{s[k]=S[k]});return JSON.parse(JSON.stringify({app:'pulso-studio',v:2,name,date:Date.now(),P,C,S:s}))}
function loadProject(o){const ok=o&&Array.isArray(o.P)&&o.P.length===4&&o.P.every(p=>p&&Array.isArray(p.d)&&p.d.length===6&&p.d.every(r=>Array.isArray(r)&&(r.length===16||r.length===32))&&Array.isArray(p.s)&&(p.s.length===16||p.s.length===32)&&Array.isArray(p.sv)&&(p.sv.length===16||p.sv.length===32));
  if(!ok)throw new Error('bad');
  P=JSON.parse(JSON.stringify(o.P)).map(fixP);if(Array.isArray(o.C)&&o.C.length>=7)C=CH.map((_,i)=>Object.assign(CHDEF(i),o.C[i]||{}));
  C.forEach((c,i)=>{c.len=clamp(Math.round(+c.len)||16,1,i===ACI?32:16)});if(o.S)PROJ.forEach(k=>{if(o.S[k]!==undefined)S[k]=o.S[k]});S.meq=Object.assign({},EQD,S.meq);mergeFx();fixSong();songUndoState=null;if($('#songUndo'))$('#songUndo').disabled=true;
  if(o.name)$('#pname').value=o.name;rs.value=S.root;ss.value=S.scale;
  applyAll();setIR();queueWarm();renderFx();renderMsBar();renderCanal();updMixUI();if(S.tab==='eq')renderEq();if(S.tab==='song')renderSong();upd();save()}
function renderSlots(){const a=getSlots(),el=$('#plist');
  if(!a.length){el.innerHTML='<p class="empty">Aún no hay proyectos guardados.</p>';return}
  el.innerHTML=a.map((_,i)=>`<div class="pi"><div><b></b><small></small></div><div class="seg"><button class="ld" data-i="${i}">Cargar</button><button class="del" data-i="${i}" aria-label="Borrar proyecto">🗑</button></div></div>`).join('');
  $$('.pi',el).forEach((r,i)=>{const x=a[i];r.querySelector('b').textContent=x.name||'Sin nombre';
    r.querySelector('small').textContent=new Date(x.date||0).toLocaleString('es-ES',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})+' · '+((x.data&&x.data.S&&x.data.S.bpm)||'?')+' BPM'})}
$('#psave').addEventListener('click',()=>{const a=getSlots(),name=($('#pname').value.trim()||'Proyecto '+(a.length+1)).slice(0,40);$('#pname').value=name;
  const i=a.findIndex(x=>x.name===name),item={name,date:Date.now(),data:project(name)};if(i>=0)a[i]=item;else a.unshift(item);
  flash(putSlots(a.slice(0,30))?(i>=0?'ACTUALIZADO':'GUARDADO'):'SIN ESPACIO');renderSlots()});
$('#plist').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=getSlots(),i=+b.dataset.i;if(!a[i])return;
  if(b.classList.contains('ld')){try{snap();loadProject(a[i].data);flash('CARGADO: '+a[i].name.toUpperCase().slice(0,14))}catch(err){flash('PROYECTO DAÑADO')}}
  else if(b.hasAttribute('data-arm')){a.splice(i,1);putSlots(a);renderSlots();flash('PROYECTO BORRADO')}
  else{b.setAttribute('data-arm','');b.textContent='¿Seguro?';setTimeout(()=>{if(b.isConnected){b.removeAttribute('data-arm');b.textContent='🗑'}},3000)}});

let DL=null;const EXT=!window.claude;const canRec=!!window.MediaRecorder&&!!((window.AudioContext||window.webkitAudioContext||{}).prototype||{}).createMediaStreamDestination;
$('#pexp').disabled=true;$('#reccard').hidden=true;$('#prec').hidden=!canRec;
(async()=>{try{if(window.claude&&window.claude.use)DL=await window.claude.use('downloads')}catch(e){DL=null}
  $('#pexp').disabled=!(DL||EXT);$('#reccard').hidden=!(DL||EXT);if(!DL&&!EXT)$('#dlnote').textContent='Exportar no está disponible en esta vista. Cargar .json sí funciona.'})();
function dlBlob(filename,data){const b=data instanceof Blob?data:new Blob([data],{type:'application/octet-stream'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);flash('EXPORTADO')}
async function saveFile(filename,data){if(!DL){if(EXT)dlBlob(filename,data);return}try{await DL.save({filename,data});flash('EXPORTADO')}
  catch(e){const c=e&&e.code;flash(c==='declined'?'CANCELADO':c==='rate_limited'?'ESPERA UN MOMENTO':(c==='rejected_extension'||c==='extension_not_enabled')?'FORMATO NO PERMITIDO':'NO SE PUDO EXPORTAR')}}
$('#pexp').addEventListener('click',()=>saveFile(fname()+'.json',JSON.stringify(project($('#pname').value.trim()||'Pulso Studio'),null,1)));
$('#pimp').addEventListener('click',()=>$('#pfile').click());
$('#pfile').addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
  try{const o=JSON.parse(await f.text());snap();loadProject(o);flash('CARGADO')}catch(err){flash('ARCHIVO NO VÁLIDO')}});

const b64e=u=>{let t='';for(let i=0;i<u.length;i+=8192)t+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(t).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const b64d=t=>{t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const r=atob(t),u=new Uint8Array(r.length);for(let i=0;i<r.length;i++)u[i]=r.charCodeAt(i);return u};
const pipeU=async(u,T)=>new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(T)).arrayBuffer());
async function encBeat(o){const u=new TextEncoder().encode(JSON.stringify(o));if(window.CompressionStream){try{return'PS1:'+b64e(await pipeU(u,new CompressionStream('deflate-raw')))}catch(e){}}return'PS0:'+b64e(u)}
async function decBeat(t){const m=t.replace(/\s+/g,'').match(/PS([01]):([A-Za-z0-9_-]+)/);if(!m)throw new Error('bad');let u=b64d(m[2]);
  if(m[1]==='1'){if(!window.DecompressionStream)throw new Error('nods');u=await pipeU(u,new DecompressionStream('deflate-raw'))}return JSON.parse(new TextDecoder().decode(u))}
$('#shC').addEventListener('click',async()=>{const t=$('#shT');try{t.value=await encBeat(project($('#pname').value.trim()||'Pulso Studio'));t.focus();t.select();let ok=false;
  try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(t.value);ok=true}}catch(e){}flash(ok?'CÓDIGO COPIADO':'CÓDIGO LISTO: CÓPIALO')}catch(e){flash('NO SE PUDO CREAR')}});
$('#shI').addEventListener('click',async()=>{const t=$('#shT');if(!t.value.trim()){flash('PEGA UN CÓDIGO');t.focus();return}
  try{const o=await decBeat(t.value);snap();loadProject(o);flash('BEAT IMPORTADO')}catch(e){flash(e&&e.message==='nods'?'NAVEGADOR SIN SOPORTE':'CÓDIGO NO VÁLIDO')}});
let recN=1,recOn=false;
const recSel=()=>$$('#recN button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.n===recN));recSel();
$('#recN').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||recOn)return;recN=+b.dataset.n;recSel()});
$('#prec').addEventListener('click',()=>{if(recOn||!(DL||EXT)||!ensure())return;let rec,dest;
  try{dest=ctx.createMediaStreamDestination();const mt=['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t));
    rec=new MediaRecorder(dest.stream,mt?{mimeType:mt}:undefined)}catch(err){flash('GRABAR NO DISPONIBLE');return}
  M.vol.connect(dest);const chunks=[],b=$('#prec'),ms=(S.song.on?S.song.len:recN)*16*60/S.bpm/4*1000,t0=performance.now();
  rec.ondataavailable=ev=>{if(ev.data&&ev.data.size)chunks.push(ev.data)};
  rec.onstop=async()=>{try{M.vol.disconnect(dest)}catch(err){}recOn=false;b.removeAttribute('data-rec');b.textContent='⏺ Grabar en tiempo real (.webm)';
    const type=rec.mimeType||(chunks[0]&&chunks[0].type)||'audio/webm',blob=new Blob(chunks,{type});
    if(!blob.size){flash('GRABACIÓN VACÍA');return}await saveFile(fname()+'.'+(type.includes('mp4')?'mp4':'webm'),blob)};
  recOn=true;b.setAttribute('data-rec','');if(S.play)stop();rec.start();start();
  const iv=setInterval(()=>{b.textContent='⏺ Grabando… '+Math.max(0,Math.ceil((ms+1200-(performance.now()-t0))/1000))+' s'},250);
  setTimeout(()=>{stop();setTimeout(()=>{clearInterval(iv);try{rec.stop()}catch(err){}},1200)},ms)});


/* ---------- offline WAV export (faster than real time, glitch-free) ---------- */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
function toWav(buf,skip){const ch=2,sr=buf.sampleRate,L=buf.getChannelData(0),R=buf.numberOfChannels>1?buf.getChannelData(1):L,n=buf.length-skip,out=new ArrayBuffer(44+n*4),v=new DataView(out);
  const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  w(0,'RIFF');v.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,sr,true);v.setUint32(28,sr*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*4,true);
  let o=44;for(let i=0;i<n;i++){for(const a of[L,R]){const d=(Math.random()-Math.random())/32768,x=Math.max(-1,Math.min(1,a[i+skip]+d));v.setInt16(o,Math.round(x*32767),true);o+=2}}
  /* short fade-out at the end of the tail */
  return new Uint8Array(out)}
function zip1(name,data){const nm=new TextEncoder().encode(name),c=crc32(data),sz=data.length,lh=new Uint8Array(30+nm.length),cd=new Uint8Array(46+nm.length),ed=new Uint8Array(22);
  const L=new DataView(lh.buffer),D=new DataView(cd.buffer),E=new DataView(ed.buffer);
  L.setUint32(0,0x04034b50,true);L.setUint16(4,20,true);L.setUint16(6,0x0800,true);L.setUint32(14,c,true);L.setUint32(18,sz,true);L.setUint32(22,sz,true);L.setUint16(26,nm.length,true);lh.set(nm,30);
  D.setUint32(0,0x02014b50,true);D.setUint16(4,20,true);D.setUint16(6,20,true);D.setUint16(8,0x0800,true);D.setUint32(16,c,true);D.setUint32(20,sz,true);D.setUint32(24,sz,true);D.setUint16(28,nm.length,true);cd.set(nm,46);
  E.setUint32(0,0x06054b50,true);E.setUint16(8,1,true);E.setUint16(10,1,true);E.setUint32(12,cd.length,true);E.setUint32(16,lh.length+sz,true);
  return new Blob([lh,data,cd,ed],{type:'application/zip'})}
async function renderWav(loops){const OC=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!OC)throw new Error('no offline');
  const sr=LIVE?LIVE.sampleRate:48000,spb=60/S.bpm/4,steps=(S.song.on?S.song.len:loops)*16,lead=.15,tail=1.5,off=new OC(2,Math.ceil((lead+steps*spb+tail)*sr),sr);await loadCr(off);
  await warmAll(sr);const sv={ctx,M,chs,noise,subV,ohV,lastF,acV,lastAF};
  try{ctx=off;M={};chs=[];subV=null;ohV=null;lastF=0;acV=null;lastAF=0;build();M.vol.disconnect(M.ana);
    let pp=S.pat;for(let g=0;g<steps;g++){pp=patFor(g,pp);const t=lead+g*spb;if(S.song.on&&g%16===0)lanesAt(Math.floor(g/16)%S.song.len,t,off);
      if(pp>=0)playStep(g,t+((g%2)?S.swing*spb*.4:0),pp,spb)}}
  finally{({ctx,M,chs,noise,subV,ohV,lastF,acV,lastAF}=sv)}
  const buf=await new Promise((res,rej)=>{off.oncomplete=e=>res(e.renderedBuffer);const p=off.startRendering();if(p&&p.then)p.then(res,rej)});
  const n=buf.length,fade=Math.floor(.05*sr);for(let c=0;c<buf.numberOfChannels;c++){const d=buf.getChannelData(c);for(let i=0;i<fade;i++)d[n-1-i]*=i/fade}
  return toWav(buf,Math.floor(lead*sr))}
let wavOn=false;
$('#pwav').addEventListener('click',async()=>{if(wavOn||!(DL||EXT))return;wavOn=true;const b=$('#pwav');b.textContent='⏳ Calculando…';flash('RENDER WAV');
  try{ensure();if(S.play)stop();const w=await renderWav(recN),nm=fname();if(DL)await saveFile(nm+'.zip',zip1(nm+'.wav',w));else saveFile(nm+'.wav',new Blob([w],{type:'audio/wav'}))}catch(e){flash('WAV NO DISPONIBLE')}
  finally{wavOn=false;b.textContent='⬇ Exportar WAV (calidad máxima)'}});

function reqWL(){try{if(navigator.wakeLock)navigator.wakeLock.request('screen').then(l=>{wl=l;try{l.addEventListener('release',()=>{wl=null})}catch(e){}}).catch(()=>{})}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)return;if(ctx){const n=ctx.currentTime;queue=queue.filter(q=>q.t>n-.05)}
  cvDirty=true;eqDirty=true;for(const k in fxCv)fxCv[k]=null;kick();if(S.stage&&!wl)reqWL()});
/* ---------- PADS (live play + rec) ---------- */
let padEl=[],padRec=false,padQ=true,padMel=false,laneTgt=null;
function renderPads(){const el=$('#pads');padEl=[];
  if(padMel){const m=melCh(),sc=SC[S.scale];el.style.gridTemplateColumns='repeat(4,1fr)';
    el.innerHTML=sc.map((o,k)=>`<button class="pad" data-k="${k}" style="--c:${CHC[m]}" aria-pressed="${S.subSel===k}"><b class="led"></b><b>${nname(NBASE[m]+S.root+o)}</b><small>${CH[m][1]}</small></button>`).join('')}
  else{el.style.gridTemplateColumns='';el.innerHTML=CH.map((c,i)=>`<button class="pad" data-i="${i}" style="--c:${CHC[i]}" aria-pressed="${S.ch===i}"><b class="led"></b><b>${c[1]}</b><small>${MEL(i)?nname(NBASE[i]+S.root+SC[S.scale][S.subSel]):''}</small></button>`).join('');
    padEl=$$('.pad .led:first-child',el)}
  $('#padRec').setAttribute('aria-pressed',padRec);$('#padQ').setAttribute('aria-pressed',padQ);$('#padMel').setAttribute('aria-pressed',padMel)}
function padRecord(ch,off){if(!padRec||!S.play||!ctx||S.gt==null)return;const spb=60/S.bpm/4,fr=(ctx.currentTime-S.gt)/spb;let g=S.g,nd=0;
  if(padQ){if(fr>.5)g++}else{const r=Math.round(fr);g+=r;nd=clamp(Math.round((fr-r)*8),-2,2)}
  const pi=S.pp>=0?S.pp:S.pat,p=P[pi],st=((g%16)+16)%16;
  if(ch<SUBI)p.d[ch][st]=Math.max(p.d[ch][st],2);else{p[NK[ch]][st]=off;p[VK[ch]][st]=2}p.nd[ch][st]=nd;
  if(pi===S.pat){updGrid();renderChips()}saveSoon()}
$('#pads').addEventListener('pointerdown',e=>{const b=e.target.closest('.pad');if(!b)return;e.preventDefault();if(!ensure())return;haptic();const t=ctx.currentTime+.003;
  b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),110);
  if(b.dataset.k!=null){const k=+b.dataset.k,m=melCh(),off=SC[S.scale][k];S.subSel=k;mel(m,off,t,VEL[3],false,false);padRecord(m,off);$$('#pads .pad').forEach(x=>x.setAttribute('aria-pressed',x===b));renderNotes();return}
  const i=+b.dataset.i;if(S.ch!==i){setCh(i);$$('#pads .pad').forEach(x=>x.setAttribute('aria-pressed',x===b))}
  if(i<SUBI){if(i===3)choke(ohV,t);drum(i,t,VEL[3]);if(i===0&&S.play)duck(t);padRecord(i)}else{const off=SC[S.scale][S.subSel];mel(i,off,t,VEL[3],false,false);padRecord(i,off)}});
$('#pads').addEventListener('contextmenu',e=>e.preventDefault());
$('#padRec').addEventListener('click',()=>{padRec=!padRec;if(padRec&&!S.play)start();renderPads();flash(padRec?'REC: TOCA LOS PADS':'REC APAGADO')});
$('#padQ').addEventListener('click',()=>{padQ=!padQ;renderPads();flash(padQ?'CUANTIZAR: SÍ':'CUANTIZAR: NO')});
$('#padMel').addEventListener('click',()=>{padMel=!padMel;if(padMel&&!MEL(S.ch))setCh(ACI);renderPads()});
/* DJ filter: one bipolar knob over master LP / HP */
const djOut=v=>v===0?'OFF':v<0?'LP '+fmtF(Math.round(Math.min(20000,180*Math.pow(110,1+v*.75)))):'HP '+fmtF(Math.round(msHp(v*.8)));
function djSet(v){if(Math.abs(v)<.04)v=0;setFxVal('ms','mcut',v<0?1+v*.75:1);setFxVal('ms','mhp',v>0?v*.8:0);$('#djo').textContent=djOut(v);return v}
(()=>{const r=$('#djf');const v0=S.mhp>0?S.mhp/.8:S.mcut<1?(S.mcut-1)/.75:0;r.value=Math.round(v0*100);$('#djo').textContent=djOut(Math.round(v0*100)/100);
  r.addEventListener('input',()=>{const v=djSet(r.value/100);if(v===0)r.value=0});let lt=0;
  r.addEventListener('pointerup',()=>{const n=Date.now();if(n-lt<300){r.value=0;djSet(0);lt=0}else lt=n})})();

/* ---------- SONG (arrangement + audio lanes) ---------- */
const PCOL=['#2ee6d6','#ff764d','#c58bff','#a6f03d'],LCOL={a1:'#4db8ff',a2:'#ffd24d'};
let songUndoState=null;
function rememberSong(){songUndoState={bars:[...S.song.bars],a1:[...S.lanes.a1.on],a2:[...S.lanes.a2.on]};$('#songUndo').disabled=false}
function renderSongOps(n){const src=$('#songSrc'),dst=$('#songDst');if(!src||!dst)return;const a=src.value,b=dst.value;src.replaceChildren();dst.replaceChildren();for(let i=0;i<n;i++){src.add(new Option('Compás '+(i+1),i));dst.add(new Option('Compás '+(i+1),i))}src.value=a!==''&&+a<n?a:'0';dst.value=b!==''&&+b<n?b:(n>1?'1':'0');$('#songUndo').disabled=!songUndoState}
function renderSong(){const g=S.song,n=g.len;
  $$('#songMode button').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.v==='1')===g.on));
  $$('#songLen button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.n===n));
  let h=`<div class="sgi" style="--n:${n}"><div class="lab">COMPÁS</div>`;for(let b=0;b<n;b++)h+=`<div class="bn">${b+1}</div>`;
  h+='<div class="lab">PATRÓN</div>';for(let b=0;b<n;b++){const v=g.bars[b];h+=`<button class="sc${v>=0?' on':''}" data-r="pat" data-b="${b}" style="--c:${v>=0?PCOL[v]:'transparent'}" aria-label="Compás ${b+1}: ${v>=0?'patrón '+'ABCD'[v]:'vacío'}">${v>=0?'ABCD'[v]:'·'}</button>`}
  ['a1','a2'].forEach((id,k)=>{h+=`<div class="lab">AUDIO ${k+1}</div>`;for(let b=0;b<n;b++)h+=`<button class="sc${S.lanes[id].on[b]?' on':''}" data-r="${id}" data-b="${b}" style="--c:${LCOL[id]}" aria-label="Audio ${k+1} compás ${b+1}"></button>`});
  $('#songGrid').innerHTML=h+'</div>';
  $('#lanes').innerHTML=['a1','a2'].map((id,k)=>{const L=S.lanes[id];return`<div class="lane" style="--c:${LCOL[id]}"><div class="lh"><b>AUDIO ${k+1}</b><div class="seg"><button data-la="load" data-id="${id}">⬆ Cargar</button><button data-la="del" data-id="${id}"${LB[id]?'':' disabled'}>✕</button></div></div>`+
    `<span class="fnm">${LN[id]?LN[id]+' · '+LB[id].duration.toFixed(1)+' s':'Sin audio'}</span><canvas id="wv_${id}" aria-hidden="true"></canvas>`+
    `<div class="lrow"><label>BPM original<input type="number" inputmode="numeric" min="40" max="240" data-lb="${id}" value="${L.bpm}"></label><label>Bucle<div class="seg" data-ll="${id}">${[1,2,4,8].map(x=>`<button data-n="${x}" aria-pressed="${L.loop===x}">${x}</button>`).join('')}</div></label></div>`+
    `<div class="k"><label for="lv_${id}">Volumen <output id="lvo_${id}">${Math.round(L.vol*100)}</output></label><input id="lv_${id}" type="range" min="0" max="100" value="${Math.round(L.vol*100)}" data-lv="${id}"></div></div>`}).join('');
  ['a1','a2'].forEach(drawLane);renderSongOps(n);paintSongPH()}
function paintSongPH(){$$('#songGrid .sc').forEach(c=>c.classList.toggle('ph',S.play&&S.song.on&&+c.dataset.b===S.bar))}
function songEdit(mode){const src=+$('#songSrc').value,dst=+$('#songDst').value,n=S.song.len;if(!Number.isInteger(src)||src<0||src>=n)return;if(mode!=='repeat'&&src===dst){flash('ELIGE OTRO COMPÁS');return}rememberSong();const p=S.song.bars[src],a1=S.lanes.a1.on[src],a2=S.lanes.a2.on[src],end=mode==='repeat'?n:dst+1,start=mode==='repeat'?src+1:dst;if(mode==='repeat'&&start>=end){songUndoState=null;$('#songUndo').disabled=true;flash('NO HAY COMPASES DESPUÉS');return}for(let i=start;i<end;i++){S.song.bars[i]=p;S.lanes.a1.on[i]=a1;S.lanes.a2.on[i]=a2}if(mode==='move'){S.song.bars[src]=-1;S.lanes.a1.on[src]=0;S.lanes.a2.on[src]=0}renderSong();$('#songSrc').value=src;$('#songDst').value=dst;save();flash(mode==='move'?'COMPÁS MOVIDO':mode==='repeat'?'REPETIDO AL FINAL':'COMPÁS COPIADO')}
$('#songCopy').addEventListener('click',()=>songEdit('copy'));
$('#songMove').addEventListener('click',()=>songEdit('move'));
$('#songRepeat').addEventListener('click',()=>songEdit('repeat'));
$('#songUndo').addEventListener('click',()=>{if(!songUndoState)return;S.song.bars=[...songUndoState.bars];S.lanes.a1.on=[...songUndoState.a1];S.lanes.a2.on=[...songUndoState.a2];songUndoState=null;renderSong();save();flash('COMPÁS DESHECHO')});
function drawLane(id){const cv=$('#wv_'+id),b=LB[id];if(!cv)return;const r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1,W=Math.round(r.width*d),H=Math.round(r.height*d);if(!W)return;cv.width=W;cv.height=H;
  const g=cv.getContext('2d');g.clearRect(0,0,W,H);if(!b)return;const x=b.getChannelData(0),stp=Math.max(1,Math.floor(x.length/W)),L=S.lanes[id],bo=60/L.bpm*4;g.fillStyle=LCOL[id];
  for(let i=0;i<W;i++){let mn=1,mx=-1;const s=i*stp;for(let j=0;j<stp&&s+j<x.length;j+=4){const v=x[s+j];if(v<mn)mn=v;if(v>mx)mx=v}g.fillRect(i,(1-mx)*H/2,1,Math.max(1,(mx-mn)*H/2))}
  g.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--lcdfg').trim()||'#fff';g.globalAlpha=.5;for(let k=1;k*bo<b.duration;k++){const px=k*bo/b.duration*W;g.fillRect(px,0,d,H)}g.globalAlpha=1}
async function loadLane(id,e){const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;if(f.size>40e6){flash('ARCHIVO MUY GRANDE');return}
  try{const ab=await f.arrayBuffer(),b=await decodeAB(ab),nm=f.name.replace(/\.[^.]+$/,'').slice(0,28);LB[id]=b;LN[id]=nm;try{await idbDo('readwrite',st=>st.put({name:nm,ab},id))}catch(err){}
    if(!S.lanes[id].on.some(Boolean))for(let i=0;i<S.song.len;i++)S.lanes[id].on[i]=1;flash('AUDIO '+(id==='a1'?1:2)+' CARGADO');renderSong();save()}catch(err){flash('AUDIO NO VÁLIDO')}}
let spT=0,spDone=false;
$('#t-song').addEventListener('pointerdown',e=>{const b=e.target.closest('.sc[data-r="pat"]');if(!b)return;spDone=false;clearTimeout(spT);spT=setTimeout(()=>{const v=S.song.bars[+b.dataset.b];if(!(v>=0))return;spDone=true;S.pat=v;showTab('seq');upd();save();flash('EDITANDO PATRÓN '+'ABCD'[v])},500)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>$('#t-song').addEventListener(ev,()=>clearTimeout(spT)));
$('#t-song').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(spDone){spDone=false;return}
  if(b.classList.contains('sc')){const r=b.dataset.r,i=+b.dataset.b;if(r==='pat'){const v=S.song.bars[i];S.song.bars[i]=v>=3?-1:v+1}else S.lanes[r].on[i]=S.lanes[r].on[i]?0:1;renderSong();save();return}
  const sm=b.closest('#songMode');if(sm){S.song.on=b.dataset.v==='1';flash(S.song.on?'MODO CANCIÓN':'MODO PATRÓN');renderSong();updLcd();save();return}
  const sl=b.closest('#songLen');if(sl){S.song.len=+b.dataset.n;renderSong();updLcd();save();return}
  const ll=b.closest('[data-ll]');if(ll){S.lanes[ll.dataset.ll].loop=+b.dataset.n;renderSong();save();return}
  if(b.id==='songFill'){const n=S.song.len;for(let i=0;i<32;i++)S.song.bars[i]=i<n?Math.min(3,Math.floor(i/(n/4))):-1;renderSong();save();return}
  if(b.id==='songClr'){S.song.bars.fill(-1);renderSong();save();return}
  if(b.dataset.la==='load'){laneTgt=b.dataset.id;const f=$('#smpF');f.accept='audio/*';f.click();return}
  if(b.dataset.la==='del'){const id=b.dataset.id;LB[id]=null;LN[id]='';try{idbDo('readwrite',st=>st.delete(id))}catch(err){}renderSong();flash('AUDIO QUITADO')}});
$('#t-song').addEventListener('change',e=>{const id=e.target.dataset.lb;if(!id)return;S.lanes[id].bpm=clamp(Math.round(+e.target.value)||120,40,240);e.target.value=S.lanes[id].bpm;drawLane(id);save()});
$('#t-song').addEventListener('input',e=>{const id=e.target.dataset.lv;if(!id)return;S.lanes[id].vol=e.target.value/100;$('#lvo_'+id).textContent=e.target.value;applyLanes();saveSoon()});
(async()=>{for(const id of['a1','a2']){try{const r=await idbDo('readonly',st=>st.get(id));if(r&&r.ab){LB[id]=await decodeAB(r.ab);LN[id]=r.name}}catch(e){}}if(S.tab==='song')renderSong()})();

function upd(){updLcd();renderChips();renderNotes();updGrid();renderPbar();updSteppers()}
rs.value=S.root;ss.value=S.scale;
paintEqStyle();renderKits();buildMix();buildDock();renderFx();renderMsBar();renderCanal();setStyle(S.style);skin(S.skin);upd();setLcd(S.lcdv);
})();
