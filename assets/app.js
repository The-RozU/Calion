(function calionPortal(){
  "use strict";
  const sections={
    swiat:{kicker:"ATLAS CALIONU / ODKRYWAJ",title:"Świat i <em>krainy.</em>",desc:"Od gwarnego portu Calionu po chłodne góry Durnhollow. Poznaj miejsca, do których prowadzą szlaki i te, których nie pokazuje żadna mapa."},
    historia:{kicker:"ZAPISKI KRONIKARZY / OŚ CZASU",title:"Kroniki <em>historii.</em>",desc:"Wojny, rozejmy, dawne tajemnice i wydarzenia, które ukształtowały Calion. Prześledź drogę od Wielkiej Wojny z Demonami do obecnej ery."},
    postacie:{kicker:"BIOGRAFIE / ZNANI I NIEZNANI",title:"Postacie <em>Calionu.</em>",desc:"Poznaj postacie, których losy splatają się na ulicach miasta, przy gildyjnych stołach i na szlakach Calionu."},
    bestiariusz:{kicker:"ZAGROŻENIA / BESTIARIUSZ",title:"Cienie i <em>stworzenia.</em>",desc:"Dzikie zwierzęta, potwory i niepokojące osobliwości, jakie można napotkać poza miejskimi murami."},
    frakcje:{kicker:"WŁADZA / GILDIE / TAJEMNICE",title:"Frakcje i <em>organizacje.</em>",desc:"Kto strzeże miasta, kto szuka przygód, a kto działa w cieniu? Poznaj siły kształtujące oblicze królestwa."},
    rasy:{kicker:"LUDY ŚWIATA / KOMPENDIUM",title:"Rasy i <em>ludy.</em>",desc:"Calion zamieszkują przedstawiciele różnych ludów, których historie splatają się na ulicach miast i szlakach przygód."},
    gry:{kicker:"CALION GAMES / GRAJ W PRZEGLĄDARCE",title:"Twoja <em>przygoda.</em>",desc:"Wszystkie gry osadzone w uniwersum Calionu. Uruchom wybrany tytuł tutaj, bez instalacji, a potem rozwiń go na pełny ekran."}
  };
  const mapNames=['calion','elderon','durnhollow','bagna-milczenia','orklag','vellan'];
  const locationMap=(entry)=>'./assets/images/mapa-'+(mapNames.includes(entry.map)?entry.map:'calion')+'.webp';
  let entries=[],contentReady=false;
  const games=[
    {id:"survivors",name:"Calion Survivors",type:"Survival action / roguelite",desc:"Grywalny prototyp walki z falami przeciwników. Łotrzyk, broń i przetrwanie na Zapomnianym Trakcie.",version:"0.0.18",available:false,url:"./survivors/",icon:"i-sword",cover:"survivors",coverText:"ZAPOMNIANY TRAKT"},
    {id:"karcianka",name:"Karciana Szulernia",type:"Karcianka / taktyka",desc:"Karciane pojedynki w karczemnym klimacie Calionu. Osobna gra dostępna na GitHub Pages.",version:"zewnętrzny projekt",available:false,url:"https://the-rozu.github.io/Karcianka/",icon:"i-game",cover:"karcianka",coverText:"KARCZEMNY STÓŁ"},
    {id:"kalon",name:"Kalon",type:"Karcianka / roguelike",desc:"Planowana karciana wyprawa z atakami, obroną, efektami statusu i pojedynkami z przeciwnikami.",version:"w planach",available:false,icon:"i-book",cover:"kalon",coverText:"WYPRAWA KART"},
    {id:"td",name:"Calion Tower Defence",type:"Strategia / tower defense",desc:"Wieże, fale potworów i obrona krainy Calionu. Projekt rozwijany niezależnie.",version:"w przygotowaniu",available:false,icon:"i-shield",cover:"td",coverText:"OBRONA KRÓLESTWA"},
    {id:"idle",name:"Calion Idle RPG",type:"Idle / rozwój bohatera",desc:"Planowana przygoda z rozwojem postaci, wyposażeniem, zadaniami i walkami z bossami.",version:"koncepcja",available:false,icon:"i-star",cover:"idle",coverText:"DROGA BOHATERA"}
  ];
  const $=(sel)=>document.querySelector(sel);
  const home=$("#home-view"),collection=$("#collection-view"),player=$("#play-view"),menu=$("#main-nav");
  const search=$("#archive-search");
  const worldMapPanel=$("#world-map-panel"),mapDialog=$("#map-dialog");
  const escapeHTML=(s)=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const icon=(id)=>'<svg aria-hidden="true"><use href="#'+id+'"></use></svg>';
  let currentSection="",historyEntries=[],selectedHistoryId=null;
  function closeMenu(){
    menu.classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded","false");
  }
  function setActiveNav(route){
    document.querySelectorAll("[data-nav]").forEach(a=>{
      const on=a.dataset.nav===route;
      a.classList.toggle("active",on);
      if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
  }
  function createLocationCard(entry){
    const card=document.createElement("a");
    card.className="entry-card world-card";card.href="#/swiat/"+entry.id;
    card.innerHTML='<img class="world-card-map" src="'+locationMap(entry)+'" alt="" width="640" height="400" loading="lazy"><div class="world-card-copy"><span class="entry-tag">'+escapeHTML(entry.tag)+'</span><h3>'+escapeHTML(entry.title)+'</h3><span class="entry-subtitle">'+escapeHTML(entry.sub)+'</span><p>'+escapeHTML(entry.teaser)+'</p><span class="entry-more">POZNAJ MIEJSCE '+icon("i-arrow")+'</span></div>';
    return card;
  }
  function renderEntries(){
    const term=search.value.trim().toLocaleLowerCase("pl");
    const filtered=entries.filter(e=>e.cat===currentSection && !e.parent && [e.title,e.sub,e.tag,e.teaser,...e.body].join(" ").toLocaleLowerCase("pl").includes(term));
    if(currentSection==="historia"){renderTimeline(filtered);return;}
    const grid=$("#collection-grid");
    grid.replaceChildren();
    for(const e of filtered){
      if(e.cat==="swiat"){
        grid.append(createLocationCard(e));continue;
      }
      const card=document.createElement("button");
      card.type="button";card.className="entry-card";
      card.innerHTML='<span class="entry-tag">'+escapeHTML(e.tag)+'</span><h3>'+escapeHTML(e.title)+'</h3><span class="entry-subtitle">'+escapeHTML(e.sub)+'</span><p>'+escapeHTML(e.teaser)+'</p><span class="entry-more">OTWÓRZ KRONIKĘ '+icon("i-arrow")+'</span>';
      card.addEventListener("click",()=>openEntry(e));
      grid.append(card);
    }
    $("#archive-count").textContent=filtered.length+" "+(filtered.length===1?"WPIS":"WPISÓW");
    $("#empty-message").hidden=filtered.length!==0;
  }
  function historyYear(entry){
    const match=entry.sub.replace(/[–−]/g,"-").match(/-?\d+/);
    return match?Number(match[0]):Infinity;
  }
  function selectHistory(id,reveal=false){
    const entry=historyEntries.find(e=>e.id===id);if(!entry)return;
    selectedHistoryId=id;
    const points=Array.from(document.querySelectorAll(".history-point"));
    for(const point of points)point.setAttribute("aria-pressed",String(point.dataset.id===id));
    const detail=$("#history-detail");detail.replaceChildren();detail.hidden=false;
    const date=document.createElement("p");date.className="history-date";date.textContent=entry.sub;
    const heading=document.createElement("h2");heading.textContent=entry.title;
    const tag=document.createElement("p");tag.className="history-tag";tag.textContent=entry.tag;
    detail.append(date,heading,tag);
    for(const text of entry.body){const p=document.createElement("p");p.textContent=text;detail.append(p);}
    const at=historyEntries.indexOf(entry);
    $("#history-prev").disabled=at===0;$("#history-next").disabled=at===historyEntries.length-1;
    $("#history-position").textContent=(at+1)+" / "+historyEntries.length;
    if(reveal){const point=points.find(p=>p.dataset.id===id),scroll=$("#history-scroll");
      if(point&&scroll.scrollTo)scroll.scrollTo({left:scroll.scrollLeft+point.getBoundingClientRect().left-scroll.getBoundingClientRect().left-(scroll.clientWidth-point.offsetWidth)/2,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
  }
  function stepHistory(direction){
    const at=historyEntries.findIndex(e=>e.id===selectedHistoryId);
    const entry=historyEntries[at+direction];if(entry)selectHistory(entry.id,true);
  }
  function renderTimeline(filtered){
    historyEntries=filtered.slice().sort((a,b)=>historyYear(a)-historyYear(b));
    const track=$("#history-track");track.replaceChildren();
    for(const entry of historyEntries){
      const item=document.createElement("li"),point=document.createElement("button");
      point.type="button";point.className="history-point";point.dataset.id=entry.id;
      point.setAttribute("aria-controls","history-detail");
      point.innerHTML='<span class="history-point-date">'+escapeHTML(entry.sub)+'</span><span class="history-pin" aria-hidden="true">✦</span><strong>'+escapeHTML(entry.title)+'</strong>';
      point.addEventListener("click",()=>selectHistory(entry.id));
      point.addEventListener("keydown",event=>{if(event.key!=="ArrowLeft"&&event.key!=="ArrowRight")return;event.preventDefault();stepHistory(event.key==="ArrowRight"?1:-1);document.querySelector('.history-point[data-id="'+selectedHistoryId+'"]')?.focus({preventScroll:true});});
      item.append(point);track.append(item);
    }
    const empty=historyEntries.length===0;
    $(".history-board").hidden=empty;
    $("#archive-count").textContent=historyEntries.length+" "+(historyEntries.length===1?"WYDARZENIE":"WYDARZEŃ");
    $("#empty-message").hidden=!empty;
    $("#history-navigation").hidden=empty;$("#history-scroll").hidden=empty;$("#history-detail").hidden=empty;
    if(empty){$("#history-detail").replaceChildren();return;}
    selectHistory(historyEntries.some(e=>e.id===selectedHistoryId)?selectedHistoryId:historyEntries[0].id);
  }
  function openEntry(entry){
    $("#dialog-tag").textContent=entry.tag+" / ARCHIWUM CALIONU";
    $("#dialog-title").textContent=entry.title;
    $("#dialog-subtitle").textContent=entry.sub;
    const body=$("#dialog-body");body.replaceChildren();
    for(const paragraph of entry.body){const p=document.createElement("p");p.textContent=paragraph;body.append(p);}
    const dialog=$("#lore-dialog");if(!dialog.open)dialog.showModal();
  }
  function renderGames(){
    const term=search.value.trim().toLocaleLowerCase("pl");
    const filtered=games.filter(g=>[g.name,g.type,g.desc,g.version].join(" ").toLocaleLowerCase("pl").includes(term));
    const library=$("#game-library");library.replaceChildren();
    for(const g of filtered){
      const card=document.createElement("article");card.className="game-card";
      card.innerHTML='<div class="game-cover '+g.cover+'"><span class="cover-top">CALION GAMES</span>'+icon(g.icon)+'<span class="cover-bottom">'+escapeHTML(g.coverText)+'</span></div><div class="game-card-content"><div class="game-card-header"><div><span class="entry-tag">'+escapeHTML(g.type)+'</span><h3>'+escapeHTML(g.name)+'</h3></div><span class="game-status '+(g.available?"":"soon")+'">'+(g.available?"GRAJ TERAZ":"W PLANACH")+'</span></div><p>'+escapeHTML(g.desc)+'</p><div class="game-meta">STATUS: '+escapeHTML(g.version)+'</div></div>';
      const wrap=card.querySelector(".game-card-content");
      if(g.available){
        const a=document.createElement("a");a.className="button button-primary";a.href="#/gry/"+g.id;a.innerHTML=icon("i-game")+" URUCHOM GRĘ "+icon("i-arrow");wrap.append(a);
      }else{
        const span=document.createElement("span");span.className="button button-outline";span.setAttribute("aria-label","Gra w przygotowaniu");span.textContent="W PRZYGOTOWANIU";wrap.append(span);
      }
      library.append(card);
    }
    $("#archive-count").textContent=filtered.length+" "+(filtered.length===1?"TYTUŁ":"TYTUŁÓW");
    $("#empty-message").hidden=filtered.length!==0;
  }
  function loadCollection(section){
    const s=sections[section];
    currentSection=section;
    collection.classList.toggle("world-atlas",section==="swiat");
    collection.classList.toggle("history-chronicles",section==="historia");
    collection.classList.toggle("lore-collection",["postacie","bestiariusz","frakcje","rasy"].includes(section));
    $("#collection-eyebrow").textContent=s.kicker;
    $("#collection-title").innerHTML=s.title;
    $("#collection-desc").textContent=s.desc;
    search.value="";
    worldMapPanel.hidden=section!=="swiat";
    search.placeholder=section==="gry"?"Szukaj gier...":"Szukaj w archiwum...";
    $("#game-library").hidden=section!=="gry";
    $("#collection-grid").hidden=section==="gry"||section==="historia";
    $("#history-timeline").hidden=section!=="historia";
    if(section==="gry")renderGames();else renderEntries();
  }
  function launchGame(id){
    const game=games.find(g=>g.id===id && g.available);if(!game)return false;
    $("#player-title").textContent=game.name;
    $("#player-desc").textContent=game.desc;
    $("#player-tag").textContent="GRA PRZEGLĄDARKOWA / "+game.type.toLocaleUpperCase("pl");
    const frame=$("#game-iframe");if(frame.getAttribute("src")!==game.url)frame.setAttribute("src",game.url);
    $("#external-game-link").href=game.url;
    $("#external-game-link").hidden=false;
    return true;
  }
  function renderLocation(entry){
    $("#location-title").textContent=entry.title;
    $("#location-tag").textContent=entry.tag;
    $("#location-subtitle").textContent=entry.sub;
    const map=$("#location-map");map.src=locationMap(entry);
    map.alt="Fragment mapy okolic "+(entry.map==="calion"?"Calionu":entry.title);
    const body=$("#location-body");body.replaceChildren();
    for(const paragraph of entry.body){const p=document.createElement("p");p.textContent=paragraph;body.append(p);}
    const parent=entries.find(e=>e.id===entry.parent);
    const back=$("#location-back");back.href=parent?"#/swiat/"+parent.id:"#/swiat";
    back.textContent=parent?"← Wróć do "+parent.title:"← Wróć do atlasu świata";
    const children=entries.filter(e=>e.parent===entry.id);
    const related=$("#location-related-grid");related.replaceChildren();
    for(const child of children)related.append(createLocationCard(child));
    $("#location-related").hidden=children.length===0;
    document.title=entry.title+" | Atlas Calionu";
  }
  function router(){
    if(!contentReady)return;
    const parts=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/").filter(Boolean);
    const route=parts[0]||"start";
    const sub=parts[1];
    const locationEntry=route==="swiat" && sub?entries.find(e=>e.cat==="swiat" && e.id===sub):null;
    if(route==="swiat" && sub && !locationEntry){location.replace("#/swiat");return;}
    $("#location-view").hidden=!locationEntry;
    const gameAvailable=route==="gry" && sub && games.some(g=>g.id===sub && g.available);
    const valid=route==="start"||Boolean(sections[route]);
    if(!valid){location.hash="#/";return;}
    home.hidden=route!=="start";collection.hidden=route==="start"||Boolean(gameAvailable)||Boolean(locationEntry);player.hidden=!gameAvailable;
    if(locationEntry){renderLocation(locationEntry);}
    else if(gameAvailable){launchGame(sub);document.title=games.find(g=>g.id===sub).name+" | Calion";}
    else{
      const frame=$("#game-iframe");if(frame.hasAttribute("src"))frame.removeAttribute("src");
      if(route!=="start"){loadCollection(route);document.title=sections[route].kicker.split("/")[0].trim()+" | Calion";}
      else document.title="Karczma Calionu | Kroniki świata";
    }
    const loreDialog=$("#lore-dialog");if(loreDialog.open)loreDialog.close();
    if(mapDialog.open)mapDialog.close();
    setActiveNav(route);closeMenu();window.scrollTo(0,0);
    if(locationEntry)$("#location-title").focus({preventScroll:true});
  }
  $("#map-expand").addEventListener("click",()=>mapDialog.showModal());
  $("#map-close").addEventListener("click",()=>mapDialog.close());
  mapDialog.addEventListener("click",event=>{if(event.target===mapDialog)mapDialog.close()});
  $("#menu-toggle").addEventListener("click",()=>{const open=menu.classList.toggle("open");$("#menu-toggle").setAttribute("aria-expanded",String(open));});
  $("#history-prev").addEventListener("click",()=>stepHistory(-1));
  $("#history-next").addEventListener("click",()=>stepHistory(1));
  search.addEventListener("input",()=>currentSection==="gry"?renderGames():renderEntries());
  $("#dialog-close").addEventListener("click",()=>$("#lore-dialog").close());
  $("#dialog-close-bottom").addEventListener("click",()=>$("#lore-dialog").close());
  $("#lore-dialog").addEventListener("click",e=>{if(e.target===$("#lore-dialog"))$("#lore-dialog").close();});
  $("#fullscreen-button").addEventListener("click",async()=>{
    const shell=$("#game-frame-shell");
    try{if(document.fullscreenElement)await document.exitFullscreen();else if(shell.requestFullscreen)await shell.requestFullscreen();else alert("Twoja przeglądarka nie obsługuje pełnego ekranu.");}
    catch(e){console.warn("Pełny ekran niedostępny:",e);alert("Nie udało się włączyć pełnego ekranu. Możesz otworzyć grę w osobnej karcie.");}
  });
  document.addEventListener("fullscreenchange",()=>{$("#fullscreen-button").innerHTML=icon("i-expand")+(document.fullscreenElement?" ZAMKNIJ PEŁNY EKRAN":" PEŁNY EKRAN");});
  window.addEventListener("hashchange",router);
  async function loadContent(){
    const error=$("#content-load-error");error.hidden=true;
    try{
      const response=await fetch('./assets/content.json',{cache:'no-store'});
      if(!response.ok)throw new Error('content unavailable');
      const data=await response.json();
      if(data.schemaVersion!==1||!Array.isArray(data.entries)||!data.entries.every(e=>e&&typeof e.id==='string'&&typeof e.title==='string'&&Array.isArray(e.body)))throw new Error('invalid content');
      entries=data.entries;contentReady=true;
      if(/^0\.0\.[0-9]+$/.test(data.version))document.querySelectorAll('[data-content-version]').forEach(el=>{el.textContent=el.textContent.replace(/0\.0\.[0-9]+/g,data.version);});
      router();
    }catch{error.hidden=false;}
  }
  $("#content-retry").addEventListener('click',loadContent);
  loadContent();
})();
