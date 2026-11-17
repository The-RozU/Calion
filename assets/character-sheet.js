/* Calion v0.0.61 • Notatki Gildii i oddzielone niepotwierdzone pogłoski. */
(function(){
  "use strict";
  // W aktach znajdują się wyłącznie informacje fabularne dostępne w kronikach.
  // Nie przedstawiamy mechaniki rozgrywki, rang ani inwentarza jako wiedzy gildii.
  const profiles={
    "daren-velk":{
      portrait:"./assets/images/daren-velk.webp",
      facts:[
        ["Rasa","Bestiolud (czarny lis)"],["Wiek","27 lat"],
        ["Znany jako","Czarny Lis"],["Miejsce pochodzenia","Slumsy Calionu"],
        ["Zajęcie","Złodziej"],["Dawne powiązania","Noktus"]
      ],
      quote:"„Jeśli nie widzisz pułapki, to znaczy, że już w niej stoisz.”",
      mentions:[
        ["Śledztwo w sprawie Noktusa","Współpracował z Loranem Daskiem i Thanem Runehartem. Podczas zawalenia domu ocalił Thane'a, po czym zniknął."],
        ["Sytuacja obecna","Noktus uważa go za zdrajcę. Straż Calionu rozpoczęła poszukiwania."]
      ],
      relations:[
        ["Kanarek","Mentorka i przybrana matka; zniknęła w tajemniczych okolicznościach."],
        ["Ralfor Żelaznobrody","Przyjaciel, mistrz kowalstwa z Calionu."],
        ["Olshia Thornclaw","Znajoma z dzieciństwa."],
        ["Noktus","Dawna organizacja, obecnie uznająca go za zdrajcę."]
      ]
    },
    "ralfor":{
      portrait:"./assets/images/ralfor.webp",
      facts:[
        ["Rasa","Krasnolud"],["Wiek","Około 115 lat"],
        ["Zajęcie","Kowal i rzemieślnik"],
        ["Pracownia","Strefa handlowo-mieszkalna Calionu"]
      ],
      quote:"„Nie liczy się magia, tylko ręka, co nią kieruje.”",
      mentions:[
        ["Kuźnia Ralfora","Warsztat współpracuje z Gildią Poszukiwaczy. Warsztat wykonuje także prace dla członków Gildii."]
      ],
      relations:[["Daren Velk","Wieloletni znajomy. Daren powierza mu swoją broń."]]
    },
    "leoryk":{
      facts:[["Funkcja","Kapitan Straży Miejskiej"],["Zwierzchnik","Król Arthel IV"]],
      mentions:[["Służba","Dowodzi strażą Calionu. Z racji wieku nie odbywa już patroli."]]
    },
    "elmera-valen":{
      facts:[["Funkcja","Porucznik Straży Szlacheckiej"],["Pochodzenie","Rodzina szlachecka"],["Rejon","Dzielnica szlachecka Calionu"]]
    },
    "geran-voss":{
      facts:[["Funkcja","Porucznik Straży Portowej"],["Rejon","Port, magazyny i nabrzeża Calionu"]],
      relations:[["Loran Dask","Sierżant służący pod jego rozkazami."]]
    },
    "loran-dask":{
      facts:[["Funkcja","Sierżant Straży Portowej"],["Rejon","Port Calionu"]],
      relations:[["Geran Voss","Przełożony Lorana."]]
    },
    "kael-dravos":{facts:[["Przydomek","Razor"],["Drużyna","Impostorzy"]]},
    "thane-runehart":{facts:[["Pochodzenie","Durnhollow"],["Drużyna","The Boss"]]},
    "kanarek":{facts:[["Dawne powiązania","Noktus"],["Stan akt","Zaginiona"]]},
    "lokar":{facts:[["Stan akt","Wpis niepełny"]]},
    "olshia-thornclaw":{
      facts:[["Rasa","Bestiolud (kotka)"],["Zajęcie","Złodziejka"]],
      mentions:[]
    }
  };
  const dialog=document.createElement("dialog");
  dialog.id="character-sheet-dialog";
  dialog.className="character-sheet-dialog";
  dialog.setAttribute("aria-labelledby","cs-name");
  dialog.innerHTML=`
    <article class="cs-paper">
      <header class="cs-header">
        <div><span class="cs-eyebrow">✦ &nbsp; GILDIA POSZUKIWACZY / ARCHIWUM OSÓB</span>
        <h2 id="cs-name"></h2><p id="cs-subtitle"></p></div>
        <button class="cs-close" type="button" aria-label="Zamknij kartę postaci">✕</button>
      </header>
      <div class="cs-content">
        <div class="cs-identity">
          <figure class="cs-portrait">
            <img id="cs-image" hidden alt="">
            <div id="cs-no-image" class="cs-no-image" hidden><span aria-hidden="true">✥</span>PORTRET NIEZACHOWANY</div>
            <figcaption>WIZERUNEK / AKTA OSOBOWE</figcaption>
          </figure>
          <section class="cs-biographic" aria-label="Tożsamość">
            <span class="cs-section-no">I / INFORMACJE ZE SPISÓW</span>
            <p id="cs-summary" class="cs-summary"></p>
            <dl id="cs-facts" class="cs-facts"></dl>
            <blockquote id="cs-quote" class="cs-quote" hidden></blockquote>
          </section>
        </div>
        <div id="cs-details" class="cs-details">
          <section class="cs-story-section">
            <span class="cs-section-no">II / NOTATKI ARCHIWISTY</span>
            <h3>Ustalenia i przebieg sprawy</h3>
            <div id="cs-story" class="cs-story"></div>
          </section>
          <aside id="cs-sidebar" class="cs-sidebar" aria-label="Dodatkowe zapiski z archiwum">
            <section id="cs-mentions-section" hidden><h3>Odnotowane zdarzenia</h3><ul id="cs-mentions"></ul></section>
            
            <section id="cs-relations-section" hidden><h3>Znane powiązania</h3><ul id="cs-relations"></ul></section>
          </aside>
        </div>
        <section id="cs-rumors-section" class="cs-rumors-section" hidden aria-labelledby="cs-rumors-title">
          <span class="cs-section-no">III / WIADOMOŚCI NIESPRAWDZONE</span>
          <h3 id="cs-rumors-title">Pogłoski i zasłyszane opowieści</h3>
          <p class="cs-rumors-disclaimer">Poniższe relacje nie stanowią potwierdzonych ustaleń Gildii.</p>
          <ul id="cs-rumors"></ul>
        </section>
      </div>
      <footer class="cs-footer"><span>✦ &nbsp; Z ARCHIWÓW GILDII POSZUKIWACZY</span><button class="cs-close-footer" type="button">Odłóż kartę</button></footer>
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
    const story=$("#cs-story");story.replaceChildren();
    if(window.CalionRichText?.blocks)window.CalionRichText.blocks(story,entry.body||[]);
    else for(const line of entry.body||[]){const p=document.createElement("p");p.textContent=line;story.append(p);}
    addItems("#cs-mentions-section","#cs-mentions",profile.mentions);
    addItems("#cs-relations-section","#cs-relations",profile.relations);
    $("#cs-sidebar").hidden=!(profile.mentions?.length||profile.relations?.length);
    $("#cs-details").classList.toggle("cs-details-no-sidebar",$("#cs-sidebar").hidden);
    const rumorSection=$("#cs-rumors-section"),rumorList=$("#cs-rumors");
    rumorList.replaceChildren();
    const rumors=Array.isArray(entry.rumors)?entry.rumors.filter(x=>typeof x==="string"&&x.trim()):[];
    rumorSection.hidden=rumors.length===0;
    for(const rumor of rumors){
      const li=document.createElement("li");
      if(window.CalionRichText?.inline)window.CalionRichText.inline(li,rumor);
      else li.textContent=rumor;
      rumorList.append(li);
    }
    if(!dialog.open)dialog.showModal();
    dialog.scrollTop=0;
  }
  function close(){if(dialog.open)dialog.close();}
  $(".cs-close").addEventListener("click",close);
  $(".cs-close-footer").addEventListener("click",close);
  dialog.addEventListener("click",event=>{if(event.target===dialog)close();});
  window.CalionCharacterSheet={open,close};
})();