/**
 * Funcionalidad para la navbar
 * - Cambio de apariencia al hacer scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar script loaded');

    // Elementos del DOM
    const navbar = document.getElementById('navbar');
    const heroVideo = document.getElementById('hero-video');

    // Verificar que los elementos esenciales existan
    if (!navbar) {
        console.error('Elementos de la navbar no encontrados');
        return;
    }

    // Función para manejar el cambio de apariencia al hacer scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Función para el scroll hacia abajo al hacer clic en el indicador
    function setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const heroHeight = document.querySelector('.video-hero').offsetHeight;
                window.scrollTo({
                    top: heroHeight - 50,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Función para asegurarse que el video funcione correctamente
    function setupVideo() {
        if (heroVideo) {
            // Reintentar reproducción del video (solución para algunos navegadores móviles)
            heroVideo.play().catch(function(error) {
                console.log('Auto-play prevented:', error);

                // Añadir un botón para reproducir en móviles si es necesario
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && !document.querySelector('.video-play-btn')) {
                    const playButton = document.createElement('button');
                    playButton.className = 'video-play-btn';
                    playButton.innerHTML = 'Reproducir video';
                    playButton.addEventListener('click', function() {
                        heroVideo.play();
                        this.remove();
                    });
                    heroContent.prepend(playButton);
                }
            });
        }
    }

    // Inicializar
    function init() {
        // Evento de scroll
        window.addEventListener('scroll', handleScroll);

        // Verificar estado inicial del scroll
        handleScroll();

        // Configurar el indicador de scroll
        setupScrollIndicator();

        // Configurar video
        setupVideo();
    }

    // Ejecutar inicialización
    init();
});