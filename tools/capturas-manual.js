/* Genera las capturas del manual (manual/img) con Chrome sin pantalla.
   Uso:  1) python -m http.server 5179   (desde la carpeta del proyecto)
         2) node tools/capturas-manual.js
   Necesita Chrome en la ruta de Windows habitual y Node 22 o superior (usa WebSocket y fetch propios).
   Las capturas salen a 390x844 con carátula Neón, a doble resolución. */
const { spawn } = require('child_process'), fs = require('fs'), path = require('path'), os = require('os');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.APP || 'http://localhost:5179/index.html';
const OUT = path.join(__dirname, '..', 'manual', 'img');
const PORT = 9333, sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'pulso-cap-'));
  const ch = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--hide-scrollbars',
    '--autoplay-policy=no-user-gesture-required', '--no-first-run', '--window-size=390,844', 'about:blank'], { stdio: 'ignore' });
  let tabs;
  for (let i = 0; i < 40; i++) { try { tabs = await (await fetch('http://127.0.0.1:' + PORT + '/json')).json(); if (tabs.find(t => t.type === 'page')) break } catch (e) {} await sleep(250) }
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id) } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) });
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(expr.slice(0, 80) + ' -> ' + JSON.stringify(r.result.exceptionDetails.exception || r.result.exceptionDetails)); return r.result.result.value };
  const shot = async (name, clip) => { const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 84, ...(clip ? { clip: { x: clip.x, y: clip.y, width: clip.w, height: clip.h, scale: 1 } } : {}) }); fs.writeFileSync(path.join(OUT, name), Buffer.from(r.result.data, 'base64')); console.log('ok', name) };
  const rect = async sel => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});const r=e.getBoundingClientRect();return{x:Math.max(0,r.left-4),y:Math.max(0,r.top+scrollY-4),w:Math.min(innerWidth,r.width+8),h:r.height+8}})()`);

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  const load = async () => { await send('Page.navigate', { url: URL }); await sleep(1800); await ev(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s);
    window.$$=s=>[...document.querySelectorAll(s)];window.wait=ms=>new Promise(r=>setTimeout(r,ms));
    window.go=async(g,t,d)=>{$$('#tabs button').find(b=>b.dataset.g===g).click();await wait(250);if(t){const b=$$('#subs button').find(x=>x.dataset.t===t);if(b){b.click();await wait(300)}}
      const q=s=>document.querySelector(s),open=q('#sndTog').getAttribute('aria-expanded')==='true';
      if(d==='closed'&&open){q('#sndTog').click();await wait(250)}
      if(d&&d!=='closed'){if(!open){q('#sndTog').click();await wait(250)}$$('#sndTabs button').find(b=>b.dataset.t===d).click();await wait(450)}
      window.scrollTo(0,0)};return 1})()`) };
  await load(); await ev('localStorage.clear()'); await load();

  // 1. Crear y secuenciador
  await ev(`go('crear','seq','closed')`);
  await shot('01-crear.jpg');
  const head = await ev(`(()=>{const a=document.querySelector('.trans').getBoundingClientRect(),b=document.querySelector('.prow').getBoundingClientRect();return{x:0,y:a.top-6,w:innerWidth,h:b.bottom-a.top+12}})()`);
  await shot('02-transporte.jpg', head);
  await shot('03-rejilla.jpg', await rect('#grid'));
  await ev(`document.querySelector('#modeB').click()`); await sleep(500);
  await shot('04-modos.jpg');
  await load();

  // 2. Pads y piano roll
  await ev(`go('crear','pads','closed')`); await shot('05-pads.jpg');
  await ev(`(async()=>{document.querySelector('#padMel').click();await wait(300);$$('#padSnd button').find(b=>b.textContent==='ACID').click();await wait(400)})()`);
  await shot('05b-pads-notas.jpg');
  await ev(`go('crear','roll','closed')`);
  await ev(`(async()=>{$$('#rollSnd button').find(b=>b.textContent==='ACID').click();await wait(400)})()`);
  await shot('05c-piano-roll.jpg');
  await ev(`(async()=>{$$('#rollSnd button').find(b=>b.textContent==='KICK').click();await wait(400)})()`);
  await shot('05d-piano-roll-bateria.jpg');

  // 3. Canción, proyecto y aspecto
  await ev(`go('song',null,'closed')`); await shot('06-cancion.jpg');
  await ev(`go('file',null,'closed')`); await shot('07-proyecto.jpg');
  await ev(`go('look',null,'closed')`); await shot('08-aspecto.jpg');
  await ev(`window.scrollTo(0,document.body.scrollHeight)`); await sleep(300); await shot('08b-aspecto-manual.jpg');

  // 4. Panel Sonido (se agranda el panel para que se vea mas contenido)
  const dock = async (tab, extra) => { await ev(`go('crear','seq','${tab}')`); await ev(`(async()=>{const b=document.querySelector('#sndBody');b.style.maxHeight='600px';b.scrollTop=0;await wait(300)})()`); if (extra) await ev(extra); await sleep(200) };
  await dock('macro'); await shot('09-macro.jpg');
  await ev(`(async()=>{const b=document.querySelector('#sndBody');b.scrollTop=b.scrollHeight;await wait(300)})()`); await shot('10-macro-ajustes.jpg');
  await dock('canal'); await shot('11-canal.jpg');
  await dock('mix', `(async()=>{document.querySelector('#play').click();await wait(2600)})()`);
  await shot('12-mix.jpg');
  await ev(`(async()=>{if(document.querySelector('#mixMstFx').hidden)document.querySelector('#mstTog').click();await wait(300);const b=document.querySelector('#sndBody');b.scrollTop+=document.querySelector('#mixMst').getBoundingClientRect().top-b.getBoundingClientRect().top-4;await wait(300)})()`);
  await shot('12b-mix-master.jpg');
  await ev(`document.querySelector('#stopb').click()`);
  await dock('fx', `(async()=>{$$('.fxnav button').find(b=>b.textContent.includes('Master')).click();await wait(500);const b=document.querySelector('#sndBody');b.scrollTop+=document.querySelector('#fx_ms').getBoundingClientRect().top-b.getBoundingClientRect().top-4;await wait(300)})()`);
  await shot('13-fx.jpg');
  await dock('eq', `(async()=>{const b=document.querySelector('#sndBody');b.scrollTop+=document.querySelector('#eqc').getBoundingClientRect().top-b.getBoundingClientRect().top-30;await wait(300)})()`);
  await shot('14-eq.jpg');

  ws.close(); ch.kill();
  try { fs.rmSync(prof, { recursive: true, force: true }) } catch (e) {}
  process.exit(0);
})().catch(e => { console.error('ERROR', e.message); process.exit(1) });
