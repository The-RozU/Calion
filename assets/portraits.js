(function(){
  'use strict';
  const allowed=path=>typeof path==='string'&&/^assets\/images\/(?:portraits\/[a-z0-9-]+-[a-f0-9]{16}|daren-velk|ralfor)\.webp$/.test(path);
  function source(entry){
    if(entry.portrait===null)return '';
    if(allowed(entry.portrait))return './'+entry.portrait;
    return entry.id==='daren-velk'?'./assets/images/daren-velk.webp':entry.id==='ralfor'?'./assets/images/ralfor.webp':'';
  }
  window.CalionPortraits={allowed,source};
})();
