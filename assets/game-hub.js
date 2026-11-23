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
  const backend="https://jwwvwhomjqnozyqwbzwp.supabase.co";
  const pubKey="sb_publishable__a2SI5r42X4eC6bcZFkZCQ_Q6_l4-vT";

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
      const values=[Number(row.position)||index+1,String(row.nickname||"Gracz"),Number(row.score)||0];
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
    showMessage("Odczytywanie zapisów…","Łączenie z archiwum wyników Calionu.");
    try{
      const tab=board.id==="overall"?"global_leaderboard":"game_leaderboard";
      const url=new URL(backend+"/rest/v1/"+tab);
      url.searchParams.set("select","nickname,score,position");
      if(board.id!=="overall")url.searchParams.set("game_id","eq."+board.id);
      url.searchParams.set("order","position.asc");
      url.searchParams.set("limit","50");
      const response=await fetch(url.href,{signal:controller.signal,credentials:"omit",cache:"no-store",headers:{"apikey":pubKey}});
      if(!response.ok)throw Error("HTTP "+response.status);
      const payload=await response.json();
      if(!Array.isArray(payload))throw Error("Nieprawidłowe dane rankingu");
      const valid=payload.filter(row=>
        row&&typeof row.nickname==="string"&&row.nickname.length<=32&&
        Number.isFinite(row.score)&&row.score>=0
      ).slice(0,50);
      if(!valid.length)showMessage("Brak zapisanych wyników","Ranking testowy czeka na pierwszą wyprawę zalogowanego gracza.");
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
      :"Każda gra ma własne zasady punktacji. Do zestawienia liczy się najlepszy wynik z rankingu BETA.";
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

  async function sendSessionToGame(){
    if(!frame?.contentWindow||!frame.src||!window.CalionAuth)return;
    const token=await window.CalionAuth.getAccessToken();
    const origin=new URL(frame.src).origin;
    // Exact target origin, never wildcard. Only known Calion games.
    if(!["https://raw.githack.com","https://the-rozu.github.io"].includes(origin))return;
    frame.contentWindow.postMessage({type:"calion:session",game:"kalon",version:1,accessToken:token||null},origin);
  }
  window.addEventListener("message",event=>{
    if(!frame?.contentWindow||event.source!==frame.contentWindow)return;
    const expected=frame.src?new URL(frame.src).origin:null;
    if(!expected||event.origin!==expected)return;
    if(event.data?.type==="calion:request-session"&&event.data?.game==="kalon"&&event.data?.version===1)void sendSessionToGame();
  });
  window.addEventListener("calion:authchange",()=>{showBoard(selected);void sendSessionToGame();});
  if(frame&&frameStatus){
    frame.addEventListener("load",()=>{
      // Nie jest możliwe rozpoznanie odpowiedzi 404 w ramce z innej domeny.
      // Dlatego odsyłacz do samodzielnego uruchomienia gry pozostaje widoczny.
      frameStatus.hidden=true;
      void sendSessionToGame();
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
