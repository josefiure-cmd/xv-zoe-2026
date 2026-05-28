// -----------------------------------------
// CONFIGURACIÓN GENERAL
// -----------------------------------------
const CONFIG = {
  fechaEventoISO: '2026-08-01T19:00:00',
  telefonoRSVP: '6658512142',
  mensajeRSVP: 'Hola, confirmo mi asistencia a los XV de Zoe Alexa. Somos ___ adultos y ___ niños.',
  urlMapa: 'https://maps.app.goo.gl/BpvXv8BAkQ9WtZ5G7'
};

const $ = s => document.querySelector(s);

// -----------------------------------------
// ABRIR INVITACIÓN + ANIMACIONES
// -----------------------------------------
$('#btn-abrir').addEventListener('click', ()=>{

  // Mostrar invitación
  $('#invitacion').hidden = false;

  // Animación del sobre
  $('#splash').classList.add('sobre-abierto');
  $('#splash').classList.add('oculto');

  // Animación de entrada de la invitación
  $('#invitacion').classList.add('visible');

  // Activar animación de secciones
  setTimeout(()=>{
    document.querySelectorAll('.fade-section').forEach(sec=>{
      sec.classList.add('visible');
    });
  }, 800);

  // Activar música
  const audio = $('#audio');
  audio.play().catch(()=>{});
});

// -----------------------------------------
// BOTÓN DE MÚSICA
// -----------------------------------------
const audio = $('#audio');
const btnM = $('#btn-musica');

btnM.addEventListener('click', function(){
  if(audio.paused){
    audio.play().then(()=>{
      this.textContent='⏸';
      this.setAttribute('aria-pressed','true');
    });
  } else {
    audio.pause();
    this.textContent='▶';
    this.setAttribute('aria-pressed','false');
  }
});

// -----------------------------------------
// LINKS DINÁMICOS (RSVP + MAPA)
// -----------------------------------------
(function(){
  const msg = encodeURIComponent(CONFIG.mensajeRSVP);
  const rsvp = $('#btn-rsvp');
  if(rsvp) rsvp.href = `https://wa.me/${CONFIG.telefonoRSVP}?text=${msg}`;

  const mapa = $('#btn-ubicacion');
  if(mapa) mapa.href = CONFIG.urlMapa;
})();

// -----------------------------------------
// CONTADOR CON ANIMACIÓN FLIP
// -----------------------------------------
function animarCambio(digElemento, nuevoValor) {
  const span = digElemento.querySelector('span');
  const valorActual = span.textContent;

  if (valorActual === nuevoValor) return;

  digElemento.setAttribute('data-next', nuevoValor);
  digElemento.classList.add('animar');

  setTimeout(() => {
    span.textContent = nuevoValor;
    digElemento.classList.remove('animar');
  }, 400);
}

(function(){
  const fechaTexto = $(".fecha").textContent.trim();

  const meses = {
    "enero": "01","febrero": "02","marzo": "03","abril": "04",
    "mayo": "05","junio": "06","julio": "07","agosto": "08",
    "septiembre": "09","octubre": "10","noviembre": "11","diciembre": "12"
  };

  const partes = fechaTexto.split(" de ");
  const dia = partes[0];
  const mes = meses[partes[1]];
  const año = partes[2];

  const fechaISO = `${año}-${mes}-${dia}T18:00:00`;
  const t = new Date(fechaISO).getTime();

  const D=$('#D'), H=$('#H'), M=$('#M'), S=$('#S');

  function upd(){
    let diff = Math.max(0, t - Date.now());
    const d = Math.floor(diff/86400000); diff -= d*86400000;
    const h = Math.floor(diff/3600000); diff -= h*3600000;
    const m = Math.floor(diff/60000); diff -= m*60000;
    const s = Math.floor(diff/1000);

    animarCambio(D, String(d).padStart(2,'0'));
    animarCambio(H, String(h).padStart(2,'0'));
    animarCambio(M, String(m).padStart(2,'0'));
    animarCambio(S, String(s).padStart(2,'0'));
  }

  setInterval(upd, 1000);
  upd();
})();
