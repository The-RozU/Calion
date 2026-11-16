/* Shared safe text formatting. User text is never interpreted as HTML. */
(function(root){
  'use strict';
  const colors=['brown','green','burgundy','copper'],sizes=['small','normal','large'];
  function inline(target,value,compact=false,depth=0){
    const text=String(value),doc=target.ownerDocument;
    if(depth>=12){target.append(doc.createTextNode(text));return;}
    const token=compact?/(\*\*|\*)/g:/(\*\*|__|\*|\[color=(brown|green|burgundy|copper)\]|\[size=(small|normal|large)\])/g;
    let at=0,match;
    while((match=token.exec(text))){
      const open=match[0],close=open.startsWith('[color=')?'[/color]':open.startsWith('[size=')?'[/size]':open;
      let end=text.indexOf(close,token.lastIndex);
      if(open==='**'&&end>=0&&text[end+2]==='*'&&(text.slice(token.lastIndex,end).match(/(?<!\*)\*(?!\*)/g)||[]).length%2)end++;
      if(end<0)continue;
      target.append(doc.createTextNode(text.slice(at,match.index)));
      const element=doc.createElement(open==='**'?'strong':open==='*'?'em':open==='__'?'u':'span');
      if(match[2])element.className='rt-'+match[2];if(match[3])element.className='rt-'+match[3];
      inline(element,text.slice(token.lastIndex,end),compact,depth+1);target.append(element);
      at=end+close.length;token.lastIndex=at;
    }
    target.append(doc.createTextNode(text.slice(at)));
  }
  function blocks(target,paragraphs){
    target.classList.add('calion-richtext');const doc=target.ownerDocument;
    for(const paragraph of paragraphs){
      const lines=String(paragraph).split('\n');let list=null,p=null;
      for(const line of lines){
        const heading=line.match(/^(#{2,4})\s+(.+)$/),item=line.match(/^\s*(-|\d+\.)\s+(.+)$/);
        if(heading){list=null;p=null;const h=doc.createElement('h'+Math.min(5,heading[1].length+1));inline(h,heading[2]);target.append(h);}
        else if(item){p=null;const tag=item[1]==='-'?'ul':'ol';if(!list||list.tagName.toLowerCase()!==tag){list=doc.createElement(tag);target.append(list);}const li=doc.createElement('li');inline(li,item[2]);list.append(li);}
        else{list=null;if(!p){p=doc.createElement('p');target.append(p);}else p.append(doc.createElement('br'));inline(p,line);}
      }
    }
  }
  function clear(text){return text.replace(/\[(?:color=(?:brown|green|burgundy|copper)|size=(?:small|normal|large))\]|\[\/(?:color|size)\]/g,'').replace(/\*\*([^]*?)\*\*|__([^]*?)__|\*([^]*?)\*/g,(_,a,b,c)=>a??b??c).replace(/^(?:#{2,4}\s+|\s*(?:-|\d+\.)\s+)/gm,'');}
  function edit(text,start,end,command,value){
    let selected=text.slice(start,end),replacement,from=start,to=end,offset=0;
    const wrappers={bold:['**','**'],italic:['*','*'],underline:['__','__']};
    if(command==='color'&&colors.includes(value))wrappers.color=['[color='+value+']','[/color]'];
    if(command==='size'&&sizes.includes(value))wrappers.size=['[size='+value+']','[/size]'];
    if(wrappers[command]){const [a,b]=wrappers[command];if(text.slice(Math.max(0,start-a.length),start)===a&&text.slice(end,end+b.length)===b){from-=a.length;to+=b.length;replacement=selected;}else if(selected.startsWith(a)&&selected.endsWith(b)&&selected.length>=a.length+b.length){replacement=selected.slice(a.length,-b.length);}else{selected=selected||'tekst';replacement=a+selected+b;offset=a.length;}}
    else if(command==='clear'){replacement=clear(selected||text);if(!selected){from=0;to=text.length;}}
    else if(['heading','bullet','number','paragraph'].includes(command)){
      from=text.lastIndexOf('\n',Math.max(0,start-1))+1;const next=text.indexOf('\n',end);to=next<0?text.length:next;
      replacement=text.slice(from,to).split('\n').map((line,index)=>{const clean=line.replace(/^(?:#{2,4}\s+|\s*(?:-|\d+\.)\s+)/,'');return (command==='heading'?(value==='3'?'### ':'## '):command==='bullet'?'- ':command==='number'?(index+1)+'. ':'')+clean;}).join('\n');
    }else return {text,start,end};
    return {text:text.slice(0,from)+replacement+text.slice(to),start:from+offset,end:from+replacement.length-(offset?(replacement.length-offset-selected.length):0)};
  }
  root.CalionRichText={inline,blocks,edit};
})(window);
