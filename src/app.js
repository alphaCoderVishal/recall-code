import { STORAGE_KEY, TYPES, RATINGS, DAY, id, newCard, schedule, dueCards, removeQuestion, validateData, saveData } from './model.js';
import { seedData } from './seed.js';

const app = document.querySelector('#app'), modal = document.querySelector('#modal');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = n => new Date(n).toLocaleString([], {dateStyle:'medium', timeStyle:'short'});
const options = (values, selected) => values.map(v => `<option ${v === selected ? 'selected' : ''}>${esc(v)}</option>`).join('');
let data, blocked = false;
try { const stored = localStorage.getItem(STORAGE_KEY); data = stored ? validateData(JSON.parse(stored)) : seedData(); if (!stored) saveData(localStorage, data); }
catch { data = {version:1,questions:[],cards:[],history:[]}; blocked = true; }
let screen = 'review', selected = data.questions[0]?.id, query = '', difficulty = '', contextOpen = true, contextTab = 'problem', revealed = false;
let queue = dueCards(data).map(c => c.id), completed = 0, sessionTotal = queue.length;
let noticeTimer;
function notify(message) { const el = document.querySelector('#notice'); el.textContent = message; el.hidden = false; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { el.hidden = true; }, 6500); }
function commit(next) {
  if (blocked) { notify('Restore a valid backup from Data & backup before editing. Existing data has not been overwritten.'); return false; }
  try { saveData(localStorage, next); data = next; return true; }
  catch { notify('Could not save. Browser storage may be full or unavailable. Export a backup before continuing.'); return false; }
}
const activeCard = () => data.cards.find(c => c.id === queue[0]);
function resetSession() { queue = dueCards(data).map(c => c.id); completed = 0; sessionTotal = queue.length; revealed = false; }
function refreshQueue() { queue = queue.filter(cid => data.cards.some(c => c.id === cid && !c.suspended)); if (!activeCard()) revealed = false; }
function contextPanel(question) {
  if (!contextOpen) return '';
  let content = '';
  if (contextTab === 'code') content = `<div class="code-head"><span>${esc(question.language || 'Code')}</span><button data-action="copy-code" class="quiet">Copy code</button></div><pre class="code"><code>${esc(question.code || 'No code saved yet. Add a solution in Edit question.')}</code></pre>`;
  else content = `<div class="prose">${esc(question[contextTab === 'problem' ? 'context' : contextTab] || 'Nothing here yet. Add it in Edit question.')}</div>`;
  return `<aside class="context"><div class="eyebrow context-head">QUESTION CONTEXT <button class="quiet" data-action="context" aria-label="Close question context">×</button></div><h2>${esc(question.title)}</h2><span class="badge ${question.difficulty.toLowerCase()}">${esc(question.difficulty)}</span> <span class="muted small">${esc(question.tags)}</span><div class="tabs" role="group" aria-label="Question context sections">${[['problem','Problem'],['notes','Notes'],['solution','Solution'],['code','Full code']].map(([key, label]) => `<button data-action="context-tab" data-value="${key}" aria-pressed="${contextTab === key}" class="${contextTab === key ? 'active' : ''}">${label}</button>`).join('')}</div>${content}<div class="context-bottom">${question.url ? `<a href="${esc(question.url)}" target="_blank" rel="noopener noreferrer">Open original problem ↗</a>` : ''}<button class="quiet" data-action="edit-question" data-id="${question.id}">Edit question</button></div></aside>`;
}
function reviewView() {
  const card = activeCard(), question = card && data.questions.find(q => q.id === card.questionId);
  if (!card || !question) return `<div class="page-heading"><div><div class="eyebrow">DAILY REVIEW</div><h1>${completed ? 'A little stronger than before.' : 'You’re all caught up.'}</h1><p class="muted">${completed ? `${completed} cards reviewed this session.` : 'No cards are due right now.'}</p></div></div><section class="empty"><div class="empty-icon">✓</div><h2>${data.cards.length ? 'Give your memory some breathing room.' : 'Start with a question you’ve solved.'}</h2><p>${nextDue()}</p><div class="actions"><button class="primary" data-action="check-due">Check for due cards</button><button data-action="navigate" data-value="library">Browse questions</button></div></section>`;
  return `<div class="page-heading"><div><div class="eyebrow">YOUR DAILY PRACTICE</div><h1>A little recall. A stronger intuition.</h1><p class="muted">Focus on the reasoning, one idea at a time.</p></div><button data-action="context" aria-expanded="${contextOpen}">${contextOpen ? 'Hide context' : 'Open question context'}</button></div><div class="workspace ${!contextOpen ? 'closed' : ''} ${contextTab === 'code' ? 'code-open' : ''}"><section class="review"><div class="flash"><div class="flash-meta"><span class="badge">${esc(card.type)}</span><span class="muted small">${completed + 1} / ${sessionTotal}</span></div><div class="question-label">${esc(question.title)} <span class="dot">·</span> ${esc(question.difficulty)}</div><h2 class="prompt">${esc(card.front)}</h2>${revealed ? `<div class="answer"><div class="eyebrow">THE IDEA</div><div class="prose">${esc(card.back)}</div></div>` : '<div class="recall-space"><span>Take a moment. Explain it in your own words.</span></div>'}<div class="flash-footer"><span class="small muted">${revealed ? 'How well did you recall it?' : 'Space to reveal · 1–4 to rate'}</span><button class="${revealed ? '' : 'primary'}" data-action="reveal">${revealed ? 'Hide answer' : 'Reveal answer'}</button></div></div>${revealed ? `<div class="ratings">${RATINGS.map((rating, i) => `<button data-action="rate" data-value="${rating}"><span><kbd>${i+1}</kbd> ${rating}</span><small>${intervalLabel(schedule(card, rating).due - Date.now())}</small></button>`).join('')}</div>` : ''}<div class="progress" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="${sessionTotal}" aria-valuenow="${completed}"><div style="width:${sessionTotal ? completed/sessionTotal*100 : 0}%"></div></div><div class="review-bottom muted small"><span>${completed} of ${sessionTotal} reviewed</span><button class="quiet" data-action="edit-card" data-id="${card.id}">Edit this card</button></div></section>${contextPanel(question)}</div>`;
}
function intervalLabel(ms) { return ms < 120000 ? '1 minute' : `${Math.max(1, Math.round(ms/DAY))} day${Math.round(ms/DAY) === 1 ? '' : 's'}`; }
function nextDue() { const next = data.cards.filter(c => !c.suspended).sort((a,b) => a.due-b.due)[0]; return next ? `Next review: ${date(next.due)}. You can also add a new question.` : 'Add your question context, then create a few focused flashcards.'; }
function questionRows() {
  const matches = data.questions.filter(q => `${q.title} ${q.tags}`.toLowerCase().includes(query.toLowerCase()) && (!difficulty || q.difficulty === difficulty));
  return matches.length ? matches.map(q => { const cards = data.cards.filter(c => c.questionId === q.id), due = cards.filter(c => !c.suspended && c.due <= Date.now()).length;
    return `<article class="question-row"><div class="question-main"><div class="question-title">${esc(q.title)}</div><div class="muted small">${esc(q.tags || 'No tags yet')}</div></div><span class="badge ${q.difficulty.toLowerCase()}">${esc(q.difficulty)}</span><div class="counts">${cards.length} cards<span class="small muted">${due} due</span></div><button data-action="manage" data-id="${q.id}">Manage cards →</button><button class="quiet" data-action="edit-question" data-id="${q.id}" aria-label="Edit ${esc(q.title)}">Edit</button></article>`; }).join('') : '<div class="empty"><h2>No questions found</h2><p>Add a question or change your filters.</p></div>';
}
function libraryView() { return `<div class="page-heading"><div><div class="eyebrow">QUESTION LIBRARY</div><h1>One problem. Several insights.</h1><p class="muted">Save the context once. Recall each idea separately.</p></div><button class="primary" data-action="new-question">+ Add question</button></div><div class="filters"><label class="search-label">Search questions<input id="search" type="search" placeholder="Search titles or tags…" value="${esc(query)}"></label><label>Difficulty<select id="difficulty"><option value="">All difficulties</option>${options(['Easy','Medium','Hard'],difficulty)}</select></label></div><div class="list" id="question-list">${questionRows()}</div>`; }
function studioView() {
  const question = data.questions.find(q => q.id === selected) || data.questions[0]; if (!question) return `<div class="empty"><h1>Your card studio starts with a question.</h1><button class="primary" data-action="new-question">+ Add question</button></div>`;
  selected = question.id; const cards = data.cards.filter(c => c.questionId === selected);
  return `<div class="page-heading"><div><div class="eyebrow">CARD STUDIO</div><h1>Break the solution into ideas.</h1><p class="muted">Each card has its own review schedule.</p></div><button class="primary" data-action="new-card">+ New flashcard</button></div><div class="studio-toolbar"><label>Question<select id="question-select" aria-label="Question">${data.questions.map(q => `<option value="${q.id}" ${q.id === selected ? 'selected' : ''}>${esc(q.title)}</option>`).join('')}</select></label><button data-action="edit-question" data-id="${selected}">Edit question & code</button><button class="danger quiet" data-action="delete-question" data-id="${selected}">Delete question</button></div><div class="card-grid">${cards.length ? cards.map(c => `<article class="study-card"><div class="flash-meta"><span class="badge">${esc(c.type)}</span><span class="small muted">${c.suspended ? 'Paused' : c.due <= Date.now() ? 'Due now' : 'Scheduled'}</span></div><h2>${esc(c.front)}</h2><details><summary>Show answer</summary><div class="prose">${esc(c.back)}</div></details><div class="small muted card-schedule">${c.reviews} reviews · ${c.lapses} lapses<br>Next: ${date(c.due)}</div><div class="actions"><button data-action="edit-card" data-id="${c.id}">Edit</button><button data-action="suspend-card" data-id="${c.id}">${c.suspended ? 'Resume' : 'Pause'}</button><button class="quiet danger" data-action="delete-card" data-id="${c.id}">Delete</button></div></article>`).join('') : '<div class="empty"><h2>No flashcards yet</h2><p>Start with the key insight that made this problem click.</p></div>'}</div>`;
}
function historyView() {
  const history = data.history.slice().reverse();
  return `<div class="page-heading"><div><div class="eyebrow">YOUR PROGRESS</div><h1>Small steps, remembered.</h1><p class="muted">${history.length} reviews recorded · ${dueCards(data).length} cards due now</p></div></div><div class="list">${history.length ? history.slice(0,100).map(r => {const c = data.cards.find(c => c.id === r.cardId), q = data.questions.find(q => q.id === c.questionId); return `<div class="history-row"><div><strong>${esc(q.title)}</strong><div class="muted small">${esc(c.front)}</div></div><span class="badge">${r.rating}</span><time class="muted small">${date(r.at)}</time></div>`;}).join('') : '<div class="empty"><h2>Your first review starts here.</h2><p>Reveal an answer and rate your recall to record progress.</p></div>'}</div>${history.length > 100 ? '<p class="muted small">Showing the latest 100 reviews. Export includes your complete history.</p>' : ''}`;
}
function settingsView() { return `<div class="page-heading"><div><div class="eyebrow">DATA & BACKUP</div><h1>Your practice, under your control.</h1><p class="muted">Saved on this browser. No account or cloud sync.</p></div></div><section class="settings-panel"><h2>Keep a copy of your progress</h2><p>Export includes your questions, code, flashcards, schedules, and review history. Clearing browser data removes the local copy.</p><div class="actions"><button class="primary" data-action="export">Export backup</button><button data-action="import">Restore backup</button></div><input id="import-file" type="file" accept="application/json,.json" hidden><hr><h2>Review scheduling</h2><p>Again: retry after 1 minute. Hard: a short interval. Good: a normal interval. Easy: a longer interval. Each card’s interval adapts independently to your ratings.</p><p class="muted small">This app uses a simple SM-2-inspired scheduler. It does not claim Anki or FSRS compatibility. Question siblings are interleaved when possible. Solutions and full code are hidden behind their tabs.</p><hr><h2>Keyboard shortcuts</h2><p><kbd>Space</kbd> Reveal answer &nbsp; <kbd>1</kbd> Again &nbsp; <kbd>2</kbd> Hard &nbsp; <kbd>3</kbd> Good &nbsp; <kbd>4</kbd> Easy</p></section>`; }
function render() {
  refreshQueue(); const due = dueCards(data).length;
  app.innerHTML = `<header class="app-header"><a class="brand" href="#" data-action="navigate" data-value="review"><span class="brand-mark">&lt;/&gt;</span>recall<span>code</span></a><nav aria-label="Main navigation">${[['review','Daily review'],['library','Questions'],['studio','Card studio'],['history','History']].map(([key,label]) => `<button class="nav-button ${screen === key ? 'active' : ''}" data-action="navigate" data-value="${key}" ${screen === key ? 'aria-current="page"' : ''}>${label}${key === 'review' ? `<span class="nav-count">${due}</span>` : ''}</button>`).join('')}</nav><button class="quiet backup-button" data-action="navigate" data-value="settings">Data & backup</button></header><main id="main">${blocked ? '<div class="warning" role="alert">Saved data could not be loaded. It has not been overwritten. Open Data & backup to export the original data or restore a valid backup.</div>' : ''}${screen === 'review' ? reviewView() : screen === 'library' ? libraryView() : screen === 'studio' ? studioView() : screen === 'history' ? historyView() : settingsView()}</main><footer><span>Remember the reasoning.</span><span>Stored locally · ${data.questions.length} questions · ${data.cards.length} cards</span></footer>`;
}
function openModal(title, body, onSubmit) {
  modal.innerHTML = `<form id="modal-form"><div class="modal-header"><h2 id="modal-title">${title}</h2><button type="button" class="quiet" data-close aria-label="Close dialog">×</button></div>${body}<p class="form-error" role="alert" id="form-error"></p><div class="modal-footer"><button type="button" data-close>Cancel</button><button type="submit" class="primary">Save</button></div></form>`;
  modal.querySelectorAll('[data-close]').forEach(b => b.onclick = () => modal.close());
  modal.querySelector('form').onsubmit = e => { e.preventDefault(); try { onSubmit(new FormData(e.currentTarget)); } catch(error) { modal.querySelector('#form-error').textContent = error.message; } };
  modal.showModal();
}
function field(label, name, value = '', {area=false, required=false, type='text', max=100000} = {}) { return `<label>${label}${area ? `<textarea name="${name}" ${required ? 'required' : ''} maxlength="${max}" ${name === 'code' ? 'class="code-input" spellcheck="false"' : ''}>${esc(value)}</textarea>` : `<input name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required' : ''} maxlength="${max}">`}</label>`; }
function editQuestion(questionId) {
  const q = data.questions.find(q => q.id === questionId) || {id:id(),title:'',difficulty:'Easy',tags:'',url:'',context:'',notes:'',solution:'',code:'',language:'Java'};
  openModal(questionId ? 'Edit question' : 'Add question', `<div class="form-grid">${field('Question title','title',q.title,{required:true,max:200})}<label>Difficulty<select name="difficulty">${options(['Easy','Medium','Hard'],q.difficulty)}</select></label>${field('Topics / tags','tags',q.tags,{max:500})}${field('Original problem URL (optional)','url',q.url,{type:'url',max:2000})}</div>${field('Problem context · examples & constraints','context',q.context,{area:true,required:true})}${field('Personal notes','notes',q.notes,{area:true})}${field('Solution explanation','solution',q.solution,{area:true})}${field('Code language','language',q.language,{max:30})}${field('Full solution code','code',q.code,{area:true})}`, form => {
    const updated = {...q,...Object.fromEntries(form.entries())}; for (const k of Object.keys(updated)) if (typeof updated[k] === 'string') updated[k] = updated[k].trim();
    if (!updated.title || !updated.context) throw new Error('Add a title and question context.');
    if (updated.url && !['http:','https:'].includes(new URL(updated.url).protocol)) throw new Error('Use an http or https URL.');
    const questions = questionId ? data.questions.map(x => x.id === q.id ? updated : x) : [...data.questions,updated];
    if (commit({...data,questions})) { selected=q.id; modal.close(); if (!questionId) screen='studio'; render(); notify('Question saved.'); }
  });
}
function editCard(cardId) {
  const card = data.cards.find(c => c.id === cardId), questionId = card?.questionId || selected;
  if (!questionId) return editQuestion();
  openModal(card ? 'Edit flashcard' : 'New flashcard', `<p class="muted">Linked to ${esc(data.questions.find(q => q.id === questionId).title)}</p><label>Card type<select name="type">${options(TYPES,card?.type || 'Key insight')}</select></label>${field('Front · recall prompt','front',card?.front,{area:true,required:true})}${field('Back · explanation','back',card?.back,{area:true,required:true})}`, form => {
    const front=String(form.get('front')).trim(), back=String(form.get('back')).trim(), type=String(form.get('type')); if (!front || !back) throw new Error('Add both a prompt and an answer.');
    const updated=card ? {...card,front,back,type} : newCard(questionId,front,back,type);
    if (commit({...data,cards:card ? data.cards.map(c => c.id === cardId ? updated : c) : [...data.cards,updated]})) { modal.close(); if (!card) resetSession(); render(); notify('Flashcard saved.'); }
  });
}
function confirmAction(title, text, action, label='Delete') {
  openModal(title, `<p>${esc(text)}</p>`, () => { if (action() !== false) { modal.close(); render(); } }); modal.querySelector('[type="submit"]').textContent=label;
}
function rate(rating) {
  const card = activeCard(); if (!revealed || !card) return;
  const now=Date.now(), updated=schedule(card,rating,now);
  if (commit({...data,cards:data.cards.map(c => c.id === card.id ? updated : c),history:[...data.history,{cardId:card.id,rating,at:now}]})) { queue.shift(); completed++; revealed=false; contextTab='problem'; render(); }
}
async function action(name, value, targetId) {
  if (name === 'navigate') { screen=value; if (screen === 'review' && !queue.length) resetSession(); render(); }
  if (name === 'context') {contextOpen=!contextOpen;render();}
  if (name === 'context-tab') {contextTab=value;render();}
  if (name === 'reveal') {revealed=!revealed;render();}
  if (name === 'rate') rate(value);
  if (name === 'check-due') {resetSession();render();}
  if (name === 'new-question') editQuestion();
  if (name === 'edit-question') editQuestion(targetId);
  if (name === 'manage') {selected=targetId;screen='studio';render();}
  if (name === 'new-card') editCard();
  if (name === 'edit-card') editCard(targetId);
  if (name === 'suspend-card') {if(commit({...data,cards:data.cards.map(c => c.id === targetId ? {...c,suspended:!c.suspended} : c)})){resetSession();render();}}
  if (name === 'delete-question') confirmAction('Delete question?', 'This removes the question, its flashcards, and their review history. Export a backup first if you need to keep a copy.',()=>{if(!commit(removeQuestion(data,targetId)))return false;resetSession();});
  if (name === 'delete-card') confirmAction('Delete flashcard?', 'This removes the card and its review history.',()=>{if(!commit({...data,cards:data.cards.filter(c=>c.id!==targetId),history:data.history.filter(r=>r.cardId!==targetId)}))return false;resetSession();});
  if (name === 'copy-code') {const c=activeCard(),q=data.questions.find(q=>q.id===c?.questionId);try{await navigator.clipboard.writeText(q?.code || '');notify('Code copied.');}catch{notify('Clipboard unavailable. Select the code to copy it.');}}
  if (name === 'export') {
    let raw; try {raw=blocked ? localStorage.getItem(STORAGE_KEY) : JSON.stringify(data,null,2);} catch {notify('Browser storage cannot be read.');return;}
    if(!raw){notify('No stored data available to export.');return;}
    const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=`recallcode-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  if (name === 'import') document.querySelector('#import-file').click();
}
app.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;e.preventDefault();action(b.dataset.action,b.dataset.value,b.dataset.id).catch(()=>notify('That action could not be completed. Your saved data is unchanged.'));});
app.addEventListener('input',e=>{if(e.target.id==='search'){query=e.target.value;document.querySelector('#question-list').innerHTML=questionRows();}});
app.addEventListener('change',async e=>{
  if(e.target.id==='difficulty'){difficulty=e.target.value;document.querySelector('#question-list').innerHTML=questionRows();}
  if(e.target.id==='question-select'){selected=e.target.value;render();}
  if(e.target.id==='import-file'){
    const file=e.target.files[0];if(!file)return;
    try {if(file.size>20*1024*1024)throw new Error('Backup is too large (maximum 20 MB).');const incoming=validateData(JSON.parse(await file.text()));confirmAction('Restore this backup?',`Replace current data with ${incoming.questions.length} questions and ${incoming.cards.length} cards? Export your current data first if needed.`,()=>{try{saveData(localStorage,incoming);data=incoming;blocked=false;selected=data.questions[0]?.id;resetSession();notify('Backup restored.');}catch{notify('Restore failed. Existing data is unchanged.');return false;}},'Replace & restore');}
    catch(error){notify(error instanceof SyntaxError ? 'This file is not valid JSON. No data was changed.' : error.message);}finally{e.target.value='';}
  }
});
document.addEventListener('keydown',e=>{if(modal.open||screen!=='review'||/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(e.target.tagName)||e.ctrlKey||e.altKey||e.metaKey)return;if(e.code==='Space'&&activeCard()){e.preventDefault();revealed=!revealed;render();}if(revealed&&['1','2','3','4'].includes(e.key))rate(RATINGS[Number(e.key)-1]);});
window.addEventListener('storage',e=>{if(e.key!==STORAGE_KEY)return;try{if(!e.newValue)throw new Error();data=validateData(JSON.parse(e.newValue));blocked=false;resetSession();render();notify('Updated from another tab.');}catch{blocked=true;render();notify('Stored data changed unexpectedly. Restore a valid backup before editing.');}});
render();

