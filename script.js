// CONFIGURACIÓN GENERAL
const CONFIG = {
  fechaEventoISO: '2026-08-01T19:00:00',
  telefonoRSVP: '6658512142',
  mensajeRSVP: 'Hola, confirmo mi asistencia a los XV de Zoe Alexa. Somos ___ adultos y ___ niños.',
  urlMapa: 'https://maps.app.goo.gl/BpvXv8BAkQ9WtZ5G7'
};

const $ = s => document.querySelector(s);

// ----------------------
// ABRIR INVITACIÓN
// ----------------------
$('#btn-abrir').addEventListener('click', ()=>{
  $('#invitacion').style.display = 'block';
  $('#splash').style.display = 'none';

  // Reproducir música automáticamente al entrar y activar el botón dorado
  const audio = $('#audio');
  audio.play().then(() => {
    // Si arranca con éxito, mostramos el ícono de pausa en el botón dorado
    const playIcon = $('.icon-play');
    const pauseIcon = $('.icon-pause');
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
    }
  }).catch(()=>{});
});

// ----------------------
// CONTROL DEL BOTÓN DORADO DE MÚSICA (ACTUALIZADO)
// ----------------------
const audio = $('#audio');
const btnMusicToggle = $('#music-toggle'); // Vinculado a tu nuevo botón dorado

if (btnMusicToggle) {
  btnMusicToggle.addEventListener('click', () => {
    const playIcon = $('.icon-play');
    const pauseIcon = $('.icon-pause');

    if (audio.paused) {
      audio.play().then(() => {
        // Muestra pausa ⏸ y oculta play ▶
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'inline';
      });
    } else {
      audio.pause();
      // Muestra play ▶ y oculta pausa ⏸
      if (playIcon) playIcon.style.display = 'inline';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  });
}

// ----------------------
// LINKS DINÁMICOS
// ----------------------
(function(){
  const msg = encodeURIComponent(CONFIG.mensajeRSVP);
  const rsvp = $('#btn-rsvp');
  if(rsvp) rsvp.href = `https://wa.me/${CONFIG.telefonoRSVP}?text=${msg}`;

  const mapa = $('#btn-ubicacion');
  if(mapa) mapa.href = CONFIG.urlMapa;
})();

// ----------------------
// CONTADOR (CORREGIDO)
// ----------------------
(function(){
  const fechaTexto = $(".fecha").textContent.trim();

  const meses = {
    "enero": "01","febrero": "02","marzo": "03","abril": "04",
    "mayo": "05","junio": "06","julio": "07","agosto": "08",
    "septiembre": "09","octubre": "10","noviembre": "11","diciembre": "12"
  };

  const partes = fechaTexto.split(" de ");
  const dia = partes[0];
  const mes = meses[partes[1].toLowerCase()]; // Asegura minúsculas
  const año = partes[2];

  const fechaISO = `${año}-${mes}-${dia.padStart(2,'0')}T18:00:00`;
  const t = new Date(fechaISO).getTime();

  const D=$('#D'), H=$('#H'), M=$('#M'), S=$('#S');

  function upd(){
    let diff = Math.max(0, t - Date.now());
    const d = Math.floor(diff/86400000); diff -= d*86400000;
    const h = Math.floor(diff/3600000); diff -= h*3600000;
    const m = Math.floor(diff/60000); diff -= m*60000;
    const s = Math.floor(diff/1000);

    // Corregido: Ahora usa las constantes D, H, M, S declaradas arriba
    if(D) D.textContent = String(d).padStart(2,'0');
    if(H) H.textContent = String(h).padStart(2,'0');
    if(M) M.textContent = String(m).padStart(2,'0');
    if(S) S.textContent = String(s).padStart(2,'0');
  }

  setInterval(upd, 1000);
  upd();
})();
