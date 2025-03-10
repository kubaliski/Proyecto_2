/**
 * Funcionalidad de la navbar
 *
 * Este script gestiona los comportamientos dinámicos de la barra de navegación,
 * incluyendo el cambio de apariencia al hacer scroll y la interacción con el video.
 *
 */

document.addEventListener('DOMContentLoaded', ()=> {
    // Elementos del DOM
    const navbar = document.getElementById('navbar');
    const heroVideo = document.getElementById('hero-video');

    // Verificar que los elementos esenciales existan
    if (!navbar) {
        return;
    }

    // Maneja el cambio de apariencia de la navbar al hacer scroll
    const  handleScroll = () =>  {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Configura el scroll hacia abajo al hacer clic en el indicador
    const setupScrollIndicator = ()  =>  {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', ()=> {
                const heroHeight = document.querySelector('.video-hero').offsetHeight;
                window.scrollTo({
                    top: heroHeight - 50,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Gestiona la reproducción del video de fondo
    const setupVideo = () =>  {
        if (heroVideo) {
            // Intenta reproducir el video (puede fallar en dispositivos móviles)
            heroVideo.play().catch((error) => {
                // Añadir un botón para reproducir en móviles si es necesario
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && !document.querySelector('.video-play-btn')) {
                    const playButton = document.createElement('button');
                    playButton.className = 'video-play-btn';
                    playButton.innerHTML = 'Reproducir video';
                    playButton.addEventListener('click', () =>{
                        heroVideo.play();
                        playButton.remove();
                    });
                    heroContent.prepend(playButton);
                }
            });
        }
    }

    // Inicializa todas las funcionalidades
    const init = () =>  {
        // Configurar evento de scroll
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