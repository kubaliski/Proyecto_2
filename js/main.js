/**
 * Archivo principal de JavaScript
 * Gestiona la inicialización de todos los módulos
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado completamente, scripts inicializados');

    // Gestión del video
    initVideoBackground();

    // Aquí podrías ejecutar otras funciones de inicialización global
});

/**
 * Manejo avanzado del video de fondo
 * - Comprueba si el video puede reproducirse
 * - Implementa fallbacks para diferentes navegadores
 * - Gestiona errores de carga
 */
function initVideoBackground() {
    const heroVideo = document.getElementById('hero-video');
    const videoContainer = document.querySelector('.video-container');
    const heroSection = document.querySelector('.video-hero');

    if (!heroVideo) return;

    // Función para manejar el éxito de la carga del video
    function handleVideoSuccess() {
        console.log('Video loaded successfully');
        // Añadir clase para indicar que el video está reproduciéndose
        heroSection.classList.add('video-playing');
    }

    // Función para manejar errores de carga o reproducción
    function handleVideoError(error) {
        console.error('Video error:', error);
        // Añadir clase para aplicar el fondo de respaldo
        heroSection.classList.add('video-error');
        // Ocultar el contenedor de video para que se muestre el fondo de respaldo
        videoContainer.style.display = 'none';
    }

    // Comprobar si el video puede reproducirse
    function checkVideoPlayback() {
        const videoPromise = heroVideo.play();

        if (videoPromise !== undefined) {
            videoPromise
                .then(() => {
                    // Video comenzó a reproducirse correctamente
                    handleVideoSuccess();
                })
                .catch(error => {
                    // Error al reproducir el video (ej: autoplay bloqueado)
                    console.log('Autoplay prevented:', error);

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

    // Eventos para el video
    heroVideo.addEventListener('canplaythrough', function() {
        // El video se ha cargado y puede reproducirse
        checkVideoPlayback();
    });

    heroVideo.addEventListener('error', function(e) {
        // Error al cargar el video
        handleVideoError(e);
    });

    // Si el video ya está cargado cuando se añade el listener
    if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        checkVideoPlayback();
    }
}