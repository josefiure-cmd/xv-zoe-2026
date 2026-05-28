const CONFIG = {
  fechaEventoISO: '2026-08-01T19:00:00',
  telefonoRSVP: '6658512142',
  mensajeRSVP: 'Hola, confirmo mi asistencia a los XV de Zoe Alexa. Somos ___ adultos y ___ niños.',
  urlMapa: 'https://maps.app.goo.gl/BpvXv8BAkQ9WtZ5G7'
};

const $ = s => document.querySelector(s);

$('#btn-abrir').addEventListener('click', ()=>{
  document.getElementById('invitacion').hidden = false;
  document.getElementById('splash').style.display = 'none';
});

const audio = $('#audio');
const btnM = $('#btn-musica');
btnM.addEventListener('click', function(){
  if(audio.paused){
    audio.play().then(()=>{ this.textContent='⏸'; this.setAttribute('aria-pressed','true');}).catch(()=>{ alert('Agrega tu archivo en media/favorita.mp3');});
  } else {
    audio.pause(); this.textContent='▶'; this.setAttribute('aria-pressed','false');}
});

(function(){
  const msg = encodeURIComponent(CONFIG.mensajeRSVP);
  const rsvp = document.getElementById('btn-rsvp');
  if(rsvp) rsvp.href = `https://wa.me/${CONFIG.telefonoRSVP}?text=${msg}`;
  const mapa = document.getElementById('btn-ubicacion');
  if(mapa) mapa.href = CONFIG.urlMapa || 'https://maps.app.goo.gl/BpvXv8BAkQ9WtZ5G7';
})();

(function(){
  const t = new Date("2026-08-01T18:00:00").getTime();
  const D=$('#D'), H=$('#H'), M=$('#M'), S=$('#S');
  function upd(){
    let diff = Math.max(0, t - Date.now());
    const d = Math.floor(diff/86400000); diff -= d*86400000;
    const h = Math.floor(diff/3600000); diff -= h*3600000;
    const m = Math.floor(diff/60000); diff -= m*60000;
    const s = Math.floor(diff/1000);
    D.textContent = String(d).padStart(2,'0');
    H.textContent = String(h).padStart(2,'0');
    M.textContent = String(m).padStart(2,'0');
    S.textContent = String(s).padStart(2,'0');
  }
  upd(); setInterval(upd, 1000);
})();
