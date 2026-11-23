/* Calion Games accounts v0.0.80. Publishable key only; secrets stay on Supabase. */
(function(){
"use strict";
const BASE="https://jwwvwhomjqnozyqwbzwp.supabase.co", KEY="sb_publishable__a2SI5r42X4eC6bcZFkZCQ_Q6_l4-vT";
const STORE="calion-auth-session-v1";
const $=sel=>document.querySelector(sel);
let session=null,account=null,mode="login",refreshing=null;
try{session=JSON.parse(localStorage.getItem(STORE)||"null");}catch{localStorage.removeItem(STORE);}
const dialog=$("#calion-account-dialog"),button=$("#calion-account-open");
const notice=$("#calion-auth-message"),form=$("#calion-auth-form"),nameForm=$("#calion-name-form");
function notify(message,isError=false){
 notice.textContent=message;notice.classList.toggle("error",isError);notice.hidden=!message;
}
function changed(){window.dispatchEvent(new CustomEvent("calion:authchange",{detail:{signedIn:!!session,account}}));}
function save(next){
 session=next;
 try{if(next)localStorage.setItem(STORE,JSON.stringify(next));else localStorage.removeItem(STORE);}catch{}
 updateUI();changed();
}
function takeTokens(obj){
 if(!obj?.access_token||!obj.refresh_token)throw Error("Nie otrzymano sesji logowania.");
 save({access_token:obj.access_token,refresh_token:obj.refresh_token,
  expires_at:Date.now()+(Number(obj.expires_in)||3600)*1000});
}
async function authRequest(path,data,token){
 const resp=await fetch(BASE+"/auth/v1/"+path,{
  method:"POST",headers:{"apikey":KEY,"Content-Type":"application/json",...(token?{"Authorization":"Bearer "+token}:{})},
  body:data?JSON.stringify(data):"{}"
 });
 const body=await resp.json().catch(()=>({}));
 if(!resp.ok)throw Error(body.msg||body.error_description||body.message||"Usługa logowania jest niedostępna.");
 return body;
}
async function accessToken(){
 if(!session)return null;
 if(session.expires_at>Date.now()+60000)return session.access_token;
 if(refreshing)return refreshing;
 refreshing=(async()=>{
  try{
   const response=await authRequest("token?grant_type=refresh_token",{refresh_token:session.refresh_token});
   takeTokens(response);return response.access_token;
  }catch(e){account=null;save(null);return null;}
  finally{refreshing=null;}
 })();
 return refreshing;
}
async function loadProfile(){
 const token=await accessToken();if(!token)return;
 const response=await fetch(BASE+"/rest/v1/player_profiles?select=nickname&id=eq."+encodeURIComponent(account?.id||""),{
  headers:{"apikey":KEY,"Authorization":"Bearer "+token},cache:"no-store"
 });
 if(!response.ok)return;
 const rows=await response.json();if(rows?.[0]?.nickname){account.nickname=rows[0].nickname;updateUI();changed();}
}
async function restore(){
 const token=await accessToken();if(!token){updateUI();return;}
 try{
  const resp=await fetch(BASE+"/auth/v1/user",{headers:{"apikey":KEY,"Authorization":"Bearer "+token}});
  if(!resp.ok)throw Error("Wygasła sesja");
  const user=await resp.json();
  account={id:user.id,email:user.email||""};updateUI();changed();await loadProfile();
 }catch{account=null;save(null);}
}
function updateUI(){
 const signed=!!session&&!!account;
 button.textContent=signed?"♜ "+(account.nickname||"Moje konto"):"♜ Zaloguj / Załóż konto";
 $("#calion-auth-guest").hidden=signed;
 $("#calion-auth-member").hidden=!signed;
 if(signed){
  $("#calion-member-email").textContent=account.email;
  $("#calion-member-name").textContent=account.nickname||"Odczytywanie profilu…";
  $("#calion-name-input").value=account.nickname||"";
 }
 const isSignup=mode==="signup";
 $("#calion-auth-title").textContent=isSignup?"Dołącz do gildii":"Konto gracza Calionu";
 $("#calion-auth-submit").textContent=isSignup?"Utwórz konto":"Zaloguj się";
 $("#calion-auth-password").autocomplete=isSignup?"new-password":"current-password";
 $("#calion-confirm-row").hidden=!isSignup;
 $("#calion-confirm-password").required=isSignup;
 $("#calion-mode-login").setAttribute("aria-pressed",String(!isSignup));
 $("#calion-mode-signup").setAttribute("aria-pressed",String(isSignup));
}
button?.addEventListener("click",()=>{notify("");dialog.showModal();});
$("#calion-auth-close")?.addEventListener("click",()=>dialog.close());
dialog?.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
$("#calion-mode-login")?.addEventListener("click",()=>{mode="login";notify("");updateUI();});
$("#calion-mode-signup")?.addEventListener("click",()=>{mode="signup";notify("");updateUI();});
form?.addEventListener("submit",async event=>{
 event.preventDefault();
 const email=$("#calion-auth-email").value.trim(),password=$("#calion-auth-password").value;
 if(mode==="signup"&&password!==$("#calion-confirm-password").value){notify("Hasła nie są identyczne.",true);return;}
 if(password.length<6){notify("Hasło musi mieć przynajmniej 6 znaków.",true);return;}
 const submit=$("#calion-auth-submit");submit.disabled=true;notify("Łączenie z gildią…");
 try{
  const response=mode==="signup"
   ?await authRequest("signup",{email,password})
   :await authRequest("token?grant_type=password",{email,password});
  if(response.access_token){
   takeTokens(response);const user=response.user||{};
   account={id:user.id,email:user.email||email};updateUI();await loadProfile();
   form.reset();notify("Witaj w Calionie! Możesz teraz zapisywać wyniki wypraw.");
  }else notify("Konto utworzone. Sprawdź pocztę i potwierdź adres e-mail, a potem zaloguj się.");
 }catch(e){notify(e.message||"Nie udało się połączyć.",true);}
 finally{submit.disabled=false;}
});
nameForm?.addEventListener("submit",async event=>{
 event.preventDefault();
 const nickname=$("#calion-name-input").value.trim();
 if(!/^[A-Za-z0-9_]{3,24}$/.test(nickname)){notify("Nick: od 3 do 24 znaków, litery A-Z, cyfry lub _.",true);return;}
 const token=await accessToken();if(!token){notify("Zaloguj się ponownie.",true);return;}
 const submit=$("#calion-name-submit");submit.disabled=true;
 try{
  const resp=await fetch(BASE+"/rest/v1/player_profiles?id=eq."+encodeURIComponent(account.id),{
   method:"PATCH",
   headers:{"apikey":KEY,"Authorization":"Bearer "+token,
    "Content-Type":"application/json","Prefer":"return=representation"},
   body:JSON.stringify({nickname})
  });
  if(!resp.ok)throw Error(resp.status===409?"Ten nick jest już zajęty.":"Nie udało się zmienić nicku.");
  const body=await resp.json();if(!body.length)throw Error("Nie udało się zapisać nicku.");
  account.nickname=body[0].nickname;updateUI();changed();notify("Nick został zapisany.");
 }catch(e){notify(e.message,true);}finally{submit.disabled=false;}
});
$("#calion-auth-signout")?.addEventListener("click",async()=>{
 const token=await accessToken();
 if(token)authRequest("logout",null,token).catch(()=>{});
 account=null;save(null);notify("Wylogowano.");
});
window.CalionAuth={getAccessToken:accessToken,getUser:()=>account,open:()=>dialog.showModal(),base:BASE,key:KEY};
updateUI();void restore();
})();