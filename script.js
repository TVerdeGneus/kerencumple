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

  /* ========== 2. ANIMACIÓN DE BLOQUE ========== */
  // Usamos IntersectionObserver para detectar cuando cada bloque (.animate-block) entra en pantalla
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
});
