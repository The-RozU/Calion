/* Calion Games v0.0.79 — biblioteka rankingów i obsługa osadzonego odtwarzacza.
   Prawdziwe rankingi wymagają skonfigurowanego API. Nie generujemy fikcyjnych wyników. */
(function(){
  "use strict";
  const $=selector=>document.querySelector(selector);
  const panel=$("#calion-leaderboards");
  const tabList=$("#leaderboard-tabs");
  const boardTitle=$("#leaderboard-title");
  const boardHint=$("#leaderboard-description");
  const boardBody=$("#leaderboard-body");
  const frame=$("#game-iframe");
  const frameStatus=$("#game-frame-status");
  const gameCatalog=Array.isArray(window.CalionGames)?window.CalionGames:[];
  const boards=[{id:"overall",name:"Ogólny",available:true},
    ...gameCatalog.map(g=>({id:g.id,name:g.name,available:!!g.available}))];
  let selected="overall";
  let controller=null;
  const backend=window.CalionRankingConfig?.apiBase||"";

  function showMessage(heading,description){
    boardBody.replaceChildren();
    const article=document.createElement("div");
    article.className="leaderboard-empty";
    const h=document.createElement("h3");h.textContent=heading;
    const p=document.createElement("p");p.textContent=description;
    article.append(h,p);boardBody.append(article);
  }

  function renderTable(rows,overall){
    boardBody.replaceChildren();
    const wrap=document.createElement("div");wrap.className="leaderboard-table-wrap";
    const table=document.createElement("table");table.className="leaderboard-table";
    const head=document.createElement("thead"),headRow=document.createElement("tr");
    for(const title of ["Miejsce","Gracz",overall?"Punkty Calionu":"Najlepszy wynik"]){
      const th=document.createElement("th");th.textContent=title;headRow.append(th);
    }
    head.append(headRow);table.append(head);
    const body=document.createElement("tbody");
    for(const [index,row] of rows.entries()){
      const tr=document.createElement("tr");
      const values=[index+1,String(row.nickname||"Gracz"),Number(row.score)||0];
      for(let i=0;i<values.length;i++){
        const td=document.createElement("td");
        td.textContent=i===2?Math.max(0,Number(values[i])).toLocaleString("pl-PL"):String(values[i]);
        tr.append(td);
      }
      body.append(tr);
    }
    table.append(body);wrap.append(table);boardBody.append(wrap);
  }

  async function loadBoard(board){
    if(controller)controller.abort();
    controller=new AbortController();
    if(!board.available){
      showMessage("Gra w przygotowaniu","Ranking tej gry uruchomimy wraz z jej pierwszą publiczną wersją.");
      return;
    }
    if(!backend){
      showMessage("Tablica jeszcze pusta","Rankingi online wymagają wspólnego systemu kont i serwera wyników. Tutaj pojawią się prawdziwe, zweryfikowane osiągnięcia graczy, gdy podłączymy tę usługę.");
      return;
    }
    if(!/^https:\/\//i.test(backend)){
      showMessage("Nieprawidłowa konfiguracja","Adres serwera rankingów musi korzystać z HTTPS.");
      return;
    }
    showMessage("Odczytywanie zapisów…","Łączenie z archiwum wyników Calionu.");
    try{
      const url=new URL(backend);
      url.searchParams.set("board",board.id);
      url.searchParams.set("limit","50");
      const response=await fetch(url.href,{signal:controller.signal,credentials:"omit",cache:"no-store"});
      if(!response.ok)throw Error("HTTP "+response.status);
      const payload=await response.json();
      if(!Array.isArray(payload.entries))throw Error("Nieprawidłowe dane rankingu");
      const valid=payload.entries.filter(row=>
        row&&typeof row.nickname==="string"&&row.nickname.length<=32&&
        Number.isFinite(row.score)&&row.score>=0
      ).slice(0,50);
      if(!valid.length)showMessage("Brak zapisanych wyników","Ta tablica nie ma jeszcze zweryfikowanych rezultatów.");
      else renderTable(valid,board.id==="overall");
    }catch(error){
      if(error.name==="AbortError")return;
      showMessage("Nie można pobrać rankingu","Serwer wyników jest chwilowo niedostępny. Wróć do tablicy później.");
      console.warn("Calion Games: leaderboard unavailable",error);
    }
  }

  function showBoard(id,scroll=false){
    const board=boards.find(g=>g.id===id)||boards[0];
    selected=board.id;
    for(const button of tabList.querySelectorAll("button")){
      button.setAttribute("aria-pressed",String(button.dataset.board===selected));
    }
    boardTitle.textContent=board.id==="overall"?"Ranking ogólny Calionu":"Ranking gry: "+board.name;
    boardHint.textContent=board.id==="overall"
      ?"Wspólna klasyfikacja oparta na pozycjach graczy w poszczególnych grach."
      :"Każda gra ma własne zasady punktacji. Do zestawienia liczy się najlepszy zweryfikowany wynik gracza.";
    void loadBoard(board);
    if(scroll&&panel&&!panel.hidden){
      panel.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    }
  }

  if(panel&&tabList&&boardBody){
    tabList.replaceChildren();
    for(const board of boards){
      const button=document.createElement("button");
      button.type="button";
      button.className="leaderboard-tab";
      button.dataset.board=board.id;
      button.setAttribute("aria-pressed","false");
      button.textContent=board.name;
      button.addEventListener("click",()=>showBoard(board.id));
      tabList.append(button);
    }
    showBoard(selected);
  }

  if(frame&&frameStatus){
    frame.addEventListener("load",()=>{
      // Nie jest możliwe rozpoznanie odpowiedzi 404 w ramce z innej domeny.
      // Dlatego odsyłacz do samodzielnego uruchomienia gry pozostaje widoczny.
      frameStatus.hidden=true;
    });
    frame.addEventListener("error",()=>{
      frameStatus.hidden=false;
      $("#game-frame-status-title").textContent="Gra nie mogła się uruchomić";
      $("#game-frame-status-text").textContent="Spróbuj otworzyć grę w osobnej karcie.";
    });
  }

  window.CalionGameHub={
    showBoard,
    launch(game){
      if(!frameStatus)return;
      frameStatus.hidden=false;
      $("#game-frame-status-title").textContent="Wczytywanie: "+game.name;
      $("#game-frame-status-text").textContent="Poczekaj na ekran gry. Jeśli nie wyświetli się prawidłowo, użyj odnośnika „Nowa karta”.";
    }
  };
})();
