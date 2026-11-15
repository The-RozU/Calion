(function calionPortal(){
  "use strict";
  const sections={
    swiat:{kicker:"ATLAS CALIONU / ODKRYWAJ",title:"Świat i <em>krainy.</em>",desc:"Od gwarnego portu Calionu po chłodne góry Durnhollow. Poznaj miejsca, do których prowadzą szlaki i te, których nie pokazuje żadna mapa."},
    historia:{kicker:"ZAPISKI KRONIKARZY / OŚ CZASU",title:"Kroniki <em>historii.</em>",desc:"Wojny, rozejmy, dawne tajemnice i wydarzenia, które ukształtowały świat w latach 824–825."},
    postacie:{kicker:"BIOGRAFIE / ZNANI I NIEZNANI",title:"Ludzie <em>legend.</em>",desc:"Władcy, dowódcy, magowie, kowale i poszukiwacze, których losy przecinają się w Calionie."},
    bestiariusz:{kicker:"ZAGROŻENIA / BESTIARIUSZ",title:"Cienie i <em>stworzenia.</em>",desc:"Dzikie zwierzęta, potwory i niepokojące osobliwości, jakie można napotkać poza miejskimi murami."},
    frakcje:{kicker:"WŁADZA / GILDIE / TAJEMNICE",title:"Frakcje i <em>organizacje.</em>",desc:"Kto strzeże miasta, kto szuka przygód, a kto działa w cieniu? Poznaj siły kształtujące oblicze królestwa."},
    rasy:{kicker:"LUDY ŚWIATA / KOMPENDIUM",title:"Rasy i <em>ludy.</em>",desc:"Calion zamieszkują przedstawiciele różnych ludów, których historie splatają się na ulicach miast i szlakach przygód."},
    gry:{kicker:"CALION GAMES / GRAJ W PRZEGLĄDARCE",title:"Twoja <em>przygoda.</em>",desc:"Wszystkie gry osadzone w uniwersum Calionu. Uruchom wybrany tytuł tutaj, bez instalacji, a potem rozwiń go na pełny ekran."}
  };
  const entries=[
    {id:"miasto-calion",cat:"swiat",title:"Calion",sub:"Portowe miasto-państwo",tag:"Południowe wybrzeże",teaser:"Bogate miasto nad szeroką zatoką, centrum handlu, rzemiosła i działalności Gildii Poszukiwaczy.",body:["Calion jest jednym z największych i najbogatszych miast-państw południowego wybrzeża. To ośrodek handlu morskiego, rzemiosła i działalności Gildii Poszukiwaczy.","Miasto otaczają dwa pierścienie murów. Wyróżnia się pięć głównych stref: handlowo-mieszkalną, strażniczą, szlachecką, zamkową i slumsy położone poza murami.","Po zmroku port rozświetlają tysiące żółtych klejnotów światła, a nad ulicami słychać rozmowy kupców, śpiew marynarzy i plotki o wyprawach."]},
    {id:"elderon",cat:"swiat",title:"Elderon",sub:"Dziki Las Północy",tag:"Północny wschód",teaser:"Najstarszy las w okolicy Calionu. Gęsta roślinność, zmienne ścieżki i niebezpieczne stworzenia.",body:["Elderon leży na północny wschód od Calionu, za doliną rzeki Mirdan i dawnym traktem kupieckim. To stary, gęsty las, w którym światło ledwie przebija przez korony drzew.","Miejscowi drwale i doświadczeni Poszukiwacze znają bezpieczne trakty. Pozostali łatwo się gubią: niektóre leśne ścieżki sprawiają wrażenie, jakby zmieniały swój przebieg.","W lesie żyją wilki, dziki, niedźwiedzie i inne dzikie stworzenia, a w głębi kryją się zagrożenia bardziej niezwykłe."]},
    {id:"durnhollow",cat:"swiat",title:"Durnhollow",sub:"Wioska w cieniu Kolosa",tag:"Góry północy",teaser:"Kamienna osada licząca około 200 mieszkańców, wzniesiona u stóp tajemniczego Kolosa Kamiennego.",body:["Durnhollow leży na północ od Calionu, w górzystym i leśnym regionie. Podróż z miasta zajmuje około 3–5 dni pieszo lub 2–3 dni konno, zależnie od pogody.","Wioskę zamieszkuje około 200 mieszkańców. Wśród nich są górnicy, kamieniarze, kowale runiczni i zielarze. Kamienne domy mają dachy pokryte łupkiem.","Nad osadą góruje Kolos Kamienny, ogromna humanoidalna sylwetka w skalnej ścianie. Mieszkańcy wierzą, że jest to uśpiony pradawny olbrzym, a nie zwykły posąg."]},
    {id:"strefy-calionu",cat:"swiat",title:"Pięć stref Calionu",sub:"Dzielnice, bramy i mury",tag:"Miasto",teaser:"Od gwarnego rynku i zamku po strażnicę, bogate rezydencje i nieuznawane slumsy.",body:["Strefa handlowo-mieszkalna jest sercem codziennego życia miasta. Znajdują się tam targowiska, warsztaty, port, karczmy i siedziba Gildii Poszukiwaczy.","Strefa strażnicza obejmuje koszary, więzienie, plac musztry i plac egzekucyjny. Strefa szlachecka skupia zamożne rodziny i dworskie intrygi, a strefa zamkowa mieści królewski pałac.","Poza murami leżą slumsy, których istnienia oficjalne władze niechętnie uznają."]},
    {id:"slumsy",cat:"swiat",title:"Slumsy Calionu",sub:"Cienie pod zewnętrznym murem",tag:"Poza murami",teaser:"Nieoficjalna dzielnica prowizorycznych chat, wyrzutków i czarnego rynku klejnotów.",body:["Slumsy wyrastają bezpośrednio pod murami Calionu. Tworzą je prowizoryczne chaty, szałasy i ruiny, wśród których mieszkają włóczędzy, zbiegowie i ludzie pozbawieni miejsca w oficjalnym porządku.","Krążą plotki o podziemnych tunelach prowadzących do portu, a także o czarnym rynku klejnotów, w którym działają dawni Poszukiwacze.","Straż Miejska patroluje okolicę murów, lecz rzadko zapuszcza się w głąb tej dzielnicy."]},
    {id:"gildyjna-karczma",cat:"swiat",title:"Pod Znakiem Miecza",sub:"Karczma Gildii Poszukiwaczy",tag:"Calion / Gildia",teaser:"Miejsce spotkań Poszukiwaczy, w którym świętuje się udane wyprawy i omawia kolejne zlecenia.",body:["Na poziomie -1 siedziby Gildii Poszukiwaczy działa karczma „Pod Znakiem Miecza”. Kamienne ściany zdobią trofea przywiezione z niebezpiecznych wypraw.","W gwarze rozmów zacierają się granice między historią a plotką. Tutaj powstają drużyny, kończą się spory i zaczynają nowe wyprawy."]},
    {id:"rok-zero",cat:"historia",title:"Wielka Wojna z Demonami",sub:"Około roku –30 do 0",tag:"Przed kalendarzem",teaser:"Wielki konflikt zakończony rozejmem, od którego zaczęto liczyć lata nowej ery.",body:["Wielka Wojna z Demonami trwała w przybliżeniu od roku –30 do roku 0.","Zawarcie rozejmu w roku 0 zakończyło konflikt i wyznaczyło początek używanego współcześnie kalendarza. Wspomnienie wojny wciąż wpływa na stosunek wielu ludów do demonów i ich potomków."]},
    {id:"wojny-run",cat:"historia",title:"Wojny Run",sub:"Lata 200–239",tag:"Wojny i magia",teaser:"Seria konfliktów o runy, artefakty i źródła dzikiej magii.",body:["W latach 200–239 wybuchały konflikty nazywane Wojnami Run.","Ich przyczyną były runy, magiczne artefakty i niebezpieczne zasoby dzikiej magii. Wojny pozostawiły po sobie opowieści o dawnych mocach i przedmiotach poszukiwanych przez kolejne pokolenia."]},
    {id:"straznica",cat:"historia",title:"Atak na Strażnicę Południową",sub:"Rok 328",tag:"Najazdy",teaser:"Pierwszy duży udokumentowany atak goblinów na strażnicę.",body:["W roku 328 kronikarze odnotowali pierwszy duży, udokumentowany atak goblinów na Strażnicę Południową.","Wydarzenie stało się jednym z ważnych punktów odniesienia dla późniejszych zapisów o zagrożeniach na pograniczu."]},
    {id:"rozkwit",cat:"historia",title:"Rozkwit miast i handlu",sub:"Od roku 600",tag:"Rozwój Calionu",teaser:"Rozwijające się miasta, coraz większy handel i umacnianie się Calionu.",body:["Po roku 600 następował rozkwit handlu i rozwój miast, w tym Calionu.","Wzmacniała się infrastruktura, kontakty handlowe i pozycja południowego ośrodka portowego."]},
    {id:"gildia-lata",cat:"historia",title:"Ukształtowanie Gildii",sub:"Lata 780–790",tag:"Poszukiwacze",teaser:"Czas formalnego ukształtowania się Gildii Poszukiwaczy.",body:["W latach 780–790 formalnie ukształtowała się Gildia Poszukiwaczy.","Z czasem stała się instytucją uznaną przez koronę i ważnym elementem bezpieczeństwa oraz gospodarki Calionu."]},
    {id:"obecna-era",cat:"historia",title:"Obecna era",sub:"Lata 824–825",tag:"Tu i teraz",teaser:"Współczesny moment opowieści: handel kwitnie, ale na północy rośnie niepokój.",body:["Lata 824–825 to obecne „tu i teraz” kronik Calionu.","Miasto prosperuje dzięki handlowi i pracy gildii, lecz doniesienia o stworzeniach północy i niepokojących wydarzeniach przypominają, że pokój nie oznacza bezpieczeństwa."]},
    {id:"arthel",cat:"postacie",title:"Arthel IV",sub:"Król Calionu",tag:"Rodzina królewska",teaser:"Władca uważany za łagodnego i mądrego, choć zdaniem niektórych zbyt pobłażliwego.",body:["Król Arthel IV sprawuje władzę nad Calionem. W kronikach opisywany jest jako łagodny, mądry monarcha, którego pobłażliwość bywa przedmiotem krytyki.","Podlega mu formalnie Straż Miejska, a Gildia Poszukiwaczy działa na mocy królewskiego dekretu."]},
    {id:"serena",cat:"postacie",title:"Serena",sub:"Królowa Calionu",tag:"Rodzina królewska",teaser:"Życzliwa władczyni, znana z troski o ubogich mieszkańców miasta.",body:["Królowa Serena jest znana z życzliwości i zainteresowania losem ubogich mieszkańców Calionu.","Na tle przepychu strefy szlacheckiej jej troska o potrzebujących jest często przywoływana jako cecha dworu."]},
    {id:"alarion",cat:"postacie",title:"Alarion",sub:"Książę Calionu",tag:"Rodzina królewska",teaser:"Młody, ambitny następca dworu zafascynowany Poszukiwaczami i wyprawami.",body:["Książę Alarion jest młody, ambitny i zafascynowany światem Poszukiwaczy.","Przygoda i życie poza pałacowymi murami przyciągają jego uwagę znacznie bardziej, niż można by oczekiwać od członka rodziny królewskiej."]},
    {id:"leoryk",cat:"postacie",title:"Kapitan Leoryk",sub:"Dowódca Straży Miejskiej",tag:"Wojsko i porządek",teaser:"Doświadczony kapitan, który odpowiada za bezpieczeństwo miasta i jego murów.",body:["Leoryk stoi na czele Straży Miejskiej Calionu, liczącej w przybliżeniu 600 żołnierzy regularnych, rezerwowych i elitarnych.","Formalnie podlega królowi Arthelowi IV, ale w codziennych sprawach bezpieczeństwa to jego decyzje mają ogromną wagę.","Choć ze względu na wiek nie wyrusza już na patrole, zna imiona wielu podległych mu żołnierzy."]},
    {id:"ralfor",cat:"postacie",title:"Ralfor",sub:"Krasnoludzki mistrz kowali",tag:"Rzemieślnicy",teaser:"Słynny kowal, którego warsztat współpracuje z Gildią Poszukiwaczy.",body:["Ralfor jest starym krasnoludem i mistrzem kowalskim Calionu. Prowadzi warsztat współpracujący z Gildią Poszukiwaczy.","Oficjalnie naprawia i konserwuje ekwipunek, lecz wśród Poszukiwaczy krążą opowieści o wyjątkowej jakości wykonywanej przez niego broni."]},
    {id:"seris",cat:"postacie",title:"Seris Kel",sub:"Archmag Klejnotów",tag:"Magowie",teaser:"Badacz magicznych klejnotów o siwych włosach i przenikliwym spojrzeniu.",body:["Seris Kel jest Archmagiem Klejnotów w Gildii Poszukiwaczy.","Bada i ocenia magiczne klejnoty znajdowane podczas wypraw do Dungeonów. Krążą pogłoski, że potrafi w pewien sposób „rozmawiać” z klejnotami."]},
    {id:"stary-bron",cat:"postacie",title:"Stary Bron",sub:"Karczmarz i dawny wojownik",tag:"Gildia Poszukiwaczy",teaser:"Weteran z blizną na twarzy stojący za barem gildyjnej karczmy.",body:["Stary Bron jest emerytowanym wojownikiem, którego wyróżnia blizna biegnąca przez twarz.","Dziś stoi za barem karczmy Gildii Poszukiwaczy, gdzie bywa świadkiem historii rodzących się nad kuflami i mapami."]},
    {id:"wargi",cat:"bestiariusz",title:"Wargi",sub:"Groźni mieszkańcy północnych lasów",tag:"Leśne zagrożenia",teaser:"Jedno z zagrożeń północnych ziem, wspominane w kronikach najazdów i opowieściach o wyprawach.",body:["Wargi należą do stworzeń, których pojawienie się na północy odnotowywano w kronikach, między innymi w okresie większych najazdów około lat 800–810.","Występują w opowieściach Poszukiwaczy o wyprawach w niebezpieczne lasy. Ten wpis jest punktem wyjścia do rozbudowy bestiariusza."]},
    {id:"gobliny",cat:"bestiariusz",title:"Gobliny",sub:"Postrach strażnic i traktów",tag:"Potwory",teaser:"Ich większy atak na Strażnicę Południową został odnotowany w roku 328.",body:["Gobliny są obecne w historii krainy od wielu stuleci.","W roku 328 kroniki odnotowały poważny atak na Strażnicę Południową. Szczegóły ich odmian, siedlisk i zachowań będą rozwijane w kolejnych tomach bestiariusza."]},
    {id:"wilki",cat:"bestiariusz",title:"Wilki Elderonu",sub:"Drapieżniki dzikiego lasu",tag:"Dzika fauna",teaser:"Jedne z licznych zwierząt czyhających na nieostrożnych wędrowców w północnych lasach.",body:["Wilki występują w lesie Elderon i na północnych terenach Calionu.","Są częścią dzikiej fauny, obok węży, dzików i niedźwiedzi, które mogą stanowić zagrożenie podczas wypraw poza uczęszczane trakty."]},
    {id:"kosniak",cat:"bestiariusz",title:"Kośniak",sub:"Niezwykły grzyb górskich jaskiń",tag:"Flora i osobliwości",teaser:"Blady, lekko świecący grzyb czczony przez Siewców Mory. To roślina/grzyb, nie potwór.",body:["Kośniak to święty grzyb Siewców Mory, rosnący w zimnych, wilgotnych i zupełnie ciemnych górskich jaskiniach.","Ma bladą, kościaną barwę i formę przypominającą wachlarze żeber. W zupełnej ciemności wydziela delikatną mleczną poświatę.","Jest związany z rytuałami sekty, a jego spożycie może wywoływać odmienne stany świadomości i halucynacje. W bestiariuszu znajduje się jako osobliwość świata, nie jako potwór."]},
    {id:"gildia",cat:"frakcje",title:"Gildia Poszukiwaczy",sub:"Królewska Gildia Poszukiwaczy Calionu",tag:"Gildie",teaser:"Uznana przez koronę organizacja przyjmująca zlecenia i organizująca wyprawy.",body:["Królewska Gildia Poszukiwaczy Calionu działa na mocy dekretu Arthela IV.","Organizacja zajmuje się zleceniami dotyczącymi potworów i bandytów, eksploracją nieznanych terenów, ochroną konwojów oraz badaniem magicznych artefaktów.","W siedzibie gildii znajdują się tablice zleceń podzielone na klasy D, C, B, A i S, a także karczma „Pod Znakiem Miecza”."]},
    {id:"straz-miejska",cat:"frakcje",title:"Straż Miejska Calionu",sub:"Miecz i prawo królestwa",tag:"Straż",teaser:"Około sześciuset żołnierzy w kilku formacjach, pod dowództwem kapitana Leoryka.",body:["Straż Miejska Calionu ma zapewniać bezpieczeństwo w mieście, porcie, przy murach i w strefach objętych kontrolą korony.","Formacja liczy około 600 żołnierzy i obejmuje m.in. straż portową, centralną, szlachecką i więzienną.","Na jej czele stoi kapitan Leoryk."]},
    {id:"srebrne-skrzydla",cat:"frakcje",title:"Srebrne Skrzydła",sub:"Elitarna Straż Królewska",tag:"Korona",teaser:"Wybrana formacja odpowiedzialna za ochronę zamku i rodziny królewskiej.",body:["Srebrne Skrzydła są elitarną częścią sił chroniących strefę zamkową i rodzinę królewską.","To jedna z najbardziej prestiżowych i najmniej dostępnych dla zwykłych mieszkańców formacji Calionu."]},
    {id:"kosciol",cat:"frakcje",title:"Kościół Światła",sub:"Wiara w Atherosa",tag:"Religia",teaser:"Oficjalna religia miasta, związana z prawem, uzdrowieniem i porządkiem.",body:["Kościół Światła jest główną religią Calionu. Jego patronem jest Atheros, Pan Światła, kojarzony z prawem, nadzieją, uzdrowieniem i równowagą.","Kościół wspiera duchowo mieszkańców, a także współpracuje z władzą świecką, strażnikami i wojskiem.","W jego nauczaniu cień nie jest sam w sobie złem; stanowi również ostrzeżenie i przestrzeń refleksji."]},
    {id:"siewcy",cat:"frakcje",title:"Siewcy Mory",sub:"Ci z Kości i Nici",tag:"Sekty",teaser:"Tajemnicza górska sekta związana z Morą Krośniarzem i świętym grzybem Kośniakiem.",body:["Siewcy Mory działają w górzystych rejonach północy, zwłaszcza w okolicach Durnhollow.","Czczą Morę Krośniarza i budują kamienne świątynie na platformach osadzonych w stromych ścianach skalnych.","Ich rytuały są związane z Kośniakiem, grzybem uprawianym w zimnych, wilgotnych i ciemnych jaskiniach. Kościół Światła uważa ich poglądy za herezję."]},
    {id:"the-boss",cat:"frakcje",title:"Drużyna The Boss",sub:"Znana drużyna Poszukiwaczy",tag:"Drużyny",teaser:"Jedna z opisanych w kronikach drużyn działających w świecie Calionu.",body:["Drużyna The Boss należy do znanych zespołów Poszukiwaczy, których losy i relacje są rozwijane w kronikach Calionu.","Pełne biografie członków, relacje między nimi i historia siedziby stanowią osobny rozdział materiałów świata. Ten wpis zapowiada ich przyszłą prezentację w portalu."]},
    {id:"bialy-kiel",cat:"frakcje",title:"Biały Kieł Północy",sub:"Drużyna Poszukiwaczy",tag:"Drużyny",teaser:"Sławna grupa Poszukiwaczy związana z północnymi szlakami.",body:["Biały Kieł Północy to jedna ze znanych drużyn świata Calionu.","Kroniki poświęcają osobne rozdziały jej członkom i działalności. Szczegółowe sylwetki trafią do kolejnej wersji portalu."]},
    {id:"ludzie",cat:"rasy",title:"Ludzie",sub:"Powszechny lud Calionu",tag:"Rasy",teaser:"Najbardziej obecni w codziennym życiu miast i portowych traktów.",body:["Ludzie są jednym z ludów zamieszkujących świat Calionu.","Występują we wszystkich warstwach społeczeństwa, wśród kupców, rzemieślników, strażników i Poszukiwaczy. Ich zalety i ograniczenia są opisane w księdze ras."]},
    {id:"elfy",cat:"rasy",title:"Elfy",sub:"Lud o odmiennej tradycji",tag:"Rasy",teaser:"Jedna z ras opisywanych w kompendium, obok elfów nocnych.",body:["Elfy są osobnym ludem świata Calionu. Kroniki ras przedstawiają ich zalety, wady i relacje z innymi mieszkańcami krainy.","W uniwersum istnieją również Nocne Elfy, opisane jako odrębna grupa."]},
    {id:"nocne-elfy",cat:"rasy",title:"Nocne Elfy",sub:"Odrębna grupa elfów",tag:"Rasy",teaser:"Lud opisany w kronikach ras jako osobna społeczność o własnych cechach.",body:["Nocne Elfy mają osobny rozdział w kompendium ras świata Calionu.","Szczegółowy opis ich społeczności, zalet i wad zostanie przeniesiony do portalu w następnych wersjach."]},
    {id:"krasnoludy",cat:"rasy",title:"Krasnoludy",sub:"Rzemieślnicy i mistrzowie run",tag:"Rasy",teaser:"Szczególnie cenione są ich umiejętności kowalskie i obróbka metalu.",body:["Krasnoludy zamieszkują świat Calionu i są związane m.in. z rzemiosłem oraz kowalstwem.","Krasnoludzcy rzemieślnicy nadzorują czystość stopów przy produkcji królewskich monet. Mistrz Ralfor jest jednym z najbardziej znanych kowali miasta."]},
    {id:"orki",cat:"rasy",title:"Orki",sub:"Lud obecny w kronikach ras",tag:"Rasy",teaser:"Jedna z ras świata Calionu, z własnym rozdziałem w kompendium.",body:["Orki są jednym z opisanych ludów uniwersum Calionu.","Materiały świata zawierają osobne omówienie ich mocnych i słabych stron. Szczegółową charakterystykę dodamy w kolejnych odsłonach archiwum."]},
    {id:"bestioludzie",cat:"rasy",title:"Bestioludzie",sub:"Lisy, koty, wilki, niedźwiedzie i ptaki",tag:"Rasy",teaser:"Rozmaite społeczności bestioludzi, mające swoje cechy i tradycje.",body:["Bestioludzie obejmują w świecie Calionu różne grupy, w tym lisy, koty, wilki, niedźwiedzie i ptaki.","Każda grupa ma własny rozdział w kronikach ras i odmienną charakterystykę."]},
    {id:"poltdemony",cat:"rasy",title:"Półdemony",sub:"Potomkowie demonów",tag:"Rasy",teaser:"Ich pochodzenie wciąż budzi obawy po Wielkiej Wojnie z Demonami.",body:["Półdemony są obecne w uniwersum Calionu. Ich pochodzenie budzi lęk i nieufność części mieszkańców świata.","Ślady Wielkiej Wojny z Demonami nadal wpływają na to, jak inne rasy postrzegają istoty mające demoniczne cechy."]}
  ];
  const games=[
    {id:"survivors",name:"Calion Survivors",type:"Survival action / roguelite",desc:"Grywalny prototyp walki z falami przeciwników. Łotrzyk, broń i przetrwanie na Zapomnianym Trakcie.",version:"0.0.18",available:true,url:"./survivors/",icon:"i-sword",cover:"survivors",coverText:"ZAPOMNIANY TRAKT"},
    {id:"karcianka",name:"Karciana Szulernia",type:"Karcianka / taktyka",desc:"Karciane pojedynki w karczemnym klimacie Calionu. Osobna gra dostępna na GitHub Pages.",version:"zewnętrzny projekt",available:true,url:"https://the-rozu.github.io/Karcianka/",icon:"i-game",cover:"karcianka",coverText:"KARCZEMNY STÓŁ"},
    {id:"kalon",name:"Kalon",type:"Karcianka / roguelike",desc:"Planowana karciana wyprawa z atakami, obroną, efektami statusu i pojedynkami z przeciwnikami.",version:"w planach",available:false,icon:"i-book",cover:"kalon",coverText:"WYPRAWA KART"},
    {id:"td",name:"Calion Tower Defence",type:"Strategia / tower defense",desc:"Wieże, fale potworów i obrona krainy Calionu. Projekt rozwijany niezależnie.",version:"w przygotowaniu",available:false,icon:"i-shield",cover:"td",coverText:"OBRONA KRÓLESTWA"},
    {id:"idle",name:"Calion Idle RPG",type:"Idle / rozwój bohatera",desc:"Planowana przygoda z rozwojem postaci, wyposażeniem, zadaniami i walkami z bossami.",version:"koncepcja",available:false,icon:"i-star",cover:"idle",coverText:"DROGA BOHATERA"}
  ];
  const $=(sel)=>document.querySelector(sel);
  const home=$("#home-view"),collection=$("#collection-view"),player=$("#play-view"),menu=$("#main-nav");
  const search=$("#archive-search");
  const escapeHTML=(s)=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const icon=(id)=>'<svg aria-hidden="true"><use href="#'+id+'"></use></svg>';
  let currentSection="";
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
  function renderEntries(){
    const term=search.value.trim().toLocaleLowerCase("pl");
    const filtered=entries.filter(e=>e.cat===currentSection && [e.title,e.sub,e.tag,e.teaser,...e.body].join(" ").toLocaleLowerCase("pl").includes(term));
    const grid=$("#collection-grid");
    grid.replaceChildren();
    for(const e of filtered){
      const card=document.createElement("button");
      card.type="button";card.className="entry-card";
      card.innerHTML='<span class="entry-tag">'+escapeHTML(e.tag)+'</span><h3>'+escapeHTML(e.title)+'</h3><span class="entry-subtitle">'+escapeHTML(e.sub)+'</span><p>'+escapeHTML(e.teaser)+'</p><span class="entry-more">OTWÓRZ KRONIKĘ '+icon("i-arrow")+'</span>';
      card.addEventListener("click",()=>openEntry(e));
      grid.append(card);
    }
    $("#archive-count").textContent=filtered.length+" "+(filtered.length===1?"WPIS":"WPISÓW");
    $("#empty-message").hidden=filtered.length!==0;
    if(currentSection==="historia")$("#history-timeline").hidden=term.length>0;
  }
  function renderTimeline(){
    const facts=[["ROK 0","Rozejm z demonami","Początek kalendarza"],["200–239","Wojny Run","Magia, runy i artefakty"],["328","Strażnica Południowa","Udokumentowany atak goblinów"],["600+","Rozkwit handlu","Wzrost znaczenia Calionu"],["780–790","Powstanie Gildii","Formalne ukształtowanie organizacji"],["824–825","Obecna era","Czas dzisiejszych kronik"]];
    $("#history-timeline").innerHTML=facts.map(f=>'<div class="timeline-block"><span>'+f[0]+'</span><strong>'+f[1]+'</strong><small>'+f[2]+'</small></div>').join("");
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
    $("#collection-eyebrow").textContent=s.kicker;
    $("#collection-title").innerHTML=s.title;
    $("#collection-desc").textContent=s.desc;
    search.value="";
    search.placeholder=section==="gry"?"Szukaj gier...":"Szukaj w archiwum...";
    $("#game-library").hidden=section!=="gry";
    $("#collection-grid").hidden=section==="gry";
    $("#history-timeline").hidden=section!=="historia";
    if(section==="gry")renderGames();else{if(section==="historia")renderTimeline();renderEntries();}
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
  function router(){
    const parts=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/").filter(Boolean);
    const route=parts[0]||"start";
    const sub=parts[1];
    const gameAvailable=route==="gry" && sub && games.some(g=>g.id===sub && g.available);
    const valid=route==="start"||Boolean(sections[route]);
    if(!valid){location.hash="#/";return;}
    home.hidden=route!=="start";collection.hidden=route==="start"||Boolean(gameAvailable);player.hidden=!gameAvailable;
    if(gameAvailable){launchGame(sub);document.title=games.find(g=>g.id===sub).name+" | Calion";}
    else{
      const frame=$("#game-iframe");if(frame.hasAttribute("src"))frame.removeAttribute("src");
      if(route!=="start"){loadCollection(route);document.title=sections[route].kicker.split("/")[0].trim()+" | Calion";}
      else document.title="Calion | Świat, kroniki i gry";
    }
    setActiveNav(route);closeMenu();window.scrollTo(0,0);
  }
  $("#menu-toggle").addEventListener("click",()=>{const open=menu.classList.toggle("open");$("#menu-toggle").setAttribute("aria-expanded",String(open));});
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
  router();
})();
