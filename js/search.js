/**
 * Funcionalidad para el buscador en la navbar
 * - Mostrar/ocultar el buscador al hacer clic en el icono
 * - Filtrar productos en tiempo real
 * - Mostrar resultados en un dropdown
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Search script loaded');

    // Elementos del DOM
    const searchIcon = document.querySelector('.search-icon');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = document.getElementById('search-overlay');

    // Verificar que los elementos necesarios existan
    if (!searchIcon || !searchDropdown || !searchOverlay) {
        console.error('Elementos del buscador no encontrados');
        return;
    }

    // Función para abrir/cerrar el buscador
    function toggleSearch(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar propagación
        }

        searchDropdown.classList.toggle('active');
        searchOverlay.classList.toggle('active');

        // Si el buscador está abierto, enfocar el input
        if (searchDropdown.classList.contains('active')) {
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }
    }

    // Función para cerrar el buscador
    function closeSearch() {
        searchDropdown.classList.remove('active');
        searchOverlay.classList.remove('active');
    }

    // Función para realizar la búsqueda
    function performSearch(query) {
        query = query.toLowerCase().trim();

        // Si no hay productos disponibles, intentar obtenerlos de products.js
        let productosDisponibles = [];

        // Verificar si productos está definido (desde products.js)
        if (typeof productos !== 'undefined') {
            productosDisponibles = productos;
        } else {
            // Si no está definido, usar un array vacío o intentar cargar desde otra fuente
            console.warn('Variable productos no encontrada, utilizando array vacío');
        }

        // Si la consulta está vacía, mostrar mensaje predeterminado
        if (query === '') {
            searchResults.innerHTML = '<div class="empty-search">Busca productos por nombre, categoría o marca</div>';
            return;
        }

        // Filtrar productos que coincidan con la consulta
        const resultados = productosDisponibles.filter(producto => {
            return (
                producto.nombre.toLowerCase().includes(query) ||
                producto.categoria.toLowerCase().includes(query) ||
                producto.marca.toLowerCase().includes(query) ||
                producto.colorNombre.toLowerCase().includes(query)
            );
        });

        // Mostrar resultados
        renderSearchResults(resultados, query);
    }

    // Función para renderizar resultados de búsqueda
    function renderSearchResults(resultados, query) {
        // Limpiar resultados previos
        searchResults.innerHTML = '';

        // Si no hay resultados, mostrar mensaje
        if (resultados.length === 0) {
            searchResults.innerHTML = `<div class="no-results">No se encontraron productos para: "${query}"</div>`;
            return;
        }

        // Crear un contenedor para los resultados
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';

        // Mostrar un máximo de 4 resultados para no sobrecargar el dropdown
        const productosAMostrar = resultados.slice(0, 4);

        // Renderizar cada resultado
        productosAMostrar.forEach(producto => {
            // Calcular precio con descuento
            const precioFinal = producto.descuento > 0
                ? producto.precio - (producto.precio * producto.descuento / 100)
                : producto.precio;

            const resultadoElement = document.createElement('div');
            resultadoElement.className = 'search-result-item';
            resultadoElement.innerHTML = `
                <div class="search-result-image">
                    <img src="${producto.imagen || 'assets/products/shoe-placeholder.png'}" alt="${producto.nombre}" onerror="this.src='assets/products/shoe-placeholder.png'">
                </div>
                <div class="search-result-info">
                    <h4 class="search-result-title">${producto.nombre}</h4>
                    <div class="search-result-category">${producto.categoria} | ${producto.marca}</div>
                    <div class="search-result-price">
                        ${producto.descuento > 0 ?
                            `<span class="search-result-price-original">€${producto.precio.toFixed(2)}</span>` : ''}
                        <span class="search-result-price-final">€${precioFinal.toFixed(2)}</span>
                    </div>
                </div>
            `;

            // Añadir evento para ir a la vista del producto
            resultadoElement.addEventListener('click', function() {
                // Aquí se podría implementar la navegación a la página del producto
                console.log(`Ver producto: ${producto.id} - ${producto.nombre}`);
                closeSearch();

                // Mostrar notificación
                showNotification(`Producto seleccionado: ${producto.nombre}`);
            });

            resultsContainer.appendChild(resultadoElement);
        });

        // Si hay más resultados de los que mostramos, añadir un enlace para ver todos
        if (resultados.length > 4) {
            const verTodosLink = document.createElement('div');
            verTodosLink.className = 'view-all-results';
            verTodosLink.textContent = `Ver todos los resultados (${resultados.length})`;

            verTodosLink.addEventListener('click', function() {
                // Aquí se podría implementar la navegación a la página de resultados completa
                console.log(`Ver todos los resultados para: "${query}"`);
                closeSearch();

                // Filtrar productos y actualizar visualización principal
                if (typeof aplicarFiltrosBusqueda === 'function') {
                    aplicarFiltrosBusqueda(query);
                }
            });

            resultsContainer.appendChild(verTodosLink);
        }

        searchResults.appendChild(resultsContainer);
    }

    // Función para mostrar notificación
    function showNotification(message) {
        // Verificar si ya existe una notificación
        let notification = document.querySelector('.notification');

        if (!notification) {
            // Crear nueva notificación
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }

        // Actualizar mensaje
        notification.textContent = message;

        // Mostrar notificación
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 100);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('notification-show');
        }, 3000);
    }

    // Función para filtrar productos y aplicar a la visualización principal
    function aplicarFiltrosBusqueda(query) {
        // Esta función puede ser llamada desde el enlace "Ver todos los resultados"
        // Simula un clic en el botón de filtros y prepara los filtros para coincidir con la búsqueda

        // Abrir el panel de filtros
        const filterToggle = document.getElementById('filter-toggle');
        if (filterToggle) {
            filterToggle.click();
        }

        // Si existe la función aplicarFiltros del archivo products.js, actualizamos la consulta
        window.ultimaConsultaBusqueda = query; // Guardar la consulta para que products.js pueda acceder a ella

        // Si queremos usar esta función desde fuera
        if (typeof window.searchAPI === 'undefined') {
            window.searchAPI = {};
        }
        window.searchAPI.aplicarFiltrosBusqueda = aplicarFiltrosBusqueda;
    }

    // Agregar eventos
    searchIcon.addEventListener('click', toggleSearch);
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    // Evitar que los clics dentro del dropdown propaguen al documento
    searchDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Evento de input para búsqueda en tiempo real
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    // Evento de envío del formulario para evitar recarga
    const searchForm = searchDropdown.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value;
            if (query.trim() !== '') {
                aplicarFiltrosBusqueda(query);
            }
        });
    }

    // Exponer API para usar desde otros scripts
    window.searchAPI = {
        open: toggleSearch,
        close: closeSearch,
        search: performSearch,
        aplicarFiltrosBusqueda: aplicarFiltrosBusqueda
    };
});

// Función para integrar con products.js
function extenderFiltrosProductos() {
    // Verificar si la función aplicarFiltros original existe
    if (typeof window.aplicarFiltros === 'function') {
        // Guardar la función original
        const aplicarFiltrosOriginal = window.aplicarFiltros;

        // Sobreescribir con una versión que incluya la búsqueda
        window.aplicarFiltros = function() {
            // Aplicar filtros normales primero
            aplicarFiltrosOriginal.apply(this, arguments);

            // Verificar si hay una consulta de búsqueda activa
            const consulta = window.ultimaConsultaBusqueda;
            if (consulta && typeof consulta === 'string' && consulta.trim() !== '') {
                // Refinar los resultados con la búsqueda
                const productosContainer = document.getElementById('products-grid');
                if (productosContainer) {
                    // Obtener todos los productos mostrados actualmente
                    const tarjetasProductos = productosContainer.querySelectorAll('.product-card');

                    // Filtrar las tarjetas que no coincidan con la búsqueda
                    tarjetasProductos.forEach(tarjeta => {
                        const nombre = tarjeta.querySelector('.product-title').textContent.toLowerCase();
                        const categoria = tarjeta.querySelector('.product-category').textContent.toLowerCase();
                        const marca = tarjeta.querySelector('.product-brand').textContent.toLowerCase();

                        const coincide = nombre.includes(consulta.toLowerCase()) ||
                                       categoria.includes(consulta.toLowerCase()) ||
                                       marca.includes(consulta.toLowerCase());

                        if (!coincide) {
                            tarjeta.style.display = 'none';
                        }
                    });

                    // Actualizar el contador de resultados
                    const resultadosCounter = document.getElementById('results-count');
                    if (resultadosCounter) {
                        const visibles = productosContainer.querySelectorAll('.product-card[style="display: none;"]').length;
                        resultadosCounter.textContent = tarjetasProductos.length - visibles;
                    }

                    // Añadir una etiqueta de filtro activo
                    const etiquetasContainer = document.getElementById('active-filters');
                    if (etiquetasContainer) {
                        // Verificar si ya existe una etiqueta de búsqueda
                        const etiquetaExistente = etiquetasContainer.querySelector('.filter-tag[data-tipo="busqueda"]');

                        if (!etiquetaExistente) {
                            const etiqueta = document.createElement('div');
                            etiqueta.className = 'filter-tag';
                            etiqueta.setAttribute('data-tipo', 'busqueda');
                            etiqueta.innerHTML = `
                                <span>Búsqueda: "${consulta}"</span>
                                <span class="filter-tag-remove">×</span>
                            `;

                            // Evento para quitar el filtro de búsqueda
                            etiqueta.querySelector('.filter-tag-remove').addEventListener('click', function() {
                                window.ultimaConsultaBusqueda = '';
                                etiqueta.remove();
                                aplicarFiltrosOriginal();
                            });

                            etiquetasContainer.appendChild(etiqueta);
                        }
                    }
                }
            }
        };
    }
}

// Ejecutar la extensión cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', extenderFiltrosProductos);