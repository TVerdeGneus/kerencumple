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

  audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(savedTime)) {
      audio.currentTime = savedTime;
    }

    // Intentar reproducir
    audio.play().then(() => {
      if (playButton) playButton.style.display = 'none';
    }).catch(() => {
      // Si el navegador bloquea el autoplay, mostrar el botón
      if (playButton) playButton.style.display = 'block';
    });
  });

  if (playButton) {
    playButton.addEventListener('click', () => {
      audio.play().catch(() => {});
      playButton.style.display = 'none';
    });
  }

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audio.currentTime);
    localStorage.setItem('audioTrack', currentTrack);
  });

  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    localStorage.setItem('audioTrack', currentTrack);
    localStorage.setItem('audioTime', 0);
    audio.src = playlist[currentTrack];
    audio.play().catch(() => {});
  });
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
