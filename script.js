document.addEventListener('DOMContentLoaded', () => {
  /* ========== 1. CREAR EFECTO DE LLUVIA ========== */
  const rainContainer = document.getElementById('rain-container');
  const numDrops = 40; // Ajusta la cantidad de gotas según lo desees

  for (let i = 0; i < numDrops; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = Math.random() * 100 + '%';
    const fallDuration = 2 + Math.random() * 3;
    drop.style.animationDuration = fallDuration + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.height = (40 + Math.random() * 40) + 'px';
    rainContainer.appendChild(drop);
  }

  /* ========== 2. ANIMACIÓN DE BLOQUES (usando IntersectionObserver) ========== */
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.animate-block').forEach(el => {
    observer.observe(el);
  });
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const playButton = document.getElementById('play-music-button');

  const playlist = [
    "Niños del Cerro - Povidona - reinterpretación en piano.mp3",
    "OMORI - Final Duet - Piano Only - Pedro Silva.mp3"
  ];

  let currentTrack = parseInt(localStorage.getItem('audioTrack')) || 0;
  let savedTime = parseFloat(localStorage.getItem('audioTime')) || 0;

  audio.src = playlist[currentTrack];
  audio.volume = 0.25;

  // Aplicar tiempo guardado al cargar
  audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(savedTime)) {
      audio.currentTime = savedTime;
    }
  });

  // Al hacer clic en el botón de música
  playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none';
  });

  // Guardar el tiempo antes de salir
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audio.currentTime);
    localStorage.setItem('audioTrack', currentTrack);
  });

  // Cuando termina la canción, pasa a la siguiente
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    localStorage.setItem('audioTrack', currentTrack);
    localStorage.setItem('audioTime', 0);
    audio.src = playlist[currentTrack];
    audio.play();
  });
});


