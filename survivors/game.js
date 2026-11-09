/* Calion Survivors · prototype 0.0.2 · Vanilla Canvas 2D */
(() => {
  'use strict';
  const VERSION = '0.0.2';
  const RUN_DURATION = 300; // Five-minute playtest; balance is intentionally provisional.
  const MAX_ENEMIES = 38;
  const MAX_PROJECTILES = 70;
  const MAX_DROPS = 100;
  const MOD_SLOTS = 2;
  const CAMERA_ZOOM = 0.82; // Camera shows around 22% more arena in each direction.
  const TAU = Math.PI * 2;
  const $ = id => document.getElementById(id);
  const canvas = $('arena');
  const ctx = canvas.getContext('2d', { alpha: false });
  const shell = $('game-shell');
  const overlay = $('overlay');
  const panelTitle = $('panel-title');
  const panelSubtitle = $('panel-subtitle');
  const panelContent = $('panel-content');
  const toastEl = $('toast');
  const keys = new Set();
  const touchMove = { x: 0, y: 0 };
  let activeJoystick = null;
  let screenW = 480, screenH = 270;
  let state = null, mode = 'menu', lastTimestamp = 0, toastLeft = 0;
  let worldTile = null;

  const UPGRADE_DEFS = [
    { id: 'damage', title: 'Mocniejsze strzały', icon: '⚔', max: 3, type: 'stat', desc: l => `Obrażenia strzał +5 (${l}/3).` },
    { id: 'speed', title: 'Sprawne dłonie', icon: '➶', max: 3, type: 'stat', desc: l => `Czas między strzałami −11% (${l}/3).` },
    { id: 'reach', title: 'Sokoli wzrok', icon: '◎', max: 2, type: 'stat', desc: l => `Zasięg ataku +40 (${l}/2).` },
    { id: 'feet', title: 'Lekki krok', icon: '✦', max: 2, type: 'stat', desc: l => `Prędkość ruchu +10% (${l}/2).` },
    { id: 'health', title: 'Hart ducha', icon: '✚', max: 2, type: 'stat', desc: l => `Maks. życie +20 i leczenie 20 (${l}/2).` },
    { id: 'bounce', title: 'Odbijająca strzała', icon: '↗', max: 2, type: 'modifier', desc: l => `Strzała trafia kolejny cel. Odbicia: ${l}/2.` },
    { id: 'split', title: 'Rozdzielenie', icon: '⋔', max: 2, type: 'modifier', desc: l => `Po trafieniu powstają ${l + 1} słabsze strzały. (${l}/2)` }
  ];
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  const hash = (x, y) => { let h = Math.imul(x, 374761393) + Math.imul(y, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  const int = Math.floor;

  function newState() {
    return {
      elapsed: 0, spawnClock: 1.1, shots: 0, kills: 0, nextEnemyId: 1,
      player: { x: 0, y: 0, hp: 120, maxHp: 120, hitCooldown: 0, shotCooldown: .45, face: 1 },
      level: 1, xp: 0, upgrades: Object.fromEntries(UPGRADE_DEFS.map(u => [u.id, 0])),
      enemies: [], projectiles: [], drops: [], particles: [], offered: []
    };
  }
  function neededXp(level) { return 8 + (level - 1) * 9; }
  function visibleMode(next) { mode = next; overlay.classList.toggle('shown', next !== 'playing'); }
  function button(label, action, secondary = false) {
    return `<button class="${secondary ? 'secondary-button' : 'primary-button'}" data-action="${action}">${label}</button>`;
  }
  function showMenu() {
    state = newState();
    visibleMode('menu');
    panelTitle.textContent = 'SURVIVORS';
    panelSubtitle.textContent = 'Zapomniany Trakt';
    panelContent.innerHTML = `<p class="intro-text">Ciemny trakt zaroił się od goblinów. Przetrwaj 5 minut. Łotrzyk sam strzela w najbliższe zagrożenie, a Ty wybierasz, jak rozwinąć jego łuk.</p>
      <div class="info-trio"><div class="info-box"><b>05:00</b><span>CZAS PRÓBY</span></div><div class="info-box"><b>1</b><span>BROŃ NA RUN</span></div><div class="info-box"><b>3</b><span>KARTY WYBORU</span></div></div>
      ${button('Rozpocznij wyprawę', 'start')}
      <p class="hint">PC: WASD / strzałki · P: pauza · 1, 2, 3: wybór karty<br>Telefon: joystick po lewej lub prawej stronie</p>`;
    updateHud();
  }
  function startGame() {
    state = newState();
    keys.clear(); touchMove.x = touchMove.y = 0; resetJoystick();
    visibleMode('playing');
    updateHud();
    toast('Przetrwaj pięć minut');
  }
  function pauseGame() {
    if (mode === 'playing') {
      resetJoystick();
      visibleMode('paused');
      panelTitle.textContent = 'PAUZA'; panelSubtitle.textContent = 'Odpoczynek na trakcie';
      panelContent.innerHTML = `<p class="pause-text">Walka zatrzymana. Możesz wrócić do wyprawy lub zacząć od początku.</p>${button('Wróć do walki', 'resume')}${button('Nowa wyprawa', 'restart', true)}`;
    } else if (mode === 'paused') visibleMode('playing');
  }
  function endRun(won) {
    visibleMode('result');
    panelTitle.textContent = won ? 'PRZETRWANO!' : 'WYPRAWA ZAKOŃCZONA';
    panelSubtitle.textContent = won ? 'Trakt oczyszczony' : 'Mrok zwyciężył tym razem';
    panelContent.innerHTML = `<p class="end-text">${won ? 'Udało Ci się przetrwać pięciominutową próbę.' : 'Gobliny otoczyły łotrzyka. Następnym razem spróbuj innego zestawu ulepszeń.'}</p>
      <div class="info-trio"><div class="info-box"><b>${formatTime(state.elapsed)}</b><span>CZAS</span></div><div class="info-box"><b>${state.kills}</b><span>POKONANI</span></div><div class="info-box"><b>${state.level}</b><span>POZIOM</span></div></div>
      ${button('Zagraj ponownie', 'restart')}${button('Menu', 'menu', true)}`;
  }
  function getEligible() {
    const levels = state.upgrades;
    const occupied = ['bounce','split'].filter(id => levels[id] > 0).length;
    return UPGRADE_DEFS.filter(u => levels[u.id] < u.max && (u.type !== 'modifier' || levels[u.id] > 0 || occupied < MOD_SLOTS));
  }
  function showLevelUp() {
    const options = getEligible();
    for (let i = options.length - 1; i > 0; i--) { const j = int(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    state.offered = options.slice(0, 3);
    if (!state.offered.length) { toast('Wszystkie ulepszenia rozwinięte'); return; }
    visibleMode('levelup');
    panelTitle.textContent = `POZIOM ${state.level}`;
    panelSubtitle.textContent = 'Wybierz jedno ulepszenie';
    panelContent.innerHTML = `<div class="level-header"><span class="level-headline">TRZY DROGI · JEDEN WYBÓR</span></div>
      <div class="card-grid">${state.offered.map((u, i) => `<button class="upgrade-card ${u.type === 'modifier' ? 'modifier' : ''}" data-card="${i}">
      <span class="upgrade-icon">${u.icon}</span><span class="upgrade-title">${u.title}</span>
      <span class="upgrade-desc">${u.desc(state.upgrades[u.id] + 1)}</span>
      <span class="upgrade-level">POZIOM ${state.upgrades[u.id] + 1} / ${u.max}</span></button>`).join('')}</div>
      <p class="hint">Walka jest wstrzymana. Wybierz kartę kliknięciem lub klawiszem 1–3.</p>`;
  }
  function selectCard(index) {
    if (mode !== 'levelup') return;
    const u = state.offered[index];
    if (!u) return;
    state.upgrades[u.id]++;
    if (u.id === 'health') {
      state.player.maxHp += 20;
      state.player.hp = Math.min(state.player.maxHp, state.player.hp + 20);
    }
    visibleMode('playing');
    updateHud();
    toast(`${u.title} ${state.upgrades[u.id]}/${u.max}`);
    // If multiple levels are gained from a large pickup, offer the next on the following frame.
  }
  function toast(message) {
    toastEl.textContent = message; toastEl.classList.add('active'); toastLeft = 2.1;
  }
  function formatTime(value) { const seconds = Math.max(0, Math.ceil(value)); return `${String(int(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; }
  function updateHud() {
    if (!state) return;
    $('timer').textContent = formatTime(RUN_DURATION - state.elapsed);
    $('hp-text').textContent = `${Math.ceil(state.player.hp)} / ${state.player.maxHp}`;
    $('hp-fill').style.width = `${clamp(state.player.hp / state.player.maxHp * 100,0,100)}%`;
    $('level-text').textContent = `POZIOM ${state.level}`;
    $('xp-text').textContent = `${state.xp} / ${neededXp(state.level)} EXP`;
    $('xp-fill').style.width = `${clamp(state.xp / neededXp(state.level) * 100,0,100)}%`;
    const m = ['bounce','split'].filter(id => state.upgrades[id] > 0).map(id => `${id === 'bounce' ? '↗' : '⋔'} ${state.upgrades[id]}/2`);
    while (m.length < MOD_SLOTS) m.push('◇ PUSTE');
    $('mods-text').textContent = m.join(' · ');
    $('kills-text').textContent = `Pokonani: ${state.kills}`;
  }

  function resizeCanvas() {
    const r = canvas.getBoundingClientRect();
    screenW = Math.max(160, int(r.width / (2 * CAMERA_ZOOM)));
    screenH = Math.max(100, int(r.height / (2 * CAMERA_ZOOM)));
    canvas.width = screenW; canvas.height = screenH;
    ctx.imageSmoothingEnabled = false;
  }

  function makeGroundTile() {
    const tile = document.createElement('canvas'); tile.width = tile.height = 96;
    const g = tile.getContext('2d');
    g.fillStyle = '#252d27'; g.fillRect(0, 0, 96, 96);
    for (let y = 0; y < 96; y += 4) for (let x = 0; x < 96; x += 4) {
      const v = hash(x + 123, y + 112);
      g.fillStyle = v < .3 ? '#212923' : v < .48 ? '#2b3229' : v < .72 ? '#30362d' : '#273027';
      g.fillRect(x, y, 4, 4);
    }
    for (let i = 0; i < 85; i++) {
      const x = int(hash(i, 91) * 96), y = int(hash(i, 102) * 96);
      const v = hash(i, 201);
      g.fillStyle = v < .3 ? '#3d4937' : v < .6 ? '#3b3b31' : '#22291f';
      g.fillRect(x, y, 2 + int(v * 3), 1 + int(v * 2));
    }
    return tile;
  }
  function spawnEnemy() {
    const p = state.player;
    const side = int(Math.random() * 4);
    const margin = 23;
    let x, y;
    if (side < 2) { x = p.x + (side === 0 ? -screenW/2 - margin : screenW/2 + margin); y = p.y + rand(-screenH/2, screenH/2); }
    else { x = p.x + rand(-screenW/2, screenW/2); y = p.y + (side === 2 ? -screenH/2 - margin : screenH/2 + margin); }
    const factor = state.elapsed / RUN_DURATION;
    state.enemies.push({ id: state.nextEnemyId++, x, y, hp: 27 + 30 * factor, maxHp: 27 + 30 * factor, speed: 27 + rand(0,8) + 12 * factor, hit: 0, attackTimer: 0, wobble: rand(0,TAU), radius: 9 });
  }
  function nearestEnemy(x,y,range,excluded=new Set()) {
    let best = null, min = range * range;
    for (const e of state.enemies) {
      if (e.hp <= 0 || excluded.has(e.id)) continue;
      const d = (e.x - x)**2 + (e.y - y)**2;
      if (d < min) { min = d; best = e; }
    }
    return best;
  }
  function fireArrow() {
    const p = state.player, levels = state.upgrades;
    const range = 205 + levels.reach * 40;
    const enemy = nearestEnemy(p.x,p.y,range);
    if (!enemy || state.projectiles.length >= MAX_PROJECTILES) return;
    const a = Math.atan2(enemy.y - p.y, enemy.x - p.x);
    p.face = Math.cos(a) >= 0 ? 1 : -1;
    state.shots++;
    state.projectiles.push({ x:p.x + Math.cos(a)*11, y:p.y - 4 + Math.sin(a)*11, vx:Math.cos(a)*235, vy:Math.sin(a)*235,
      angle:a, life:1.5, damage:17 + levels.damage*5, visited:new Set(), bounces:0, generation:0, splitUsed:false });
    addParticles(p.x + Math.cos(a)*13, p.y - 4 + Math.sin(a)*11, 1, '#d3b988');
  }
  function addParticles(x,y,count,color) {
    for (let i = 0; i < count && state.particles.length < 90; i++) {
      state.particles.push({ x, y, vx:rand(-40,40), vy:rand(-48,22), life:rand(.2,.42), max:.42, color });
    }
  }
  function hurtEnemy(enemy,damage) {
    enemy.hp -= damage; enemy.hit = .13;
    addParticles(enemy.x,enemy.y - 6,2,'#9ca57b');
    if (enemy.hp <= 0) {
      state.kills++;
      addParticles(enemy.x,enemy.y,5,'#677a53');
      if (state.drops.length < MAX_DROPS) state.drops.push({x:enemy.x,y:enemy.y,amount:state.kills%8===0?2:1,phase:rand(0,TAU)});
    }
  }
  function processArrowHit(arrow, enemy) {
    arrow.visited.add(enemy.id);
    hurtEnemy(enemy,arrow.damage);
    const levels = state.upgrades;
    // Child projectiles cannot split again. Each lineage may bounce at most twice.
    if (levels.split > 0 && !arrow.splitUsed && arrow.generation === 0 && state.projectiles.length < MAX_PROJECTILES - 3) {
      arrow.splitUsed = true;
      const count = levels.split + 1;
      const a = arrow.angle;
      for (let i = 0; i < count; i++) {
        const angle = a + (i - (count-1)/2) * .60;
        state.projectiles.push({ x:enemy.x,y:enemy.y, vx:Math.cos(angle)*225, vy:Math.sin(angle)*225, angle,
          life:.80, damage:arrow.damage*.58, visited:new Set(arrow.visited), bounces:arrow.bounces, generation:1, splitUsed:true });
      }
    }
    if (arrow.bounces < levels.bounce) {
      const next = nearestEnemy(enemy.x,enemy.y,140,arrow.visited);
      if (next) {
        const a = Math.atan2(next.y - enemy.y,next.x - enemy.x);
        arrow.x = enemy.x; arrow.y = enemy.y; arrow.vx = Math.cos(a)*245; arrow.vy = Math.sin(a)*245;
        arrow.angle = a; arrow.bounces++; arrow.damage *= .75; arrow.life = Math.min(arrow.life, .75); return true;
      }
    }
    return false;
  }
  function collectXp(drop) {
    state.xp += drop.amount;
    addParticles(drop.x,drop.y - 5,3,'#7dd3b4');
  }
  function update(dt) {
    const s = state, p = s.player, levels = s.upgrades;
    s.elapsed += dt;
    if (s.elapsed >= RUN_DURATION) { s.elapsed = RUN_DURATION; endRun(true); updateHud(); return; }
    let dx = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft')) + touchMove.x;
    let dy = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup')) + touchMove.y;
    const length = Math.hypot(dx,dy);
    if (length > 0) { dx /= Math.max(1,length); dy /= Math.max(1,length); const movement = 89 * (1 + levels.feet * .10) * dt; p.x += dx * movement; p.y += dy * movement; if (Math.abs(dx) > .15) p.face = dx > 0 ? 1 : -1; }
    p.hitCooldown = Math.max(0,p.hitCooldown - dt);
    p.shotCooldown -= dt;
    if (p.shotCooldown <= 0) { fireArrow(); p.shotCooldown += .80 * (1 - levels.speed * .11); }
    s.spawnClock -= dt;
    const interval = 1.85 - (s.elapsed / RUN_DURATION) * .93;
    while (s.spawnClock <= 0) { if (s.enemies.length < MAX_ENEMIES) spawnEnemy(); s.spawnClock += interval; }

    for (const e of s.enemies) {
      const vx = p.x - e.x, vy = p.y - e.y, d = Math.max(.0001, Math.hypot(vx,vy));
      if (d > 12) { e.x += vx/d * e.speed*dt; e.y += vy/d * e.speed*dt; }
      e.wobble += dt * 5; e.hit = Math.max(0,e.hit - dt);
      if (d < 15 && p.hitCooldown <= 0) {
        p.hp = Math.max(0,p.hp - 12); p.hitCooldown = .85;
        addParticles(p.x,p.y,6,'#bc6353');
        if (p.hp <= 0) { endRun(false); updateHud(); return; }
      }
    }
    for (let i = s.projectiles.length-1; i >= 0; i--) {
      const a = s.projectiles[i]; a.x += a.vx*dt; a.y += a.vy*dt; a.life -= dt;
      let keep = a.life > 0;
      if (keep) for (const e of s.enemies) {
        if (e.hp <= 0 || a.visited.has(e.id)) continue;
        if ((e.x-a.x)**2+(e.y-a.y)**2 < (e.radius+3)**2) { keep = processArrowHit(a,e); break; }
      }
      if (!keep) s.projectiles.splice(i,1);
    }
    s.enemies = s.enemies.filter(e=>e.hp > 0 && dist2(e,p) < Math.max(screenW,screenH)**2*5);
    for (let i=s.drops.length-1;i>=0;i--) {
      const d=s.drops[i]; d.phase += dt*4;
      const distance = Math.hypot(p.x-d.x,p.y-d.y);
      if (distance < 50 && distance > 0) { const speed = 110 + (50-distance)*2; d.x += (p.x-d.x)/distance*speed*dt; d.y += (p.y-d.y)/distance*speed*dt; }
      if (distance < 10) { collectXp(d); s.drops.splice(i,1); }
    }
    for (const pfx of s.particles) { pfx.x += pfx.vx*dt; pfx.y += pfx.vy*dt; pfx.life -= dt; }
    s.particles = s.particles.filter(pfx => pfx.life > 0);
    if (s.xp >= neededXp(s.level)) {
      s.xp -= neededXp(s.level); s.level++;
      updateHud(); showLevelUp(); return;
    }
    updateHud();
  }

  function rect(color,x,y,w,h) { ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); }
  function drawGround(camX,camY) {
    if (!worldTile) worldTile = makeGroundTile();
    ctx.fillStyle='#252d27'; ctx.fillRect(0,0,screenW,screenH);
    const tile=96, left=int(camX/tile)-1, top=int(camY/tile)-1;
    for(let gy=top;gy<=int((camY+screenH)/tile)+1;gy++) for(let gx=left;gx<=int((camX+screenW)/tile)+1;gx++) {
      const x=int(gx*tile-camX), y=int(gy*tile-camY);
      ctx.drawImage(worldTile,x,y);
      if (hash(gx,gy)>.37) {
        const r=hash(gx+36,gy-11); const sx=x+int(13+r*65), sy=y+int(9+hash(gx+4,gy+16)*66);
        drawDecoration(sx,sy,gx,gy);
      }
    }
  }
  function drawDecoration(x,y,gx,gy) {
    const a=hash(gx+19,gy+49);
    if(a<.33){
      rect('#171e1a',x-8,y+3,16,4);rect('#4b4d46',x-7,y-2,11,7);rect('#62645b',x-4,y-4,6,3);rect('#394b3a',x+2,y-2,5,3);
    } else if(a<.62){
      rect('#253626',x-9,y-5,19,11);rect('#47583b',x-6,y-7,4,6);rect('#546746',x-1,y-9,4,9);rect('#3b5136',x+5,y-6,3,7);
    } else if(a<.82){
      rect('#171d17',x-7,y+5,18,4);rect('#614f39',x-5,y-7,4,13);rect('#362a22',x-4,y-8,2,15);rect('#54452f',x+4,y-4,3,10);
    } else {
      rect('#37362d',x-8,y,16,3);rect('#48463b',x-5,y-1,10,2);rect('#2a3228',x-12,y+3,25,2);
    }
  }
  function drawDrop(d,cx,cy) {
    const x=int(d.x-cx), y=int(d.y-cy + Math.sin(d.phase)*2);
    rect('#132a25',x-5,y+1,10,6);rect('#77cab0',x-2,y-5,5,8);rect('#b3e8cc',x-1,y-6,2,5);rect('#378878',x-3,y-1,3,5);
  }
  function drawEnemy(e,cx,cy) {
    const x=int(e.x-cx),y=int(e.y-cy), w=int(Math.sin(e.wobble)*1.5);
    ctx.fillStyle='#101a13b8';ctx.beginPath();ctx.ellipse(x,y+8,11,4,0,0,TAU);ctx.fill();
    rect('#171d15',x-8,y-10+w,17,14);rect('#556b42',x-7,y-9+w,15,11);
    rect('#7b8c51',x-11,y-7+w,5,4);rect('#7b8c51',x+7,y-7+w,5,4);
    rect('#39482f',x-6,y+2,13,5);rect('#483c2d',x-7,y+5,6,5);rect('#483c2d',x+2,y+5,6,5);
    rect('#9b5141',x-5,y-5+w,3,2);rect('#9b5141',x+3,y-5+w,3,2);
    rect('#b1a97d',x-2,y-1+w,5,2);rect('#333b2d',x-7,y-12+w,15,3);
    if(e.hit>0){ctx.globalAlpha=.55;rect('#f2d7aa',x-10,y-12,20,23);ctx.globalAlpha=1;}
  }
  function drawHero(p,cx,cy,animated) {
    const x=int(p.x-cx),y=int(p.y-cy), bounce=animated?int(Math.sin(state.elapsed*12)*1.2):0;
    ctx.fillStyle='#101811b8';ctx.beginPath();ctx.ellipse(x,y+11,12,4,0,0,TAU);ctx.fill();
    if(p.hitCooldown>0 && int(p.hitCooldown*10)%2===0) ctx.globalAlpha=.48;
    // Boots, cloak, leather body, hood and face, readable even at 2x CSS size.
    rect('#121710',x-7,y+6,6,7);rect('#171b14',x+2,y+6,6,7);
    rect('#253e33',x-9,y-6+bounce,19,17);rect('#345244',x-10,y+1+bounce,6,10);rect('#172c25',x+5,y+2+bounce,6,11);
    rect('#70533b',x-6,y-3+bounce,13,10);rect('#9a7950',x-5,y-2+bounce,8,2);
    rect('#1b3229',x-9,y-16+bounce,19,13);rect('#2f5341',x-7,y-17+bounce,15,10);rect('#132720',x-6,y-10+bounce,13,7);
    rect('#c4a27e',x-4,y-11+bounce,10,7);rect('#dfba8b',x-2,y-10+bounce,7,4);rect('#171f19',x+2*p.face,y-8+bounce,2,2);
    rect('#1b2921',x-9,y-15+bounce,4,10);rect('#3b6550',x-7,y-16+bounce,3,8);
    // Bow and arm swap sides according to orientation.
    ctx.save();ctx.translate(x + p.face*10,y-4+bounce);ctx.scale(p.face,1);
    rect('#9b7851',-6,1,8,3);rect('#9d7044',3,-12,2,22);rect('#cc9c5d',4,-14,2,4);rect('#dbd0b2',3,-11,1,19);rect('#b4864e',4,7,2,4);
    ctx.restore();ctx.globalAlpha=1;
  }
  function drawArrow(a,cx,cy) {
    const x=a.x-cx,y=a.y-cy;
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(a.angle);rect('#e9d5a6',-9,-1,18,2);rect('#826747',-9,1,12,1);rect('#d2d0bc',7,-3,6,5);rect('#587563',-8,-4,5,2);rect('#587563',-8,2,5,2);ctx.restore();
  }
  function draw() {
    if (!state) return;
    const cx=state.player.x-screenW/2,cy=state.player.y-screenH/2;
    drawGround(cx,cy);
    for(const d of state.drops) drawDrop(d,cx,cy);
    const entities = state.enemies.map(e=>({y:e.y,draw:()=>drawEnemy(e,cx,cy)}));
    entities.push({y:state.player.y,draw:()=>drawHero(state.player,cx,cy,mode==='playing')});
    entities.sort((a,b)=>a.y-b.y);for(const e of entities)e.draw();
    for(const a of state.projectiles)drawArrow(a,cx,cy);
    for(const a of state.particles){ctx.globalAlpha=clamp(a.life/a.max,0,1);rect(a.color,a.x-cx,a.y-cy,2,2);}ctx.globalAlpha=1;
    // Atmospheric subtle boundary illumination, no screen-filling combat effects.
    ctx.fillStyle='#0b100d30';ctx.fillRect(0,0,screenW,2);ctx.fillRect(0,screenH-2,screenW,2);
  }
  function tick(ts) {
    const dt=Math.min((ts-lastTimestamp)/1000||0,.04);lastTimestamp=ts;
    if(mode==='playing')update(dt);
    if(toastLeft>0){toastLeft-=dt;if(toastLeft<=0)toastEl.classList.remove('active');}
    draw();requestAnimationFrame(tick);
  }
  function resetJoystick(){
    activeJoystick = null;
    touchMove.x = touchMove.y = 0;
    for (const side of ['left','right']) {
      const knob = $(`joystick-${side}-knob`);
      if (knob) knob.style.transform = 'translate(-50%,-50%)';
    }
  }
  function setupJoystick(){
    const sides = ['left','right'];
    const chooseSide = side => {
      for (const name of sides) {
        document.querySelector(`.touch-${name}`).classList.toggle('is-primary',name===side);
      }
    };
    for (const side of sides) {
      const stick = $(`joystick-${side}`), knob = $(`joystick-${side}-knob`);
      const move = e => {
        const r = stick.getBoundingClientRect(), cx = r.left + r.width/2, cy = r.top + r.height/2;
        const dx = e.clientX-cx, dy = e.clientY-cy, mag = Math.max(1,Math.hypot(dx,dy)), radius = 35;
        touchMove.x = dx/mag*Math.min(1,mag/radius);
        touchMove.y = dy/mag*Math.min(1,mag/radius);
        knob.style.transform = `translate(calc(-50% + ${touchMove.x*radius}px),calc(-50% + ${touchMove.y*radius}px))`;
      };
      stick.addEventListener('pointerdown',e=>{
        if (mode!=='playing' || activeJoystick) return;
        activeJoystick={side,pointerId:e.pointerId};
        chooseSide(side);
        stick.setPointerCapture(e.pointerId);
        move(e);
        e.preventDefault();
      });
      stick.addEventListener('pointermove',e=>{
        if (!activeJoystick || activeJoystick.pointerId!==e.pointerId || activeJoystick.side!==side) return;
        move(e);
        e.preventDefault();
      });
      const end=e=>{
        if (!activeJoystick || activeJoystick.pointerId!==e.pointerId || activeJoystick.side!==side) return;
        resetJoystick();
      };
      stick.addEventListener('pointerup',end);
      stick.addEventListener('pointercancel',end);
      stick.addEventListener('lostpointercapture',end);
    }
  }
  function setupInput(){
    document.addEventListener('keydown',e=>{
      const key=e.key.toLowerCase();
      if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))e.preventDefault();
      if(key==='p'||key==='escape'){pauseGame();return;}
      if(mode==='levelup'&&['1','2','3'].includes(key)){selectCard(Number(key)-1);return;}
      keys.add(key);
    });
    document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur',()=>{keys.clear();touchMove.x=touchMove.y=0;resetJoystick();if(mode==='playing')pauseGame();});
    overlay.addEventListener('click',e=>{
      const card=e.target.closest('[data-card]');if(card){selectCard(Number(card.dataset.card));return;}
      const action=e.target.closest('[data-action]')?.dataset.action;
      if(action==='start'||action==='restart')startGame();
      else if(action==='menu')showMenu();else if(action==='resume')visibleMode('playing');
    });
    $('pause-btn').addEventListener('click',pauseGame);
    window.addEventListener('resize',resizeCanvas);
    setupJoystick();
  }
  setupInput();resizeCanvas();showMenu();requestAnimationFrame(tick);
  // Stable read-only debug bridge to inspect the prototype in browser tests.
  window.CalionPrototype={version:VERSION,getSnapshot:()=>({mode,elapsed:state.elapsed,level:state.level,xp:state.xp,kills:state.kills,hp:state.player.hp,upgrades:{...state.upgrades},enemies:state.enemies.length}),start:startGame};
})();

