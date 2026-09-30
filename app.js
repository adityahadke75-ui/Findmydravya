const seed=[
{name:"Amlaki",sanskrit:"Āmalakī",botanical:"Phyllanthus emblica",family:"Phyllanthaceae",common:"Indian gooseberry, Amla",rasa:"Five tastes except Lavana",guna:"Laghu, Ruksha",virya:"Shita",vipaka:"Madhura",karma:"Rasayana, Tridosha balancing",part:"Fruit",uses:"Traditional Ayurvedic use includes rasayana and digestive support.",features:"Small to medium tree; round pale green-yellow fruits with vertical grooves."},
{name:"Ashwagandha",sanskrit:"Aśvagandhā",botanical:"Withania somnifera",family:"Solanaceae",common:"Indian ginseng",rasa:"Tikta, Kashaya",guna:"Laghu, Snigdha",virya:"Ushna",vipaka:"Madhura",karma:"Balya, Rasayana",part:"Root",uses:"Traditionally used as a rasayana and for supporting strength and vitality.",features:"Low shrub with oval leaves and small greenish flowers; orange-red berries."},
{name:"Arjuna",sanskrit:"Arjuna",botanical:"Terminalia arjuna",family:"Combretaceae",common:"Arjun tree",rasa:"Kashaya",guna:"Laghu, Ruksha",virya:"Shita",vipaka:"Katu",karma:"Hridya, Kashaya",part:"Bark",uses:"Traditional Ayurvedic use includes hridya applications.",features:"Large tree with smooth pale bark and elongated leaves."},
{name:"Ashoka",sanskrit:"Aśoka",botanical:"Saraca asoca",family:"Fabaceae",common:"Ashoka tree",rasa:"Kashaya",guna:"Laghu",virya:"Shita",vipaka:"Katu",karma:"Traditional stri-roga related use",part:"Bark",uses:"Traditional Ayurvedic use includes stri-roga related formulations.",features:"Evergreen tree; dense foliage and clusters of orange-red flowers."},
{name:"Guduchi",sanskrit:"Guḍūcī",botanical:"Tinospora cordifolia",family:"Menispermaceae",common:"Giloy",rasa:"Tikta, Kashaya",guna:"Laghu, Snigdha",virya:"Ushna",vipaka:"Madhura",karma:"Rasayana",part:"Stem",uses:"Traditionally described as a rasayana and used in various Ayurvedic formulations.",features:"Large climbing vine with heart-shaped leaves and characteristic warty stem."},
{name:"Tulsi",sanskrit:"Tulasī",botanical:"Ocimum tenuiflorum",family:"Lamiaceae",common:"Holy basil",rasa:"Katu, Tikta",guna:"Laghu, Ruksha",virya:"Ushna",vipaka:"Katu",karma:"Krimighna, traditional respiratory use",part:"Leaf",uses:"Traditional use in respiratory and digestive formulations.",features:"Aromatic branching herb with opposite leaves and terminal flower spikes."},
{name:"Neem",sanskrit:"Nimba",botanical:"Azadirachta indica",family:"Meliaceae",common:"Neem",rasa:"Tikta, Kashaya",guna:"Laghu, Ruksha",virya:"Shita",vipaka:"Katu",karma:"Krimighna, traditional skin use",part:"Leaf/Bark",uses:"Traditional Ayurvedic use includes skin and cleansing formulations.",features:"Medium-large tree with pinnate leaves and small white fragrant flowers."}
];
let db=JSON.parse(localStorage.getItem("fmd_db")||"null")||seed;
let fav=new Set(JSON.parse(localStorage.getItem("fmd_fav")||"[]"));
function save(){localStorage.setItem("fmd_db",JSON.stringify(db));localStorage.setItem("fmd_fav",JSON.stringify([...fav]))}
function esc(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function go(hash){location.hash=hash}
function card(d){return `<article class="card"><span class="tag">${esc(d.part)}</span><h3>${esc(d.name)}</h3><div class="latin">${esc(d.botanical)}</div><div class="meta"><span>Rasa: ${esc(d.rasa)}</span><span>Virya: ${esc(d.virya)}</span></div><button class="link" onclick='go("#dravya/${encodeURIComponent(d.name)}")'>View Dravya →</button></article>`}
function home(){return `<section class="hero"><div><span class="eyebrow">Modern Ayurvedic reference</span><h1>Find My<br>Dravya 🌿</h1><p>Explore Ayurvedic Dravyas with botanical names, traditional properties and plant identification features.</p><div class="actions"><button class="btn primary" onclick="go('#scan')">📷 Scan a Plant</button><button class="btn secondary" onclick="go('#library')">Explore Library</button></div></div><div class="heroart">🌱</div></section><section class="section"><span class="eyebrow">Featured</span><h2>Popular Dravyas</h2><div class="grid">${db.slice(0,3).map(card).join("")}</div></section>`}
function library(){return `<section class="section"><div class="head"><div><span class="eyebrow">Reference library</span><h2>Ayurvedic Dravyas</h2></div><input class="search" id="search" placeholder="Search Dravya..." oninput="filter(this.value)"></div><div id="results" class="grid">${db.map(card).join("")}</div></section>`}
function filter(q){q=q.toLowerCase();let a=db.filter(d=>Object.values(d).join(" ").toLowerCase().includes(q));document.getElementById("results").innerHTML=a.length?a.map(card).join(""):'<div class="empty card">No Dravya found.</div>'}
function profile(name){let d=db.find(x=>x.name===decodeURIComponent(name));if(!d)return `<section class="section empty">Dravya not found.</section>`;let saved=fav.has(d.name);return `<section class="section profile"><div class="profilehero"><span class="tag">${esc(d.family)}</span><h1>${esc(d.name)}</h1><div class="latin">${esc(d.sanskrit)} • ${esc(d.botanical)}</div><div class="actions"><button class="btn secondary" onclick='toggleFav(${JSON.stringify(d.name)})'>${saved?"♥ Saved":"♡ Save Favorite"}</button><button class="btn secondary" onclick="go('#library')">← Library</button></div></div><div class="facts">${fact("Common names",d.common)}${fact("Rasa",d.rasa)}${fact("Guna",d.guna)}${fact("Virya",d.virya)}${fact("Vipaka",d.vipaka)}${fact("Karma",d.karma)}${fact("Part used",d.part)}${fact("Identification features",d.features)}${fact("Traditional uses",d.uses)}</div></section>`}
function fact(a,b){return `<div class="fact"><b>${esc(a)}</b>${esc(b)}</div>`}
function toggleFav(n){fav.has(n)?fav.delete(n):fav.add(n);save();render();toast(fav.has(n)?"Saved to favorites":"Removed from favorites")}
function favorites(){let a=db.filter(d=>fav.has(d.name));return `<section class="section"><span class="eyebrow">Your collection</span><h2>Favorites</h2><div class="grid">${a.length?a.map(card).join(""):'<div class="empty card">No favorites yet.</div>'}</div></section>`}
let cameraStream=null;
let selectedImageBlob=null;
let plantnetKey=localStorage.getItem('fmd_plantnet_key')||'';
function scan(){return `<section class="section scanner"><span class="eyebrow">Plant scanner</span><h2>Scan or upload a plant</h2><p class="muted">Use your phone camera to take a clear photo of the plant, or choose one from your gallery.</p><div class="drop"><div class="dropicon">📷</div><h3>Plant Scanner</h3><div class="scanbuttons"><button class="btn primary" type="button" onclick="startCamera()">📷 Open Camera</button><button class="btn secondary" type="button" onclick="openGallery()">🖼️ Choose from Gallery</button></div><input id="photoInput" type="file" accept="image/*" onchange="preview(event)" hidden><div id="cameraBox" class="cameraBox" style="display:none"><video id="cameraVideo" class="cameraVideo" autoplay playsinline muted></video><div class="cameraActions"><button class="btn primary" type="button" onclick="capturePhoto()">● Capture</button><button class="btn secondary" type="button" onclick="closeCamera()">Cancel</button></div></div><canvas id="cameraCanvas" style="display:none"></canvas><img id="preview" class="preview" alt="Captured plant photo"><div id="scanmsg"></div></div></section>`}
function openGallery(){let input=document.getElementById('photoInput');if(input)input.click()}
async function startCamera(){
  const box=document.getElementById('cameraBox'),video=document.getElementById('cameraVideo');
  if(!box||!video)return;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    document.getElementById('scanmsg').innerHTML='<div class="card" style="margin-top:18px"><b>Camera is not available in this browser.</b><p class="muted">Please use Chrome on Android and allow camera permission, or use Choose from Gallery.</p></div>';return;
  }
  try{
    cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});
    video.srcObject=cameraStream;box.style.display='block';
    document.getElementById('scanmsg').innerHTML='<p class="muted" style="margin-top:12px">Point the rear camera at the plant and tap Capture.</p>';
  }catch(err){
    let msg='Camera permission was not granted.';
    if(err&&err.name==='NotAllowedError')msg='Camera permission was blocked. In Chrome, open site settings → Camera → Allow, then try again.';
    else if(err&&err.name==='NotFoundError')msg='No camera was found on this device.';
    document.getElementById('scanmsg').innerHTML='<div class="card" style="margin-top:18px"><b>'+esc(msg)+'</b><p class="muted">You can still use Choose from Gallery.</p></div>';
  }
}
function scannerReadyMessage(source){
  return `<div class="card" style="margin-top:18px"><b>${source} ready. ✓</b><p class="muted">Tap <b>Identify Plant</b> to send the image to the plant-recognition service.</p><button class="btn primary" type="button" onclick="identifyPlant()">🔍 Identify Plant</button><button class="btn secondary" type="button" style="margin-left:8px" onclick="go('#owner')">⚙️ AI Settings</button><div id="airesult"></div></div>`;
}
function capturePhoto(){
  const video=document.getElementById('cameraVideo'),canvas=document.getElementById('cameraCanvas'),img=document.getElementById('preview');
  if(!video||!video.videoWidth)return;
  canvas.width=video.videoWidth;canvas.height=video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
  canvas.toBlob(blob=>{
    if(!blob)return;
    selectedImageBlob=blob;
    img.src=URL.createObjectURL(blob);img.style.display='block';
    closeCamera();
    document.getElementById('scanmsg').innerHTML=scannerReadyMessage('Photo captured');
  },'image/jpeg',0.92);
}
function closeCamera(){
  if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;}
  const box=document.getElementById('cameraBox');if(box)box.style.display='none';
}
function preview(e){
  let f=e.target.files&&e.target.files[0];if(!f)return;
  selectedImageBlob=f;
  let u=URL.createObjectURL(f),p=document.getElementById('preview');
  p.src=u;p.style.display='block';
  document.getElementById('scanmsg').innerHTML=scannerReadyMessage('Photo selected');
}
function setPlantnetKey(){
  const input=document.getElementById('plantnetKey');
  if(!input)return;
  plantnetKey=input.value.trim();
  if(plantnetKey)localStorage.setItem('fmd_plantnet_key',plantnetKey); else localStorage.removeItem('fmd_plantnet_key');
  toast(plantnetKey?'PlantNet API key saved on this device':'PlantNet API key removed');
}
function normalizeName(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
function findDravyaBySpecies(scientific){
  const n=normalizeName(scientific);
  return db.find(d=>normalizeName(d.botanical)===n || n.includes(normalizeName(d.botanical)) || normalizeName(d.botanical).includes(n));
}
async function identifyPlant(){
  const result=document.getElementById('airesult');
  if(!selectedImageBlob){if(result)result.innerHTML='<p class="muted">Please capture or choose a plant photo first.</p>';return;}
  if(!plantnetKey){
    if(result)result.innerHTML='<div class="card" style="margin-top:12px"><b>Plant identification is not configured yet.</b><p class="muted">Open AI Settings below, add your own Pl@ntNet API key, authorize this GitHub Pages domain in Pl@ntNet, then try again.</p></div>';
    return;
  }
  if(result)result.innerHTML='<div class="card" style="margin-top:12px"><b>🌿 Identifying plant…</b><p class="muted">Please wait a few seconds.</p></div>';
  try{
    const form=new FormData();
    form.append('images',selectedImageBlob,'plant.jpg');
    form.append('organs','auto');
    const url='https://my-api.plantnet.org/v2/identify/all?api-key='+encodeURIComponent(plantnetKey)+'&lang=en&nb-results=5';
    const res=await fetch(url,{method:'POST',body:form});
    const data=await res.json();
    if(!res.ok)throw new Error(data?.message||data?.error||('HTTP '+res.status));
    const results=Array.isArray(data.results)?data.results:[];
    if(!results.length)throw new Error('No plant identification result was returned. Try a clearer photo of a leaf, flower, fruit, or bark.');
    const top=results[0], sp=top.species||{}, sci=sp.scientificNameWithoutAuthor||sp.scientificName||'Unknown species';
    const confidence=Math.round((Number(top.score)||0)*100);
    const match=findDravyaBySpecies(sci);
    const candidates=results.map((r,i)=>{const ss=r.species||{};const nm=ss.scientificNameWithoutAuthor||ss.scientificName||'Unknown';const pct=Math.round((Number(r.score)||0)*100);return `<div class="fact"><b>${i+1}. ${esc(nm)}</b>${pct}% confidence${ss.commonNames?.length?' • '+esc(ss.commonNames.slice(0,2).join(', ')):''}</div>`}).join('');
    result.innerHTML=`<div class="card ai-result" style="margin-top:12px"><span class="tag">AI identification</span><h3>🌿 ${esc(sci)}</h3><p><b>${confidence}% confidence</b></p>${match?`<p>Matched in your <b>Dravya Library</b>: <b>${esc(match.name)}</b> (${esc(match.sanskrit)})</p><button class="btn primary" type="button" onclick='go("#dravya/${encodeURIComponent(match.name)}")'>View ${esc(match.name)} →</button>`:'<p class="muted">This species was identified, but it is not currently in your Dravya Library.</p>'}<h4 style="margin-top:20px">Top AI results</h4>${candidates}<p class="muted" style="margin-top:12px">AI results are suggestions, not a substitute for expert botanical identification.</p></div>`;
  }catch(err){
    if(result)result.innerHTML='<div class="card" style="margin-top:12px"><b>Identification failed.</b><p class="muted">'+esc(err.message||'Please try again.')+'</p><p class="muted">If this is a CORS/API-key issue, check your Pl@ntNet API settings and make sure <b>https://adityahadke75-ui.github.io</b> is an authorized domain.</p></div>';
  }
}
function owner(){return `<section class="section"><span class="eyebrow">Owner area</span><h2>Aditya — Content Manager</h2><div class="adminnote">Your edits are stored in this browser using local storage. This is suitable for a free static website, but it is not a secure online admin panel.</div><div class="card" style="margin-top:18px"><form class="form" onsubmit="add(event)"><input id="n" required placeholder="Dravya name"><input id="s" placeholder="Sanskrit name"><input id="b" required placeholder="Botanical name"><input id="f" placeholder="Family"><input id="c" placeholder="Common names"><input id="r" placeholder="Rasa"><input id="g" placeholder="Guna"><input id="v" placeholder="Virya"><input id="vp" placeholder="Vipaka"><input id="k" placeholder="Karma"><input id="p" placeholder="Part used"><textarea id="u" placeholder="Traditional uses"></textarea><textarea id="i" placeholder="Identification features"></textarea><button class="btn primary">Add Dravya</button></form></div><h3 style="margin-top:28px">AI Plant Identification</h3><div class="card" style="margin-top:12px"><p><b>Pl@ntNet API</b></p><p class="muted">Your API key is stored only in this browser. Do not paste your key into public code or share it with anyone.</p><div class="form"><input id="plantnetKey" type="password" placeholder="Paste your Pl@ntNet API key" value="${esc(plantnetKey)}"><button class="btn primary" type="button" onclick="setPlantnetKey()">Save AI Key</button></div><p class="muted" style="margin-top:10px">For GitHub Pages, Pl@ntNet must have browser access enabled for your API key and this authorized domain: <b>https://adityahadke75-ui.github.io</b>. The API supports image-based species identification and returns ranked confidence scores.</p></div><h3 style="margin-top:28px">Your local Dravya database</h3>${db.map((d,i)=>`<div class="card listrow" style="margin:9px 0"><b>${esc(d.name)}</b><button class="btn secondary" onclick="del(${i})">Delete</button></div>`).join("")}</section>`}
function add(e){e.preventDefault();db.push({name:n.value,sanskrit:s.value,botanical:b.value,family:f.value,common:c.value,rasa:r.value,guna:g.value,virya:v.value,vipaka:vp.value,karma:k.value,part:p.value,uses:u.value,features:i.value});save();go("#owner");toast("Dravya added")}
function del(i){if(confirm("Delete this local Dravya?")){db.splice(i,1);save();render();toast("Deleted")}}
function render(){let h=location.hash||"#home",parts=h.slice(1).split("/"),p=parts[0];document.getElementById("app").innerHTML=p==="home"?home():p==="library"?library():p==="favorites"?favorites():p==="scan"?scan():p==="owner"?owner():p==="dravya"?profile(parts.slice(1).join("/")):home()}
window.addEventListener("hashchange",render);render();
function toast(t){let x=document.querySelector(".toast");if(!x){x=document.createElement("div");x.className="toast";document.body.appendChild(x)}x.textContent=t;x.style.display="block";setTimeout(()=>x.style.display="none",1700)}