/**
 * Funcionalidad para el dropdown de usuario
 * - Mostrar/ocultar el dropdown al hacer clic en el icono
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('User dropdown script loaded');

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
    function toggleUserDropdown() {
        userDropdown.classList.toggle('active');
        userOverlay.classList.toggle('active');

        // Para móviles, añadir/quitar clase al body
        if (userDropdown.classList.contains('active')) {
            document.body.classList.add('user-open');
        } else {
            document.body.classList.remove('user-open');
        }
    }

    // Función para inicializar los eventos del dropdown
    function initUserDropdownEvents() {
        // Evento de clic en icono de usuario
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleUserDropdown();
        });

        // Evento de clic en cerrar dropdown
        userClose.addEventListener('click', toggleUserDropdown);

        // Evento de clic en overlay (fondo oscuro)
        userOverlay.addEventListener('click', toggleUserDropdown);
    }

    // Función de inicialización principal
    function init() {
        initUserDropdownEvents();
        console.log('User dropdown inicializado');
    }

    // Inicializar dropdown
    init();
});