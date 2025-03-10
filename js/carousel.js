/**
 * Gestión del carrusel en la sección "Back to the City"
 *
 * Este scrpit implementa la funcionalidad de carrusel para la sección
 * destacada de la página principal, con soporte para navegación y gestos táctiles.
 *
 */

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

    // Actualiza la posición y estado del carrusel
    const updateCarousel = () => {
        // Mover el carrusel horizontalmente
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar indicadores (dots)
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Configurar eventos para los botones de navegación
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

    // Configurar eventos para los indicadores (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Implementación de gestos táctiles para móvil
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Procesa el gesto de deslizamiento
    const handleSwipe = () =>  {
        if (touchEndX < touchStartX - 50) {
            // Deslizamiento hacia la izquierda - avanzar
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        } else if (touchEndX > touchStartX + 50) {
            // Deslizamiento hacia la derecha - retroceder
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }
    }

});