/* SPARROW Sport Club — offline MVP v1.0.8. No external libraries, no network calls for user data. */
'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => (globalThis.crypto?.randomUUID?.() || ('id'+Date.now()+'-'+Math.random().toString(36).slice(2)));
const today = () => {let d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
const fmtDate = iso => { if(!iso)return 'bez daty';const [y,m,d]=iso.split('-'); return `${d}.${m}.${y}`; };
const fmtTime = seconds => {seconds=Math.max(0,Math.ceil(seconds));return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
const asNum=(v, fallback=0,min=0,max=9999)=>{let n=Number(v);return Number.isFinite(n)?Math.min(max,Math.max(min,Math.round(n))):fallback;};
const has = (value)=>value!==undefined && value!==null;
const I={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2"/>',history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06A1.7 1.7 0 0 0 16 18.4a1.7 1.7 0 0 0-1.04 1.56V21H9v-1.04a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H2v-4h1.04A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06l1.8-1.8.06.06A1.7 1.7 0 0 0 8 5.6a1.7 1.7 0 0 0 1.04-1.56V3h5.92v1.04A1.7 1.7 0 0 0 16 5.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.04H22v4h-1.04A1.7 1.7 0 0 0 19.4 15z"/>',plus:'<path d="M12 5v14M5 12h14"/>',back:'<path d="m15 18-6-6 6-6"/>',arrow:'<path d="m9 18 6-6-6-6"/>',check:'<path d="M20 6 9 17l-5-5"/>',play:'<path d="m8 5 12 7-12 7z"/>',pause:'<path d="M9 5v14M15 5v14"/>',skip:'<path d="m4 5 9 7-9 7V5zM15 5l7 7-7 7V5z"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4z"/>',trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6M10 10v7m4-7v7"/>',timer:'<circle cx="12" cy="13" r="9"/><path d="M12 13V8M9 2h6"/>',sound:'<path d="M11 5 6 9H3v6h3l5 4zM15 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12"/>',mute:'<path d="M11 5 6 9H3v6h3l5 4zM17 9l5 6m0-6-5 6"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',upload:'<path d="M12 21V9m-5 5 5-5 5 5M4 7V3h16v4"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',layers:'<path d="m12 3-9 5 9 5 9-5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',up:'<path d="m6 15 6-6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>',shield:'<path d="m12 22 8-4V6l-8-4-8 4v12zM9 12l2 2 4-4"/>',offline:'<path d="m2 2 20 20M8 9a8 8 0 0 1 8 0M4 5a15 15 0 0 1 13-2M12 20h.01"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',rotate:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>',clipboard:'<rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 4V2h6v2M8 11h8M8 15h8"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 8h.01"/>'};
const ico = (name,extra='')=>`<svg ${extra} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name]||I.info}</svg>`;
const blankDB=()=>({version:1,plans:[],clients:[],logs:[],settings:{sound:true,vibration:false}});
const DEMO_NAMES=['Podciąganie na drążku','Dipy na poręczach','Pompki','Stanie na rękach','Wykroki','Wznosy nóg','Przysiady','Plank'];
const demoPlan=()=>({id:uid(),type:'group',name:'Przykładowy obwód Sparrow',date:today(),clientId:'',warmup:{enabled:true,notes:''},cooldown:{enabled:true,notes:''},exercises:DEMO_NAMES.map(name=>({id:uid(),name,sets:'',reps:'',load:'',note:''})),tabata:{enabled:true,work:60,rest:40,rounds:2,between:120,prep:10},createdAt:Date.now(),updatedAt:Date.now(),demo:true});
const newPlan=(type='group')=>({id:uid(),type,name:'',date:today(),clientId:'',warmup:{enabled:true,notes:''},cooldown:{enabled:true,notes:''},exercises:[{id:uid(),name:'',sets:'',reps:'',load:'',note:''}],tabata:{enabled:type==='group',work:60,rest:40,rounds:2,between:120,prep:10},createdAt:Date.now(),updatedAt:Date.now()});
let dbHandle=null, data=blankDB(), page='home', planId=null, clientId=null, draft=null, addingClientInline=false, modal=null, toastTimeout=null, timer=null, ticker=null, wakeLock=null, audioCtx=null, installPrompt=null, storageKind='IndexedDB';
function openDB(){return new Promise((res,rej)=>{let q=indexedDB.open('sparrow-trainer',1);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains('kv'))q.result.createObjectStore('kv')};q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error);});}
function dbGet(key){return new Promise((res,rej)=>{let tx=dbHandle.transaction('kv','readonly'),r=tx.objectStore('kv').get(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
function dbSet(key,value){return new Promise((res,rej)=>{let tx=dbHandle.transaction('kv','readwrite');tx.objectStore('kv').put(value,key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
async function save(){try{if(dbHandle) await dbSet('data',data);else localStorage.setItem('sparrow-local-fallback',JSON.stringify(data));}catch(e){console.error(e);alert('Błąd zapisu danych! Wykonaj kopię zapasową i sprawdź miejsce w telefonie.');}}
async function init(){
  try{dbHandle=await openDB();let d=await dbGet('data');if(d&&Array.isArray(d.plans)&&Array.isArray(d.clients)&&Array.isArray(d.logs)){data=d;}else{data=blankDB();data.plans=[demoPlan()];await save();}}
  catch(e){console.warn('IndexedDB unavailable, using local storage',e);storageKind='localStorage';try{const raw=localStorage.getItem('sparrow-local-fallback');if(raw){const obj=JSON.parse(raw);if(obj&&Array.isArray(obj.plans)&&Array.isArray(obj.clients)&&Array.isArray(obj.logs))data=obj;else throw Error('invalid');}else{data=blankDB();data.plans=[demoPlan()];await save();}}catch(e2){data=blankDB();data.plans=[demoPlan()];}}
  data.settings ||= {sound:true,vibration:false};
  render();navigationReady=true;history.replaceState(routeState(0),'');
  if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(e=>console.info('Offline install unavailable:',e));
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(page==='settings')render();});
  window.addEventListener('online',()=>updateOnline());window.addEventListener('offline',()=>updateOnline());
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();if(timer?.running)requestWake();}});
}
const findPlan=id=>data.plans.find(p=>p.id===id);
const findClient=id=>data.clients.find(c=>c.id===id);
function notify(message){document.querySelector('.toaster')?.remove();let t=document.createElement('div');t.className='toaster';t.role='status';t.textContent=message;document.body.append(t);clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>t.remove(),3100);}
function updateOnline(){let x=$('#net-state');if(x)x.textContent=navigator.onLine?'Tryb lokalny · gotowy offline':'Offline · dane w telefonie';}

const SPARROW_NAV_KEY='sparrow-navigation-v1';
let navigationReady=false, navigationDepth=0;
function routeState(scroll=window.scrollY){
 return {sparrowNav:SPARROW_NAV_KEY,depth:navigationDepth,page,planId,clientId,
  addingClientInline,modal:modal?structuredClone(modal):null,draft:draft?structuredClone(draft):null,
  scrollY:Math.max(0,Number(scroll)||0)};
}
function rememberRoute(){if(navigationReady)history.replaceState(routeState(),'');}
function pushRoute(){if(navigationReady){navigationDepth++;history.pushState(routeState(0),'');}}
function replaceRoute(){if(navigationReady)history.replaceState(routeState(0),'');}
function backTo(fallback='home'){
 if(navigationReady&&navigationDepth>0){history.back();return;}
 if(modal){modal=null;render();replaceRoute();return;}
 if(page!==fallback)goto(fallback);
}
window.addEventListener('popstate',e=>{
 const target=e.state;
 if(!target||target.sparrowNav!==SPARROW_NAV_KEY){
  if(page!=='home'){
   if(timer)stopTimer();
   navigationDepth=0;page='home';planId=null;clientId=null;draft=null;modal=null;addingClientInline=false;
   history.pushState(routeState(0),'');render();window.scrollTo(0,0);
  }
  return;
 }
 if(timer&&page==='timer'&&target.page!=='timer'){
  if(timer.idx<timer.phases.length&&!confirm('Zakończyć działanie timera i wrócić?')){
   history.pushState(routeState(0),'');return;
  }
  stopTimer();
 }
 navigationDepth=Math.max(0,Number(target.depth)||0);
 page=target.page||'home';
 planId=target.planId||null;clientId=target.clientId||null;
 draft=target.draft?structuredClone(target.draft):null;
 modal=target.modal?structuredClone(target.modal):null;
 addingClientInline=!!target.addingClientInline;
 if(page==='timer'&&!timer){page=findPlan(planId)?'plan':'home';replaceRoute();}
 if(page==='plan'&&!findPlan(planId)){page='home';replaceRoute();}
 if(page==='client'&&!findClient(clientId)){page='clients';replaceRoute();}
 render();
 requestAnimationFrame(()=>window.scrollTo(0,Math.max(0,Number(target.scrollY)||0)));
});
function goto(dest,id=null){if(dest===page&&!modal&&(dest==='plan'?id===planId:dest==='client'?id===clientId:true))return;if(timer&&page==='timer'&&dest!=='timer'){if(!confirm('Zakończyć uruchomiony timer?'))return;stopTimer();}rememberRoute();page=dest;planId=(dest==='plan'?id:planId);clientId=(dest==='client'?id:clientId);draft=null;modal=null;addingClientInline=false;pushRoute();render();window.scrollTo({top:0,behavior:'instant'});}
function shell(content){let isTimer=page==='timer';let navs=[['home','home','Start'],['group','users','Grupowe'],['personal','user','Indywidualne'],['clients','book','Osoby'],['history','history','Historia']];let active=['plan','edit','timer'].includes(page)?((page==='edit'?draft?.type:findPlan(planId)?.type)==='personal'?'personal':'group'):page;
return `<div class="app-shell"><header class="shell-head"><div class="brand"><img class="brand-logo" src="./assets/icon-192.svg" alt="Logo Sparrow"><div class="brand-text"><strong>SPARROW</strong><small>SPORT CLUB · PANEL TRENERA</small></div></div><div class="head-actions"><button class="tiny-btn" data-action="goto" data-page="library" aria-label="Biblioteka planów">${ico('book')}</button><button class="tiny-btn" data-action="goto" data-page="settings" aria-label="Ustawienia">${ico('settings')}</button></div></header><main class="main" id="main-view">${content}</main>${!isTimer?`<nav class="bottom-nav" aria-label="Główna nawigacja">${navs.map(([p,ic,label])=>`<button type="button" class="nav-item ${active===p?'active':''}" data-action="goto" data-page="${p}" aria-label="${label}" ${active===p?'aria-current="page"':''}>${ico(ic)}<span>${label}</span></button>`).join('')}</nav>`:''}</div>`;}
function backButton(dest='home'){return `<button class="back" data-action="back" data-fallback="${dest}">${ico('back')} Wróć</button>`;}
function btn(action,title,cl='secondary',attrs=''){return `<button type="button" class="button ${cl}" data-action="${action}" ${attrs}>${title}</button>`;}
function planMeta(p){return `${p.exercises.length} ćw. · ${p.tabata?.enabled?'Tabata':'bez Tabaty'}${p.demo?' · przykład':''}`;}
function planCard(p){return `<div class="card compact"><button type="button" class="list-card" data-action="open-plan" data-id="${esc(p.id)}"><span class="list-icon">${ico(p.type==='group'?'users':'user')}</span><span class="grow"><h3>${esc(p.name||'Plan bez nazwy')}</h3><p>${esc(fmtDate(p.date))} · ${esc(planMeta(p))}${p.clientId?' · '+esc(findClient(p.clientId)?.name||'podopieczny'):''}</p></span><span class="arr">${ico('arrow')}</span></button></div>`;}
function homeRecentRow(p){
 const person=p.clientId?findClient(p.clientId)?.name:null;
 const detail=person||(p.type==='group'?`${p.exercises.length} stanowisk`:`${p.exercises.length} ćwiczeń`);
 return `<div class="home-recent-row"><button type="button" class="home-recent-open" data-action="open-plan" data-id="${esc(p.id)}" aria-label="Otwórz plan: ${esc(p.name||'Plan bez nazwy')}">
  <span class="home-recent-icon" aria-hidden="true">${ico(p.type==='group'?'users':'user')}</span>
  <span class="home-recent-text"><strong>${esc(p.name||'Plan bez nazwy')}</strong><span>${esc(fmtDate(p.date))}<span class="home-meta-divider" aria-hidden="true"> / </span>${esc(detail)}</span></span>
  <span class="home-recent-arrow" aria-hidden="true">${ico('arrow')}</span>
 </button></div>`;
}
function homeView(){
 const plans=[...data.plans].sort((a,b)=>(b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0)).slice(0,3);
 const dateLabel=new Intl.DateTimeFormat('pl-PL',{day:'numeric',month:'short'}).format(new Date());
 return `<section class="home-command" aria-labelledby="home-main-title">
  <div class="home-command-copy">
   <span class="home-command-caption">Sparrow Sport Club</span>
   <h1 id="home-main-title">Zaplanuj.<span>Poprowadź.</span></h1>
   <p>Zajęcia, plany i postępy. Wszystko pod ręką.</p>
  </div>
  <div class="home-command-emblem"><img src="./assets/sparrow-badge.svg" alt="Godło Sparrow Sport Club"></div>
  <div class="home-command-bottom"><span class="home-online"><span class="home-online-dot" aria-hidden="true"></span><span id="net-state">Tryb lokalny · gotowy offline</span></span><time datetime="${today()}">${esc(dateLabel)}</time></div>
 </section>
 <section class="home-modes" aria-labelledby="home-mode-title">
  <div class="home-section-heading"><h2 id="home-mode-title">Wybierz trening</h2></div>
  <div class="home-mode home-mode-group">
   <button class="home-mode-main" type="button" data-action="goto" data-page="group" aria-label="Otwórz trening grupowy">
    <span class="home-mode-icon" aria-hidden="true">${ico('users')}</span>
    <span class="home-mode-copy"><strong>Trening grupowy</strong><span>Obwody, stanowiska i Tabata</span></span>
    <span class="home-mode-arrow" aria-hidden="true">${ico('arrow')}</span>
   </button>
   <div class="home-mode-foot">
    <span class="home-stations" aria-hidden="true">${Array.from({length:8},()=>'<i></i>').join('')}</span>
    <button class="home-mode-new" type="button" data-action="new-plan" data-type="group">${ico('plus')} Nowy plan</button>
   </div>
  </div>
  <div class="home-mode home-mode-personal">
   <button class="home-mode-main" type="button" data-action="goto" data-page="personal" aria-label="Otwórz trening indywidualny">
    <span class="home-mode-icon" aria-hidden="true">${ico('user')}</span>
    <span class="home-mode-copy"><strong>Trening indywidualny</strong><span>Plan i wyniki podopiecznego</span></span>
    <span class="home-mode-arrow" aria-hidden="true">${ico('arrow')}</span>
   </button>
   <div class="home-mode-foot">
    <span class="home-mode-foot-text">Historia i kartoteki osób</span>
    <button class="home-mode-new" type="button" data-action="new-plan" data-type="personal">${ico('plus')} Nowy plan</button>
   </div>
  </div>
 </section>
 <section class="home-recent" aria-labelledby="home-recent-title">
  <div class="home-section-heading"><h2 id="home-recent-title">Ostatnie plany</h2><button class="home-all" type="button" data-action="goto" data-page="library">Biblioteka ${ico('arrow')}</button></div>
  ${plans.length?`<div class="home-recent-list">${plans.map(homeRecentRow).join('')}</div>`:`<p class="home-recent-empty">Nie ma jeszcze zapisanych planów. Wybierz rodzaj treningu i utwórz pierwszy plan.</p>`}
 </section>`;
}
function listView(type){let group=type==='group',arr=data.plans.filter(p=>p.type===type).sort((a,b)=>(b.date||'').localeCompare(a.date||''));return `<div class="title-row"><div><div class="eyebrow">SPARROW SPORT CLUB</div><h1>${group?'Trening grupowy':'Trening indywidualny'}</h1><div class="sub">${group?'Obwody i lista ćwiczeń':'Plany dopasowane do podopiecznych'}</div></div></div>${btn('new-plan',`${ico('plus')} Utwórz nowy plan`,'full','data-type="'+type+'"')}<div class="section-title">ZAPISANE PLANY · ${arr.length}</div>${arr.length?arr.map(planCard).join(''):`<div class="card empty">${ico('clipboard')}<strong>Nie ma jeszcze treningów</strong><p>Zapisz pierwszy plan, aby móc do niego wracać.</p></div>`}${!group?`<div class="section-title">PODOPIECZNI</div>${btn('goto',`${ico('users')} Otwórz kartoteki`,'secondary full','data-page="clients"')}`:''}`;}
function libraryView(){let arr=[...data.plans].sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));return `${backButton('home')}<div class="title-row"><div><div class="eyebrow">GOTOWE SZABLONY</div><h1>Biblioteka planów</h1><div class="sub">Otwieraj, kopiuj i modyfikuj treningi</div></div></div>${arr.length?arr.map(planCard).join(''):'<div class="card empty">Brak zapisanych planów.</div>'}<div class="footnote">Kopia planu jest niezależna od oryginału. Można zmienić datę i ćwiczenia bez utraty poprzedniej wersji.</div>`;}
function phaseBox(title,desc,notes,ic){return `<div class="card"><div class="phase"><div class="phase-icon">${ico(ic)}</div><div class="grow"><h3>${esc(title)}</h3><p>${desc}</p></div>${ico('check')}</div>${notes?`<div class="bar"></div><p class="sub" style="margin-bottom:0;white-space:pre-wrap">${esc(notes)}</p>`:''}</div>`;}
function planView(){let p=findPlan(planId);if(!p)return `<div class="card empty">Nie znaleziono planu.</div>`;let type=p.type==='group';let t=p.tabata||{};let client=findClient(p.clientId);return `${backButton(type?'group':'personal')}<div class="plan-top"><span class="chip">${ico(type?'users':'user')} ${type?'GRUPOWY':'INDYWIDUALNY'}</span> <span class="chip">${ico('calendar')} ${esc(fmtDate(p.date))}</span><h1>${esc(p.name||'Plan bez nazwy')}</h1>${client?`<div class="sub">Podopieczny: ${esc(client.name)}</div>`:''}<div class="stat-grid"><div class="stat"><strong>${p.exercises.length}</strong><span>ćwiczeń</span></div><div class="stat"><strong>${t.enabled?esc(t.work)+'s':'—'}</strong><span>praca</span></div><div class="stat"><strong>${t.enabled?esc(t.rest)+'s':'—'}</strong><span>przerwa</span></div></div><div class="row wrap">${btn('edit-plan',`${ico('edit')} Edytuj`,'secondary','data-id="'+esc(p.id)+'"')}${btn('clone-plan',`${ico('copy')} Powiel`,'secondary','data-id="'+esc(p.id)+'"')}</div></div>
${p.warmup?.enabled?phaseBox('Rozgrzewka','Etap opcjonalny · bez narzuconej listy',p.warmup.notes,'check'):''}
<div class="card"><div class="row between"><h3 style="margin:0">${type?'Stanowiska / ćwiczenia':'Plan ćwiczeń'}</h3><span class="pill">${p.exercises.length} pozycji</span></div><div class="bar"></div>${p.exercises.map((ex,i)=>`<div class="ex-item"><div class="ex-number">${i+1}</div><div class="ex-info grow"><strong>${esc(ex.name||'Ćwiczenie bez nazwy')}</strong>${ex.sets||ex.reps||ex.load?`<span>${[ex.sets?ex.sets+' serie':'',ex.reps?ex.reps+' powt.':'',ex.load?ex.load:''].filter(Boolean).map(esc).join(' · ')}</span>`:''}${ex.note?`<span style="display:block;white-space:pre-wrap">${esc(ex.note)}</span>`:''}</div></div>`).join('')}</div>
${p.cooldown?.enabled?phaseBox('Rozciąganie','Etap opcjonalny · bez narzuconej listy',p.cooldown.notes,'check'):''}
<div class="card"><div class="row between"><h3 style="margin:0">${ico('timer')} Tabata</h3><span class="chip">${t.enabled?'WŁĄCZONA':'WYŁĄCZONA'}</span></div>${t.enabled?`<p class="sub" style="margin:10px 0">${t.work}s ćwiczenie · ${t.rest}s przerwa · ${t.rounds} obwody · ${t.between}s między obwodami</p>${btn('start-timer',`${ico('play')} Rozpocznij Tabatę`,'full big','data-id="'+esc(p.id)+'"')}`:'<p class="sub" style="margin:12px 0 0">Trening jest listą ćwiczeń. Bez timera i odliczania.</p>'}</div>
${btn('complete-plan',`${ico('check')} Zapisz jako wykonany`,'secondary full','data-id="'+esc(p.id)+'"')}<div style="height:10px"></div>${btn('delete-plan',`${ico('trash')} Usuń plan`,'minor full','data-id="'+esc(p.id)+'"')}`;}
const input = (label,id,value,type='text',attrs='')=>`<div class="field"><label for="${id}">${label}</label><input id="${id}" ${attrs} type="${type}" value="${esc(value)}"></div>`;
function exerciseEdit(ex,i){return `<div class="exercise-edit"><div class="exercise-head"><span class="ex-number">${i+1}</span><strong>Ćwiczenie ${i+1}</strong><button class="mini-ico" data-action="move-ex" data-id="${esc(ex.id)}" data-dir="-1" aria-label="Przenieś w górę" ${i===0?'disabled':''}>${ico('up')}</button><button class="mini-ico" data-action="move-ex" data-id="${esc(ex.id)}" data-dir="1" aria-label="Przenieś w dół">${ico('down')}</button><button class="mini-ico" data-action="remove-ex" data-id="${esc(ex.id)}" aria-label="Usuń ćwiczenie">${ico('trash')}</button></div><div class="field"> <label>Nazwa ćwiczenia</label><input data-ex="${esc(ex.id)}" data-ex-key="name" value="${esc(ex.name)}" placeholder="np. podciąganie na drążku"></div><div class="three-fields"><div class="field"><label>Serie</label><input data-ex="${esc(ex.id)}" data-ex-key="sets" value="${esc(ex.sets)}" placeholder="3"></div><div class="field"><label>Powtórzenia</label><input data-ex="${esc(ex.id)}" data-ex-key="reps" value="${esc(ex.reps)}" placeholder="8"></div><div class="field"><label>Obciążenie</label><input data-ex="${esc(ex.id)}" data-ex-key="load" value="${esc(ex.load)}" placeholder="kg / guma"></div></div><div class="field" style="margin-bottom:0"><label>Uwagi (opcjonalne)</label><input data-ex="${esc(ex.id)}" data-ex-key="note" value="${esc(ex.note)}" placeholder="np. wersja łatwiejsza"></div></div>`;}
function assignTypedClientFromForm(){
 if(!draft || draft.type!=='personal')return null;
 const input=$('#p-client-new');
 const name=(input?.value||'').trim().replace(/\s+/g,' ');
 if(!name)return null;
 let c=data.clients.find(person=>(person.name||'').trim().replace(/\s+/g,' ').toLocaleLowerCase('pl')===name.toLocaleLowerCase('pl'));
 let created=false;
 if(!c){c={id:uid(),name,notes:'',progress:[]};data.clients.push(c);created=true;}
 draft.clientId=c.id;
 const select=$('#p-client');
 if(select){
  if(!Array.from(select.options).some(opt=>opt.value===c.id))select.add(new Option(c.name,c.id));
  select.value=c.id;
 }
 input.value='';
 return {client:c,created};
}
function editorView(){let p=draft;if(!p)return '';let isPersonal=p.type==='personal';return `${backButton(p.type==='group'?'group':'personal')}<div class="eyebrow">EDYTOR PLANU</div><h1>${findPlan(p.id)?'Edytuj trening':'Nowy trening'}</h1><p class="sub">Zapisz plan — będzie dostępny bez internetu.</p><div class="card">
${input('Nazwa treningu','p-name',p.name,'text','data-draft="name" placeholder="np. Środa — kalistenika" maxlength="100"')}
<div class="two-fields"><div class="field"><label for="p-type">Rodzaj treningu</label><select id="p-type" data-draft="type"><option value="group" ${!isPersonal?'selected':''}>Grupowy</option><option value="personal" ${isPersonal?'selected':''}>Indywidualny</option></select></div>${input('Data','p-date',p.date,'date','data-draft="date"')}</div>
${isPersonal?`<div class="field"><label for="p-client">Podopieczny (opcjonalnie)</label><select id="p-client" data-draft="clientId"><option value="" ${!addingClientInline&&!p.clientId?'selected':''}>Bez przypisanej osoby</option>${data.clients.map(c=>`<option value="${esc(c.id)}" ${!addingClientInline&&p.clientId===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}<option value="__new__" ${addingClientInline?'selected':''}>＋ Dodaj nową osobę…</option></select></div>${addingClientInline?`<div class="field"><label for="p-client-new">Imię i nazwisko nowej osoby</label><input id="p-client-new" type="text" maxlength="100" autocomplete="name" placeholder="np. Jan Kowalski"><div style="margin-top:9px">${btn('add-client-inline',`${ico('plus')} Dodaj i przypisz do treningu`,'secondary')}</div><p class="footnote" style="margin:8px 0 0">Możesz też po prostu wpisać nazwisko i zapisać trening.</p></div>`:''} `:''}
</div>
<details class="details-box"><summary>${ico('check')} Rozgrzewka <span class="tag">opcjonalnie ${ico('down')}</span></summary><div class="details-inner"><div class="switch-row"><span>Uwzględnij rozgrzewkę w planie</span><input class="switch" aria-label="Rozgrzewka włączona" type="checkbox" data-draft="warmup.enabled" ${p.warmup.enabled?'checked':''}></div><div class="field" style="margin-bottom:0"><label>Notatka (nieobowiązkowa)</label><textarea rows="2" data-draft="warmup.notes" placeholder="Wpisz uwagi do rozgrzewki (opcjonalnie)">${esc(p.warmup.notes)}</textarea></div></div></details>
<div class="section-title">GŁÓWNY PLAN ĆWICZEŃ</div>${p.exercises.map(exerciseEdit).join('')}${btn('add-ex',`${ico('plus')} Dodaj ćwiczenie`,'secondary full')}
<div class="section-title">TIMER / TABATA</div><div class="card"><div class="switch-row"><div><strong>Użyj Tabaty</strong><div class="sub">Można wyłączyć i korzystać z samej listy</div></div><input class="switch" aria-label="Tabata włączona" type="checkbox" data-draft="tabata.enabled" ${p.tabata.enabled?'checked':''}></div><div class="two-fields">${numberField('Praca (sek.)','tabata.work',p.tabata.work,5,600)}${numberField('Przerwa (sek.)','tabata.rest',p.tabata.rest,0,600)}${numberField('Liczba obwodów','tabata.rounds',p.tabata.rounds,1,20)}${numberField('Przerwa między obwodami (sek.)','tabata.between',p.tabata.between,0,1800)}${numberField('Przygotowanie (sek.)','tabata.prep',p.tabata.prep,0,120)}</div><p class="footnote" style="margin-bottom:0">Obwód: każdy uczestnik wykonuje wszystkie stanowiska. Po ostatnim ćwiczeniu zamiast zwykłej przerwy jest przerwa między obwodami. Po ostatnim obwodzie timer kończy pracę.</p></div>
<details class="details-box"><summary>${ico('check')} Rozciąganie <span class="tag">opcjonalnie ${ico('down')}</span></summary><div class="details-inner"><div class="switch-row"><span>Uwzględnij rozciąganie</span><input class="switch" type="checkbox" aria-label="Rozciąganie włączone" data-draft="cooldown.enabled" ${p.cooldown.enabled?'checked':''}></div><div class="field" style="margin-bottom:0"><label>Notatka (nieobowiązkowa)</label><textarea rows="2" data-draft="cooldown.notes">${esc(p.cooldown.notes)}</textarea></div></div></details>
${btn('save-plan',`${ico('check')} Zapisz trening`,'full big')}`;}
function numberField(label,path,value,min,max){return `<div class="field"><label>${label}</label><input type="number" inputmode="numeric" data-draft="${path}" min="${min}" max="${max}" value="${esc(value)}"></div>`;}
function clientsView(){let arr=[...data.clients].sort((a,b)=>a.name.localeCompare(b.name,'pl'));return `<div class="title-row"><div><div class="eyebrow">TRENINGI INDYWIDUALNE</div><h1>Podopieczni</h1><div class="sub">Wyniki, notatki i historia każdej osoby</div></div></div>${btn('new-client',`${ico('plus')} Dodaj podopiecznego`,'full')}
<div class="section-title">KARTOTEKI · ${arr.length}</div>${arr.length?arr.map(c=>`<div class="card compact"><button class="list-card" data-action="open-client" data-id="${esc(c.id)}"><span class="list-icon">${ico('user')}</span><span class="grow"><h3>${esc(c.name)}</h3><p>${c.progress?.length||0} wpisów postępów · ${data.logs.filter(l=>l.clientId===c.id).length} treningów</p></span>${ico('arrow')}</button></div>`).join(''):'<div class="card empty">'+ico('users')+'<strong>Nie ma jeszcze podopiecznych</strong><p>Dodaj osobę, by prowadzić jej notatki.</p></div>'}<p class="footnote">Dane podopiecznych pozostają tylko w pamięci tego urządzenia. Nie są wysyłane na GitHub ani do chmury.</p>`;}
function clientView(){let c=findClient(clientId);if(!c)return `<div class="card empty">Nie znaleziono osoby.</div>`;let plans=data.plans.filter(p=>p.clientId===c.id).sort((a,b)=>b.date.localeCompare(a.date)), logs=data.logs.filter(l=>l.clientId===c.id).sort((a,b)=>b.timestamp-a.timestamp);return `${backButton('clients')}<div class="plan-top"><span class="chip">${ico('user')} PODOPIECZNY</span><h1>${esc(c.name)}</h1>${c.notes?`<p class="sub" style="white-space:pre-wrap">${esc(c.notes)}</p>`:''}<div class="row wrap">${btn('edit-client',`${ico('edit')} Edytuj dane`,'secondary','data-id="'+esc(c.id)+'"')}${btn('add-progress',`${ico('plus')} Dodaj postęp`,'','data-id="'+esc(c.id)+'"')}</div></div>
<div class="section-title">POSTĘPY I NOTATKI · ${(c.progress||[]).length}</div>${(c.progress||[]).length?[...c.progress].sort((a,b)=>b.timestamp-a.timestamp).map(x=>`<div class="card"><div class="row between"><strong>${esc(x.exercise||'Notatka trenera')}</strong><button class="mini-ico" data-action="delete-progress" data-id="${esc(c.id)}" data-progress="${esc(x.id)}" aria-label="Usuń wpis">${ico('trash')}</button></div><div class="small muted">${new Date(x.timestamp).toLocaleDateString('pl-PL')}</div>${x.result?`<div class="tag" style="margin:8px 0">${esc(x.result)}</div>`:''}${x.note?`<p style="white-space:pre-wrap;margin:7px 0 0">${esc(x.note)}</p>`:''}</div>`).join(''):'<div class="card empty">Nie zapisano jeszcze postępów.</div>'}
<div class="section-title">PLANY TEJ OSOBY · ${plans.length}</div>${btn('new-plan',`${ico('plus')} Nowy plan dla tej osoby`,'secondary full','data-type="personal" data-client="'+esc(c.id)+'"')}${plans.map(planCard).join('')}
<div class="section-title">WYKONANE TRENINGI · ${logs.length}</div>${logs.slice(0,10).map(l=>`<div class="card"><strong>${esc(l.name)}</strong><div class="sub">${new Date(l.timestamp).toLocaleDateString('pl-PL')}</div></div>`).join('')}${btn('delete-client',`${ico('trash')} Usuń kartotekę`,'minor full','data-id="'+esc(c.id)+'"')}`;}
function historyView(){let arr=[...data.logs].sort((a,b)=>b.timestamp-a.timestamp);return `<div class="title-row"><div><div class="eyebrow">DZIENNIK TRENINGÓW</div><h1>Historia</h1><div class="sub">Treningi oznaczone jako wykonane</div></div></div>${arr.length?arr.map(l=>`<div class="card"><div class="row between"><div class="grow"><strong>${esc(l.name)}</strong><div class="sub">${new Date(l.timestamp).toLocaleString('pl-PL',{dateStyle:'medium',timeStyle:'short'})} · ${l.type==='group'?'grupowy':'indywidualny'}</div>${l.clientId?`<div class="sub">${esc(findClient(l.clientId)?.name||'podopieczny')}</div>`:''}</div><button class="mini-ico" data-action="delete-log" data-id="${esc(l.id)}" aria-label="Usuń wpis historii">${ico('trash')}</button></div><div class="top-progress"><span>${l.exerciseCount} ćwiczeń</span><span>${l.usedTabata?'Z Tabatą':'Bez Tabaty'}</span></div></div>`).join(''):'<div class="card empty">'+ico('history')+'<strong>Historia jest pusta</strong><p>Po treningu wybierz „Zapisz jako wykonany”.</p></div>'}`;}
function settingsView(){return `<div class="title-row"><div><div class="eyebrow">SPARROW v1.0.8</div><h1>Ustawienia</h1><div class="sub">Działanie offline i kontrola danych</div></div></div><div class="card"><h3>${ico('sound')} Dźwięki Tabaty</h3><div class="switch-row"><div class="grow"><strong>Sygnalizacja dźwiękowa</strong><div class="sub">Trzy piknięcia, brzęczyk końca pracy, sygnał START i podwójny gong</div></div><input type="checkbox" class="switch" data-setting="sound" aria-label="Włącz dźwięki" ${data.settings.sound?'checked':''}></div><div class="switch-row"><div class="grow"><strong>Wibracja</strong><div class="sub">Jeżeli Android i przeglądarka pozwalają</div></div><input type="checkbox" class="switch" data-setting="vibration" aria-label="Włącz wibracje" ${data.settings.vibration?'checked':''}></div><div class="section-title">ODSŁUCH SYGNAŁÓW</div><p class="sub">Tymczasowy zestaw SPARROW. Wszystkie dźwięki można później wymienić.</p><div class="two-fields">${btn('test-audio-cue',`${ico('sound')} 3, 2, 1`,'secondary','data-kind="countdown"')}${btn('test-audio-cue',`${ico('sound')} START`,'secondary','data-kind="work"')}${btn('test-audio-cue',`${ico('sound')} Koniec pracy`,'secondary','data-kind="end"')}${btn('test-audio-cue',`${ico('sound')} Przerwa`,'secondary','data-kind="rest"')}${btn('test-audio-cue',`${ico('sound')} Koniec treningu`,'secondary','data-kind="done"')}</div><div style="height:10px"></div>${btn('test-audio',`${ico('play')} Odsłuchaj całą sekwencję`,'full')}</div>
<div class="card"><h3>${ico('offline')} Dane tylko w telefonie</h3><p class="sub">Pamięć: ${esc(storageKind)}. Treningi, historia i kartoteki są zapisane lokalnie. Po instalacji oraz pierwszym otwarciu online aplikacja działa offline.</p><div class="row wrap">${btn('export',`${ico('download')} Eksportuj kopię`,'secondary')}${btn('import',`${ico('upload')} Przywróć kopię`,'secondary')}</div><input type="file" accept=".json,application/json" id="import-file" hidden><p class="footnote" style="margin:12px 0 0">Kopia zapasowa ma postać pliku JSON. Przechowuj go bezpiecznie — może zawierać dane osobowe podopiecznych.</p></div>
<div class="card"><h3>${ico('info')} Instalacja na Androidzie</h3><p class="sub">W Chrome otwórz stronę aplikacji, wybierz menu ⋮ i „Dodaj do ekranu głównego” / „Zainstaluj aplikację”.</p>${installPrompt?btn('install',`${ico('download')} Zainstaluj SPARROW`,'full'):''}</div>
<div class="card"><h3>${ico('shield')} Ważne podczas treningu</h3><p class="sub">Wbudowany timer odlicza czas niezależnie od odświeżania ekranu. Przy aktywnej Tabacie aplikacja próbuje zapobiegać wygaszeniu wyświetlacza. Dźwięk z jednoczesną muzyką i działanie po zablokowaniu telefonu trzeba przetestować na konkretnym Androidzie.</p></div><div class="footnote">SPARROW — prototyp 1.0 · brak konta, serwera i wysyłania danych. W tej wersji dane nie są szyfrowane dodatkowym hasłem aplikacji; korzystaj z blokady ekranu telefonu.</div>`;}
function durationPhases(p){let tab=p.tabata,phase=[];const n=Math.max(1,p.exercises.length),r=asNum(tab.rounds,2,1,20),work=asNum(tab.work,60,5,600),rest=asNum(tab.rest,40,0,600),between=asNum(tab.between,120,0,1800),prep=asNum(tab.prep,10,0,120);if(prep)phase.push({kind:'prep',label:'Przygotowanie',sec:prep,round:0,station:0});for(let round=1;round<=r;round++){for(let station=1;station<=n;station++){phase.push({kind:'work',label:p.type==='group'?'ĆWICZENIE':'PRACA',sec:work,round,station});if(station<n&&rest>0)phase.push({kind:'rest',label:'ZMIANA STANOWISKA',sec:rest,round,station});}if(round<r&&between>0)phase.push({kind:'between',label:'PRZERWA MIĘDZY OBWODAMI',sec:between,round,station:n});}return phase;}
function timerView(){if(!timer)return '<div class="card empty">Timer jest niedostępny.</div>';let p=findPlan(timer.planId),ph=timer.phases[timer.idx],done=timer.idx>=timer.phases.length;if(!p){return '<div class="card empty">Nie znaleziono planu timera.</div>';}let n=p.exercises.length,sec=done?0:Math.max(0,Math.ceil(timer.remainingMs/1000));let ratio=done?0:Math.max(0,Math.min(100,timer.remainingMs/(ph.sec*1000)*100));return `<div class="row between" style="margin-bottom:11px"><button class="back" data-action="timer-exit">${ico('back')} Zakończ timer</button><span class="chip">${ico('offline')} OFFLINE</span></div><div class="timer-screen"><div class="timer-hero ${done?'done':ph?.kind!=='work'?'rest':''}"><div class="eyebrow">SPARROW / ${esc(p.name)}</div><div class="timer-phase" id="timer-phase">${done?'TRENING ZAKOŃCZONY':esc(ph.label)}</div><div class="timer-number" id="timer-count" role="timer" aria-live="off">${fmtTime(sec)}</div><div class="timer-meta" id="timer-meta">${done?'Wszystkie obwody zakończone':ph.kind==='prep'?'Zajmijcie stanowiska':ph.kind==='between'?`Obwód ${ph.round} zakończony`:`Obwód ${ph.round}/${p.tabata.rounds} · Zmiana ${ph.station}/${n}`}</div><div class="timer-progress"><div class="timer-fill" id="timer-fill" style="width:${ratio}%"></div></div><div class="sub">${done?'Świetna robota!':timer.running?'Odliczanie trwa': 'Pauza'}</div></div>
${done?`${btn('timer-complete',`${ico('check')} Zapisz wykonany trening`,'full big')}<div style="height:12px"></div>${btn('timer-exit',`Wróć do planu`,'secondary full')}`:`<div class="timer-controls">${btn('timer-backphase',`${ico('back')} Wstecz`,'secondary')}${btn('timer-toggle',`${ico(timer.running?'pause':'play')} ${timer.running?'Pauza':'Wznów'}`,'')}${btn('timer-next',`Dalej ${ico('skip')}`,'secondary')}</div><div class="timer-info"><div><span>Obwód</span><strong>${ph.round||'—'} / ${p.tabata.rounds}</strong></div><div><span>Stanowisko</span><strong>${ph.station||'—'} / ${n}</strong></div></div><div class="card"><div class="row between"><strong>${ico('sound')} Sygnały</strong><span class="data-tag">${data.settings.sound?'włączone':'wyłączone'}</span></div><p class="sub" style="margin:8px 0 0">${p.type==='group'?'Każdy uczestnik przechodzi na kolejne stanowisko po sygnale. Numer oznacza aktualną zmianę, nie ćwiczenie konkretnej osoby.':`Aktualne ćwiczenie: ${esc(p.exercises[Math.max(0,(ph.station||1)-1)]?.name||'—')}`}</p></div>`}</div>`;}
function renderModal(){if(!modal)return '';let c=modal.clientId?findClient(modal.clientId):null;
if(modal.kind==='client'){return `<div class="modal-wrap" id="modal-wrap"><div class="modal" role="dialog" aria-modal="true" aria-label="Podopieczny"><div class="row between"><h2>${c?'Edytuj kartotekę':'Nowy podopieczny'}</h2><button class="mini-ico" data-action="close-modal" aria-label="Zamknij">${ico('close')}</button></div>${input('Imię lub nazwa podopiecznego','client-name',c?.name||'','text','maxlength="100" placeholder="np. Jan Kowalski"') }<div class="field"><label>Notatki ogólne (opcjonalne)</label><textarea id="client-notes" rows="3" placeholder="Cel treningowy, wskazówki">${esc(c?.notes||'')}</textarea></div>${btn('save-client',`${ico('check')} Zapisz`,'full big')}</div></div>`;}
if(modal.kind==='progress'){return `<div class="modal-wrap" id="modal-wrap"><div class="modal" role="dialog" aria-modal="true" aria-label="Dodaj postęp"><div class="row between"><h2>Zapisz postęp</h2><button class="mini-ico" data-action="close-modal">${ico('close')}</button></div><p class="sub">${esc(c?.name)}</p>${input('Ćwiczenie / umiejętność','progress-exercise','','text','placeholder="np. Podciąganie, front lever"')} ${input('Wynik (opcjonalnie)','progress-result','','text','placeholder="np. 8 powtórzeń, 15 s, 30 kg"')}<div class="field"><label>Notatka trenera</label><textarea id="progress-note" rows="3" placeholder="Co się poprawiło? Co ćwiczyć dalej?"></textarea></div>${btn('save-progress',`${ico('check')} Dodaj wpis`,'full big')}</div></div>`;}
return '';}
function render(){let views={home:homeView,group:()=>listView('group'),personal:()=>listView('personal'),library:libraryView,plan:planView,edit:editorView,clients:clientsView,client:clientView,history:historyView,settings:settingsView,timer:timerView};$('#app').innerHTML=shell((views[page]||homeView)())+renderModal();updateOnline();}
function setField(root,path,v){let [a,b]=path.split('.');if(b){root[a]||={};root[a][b]=v;}else root[a]=v;}
function updateDraft(target){if(!draft)return;let path=target.dataset.draft;if(path){let v=target.type==='checkbox'?target.checked:target.value;if(target.type==='number')v=asNum(v,0,0,1800);setField(draft,path,v);}if(target.dataset.ex){let ex=draft.exercises.find(e=>e.id===target.dataset.ex);if(ex)ex[target.dataset.exKey]=target.value;}rememberRoute();}
function saveSnapshot(p){data.logs.push({id:uid(),planId:p.id,name:p.name,type:p.type,clientId:p.clientId||'',exerciseCount:p.exercises.length,usedTabata:!!p.tabata?.enabled,timestamp:Date.now()});return save();}
function downloadText(text,filename){let blob=new Blob([text],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
// SPARROW Sound Pack 1 — built-in Web Audio, works without downloading audio files.
// Individual cues are intentionally isolated to make swapping them for recorded sounds easy.
function timerBeep(kind='work',delay=0){
 if(!data.settings.sound)return;
 try{
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return;
  audioCtx ||= new Audio();
  if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
  const base=audioCtx.currentTime+.012+Math.max(0,delay);
  const tone=(offset,frequency,duration,volume=.12,wave='sine',finalFrequency=null)=>{
   const at=base+offset,stop=at+duration,osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
   osc.type=wave;
   osc.frequency.setValueAtTime(frequency,at);
   if(finalFrequency)osc.frequency.exponentialRampToValueAtTime(finalFrequency,stop);
   gain.gain.setValueAtTime(.0001,at);
   gain.gain.exponentialRampToValueAtTime(volume,at+.014);
   gain.gain.setValueAtTime(volume*.74,at+Math.min(duration*.45,.18));
   gain.gain.exponentialRampToValueAtTime(.0001,stop);
   osc.connect(gain);gain.connect(audioCtx.destination);osc.start(at);osc.stop(stop+.015);
  };
  const bell=(offset,freq)=>{
   tone(offset,freq,.92,.12,'sine');
   tone(offset,freq*2.02,.75,.055,'sine');
   tone(offset,freq*2.75,.57,.026,'sine');
  };
  switch(kind){
   case 'count':tone(0,880,.135,.15,'triangle');tone(0,1320,.105,.035);break;
   case 'countdown':for(let i=0;i<3;i++){tone(i,880,.135,.15,'triangle');tone(i,1320,.105,.035);}break;
   case 'work':tone(0,1250,.36,.16,'triangle');tone(0,1650,.28,.052);break;
   case 'end':
    tone(0,310,.7,.10,'sawtooth',235);
    tone(0,465,.68,.085,'triangle',365);
    tone(.035,940,.59,.04,'square',760);
    break;
   case 'rest':tone(0,590,.2,.12,'triangle');tone(.23,500,.23,.13,'triangle');break;
   case 'between':tone(0,520,.25,.13,'triangle');tone(.29,440,.26,.13,'triangle');break;
   case 'done':bell(0,770);bell(.43,990);break;
   case 'prep':tone(0,740,.18,.09,'sine');break;
   case 'demo':
    // Last three seconds -> end of work -> rest -> new work -> final double gong.
    for(let i=0;i<3;i++)tone(i,880,.135,.15,'triangle');
    tone(3.02,310,.7,.10,'sawtooth',235);
    tone(3.02,465,.68,.085,'triangle',365);
    tone(3.76,590,.2,.12,'triangle');tone(3.99,500,.23,.13,'triangle');
    tone(5,1250,.36,.16,'triangle');tone(5,1650,.28,.052);
    bell(6,770);bell(6.43,990);
    break;
  }
 }catch(e){console.warn('Sound unavailable:',e);}
 if(!delay&&kind!=='count'&&kind!=='demo'&&data.settings.vibration&&'vibrate' in navigator){
  navigator.vibrate(kind==='end'?[160]:kind==='done'?[110,110,110]:[70]);
 }
}
async function requestWake(){if(!('wakeLock' in navigator)||wakeLock||document.hidden)return;try{wakeLock=await navigator.wakeLock.request('screen');wakeLock.addEventListener('release',()=>wakeLock=null);}catch(e){/* Android/browser may deny */}}
async function releaseWake(){try{await wakeLock?.release();}catch(e){}wakeLock=null;}
function startTimer(p){if(!p.exercises.length||!p.tabata?.enabled){notify('Włącz Tabatę i dodaj ćwiczenia.');return;}timer={planId:p.id,phases:durationPhases(p),idx:0,running:true,remainingMs:0,deadline:0,lastBeepSecond:0};timer.remainingMs=timer.phases[0].sec*1000;timer.deadline=Date.now()+timer.remainingMs;rememberRoute();page='timer';pushRoute();render();timerBeep(timer.phases[0].kind);requestWake();clearInterval(ticker);ticker=setInterval(tick,100);}
function tick(){if(!timer)return;if(!timer.running)return;let now=Date.now();let guard=0;while(timer&&timer.idx<timer.phases.length&&now>=timer.deadline&&guard++<3000){const prev=timer.phases[timer.idx];timer.idx++;if(timer.idx>=timer.phases.length){timer.running=false;timer.remainingMs=0;clearInterval(ticker);releaseWake();if(prev.kind==='work'){timerBeep('end');timerBeep('done',.82);}else timerBeep('done');render();return;}let next=timer.phases[timer.idx];timer.deadline+=next.sec*1000;timer.lastBeepSecond=0;if(prev.kind==='work'){timerBeep('end');timerBeep(next.kind,.82);}else timerBeep(next.kind);render();}
 if(!timer||timer.idx>=timer.phases.length)return;timer.remainingMs=Math.max(0,timer.deadline-now);let remainSeconds=Math.ceil(timer.remainingMs/1000);let ph=timer.phases[timer.idx];if(ph.kind==='work'&&remainSeconds<=3&&remainSeconds>=1&&remainSeconds!==timer.lastBeepSecond){timer.lastBeepSecond=remainSeconds;timerBeep('count');}let n=$('#timer-count'),bar=$('#timer-fill');if(n)n.textContent=fmtTime(timer.remainingMs/1000);if(bar&&ph)bar.style.width=`${Math.max(0,Math.min(100,timer.remainingMs/(ph.sec*1000)*100))}%`;
}
function timerToggle(){if(!timer||timer.idx>=timer.phases.length)return;if(timer.running){timer.remainingMs=Math.max(0,timer.deadline-Date.now());timer.running=false;releaseWake();}else{timer.running=true;timer.deadline=Date.now()+timer.remainingMs;requestWake();}render();}
function timerMove(dir){if(!timer)return;timer.idx=Math.min(timer.phases.length,Math.max(0,timer.idx+dir));timer.lastBeepSecond=0;if(timer.idx===timer.phases.length){timer.running=false;timer.remainingMs=0;clearInterval(ticker);releaseWake();timerBeep('done');render();return;}let ph=timer.phases[timer.idx];timer.remainingMs=ph.sec*1000;timer.deadline=Date.now()+timer.remainingMs;timerBeep(ph.kind);render();}
function stopTimer(){clearInterval(ticker);timer=null;releaseWake();}
function leaveTimer(){if(timer&&timer.idx<timer.phases.length&&!confirm('Zakończyć działanie timera?'))return;const id=timer?.planId;stopTimer();if(navigationDepth>0){backTo('plan');return;}page='plan';planId=id;replaceRoute();render();}
// Event delegation — views are re-rendered as independent screens.
document.addEventListener('input',e=>{if(e.target?.matches('[data-draft],[data-ex]'))updateDraft(e.target);});
document.addEventListener('change',async e=>{
 let t=e.target;if(t.matches('[data-draft]')){updateDraft(t);if(t.dataset.draft==='type'){addingClientInline=false;if(draft.type==='group')draft.clientId='';render();}else if(t.dataset.draft==='clientId'){addingClientInline=t.value==='__new__';if(addingClientInline)draft.clientId='';render();if(addingClientInline)$('#p-client-new')?.focus();}}
 if(t.matches('[data-setting]')){data.settings[t.dataset.setting]=t.checked;await save();}
 if(t.id==='import-file'&&t.files[0]){try{let contents=await t.files[0].text(),candidate=JSON.parse(contents);if(!candidate||!Array.isArray(candidate.plans)||!Array.isArray(candidate.clients)||!Array.isArray(candidate.logs)||candidate.version!==1)throw Error('Nieobsługiwany plik kopii.');if(!confirm('Przywrócenie kopii ZASTĄPI wszystkie obecne plany i kartoteki. Czy kontynuować?'))return;data={version:1,plans:candidate.plans,clients:candidate.clients,logs:candidate.logs,settings:candidate.settings||{sound:true,vibration:false}};await save();page='home';draft=null;modal=null;replaceRoute();render();notify('Kopia przywrócona.');}catch(err){alert('Nie udało się odczytać kopii: '+err.message);}finally{t.value='';}}
});
document.addEventListener('click',async e=>{let button=e.target.closest('[data-action]');if(!button)return;let a=button.dataset.action,id=button.dataset.id;try{
 switch(a){
  case 'goto':goto(button.dataset.page,id);break;
  case 'back':backTo(button.dataset.fallback||'home');break;
  case 'open-plan':goto('plan',id);break;
  case 'new-plan':rememberRoute();addingClientInline=false;draft=newPlan(button.dataset.type||'group');if(button.dataset.client)draft.clientId=button.dataset.client;planId=draft.id;page='edit';pushRoute();render();window.scrollTo(0,0);break;
  case 'edit-plan':{let p=findPlan(id);if(p){rememberRoute();addingClientInline=false;planId=id;draft=structuredClone(p);page='edit';pushRoute();render();window.scrollTo(0,0);}break;}
  case 'save-plan':{if(!draft)return;draft.name=draft.name.trim();if(!draft.name){alert('Wpisz nazwę treningu.');$('#p-name')?.focus();break;}draft.exercises=draft.exercises.filter(x=>x.name.trim());if(!draft.exercises.length){alert('Dodaj przynajmniej jedno ćwiczenie.');break;}draft.tabata.work=asNum(draft.tabata.work,60,5,600);draft.tabata.rest=asNum(draft.tabata.rest,40,0,600);draft.tabata.rounds=asNum(draft.tabata.rounds,2,1,20);draft.tabata.between=asNum(draft.tabata.between,120,0,1800);draft.tabata.prep=asNum(draft.tabata.prep,10,0,120);if(draft.type==='personal'&&addingClientInline){if(!($('#p-client-new')?.value||'').trim()){alert('Wpisz imię i nazwisko lub wybierz zapisaną osobę.');$('#p-client-new')?.focus();break;}assignTypedClientFromForm();}draft.updatedAt=Date.now();draft.demo=false;let i=data.plans.findIndex(x=>x.id===draft.id),editing=i>=0;if(i<0)data.plans.push(draft);else data.plans[i]=draft;planId=draft.id;draft=null;addingClientInline=false;await save();if(editing&&navigationDepth>0){notify('Plan zapisany w telefonie.');backTo('plan');}else{page='plan';replaceRoute();render();notify('Plan zapisany w telefonie.');window.scrollTo(0,0);}break;}
  case 'add-ex':draft?.exercises.push({id:uid(),name:'',sets:'',reps:'',load:'',note:''});render();break;
  case 'remove-ex':if(draft){draft.exercises=draft.exercises.filter(x=>x.id!==id);render();}break;
  case 'move-ex':{let i=draft?.exercises.findIndex(x=>x.id===id),j=i+Number(button.dataset.dir);if(i>=0&&j>=0&&j<draft.exercises.length){[draft.exercises[i],draft.exercises[j]]=[draft.exercises[j],draft.exercises[i]];render();}break;}
  case 'clone-plan':{let p=findPlan(id);if(!p)break;let c=structuredClone(p);c.id=uid();c.name=p.name+' – kopia';c.date=today();c.createdAt=c.updatedAt=Date.now();c.demo=false;c.exercises=c.exercises.map(x=>({...x,id:uid()}));data.plans.push(c);await save();rememberRoute();planId=c.id;page='plan';pushRoute();render();notify('Utworzono kopię treningu.');break;}
  case 'delete-plan':{let p=findPlan(id);if(p&&confirm(`Usunąć plan „${p.name}”? Historia wykonanych treningów zostanie zachowana.`)){data.plans=data.plans.filter(x=>x.id!==id);await save();notify('Plan usunięty.');backTo(p.type==='personal'?'personal':'group');}break;}
  case 'complete-plan':{let p=findPlan(id);if(p){await saveSnapshot(p);notify('Trening dodany do historii.');rememberRoute();page='history';pushRoute();render();}break;}
  case 'add-client-inline':{
   const input=$('#p-client-new');
   if(!(input?.value||'').trim()){notify('Wpisz imię i nazwisko osoby.');input?.focus();break;}
   const result=assignTypedClientFromForm();
   if(result){if(result.created)await save();addingClientInline=false;render();notify(result.created?'Osoba dodana i przypisana do treningu.':'Wybrano istniejącego podopiecznego.');}
   break;
  }
  case 'new-client':rememberRoute();modal={kind:'client'};pushRoute();render();break;
  case 'open-client':clientId=id;goto('client',id);break;
  case 'edit-client':rememberRoute();modal={kind:'client',clientId:id};pushRoute();render();break;
  case 'close-modal':backTo('clients');break;
  case 'save-client':{let name=$('#client-name')?.value.trim(),notes=$('#client-notes')?.value.trim()||'';if(!name){alert('Wpisz imię lub nazwę podopiecznego.');break;}let c=modal?.clientId?findClient(modal.clientId):null,editing=!!c;if(c){c.name=name;c.notes=notes;}else{c={id:uid(),name,notes,progress:[]};data.clients.push(c);}modal=null;clientId=c.id;await save();if(editing&&navigationDepth>0){notify('Kartoteka zapisana.');backTo('client');}else{page='client';replaceRoute();render();notify('Kartoteka zapisana.');}break;}
  case 'add-progress':rememberRoute();modal={kind:'progress',clientId:id};pushRoute();render();break;
  case 'save-progress':{let c=findClient(modal?.clientId);if(!c)break;let exercise=$('#progress-exercise')?.value.trim()||'',result=$('#progress-result')?.value.trim()||'',note=$('#progress-note')?.value.trim()||'';if(!exercise&&!result&&!note){alert('Wpisz wynik albo notatkę.');break;}c.progress||=[];c.progress.push({id:uid(),exercise,result,note,timestamp:Date.now()});await save();notify('Postęp zapisany.');backTo('client');break;}
  case 'delete-progress':{let c=findClient(id);if(c&&confirm('Usunąć ten wpis postępu?')){c.progress=(c.progress||[]).filter(x=>x.id!==button.dataset.progress);await save();render();}break;}
  case 'delete-client':{let c=findClient(id);if(c&&confirm(`Usunąć kartotekę „${c.name}” i wszystkie notatki o postępach? Plany treningowe zostaną zachowane bez przypisanej osoby.`)){data.clients=data.clients.filter(x=>x.id!==id);data.plans.filter(x=>x.clientId===id).forEach(x=>x.clientId='');await save();page='clients';replaceRoute();render();}break;}
  case 'delete-log':if(confirm('Usunąć ten wpis z historii?')){data.logs=data.logs.filter(x=>x.id!==id);await save();render();}break;
  case 'start-timer':startTimer(findPlan(id));break;
  case 'timer-toggle':timerToggle();break;
  case 'timer-next':timerMove(1);break;
  case 'timer-backphase':timerMove(-1);break;
  case 'timer-exit':leaveTimer();break;
  case 'timer-complete':{let p=timer&&findPlan(timer.planId);if(p){await saveSnapshot(p);stopTimer();page='history';replaceRoute();render();notify('Trening zapisany w historii.');}break;}
  case 'test-audio':timerBeep('demo');notify('Odtwarzanie: 3, 2, 1 → koniec pracy → przerwa → START → gong.');break;
  case 'test-audio-cue':timerBeep(button.dataset.kind||'work');notify('Odtworzono sygnał testowy.');break;
  case 'export':downloadText(JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2),'SPARROW-kopia-'+today()+'.json');notify('Pobrano kopię zapasową.');break;
  case 'import':$('#import-file')?.click();break;
  case 'install':if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;render();}break;
 }
 }catch(err){console.error(err);alert('Wystąpił błąd aplikacji: '+err.message);}
});
window.addEventListener('beforeunload',e=>{if(timer?.running){e.preventDefault();e.returnValue='';}});
init();