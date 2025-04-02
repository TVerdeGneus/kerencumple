document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const playButton = document.getElementById('play-music-button');

  // Lista de canciones
  const playlist = [
    "Niños del Cerro - Povidona - reinterpretación en piano.mp3",
    "OMORI - Final Duet - Piano Only - Pedro Silva.mp3"
  ];

  // Obtener estado guardado
  let currentTrack = parseInt(localStorage.getItem('audioTrack')) || 0;
  let savedTime = parseFloat(localStorage.getItem('audioTime')) || 0;
  const alreadyPlayed = localStorage.getItem('musicPlayed') === 'true';

  audio.src = playlist[currentTrack];
  audio.volume = 0.25;

  // Aplicar tiempo guardado al cargar los metadatos del audio
  audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(savedTime)) {
      audio.currentTime = savedTime;
    }
    // Si ya se había iniciado en otra página, continuar automáticamente
    if (alreadyPlayed) {
      audio.play().catch(() => {});
      if (playButton) playButton.style.display = 'none';
    }
  });

  // Botón de inicio de música
  if (playButton) {
    playButton.addEventListener('click', () => {
      audio.play().catch(() => {});
      playButton.style.display = 'none';
      localStorage.setItem('musicPlayed', 'true');
    });
  }

  // Guardar tiempo y pista antes de salir
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audio.currentTime);
    localStorage.setItem('audioTrack', currentTrack);
  });

  // Cambiar de pista cuando termina
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    localStorage.setItem('audioTrack', currentTrack);
    localStorage.setItem('audioTime', 0);
    audio.src = playlist[currentTrack];
    audio.play().catch(() => {});
  });

  /* ========== ANIMACIÓN DE BLOQUES (si la usas en tus páginas) ========== */
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

  /* ========== EFECTO DE LLUVIA (si existe) ========== */
  const rainContainer = document.getElementById('rain-container');
  if (rainContainer) {
    const numDrops = 40;
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.classList.add('drop');
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = 2 + Math.random() * 3 + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      drop.style.height = (40 + Math.random() * 40) + 'px';
      rainContainer.appendChild(drop);
    }
  }
});
