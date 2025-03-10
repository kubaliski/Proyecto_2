/**
 * Archivo principal de JavaScript para ECO Step
 *
 * Este script gestiona la inicialización general de la web
 * y la reproducción del video de fondo en la página principal.
 *
 * Autor: Angel Caparros Caballero
 * Última modificación: Marzo 2025
 */

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Gestión del video de fondo
    initVideoBackground();

    // Espacio para futuras inicializaciones globales
});

// Gestiona la reproducción del video de fondo con sistema de fallback
const initVideoBackground = () =>  {
    const heroVideo = document.getElementById('hero-video');
    const videoContainer = document.querySelector('.video-container');
    const heroSection = document.querySelector('.video-hero');

    if (!heroVideo) return;

    // Maneja el éxito de la carga del video
    const handleVideoSuccess = () => {
        // Añadir clase para indicar que el video está reproduciéndose
        heroSection.classList.add('video-playing');
    }

    // Maneja errores de carga o reproducción del video
    const handleVideoError= (error) => {
        // Añadir clase para aplicar el fondo de respaldo
        heroSection.classList.add('video-error');
        // Ocultar el contenedor de video para mostrar el fondo de respaldo
        videoContainer.style.display = 'none';
    }

    // Comprueba si el video puede reproducirse
    const checkVideoPlayback = () =>{
        const videoPromise = heroVideo.play();

        if (videoPromise !== undefined) {
            videoPromise
                .then(() => {
                    // Video comenzó a reproducirse correctamente
                    handleVideoSuccess();
                })
                .catch(error => {
                    // Error al reproducir el video (ej: autoplay bloqueado)

                    // En móviles, el autoplay suele estar bloqueado, añadir botón para reproducir
                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent && !document.querySelector('.video-play-btn')) {
                        const playButton = document.createElement('button');
                        playButton.className = 'video-play-btn';
                        playButton.innerHTML = 'Reproducir video';
                        playButton.addEventListener('click', function() {
                            heroVideo.play()
                                .then(() => {
                                    handleVideoSuccess();
                                    this.remove();
                                })
                                .catch(err => {
                                    handleVideoError(err);
                                    this.remove();
                                });
                        });
                        heroContent.prepend(playButton);
                    }

                    // Si es un error más grave, aplicar el fallback
                    if (error.name !== 'NotAllowedError') {
                        handleVideoError(error);
                    }
                });
        } else {
            // El navegador no soporta promesas para video.play()
            // (navegadores muy antiguos)
            handleVideoSuccess(); // Asumimos que funciona
        }
    }

    // Configurar eventos para el video
    heroVideo.addEventListener('canplaythrough', function() {
        // El video se ha cargado y puede reproducirse
        checkVideoPlayback();
    });

    heroVideo.addEventListener('error', function(e) {
        // Error al cargar el video
        handleVideoError(e);
    });

    // Si el video ya está cargado cuando se añade el listener
    if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA o superior
        checkVideoPlayback();
    }
}