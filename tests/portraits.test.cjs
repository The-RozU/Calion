const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {parseHTML}=require('linkedom');
async function portal(entries){
 const {window}=parseHTML(fs.readFileSync(__dirname+'/../index.html','utf8')),location={hash:'#/postacie',replace(hash){this.hash=hash;}};
 window.scrollTo=()=>{};
 for(const d of window.document.querySelectorAll('dialog')){d.showModal=function(){this.open=true;};d.close=function(){this.open=false;};}
 const context=vm.createContext({window,document:window.document,location,console,fetch:async()=>({ok:true,json:async()=>({schemaVersion:1,version:'0.0.77',entries})})});
 for(const file of ['portraits.js','rich-text.js','character-sheet.js','app.js'])vm.runInContext(fs.readFileSync(__dirname+'/../assets/'+file,'utf8'),context);
 for(const d of window.document.querySelectorAll('dialog')){d.showModal=function(){this.open=true;};d.close=function(){this.open=false;};}
 await new Promise(resolve=>setImmediate(resolve));return window;
}
const entry={id:'lusianne-aerinvale',cat:'postacie',title:'Lusianne',sub:'Zielarka',tag:'Calion',characterGroup:'mieszkancy',teaser:'Opis',body:['Historia']};
test('uploaded portrait is used by the character card and dossier, with its chosen framing',async()=>{
 const portrait='assets/images/portraits/lusianne-aerinvale-0123456789abcdef.webp',window=await portal([{...entry,portrait}]),card=window.document.querySelector('.character-card-preview');
 assert.equal(card.querySelector('img').getAttribute('src'),'./'+portrait);assert(card.classList.contains('character-card-custom-portrait'));card.click();const img=window.document.querySelector('#cs-image');assert.equal(img.getAttribute('src'),'./'+portrait);assert.equal(img.hidden,false);assert(img.classList.contains('custom-portrait'));assert.equal(window.document.querySelector('#character-sheet-dialog').open,true);
});
test('existing legacy portraits remain; explicit null removes them and clears stale dossier state',async()=>{
 const window=await portal([{...entry,id:'daren-velk'},{...entry,id:'ralfor',portrait:null},entry]);
 assert.equal(window.CalionPortraits.source({id:'daren-velk'}),'./assets/images/daren-velk.webp');assert.equal(window.CalionPortraits.source({id:'ralfor'}),'./assets/images/ralfor.webp');assert.equal(window.CalionPortraits.source({id:'ralfor',portrait:null}),'');
 const cards=[...window.document.querySelectorAll('.character-card-preview')];const daren=cards.find(c=>c.querySelector('h3').textContent==='Lusianne'&&c.querySelector('img'));daren.click();window.CalionCharacterSheet.close();
 const empty=cards.find(c=>!c.querySelector('img'));empty.click();const img=window.document.querySelector('#cs-image');assert.equal(img.hidden,true);assert.equal(img.getAttribute('src'),null);assert.equal(window.document.querySelector('#cs-no-image').hidden,false);
});
test('untrusted image URLs and paths cannot be rendered',async()=>{
 const window=await portal([{...entry,portrait:'javascript:alert(1)'}]);assert.equal(window.document.querySelector('.character-card-preview img'),null);
 for(const value of ['https://evil.test/a.webp','data:image/svg+xml,<svg/>','assets/images/../index.html','assets/images/portraits/x.svg'])assert.equal(window.CalionPortraits.allowed(value),false);
});
