const CONFIG = {
  fechaEventoISO: '2026-08-01T19:00:00',
  telefonoRSVP: '6658512142',
  mensajeRSVP: 'Hola, confirmo mi asistencia a los XV de Zoe Alexa. Somos ___ adultos y ___ niños.',
  urlMapa: 'https://maps.app.goo.gl/BpvXv8BAkQ9WtZ5G7'
};

const $ = s => document.querySelector(s);
$('#btn-abrir').on('click', function(){

  // Mostrar la invitación
  document.getElementById("invitacion").hidden = false;

  // Reproducir música
  const audio = document.getElementById("musica");
  audio.play().catch(err => console.log("Autoplay bloqueado:", err));

  // Aquí siguen tus animaciones del sobre...
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
  // 1. Tomar la fecha desde el HTML
  const fechaTexto = document.querySelector(".fecha").textContent.trim();

  // 2. Convertir "01 de agosto de 2026" a ISO
  const meses = {
    "enero": "01","febrero": "02","marzo": "03","abril": "04",
    "mayo": "05","junio": "06","julio": "07","agosto": "08",
    "septiembre": "09","octubre": "10","noviembre": "11","diciembre": "12"
  };

  const partes = fechaTexto.split(" de ");
  const dia = partes[0];
  const mes = meses[partes[1]];
  const año = partes[2];

  // 3. Crear fecha ISO con hora fija (ajústala si quieres)
  const fechaISO = `${año}-${mes}-${dia}T18:00:00`;

  // 4. Usar tu mismo código
  const t = new Date(fechaISO).getTime();
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

  setInterval(upd, 1000);
  upd();
})();
