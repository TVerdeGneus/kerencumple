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


  /* ========== 3. AUDIO DE FONDO ========== */
  const playlist = [
    "Niños del Cerro - Povidona - reinterpretación en piano.mp3",
    "OMORI - Final Duet - Piano Only - Pedro Silva.mp3"
  ];
  let currentTrack = 0;
  const audioElement = document.getElementById('background-music');
  audioElement.volume = 0.25; // Ajusta el volumen según lo necesites

  // Configuramos el botón para iniciar la música
  const playMusicButton = document.getElementById('play-music-button');
  playMusicButton.addEventListener('click', () => {
    audioElement.src = playlist[currentTrack];
    audioElement.play();
    // Oculta el botón una vez iniciada la reproducción
    playMusicButton.style.display = 'none';
  });

  // Cuando una canción termina, se pasa a la siguiente
  audioElement.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    audioElement.src = playlist[currentTrack];
    audioElement.play();
  });
});

