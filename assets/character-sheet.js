/* Calion v0.0.51 • Arkusz bohatera. */
(function(){
  "use strict";
  const profiles={
    "daren-velk":{
      portrait:"./assets/images/daren-velk.webp",
      facts:[["Rasa","Bestiolud (czarny lis)"],["Specjalizacja","Łotrzyk / Zwiadowca Cieni"],["Wiek","27 lat"],["Pochodzenie","Slumsy Calionu"],["Ranga gildii","C (wolny wykonawca)"],["Status","Dawniej związany z Noktusem"]],
      stats:{STR:4,DEX:13,CON:4,INT:9,WIS:5,CHA:5},
      quote:"„Jeśli nie widzisz pułapki, to znaczy, że już w niej stoisz.”",
      skills:[
        ["Oko Łowcy","Pasywna","Widzi ślady, ruch i pułapki w ciemności."],
        ["Cisza Nocy","Pasywna","Potrafi poruszać się bezgłośnie."],
        ["Skok Cienia","Aktywna","Przemieszcza się między cieniami w przyćmionym otoczeniu."],
        ["Lisia Intuicja","Pasywna","Wyczula zagrożenie dzięki wyostrzonym zmysłom."],
        ["Bomby Dymne","Aktywna","Samodzielnie przygotowane ładunki osłaniają odwrót."]
      ],
      equipment:[
        ["Łuk Cienia","Łuk wykonany przez Ralfora."],["Kruczy Kieł","Sztylet o czarnym ostrzu."],
        ["Płaszcz z Czarnych Włókien","Tłumi dźwięki i zapachy."],
        ["Bomby dymne","Ułatwiają ucieczkę i dezorientują przeciwnika."],
        ["Klejnot Cienia","Nielegalny artefakt używany w ostateczności."]
      ],
      relations:[
        ["Kanarek","Mentorka i przybrana matka."],["Ralfor Żelaznobrody","Przyjaciel i kowal."],
        ["Olshia Thornclaw","Znajoma z dzieciństwa, którą czasem dyskretnie chroni."],
        ["Noktus","Dawna organizacja. Obecnie uznaje go za zdrajcę."]
      ]
    },
    "ralfor":{
      portrait:"./assets/images/ralfor.webp",
      facts:[["Rasa","Krasnolud"],["Zajęcie","Mistrz kowalstwa"],["Wiek","Około 115 lat"],["Pracownia","Strefa handlowo-mieszkalna Calionu"],["Dawna służba","Poszukiwacz klasy C"]],
      quote:"„Nie liczy się magia, tylko ręka, co nią kieruje.”",
      skills:[["Kowalstwo","Rzemiosło","Tworzy i naprawia broń oraz wyspecjalizowane narzędzia."]],
      equipment:[["Młot z runą Durak","Rodzinne dziedzictwo, symbol wytrwałości."]],
      relations:[["Daren Velk","Przyjaciel, któremu pomaga w doborze i naprawie broni."]]
    }
  };
  const names={STR:"Siła",DEX:"Zręczność",CON:"Wytrzymałość",INT:"Inteligencja",WIS:"Mądrość",CHA:"Charyzma"};
  const dialog=document.createElement("dialog");
  dialog.id="character-sheet-dialog";
  dialog.className="character-sheet-dialog";
  dialog.setAttribute("aria-labelledby","cs-name");
  dialog.innerHTML=`
    <article class="cs-paper">
      <header class="cs-header">
        <div><span class="cs-eyebrow">✦ &nbsp; CALION / KSIĘGA POSTACI</span>
        <h2 id="cs-name"></h2><p id="cs-subtitle"></p></div>
        <button class="cs-close" type="button" aria-label="Zamknij kartę postaci">✕</button>
      </header>
      <div class="cs-content">
        <div class="cs-identity">
          <figure class="cs-portrait">
            <img id="cs-image" hidden alt="">
            <div id="cs-no-image" class="cs-no-image" hidden><span aria-hidden="true">✥</span>PORTRET NIEZACHOWANY</div>
            <figcaption>PORTRET / ARCHIWUM CALIONU</figcaption>
          </figure>
          <section class="cs-biographic" aria-label="Tożsamość">
            <span class="cs-section-no">I / TOŻSAMOŚĆ</span>
            <p id="cs-summary" class="cs-summary"></p>
            <dl id="cs-facts" class="cs-facts"></dl>
            <blockquote id="cs-quote" class="cs-quote" hidden></blockquote>
          </section>
        </div>
        <section id="cs-stats-section" class="cs-stats-section" hidden aria-labelledby="cs-stats-heading">
          <div class="cs-heading-line"><h3 id="cs-stats-heading">Cechy postaci</h3><span id="cs-hp"></span></div>
          <div id="cs-stats" class="cs-stats"></div>
          <p class="cs-rule-note">Mechanika Calionu: w teście k20 wynik równy wartości cechy lub niższy oznacza sukces.</p>
        </section>
        <div id="cs-details" class="cs-details">
          <section class="cs-story-section">
            <span class="cs-section-no">II / ZAPISKI KRONIKARZA</span>
            <h3>Kronika bohatera</h3>
            <div id="cs-story" class="cs-story"></div>
          </section>
          <aside id="cs-sidebar" class="cs-sidebar" aria-label="Umiejętności i wyposażenie">
            <section id="cs-skills-section" hidden><h3>Zdolności</h3><ul id="cs-skills"></ul></section>
            <section id="cs-equipment-section" hidden><h3>Ekwipunek</h3><ul id="cs-equipment"></ul></section>
            <section id="cs-relations-section" hidden><h3>Powiązania</h3><ul id="cs-relations"></ul></section>
          </aside>
        </div>
      </div>
      <footer class="cs-footer"><span>✦ &nbsp; KRONIKI ZAPOMNIANEGO ŚWIATA</span><button class="cs-close-footer" type="button">Odłóż kartę</button></footer>
    </article>`;
  document.body.append(dialog);
  const $=(sel)=>dialog.querySelector(sel);
  function addItems(sectionSel,listSel,items){
    const section=$(sectionSel),list=$(listSel);
    list.replaceChildren();
    section.hidden=!items?.length;
    for(const item of items||[]){
      const li=document.createElement("li");
      const heading=document.createElement("strong");heading.textContent=item[0];li.append(heading);
      if(item.length===3){
        const type=document.createElement("small");type.textContent=item[1];li.append(type);
      }
      const description=document.createElement("p");description.textContent=item[item.length-1];li.append(description);
      list.append(li);
    }
  }
  function open(entry){
    const profile=profiles[entry.id]||{};
    $("#cs-name").textContent=entry.title;
    $("#cs-subtitle").textContent=entry.sub||"";
    $("#cs-summary").textContent=entry.teaser||"Zapis z kronik Calionu.";
    const img=$("#cs-image"),placeholder=$("#cs-no-image");
    img.hidden=!profile.portrait;
    placeholder.hidden=!!profile.portrait;
    img.onerror=()=>{img.hidden=true;placeholder.hidden=false;};
    if(profile.portrait){img.src=profile.portrait;img.alt="Portret: "+entry.title;}
    else{img.removeAttribute("src");img.alt="";}
    const facts=$("#cs-facts");facts.replaceChildren();
    for(const [label,value] of (profile.facts||[["Rola",entry.sub||"Nieznana"],["Dział",entry.tag||"Postacie Calionu"]])){
      const dt=document.createElement("dt"),dd=document.createElement("dd");
      dt.textContent=label;dd.textContent=value;facts.append(dt,dd);
    }
    const quote=$("#cs-quote");quote.hidden=!profile.quote;quote.textContent=profile.quote||"";
    const statSection=$("#cs-stats-section"),stats=$("#cs-stats");stats.replaceChildren();
    statSection.hidden=!profile.stats;
    if(profile.stats){
      for(const [abbr,label] of Object.entries(names)){
        const tile=document.createElement("div");tile.className="cs-stat";
        const code=document.createElement("span");code.textContent=abbr;
        const value=document.createElement("strong");value.textContent=profile.stats[abbr];
        const name=document.createElement("small");name.textContent=label;
        tile.append(code,value,name);stats.append(tile);
      }
      $("#cs-hp").textContent="PŻ maks. "+(5+profile.stats.CON)+" · 40 pkt cech";
    }
    const story=$("#cs-story");story.replaceChildren();
    if(window.CalionRichText?.blocks)window.CalionRichText.blocks(story,entry.body||[]);
    else for(const line of entry.body||[]){const p=document.createElement("p");p.textContent=line;story.append(p);}
    addItems("#cs-skills-section","#cs-skills",profile.skills);
    addItems("#cs-equipment-section","#cs-equipment",profile.equipment);
    addItems("#cs-relations-section","#cs-relations",profile.relations);
    $("#cs-sidebar").hidden=!(profile.skills?.length||profile.equipment?.length||profile.relations?.length);
    $("#cs-details").classList.toggle("cs-details-no-sidebar",$("#cs-sidebar").hidden);
    if(!dialog.open)dialog.showModal();
    dialog.scrollTop=0;
  }
  function close(){if(dialog.open)dialog.close();}
  $(".cs-close").addEventListener("click",close);
  $(".cs-close-footer").addEventListener("click",close);
  dialog.addEventListener("click",event=>{if(event.target===dialog)close();});
  window.CalionCharacterSheet={open,close};
})();