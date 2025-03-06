/**
 * Funcionalidad para el dropdown de usuario
 * - Mostrar/ocultar el dropdown al hacer clic en el icono
 *
 * Versión actualizada para funcionar con la navbar dinámica
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('User dropdown script loaded');

    // Esperar a que la navbar esté lista antes de inicializar
    document.addEventListener('navbarReady', initUserModule);

    // También intentar inicializar después de un tiempo como respaldo
    setTimeout(function() {
        const userIcon = document.querySelector('.user-icon');
        if (userIcon && !window.userAPI) {
            console.log('Inicializando user.js tras timeout');
            initUserModule();
        }
    }, 500);

    // Función principal de inicialización del módulo de usuario
    function initUserModule() {
        console.log('Inicializando módulo de usuario');

        // Elementos del DOM
        const userIcon = document.querySelector('.user-icon');
        const userDropdown = document.getElementById('user-dropdown');
        const userOverlay = document.getElementById('user-overlay');
        const userClose = document.getElementById('user-close');

        // Verificar que los elementos existan
        if (!userIcon || !userDropdown) {
            console.error('Elementos del dropdown de usuario no encontrados');
            return;
        }

        // Función para abrir/cerrar el dropdown
        function toggleUserDropdown(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            userDropdown.classList.toggle('active');
            userOverlay.classList.toggle('active');

            // Para móviles, añadir/quitar clase al body
            if (userDropdown.classList.contains('active')) {
                document.body.classList.add('user-open');
            } else {
                document.body.classList.remove('user-open');
            }
        }

        // Función para cerrar el dropdown
        function closeUserDropdown() {
            userDropdown.classList.remove('active');
            userOverlay.classList.remove('active');
            document.body.classList.remove('user-open');
        }

        // Evento de clic en icono de usuario
        userIcon.addEventListener('click', toggleUserDropdown);

        // Evento de clic en cerrar dropdown
        userClose.addEventListener('click', closeUserDropdown);

        // Evento de clic en overlay (fondo oscuro)
        userOverlay.addEventListener('click', closeUserDropdown);

        // Evitar que los clics dentro del dropdown se propaguen
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Exponer API para uso externo
        window.userAPI = {
            open: function() {
                userDropdown.classList.add('active');
                userOverlay.classList.add('active');
                document.body.classList.add('user-open');
            },
            close: closeUserDropdown,
            toggle: toggleUserDropdown
        };

        console.log('Módulo de usuario inicializado correctamente');
    }
});