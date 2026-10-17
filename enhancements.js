/* Huddle v0.2 enhancements: local-first interactive functionality */
(()=> {
const style=document.createElement('style');style.textContent=`
:root{--accent:#7779ff}body.light{filter:none;background:#ececf3;color:#242538}body.light .main{background:#f8f8fc;color:#222435}body.light .side,body.light .members{background:#ebecf5;color:#242538}body.light .top,body.light .brand{border-color:#d4d5e4}body.light .channel.active{background:#d7d9f4;color:#272a45}body.light .message p{color:#36394c}body.light .composer{background:#e7e8f0}body.light .composer input{color:#25273b}body.light .message .name{color:#242538}.toolbar{display:flex;gap:5px;align-items:center;flex-wrap:wrap}.tiny{border-radius:7px;padding:5px 7px;color:#b9bacd;font-size:12px;transition:.16s}.tiny:hover{background:#45485d;color:white}.message:hover{background:#ffffff06;border-radius:10px}.message .tools{opacity:0;transition:.15s}.message:hover .tools,.message:focus-within .tools{opacity:1}.message .content{flex:1}.reaction{border:1px solid #50516a;border-radius:8px;padding:4px 8px;margin:4px 5px 0 0;font-size:12px;background:#393b4c}.reaction:hover{border-color:#999cff}.toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:#5056a8;color:white;padding:12px 18px;border-radius:12px;z-index:20;box-shadow:0 12px 40px #0006;animation:appear .2s}.dmhead{margin:16px 8px 8px;color:#a4a5b6;font-size:11px;letter-spacing:1px;font-weight:800}.searchbar{background:#171821;border:1px solid #424458;color:white;border-radius:9px;padding:11px;width:100%;margin:8px 0}.topnav{display:flex;gap:7px;align-items:center}.topnav button{padding:8px 10px;border-radius:8px;color:#bfc0d2}.topnav button:hover{background:#393b4c}.badgepin{font-size:11px;color:#eac36c}.side button,.top button{transition:background .16s,transform .16s}.side button:active,.top button:active{transform:scale(.96)}@media(max-width:650px){.topnav button{padding:5px}.toolbar{gap:0}.message .tools{opacity:1}}
`;document.head.append(style);
const oldRender=render;
const oldDefaults=defaults;
if(!state.dms)state.dms=[{id:'dm-welcome',name:'Huddle Bot'}];
if(!state.pins)state.pins={};
if(!state.reactions)state.reactions={};
if(!state.theme)state.theme='dark';
if(!state.customStatus)state.customStatus='Online';
if(!state.view)state.view='server';
if(!state.unread)state.unread={};
const baseRender=render;
render=function(){
document.body.classList.toggle('light',state.theme==='light');
if(state.view==='dm') {state.selectedServer='home';state.selectedChannel='general'}
baseRender();
const brand=document.querySelector('.brand');
if(brand){brand.insertAdjacentHTML('beforeend','<button title="Snelle acties" id="quickActions">⋯</button>')}
const rail=document.querySelector('.rail');
if(rail){rail.insertAdjacentHTML('afterbegin','<button class="server '+(state.view==='dm'?'active':'')+'" id="dmHome" title="Privéberichten">✉</button>')}
const top=document.querySelector('.top');
if(top){top.insertAdjacentHTML('beforeend','<div class="topnav"><button id="findAll" title="Zoeken">⌕</button><button id="pinned" title="Vastgepinde berichten">📌</button><button id="toggleTheme" title="Thema wisselen">◐</button></div>')}
const side=document.querySelector('.channels');
if(side&&state.view==='dm'){side.innerHTML='<div class="section">PRIVÉBERICHTEN <button id="newDM">＋</button></div>'+state.dms.map(d=>'<button class="channel '+(state.activeDM===d.id?'active':'')+'" data-dm="'+esc(d.id)+'">◉ '+esc(d.name)+'</button>').join('')+'<p style="padding:12px;color:#9698aa;font-size:12px">Privéberichten zijn in deze versie lokaal opgeslagen.</p>'}
if(state.view==='dm'){
const d=state.dms.find(x=>x.id===state.activeDM)||state.dms[0];state.activeDM=d.id;
const c=document.querySelector('.top strong');if(c)c.textContent='✉ '+d.name;
const messages=document.querySelector('#messages');
if(messages){messages.innerHTML='<div class="welcome"><div class="big">✉</div><h1>'+esc(d.name)+'</h1><p>Privégesprek (alleen lokaal).</p></div>'+(state.messages[d.id]||[]).map(m=>messageMarkup(m,d.id)).join('');messages.scrollTop=messages.scrollHeight}
const composer=document.querySelector('#composer input');if(composer)composer.placeholder='Bericht aan '+d.name;
}
if(state.view!=='dm'){
const messages=document.querySelector('#messages');
if(messages){const key=channel().id;messages.innerHTML='<div class="welcome"><div class="big">#</div><h1>Welkom bij #'+esc(channel().name)+'</h1><p>Dit is het begin van dit kanaal.</p></div>'+(state.messages[key]||[]).map(m=>messageMarkup(m,key)).join('');messages.scrollTop=messages.scrollHeight}
}
const me=document.querySelector('.me small');if(me)me.textContent='● '+state.customStatus;
save();
};
function messageMarkup(m,key){const reactions=state.reactions[m.id]||{};return '<article class="message"><div class="avatar">'+esc(m.author[0].toUpperCase())+'</div><div class="content"><span class="name">'+esc(m.author)+'</span><time>'+new Date(m.time).toLocaleString('nl-NL',{dateStyle:'short',timeStyle:'short'})+'</time> '+(m.edited?'<span class="muted" style="font-size:11px">(bewerkt)</span>':'')+(state.pins[m.id]?'<span class="badgepin">📌 Vastgepind</span>':'')+'<p>'+esc(m.text)+'</p><div>'+Object.entries(reactions).filter(([,v])=>v>0).map(([emoji,n])=>'<button class="reaction" data-react="'+esc(m.id)+'" data-emoji="'+esc(emoji)+'">'+esc(emoji)+' '+n+'</button>').join('')+'</div><div class="toolbar tools"><button class="tiny" data-react="'+esc(m.id)+'" data-emoji="❤️">❤️</button><button class="tiny" data-react="'+esc(m.id)+'" data-emoji="👍">👍</button><button class="tiny" data-react="'+esc(m.id)+'" data-emoji="😂">😂</button><button class="tiny" data-pin="'+esc(m.id)+'">📌</button><button class="tiny" data-copy="'+esc(m.id)+'">Kopieer</button>'+(m.author===state.username?'<button class="tiny" data-edit="'+esc(m.id)+'">Bewerk</button><button class="tiny" data-delete="'+esc(m.id)+'">Verwijder</button>':'')+'</div></div></article>'}
function currentKey(){return state.view==='dm'?state.activeDM:channel().id}
function toast(t){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=t;document.body.append(el);setTimeout(()=>el.remove(),2500)}
function inputDialog(title,description,placeholder,fn){const value=prompt(title+'\n'+description,placeholder||'');if(value!==null&&value.trim())fn(value.trim())}
document.addEventListener('click',async e=>{
const b=e.target.closest('button');if(!b)return;
if(b.id==='dmHome'){state.view='dm';render()}
else if(b.dataset.dm){state.view='dm';state.activeDM=b.dataset.dm;render()}
else if(b.id==='newDM'){inputDialog('Nieuw privégesprek','Voer een naam in. Dit is nog een lokaal gesprek.','Vriend',name=>{const d={id:'dm-'+id(),name};state.dms.push(d);state.activeDM=d.id;render()})}
else if(b.dataset.server||b.dataset.channel||b.hasAttribute('data-home')){state.view='server';setTimeout(render,0)}
else if(b.id==='toggleTheme'){state.theme=state.theme==='dark'?'light':'dark';render()}
else if(b.id==='quickActions'){const choice=prompt('Snelle acties: 1 Profielstatus, 2 Kanaal hernoemen, 3 Kanaal verwijderen, 4 Data exporteren, 5 Alle data wissen','1');if(choice==='1')inputDialog('Status','Je zichtbare status','Beschikbaar',v=>{state.customStatus=v;render()});if(choice==='2')inputDialog('Kanaal hernoemen','Nieuwe naam',channel().name,v=>{channel().name=v;render()});if(choice==='3'&&confirm('Dit kanaal verwijderen?')){if(server().channels.length<2){toast('Er moet minimaal één kanaal blijven');return}const key=channel().id;server().channels=server().channels.filter(c=>c.id!==key);state.selectedChannel=server().channels[0].id;render()}if(choice==='4'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='huddle-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}if(choice==='5'&&confirm('Alle lokale Huddle-gegevens wissen?')){localStorage.removeItem(KEY);location.reload()}}
else if(b.id==='findAll'){inputDialog('Zoek in berichten','Zoek door je lokale gesprekken','',q=>{const found=Object.entries(state.messages).flatMap(([key,ms])=>ms.filter(m=>m.text.toLowerCase().includes(q.toLowerCase())).map(m=>key+' · '+m.author+': '+m.text));alert(found.length+' resultaten\n\n'+found.slice(0,20).join('\n'))})}
else if(b.id==='pinned'){const found=Object.values(state.messages).flat().filter(m=>state.pins[m.id]);alert(found.length?'Vastgepinde berichten:\n\n'+found.map(m=>m.author+': '+m.text).join('\n'):'Er zijn nog geen vastgepinde berichten.')}
else if(b.dataset.react){const key=b.dataset.react;const emoji=b.dataset.emoji;state.reactions[key]??={};state.reactions[key][emoji]=(state.reactions[key][emoji]||0)+1;render()}
else if(b.dataset.pin){state.pins[b.dataset.pin]=!state.pins[b.dataset.pin];render()}
else if(b.dataset.copy){const m=Object.values(state.messages).flat().find(x=>x.id===b.dataset.copy);if(m){try{await navigator.clipboard.writeText(m.text);toast('Bericht gekopieerd')}catch{toast('Kopiëren niet toegestaan')}}}
else if(b.dataset.edit){const m=Object.values(state.messages).flat().find(x=>x.id===b.dataset.edit);if(m&&m.author===state.username)inputDialog('Bericht bewerken','Pas de tekst aan',m.text,v=>{m.text=v;m.edited=true;render()})}
});
document.addEventListener('submit',e=>{if(e.target.id==='composer'&&state.view==='dm'){e.preventDefault();e.stopImmediatePropagation();const input=e.target.elements.message;const value=input.value.trim();if(!value)return;(state.messages[state.activeDM]??=[]).push({id:id(),author:state.username,text:value,time:Date.now()});render()}},true);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#findAll')?.click()}});
render();
})();