// Carrusel para la sección "Back to the City"
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carousel = document.getElementById('city-carousel');
    const items = carousel ? carousel.querySelectorAll('.carousel-item') : [];
    const dotsContainer = document.getElementById('carousel-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    const prevButton = document.querySelector('.carousel-control.prev-button');
    const nextButton = document.querySelector('.carousel-control.next-button');

    // Si no encontramos el carrusel, salimos
    if (!carousel) return;

    let currentIndex = 0;
    const itemCount = items.length;

    // Función para actualizar el carrusel
    function updateCarousel() {
        // Mover el carrusel
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Event listeners para los botones de navegación
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        });
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Swipe para móvil (implementación simple)
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe izquierda - siguiente
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe derecha - anterior
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }
    }

    // Auto-play opcional (uncomment para activar)
    /*
    setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000); // Cambia cada 5 segundos
    */
});