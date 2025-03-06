/**
 * Gestión dinámica de productos
 * - Generación de templates para productos
 * - Filtrado de productos con drawer
 * - Renderizado dinámico
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Products script loaded');
    initProducts();
    setupFilterDrawer();
});

// Array con datos de productos
// Array con datos de productos
const productos = [
    {
        id: 1,
        nombre: 'Air Sport XZ1',
        precio: 129.99,
        descuento: 15,
        categoria: 'running',
        color: '#000000',  // negro
        colorNombre: 'negro',
        destacado: true,
        imagen: 'assets/products/shoe_1.png',
        marca: 'SportMax',
        stock: 15  // Añadido stock como número
    },
    {
        id: 2,
        nombre: 'Urban Walker Pro',
        precio: 89.99,
        descuento: 0,
        categoria: 'casual',
        color: '#FFFFFF',  // blanco
        colorNombre: 'blanco',
        destacado: false,
        imagen: 'assets/products/shoe_2.png',
        marca: 'UrbanStep',
        stock: 20
    },
    {
        id: 3,
        nombre: 'Trail Master X3',
        precio: 149.99,
        descuento: 10,
        categoria: 'trail',
        color: '#008000',  // verde
        colorNombre: 'verde',
        destacado: true,
        imagen: 'assets/products/shoe_3.png',
        marca: 'OutdoorPro',
        stock: 8  // Pocas unidades
    },
    {
        id: 4,
        nombre: 'Classic Elegance',
        precio: 79.99,
        descuento: 0,
        categoria: 'formal',
        color: '#000000',  // negro
        colorNombre: 'negro',
        destacado: false,
        imagen: 'assets/products/shoe_4.png',
        marca: 'ClassicStyle',
        stock: 0  // Sin stock
    },
    {
        id: 5,
        nombre: 'Street Style V2',
        precio: 109.99,
        descuento: 5,
        categoria: 'casual',
        color: '#0000FF',  // azul
        colorNombre: 'azul',
        destacado: true,
        imagen: 'assets/products/shoe_5.png',
        marca: 'UrbanStep',
        stock: 12
    },
    {
        id: 6,
        nombre: 'Marathon Elite',
        precio: 159.99,
        descuento: 0,
        categoria: 'running',
        color: '#FF0000',  // rojo
        colorNombre: 'rojo',
        destacado: true,
        imagen: 'assets/products/shoe_6.png',
        marca: 'SportMax',
        stock: 25
    },
    {
        id: 7,
        nombre: 'Adventure Hiker',
        precio: 139.99,
        descuento: 20,
        categoria: 'trail',
        color: '#A52A2A',  // marrón
        colorNombre: 'marron',
        destacado: false,
        imagen: 'assets/products/shoe_7.png',
        marca: 'OutdoorPro',
        stock: 5  // Pocas unidades
    },
    {
        id: 8,
        nombre: 'Business Elite',
        precio: 119.99,
        descuento: 0,
        categoria: 'formal',
        color: '#A52A2A',  // marrón
        colorNombre: 'marron',
        destacado: true,
        imagen: 'assets/products/shoe_8.png',
        marca: 'ClassicStyle',
        stock: 18
    },
    {
        id: 9,
        nombre: 'Summer Breeze',
        precio: 69.99,
        descuento: 0,
        categoria: 'casual',
        color: '#FFFF00',  // amarillo
        colorNombre: 'amarillo',
        destacado: false,
        imagen: '',  // vacío a propósito para mostrar el fallback en caso de que no haya imagen
        marca: 'SummerFeel',
        stock: 0  // Sin stock
    },
];

// Estado actual de filtros y ordenamiento
let currentFilters = {
    categorias: [],
    marcas: [],
    colores: [],
    destacados: false,
    precioMin: 0,
    precioMax: 1000
};

let currentSort = 'destacados';

// Función para inicializar los productos y filtros
function initProducts() {
    renderProductos(productos);
    setupFiltros();
    setupOrdenamiento();
}

// Función para configurar el drawer de filtros
function setupFilterDrawer() {
    const filterToggle = document.getElementById('filter-toggle');
    const mobileFilterButton = document.getElementById('mobile-filter-button');
    const filtersDrawer = document.getElementById('filters-drawer');
    const filtersDrawerClose = document.getElementById('filters-drawer-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const body = document.body;

    // Función para abrir el drawer
    function openFilterDrawer() {
        filtersDrawer.classList.add('active');
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    }

    // Función para cerrar el drawer
    function closeFilterDrawer() {
        filtersDrawer.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Función para alternar el estado del drawer
    function toggleFilterDrawer() {
        if (filtersDrawer.classList.contains('active')) {
            closeFilterDrawer();
        } else {
            openFilterDrawer();
        }
    }

    // Evento para abrir el drawer desde la navbar
    if (filterToggle) {
        filterToggle.addEventListener('click', function(e) {
            e.preventDefault();
            openFilterDrawer();
        });
    }

    // Evento para alternar el drawer desde el botón móvil
    if (mobileFilterButton) {
        mobileFilterButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFilterDrawer();
        });
    }

    // Evento para cerrar con el botón X
    if (filtersDrawerClose) {
        filtersDrawerClose.addEventListener('click', function() {
            closeFilterDrawer();
        });
    }

    // Evento para cerrar con el overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            // Cerrar el drawer de filtros si está abierto
            if (filtersDrawer.classList.contains('active')) {
                closeFilterDrawer();
            }
        });
    }

    // Evento para aplicar filtros y cerrar drawer
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            aplicarFiltros();
            closeFilterDrawer();
        });
    }
}



// Función para generar HTML de un producto mediante template literal
function generarProductoTemplate(producto) {
    // Calcular precio con descuento
    const precioFinal = producto.descuento > 0
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    // Template para producto
    return `
        <article class="product-card ${producto.destacado ? 'product-featured' : ''}" data-id="${producto.id}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='assets/products/shoe-placeholder.png'">
                ${producto.descuento > 0 ? `<span class="product-discount">-${producto.descuento}%</span>` : ''}
                ${producto.destacado ? '<span class="product-featured-badge">Destacado</span>' : ''}

                <!-- Nueva lupa de vista de detalle -->
                <a href="producto.html?id=${producto.id}" class="product-detail-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </a>
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <div class="product-brand">${producto.marca}</div>
                <div class="product-category">${producto.categoria}</div>
                <div class="product-price-container">
                    ${producto.descuento > 0 ?
                        `<span class="product-price-original">€${producto.precio.toFixed(2)}</span>` : ''}
                    <span class="product-price">€${precioFinal.toFixed(2)}</span>
                </div>
                <div class="product-color" style="background-color: ${producto.color}"></div>
                <button class="btn btn-primary btn-sm product-add-cart"
                    data-id="${producto.id}"
                    data-name="${producto.nombre}"
                    data-price="${precioFinal.toFixed(2)}"
                    data-image="${producto.imagen || 'assets/products/shoe-placeholder.png'}">
                    Añadir al carrito
                </button>
            </div>
        </article>
    `;
}

// Función para renderizar lista de productos
function renderProductos(productos) {
    const productosContainer = document.getElementById('products-grid');
    if (!productosContainer) return;

    // Limpiar container
    productosContainer.innerHTML = '';

    // Si no hay productos mostrar mensaje
    if (productos.length === 0) {
        productosContainer.innerHTML = '<div class="no-products">No se encontraron productos con los filtros seleccionados</div>';
        return;
    }

    // Crear fragment para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Renderizar cada producto
    productos.forEach(producto => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = generarProductoTemplate(producto);

        // Añadir evento al botón
        const addButton = tempDiv.querySelector('.product-add-cart');
        if (addButton) {
            addButton.addEventListener('click', function(e) {
                e.preventDefault();
                agregarAlCarrito(producto.id);
            });
        }

        // Añadir al fragment
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
    });

    // Añadir todo de una vez al DOM
    productosContainer.appendChild(fragment);

    // Actualizar contador de resultados
    const resultadosCounter = document.getElementById('results-count');
    if (resultadosCounter) {
        resultadosCounter.textContent = productos.length;
    }
}

// Función para configurar los filtros
function setupFiltros() {
    // Obtener todos los filtros
    const filtrosForm = document.getElementById('filters-form');
    if (!filtrosForm) return;

    // Obtener categorías únicas y marcas para generar filtros
    const categorias = [...new Set(productos.map(p => p.categoria))];
    const marcas = [...new Set(productos.map(p => p.marca))];
    const colores = [...new Set(productos.map(p => p.color))];

    // Generar HTML para filtros de categoría
    const categoriasContainer = document.getElementById('categorias-filter');
    if (categoriasContainer) {
        categorias.forEach(categoria => {
            const label = document.createElement('label');
            label.className = 'filter-checkbox';
            label.innerHTML = `
                <input type="checkbox" name="categoria" value="${categoria}">
                <span class="checkbox-text">${capitalize(categoria)}</span>
            `;
            categoriasContainer.appendChild(label);
        });
    }

    // Generar HTML para filtros de marca
    const marcasContainer = document.getElementById('marcas-filter');
    if (marcasContainer) {
        marcas.forEach(marca => {
            const label = document.createElement('label');
            label.className = 'filter-checkbox';
            label.innerHTML = `
                <input type="checkbox" name="marca" value="${marca}">
                <span class="checkbox-text">${marca}</span>
            `;
            marcasContainer.appendChild(label);
        });
    }

    // Generar HTML para filtros de color
    const coloresContainer = document.getElementById('colores-filter');
    if (coloresContainer) {
        colores.forEach(color => {
            const producto = productos.find(p => p.color === color);
            const colorNombre = producto ? producto.colorNombre : color;

            const label = document.createElement('label');
            label.className = 'filter-color';
            label.innerHTML = `
                <input type="checkbox" name="color" value="${color}">
                <span class="color-circle" style="background-color: ${color}"></span>
                <span class="color-name">${capitalize(colorNombre)}</span>
            `;
            coloresContainer.appendChild(label);
        });
    }
    // Botón para limpiar filtros
    const limpiarFiltrosBtn = document.getElementById('clear-filters');
    if (limpiarFiltrosBtn) {
        limpiarFiltrosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filtrosForm.reset();

            // Restablecer los filtros actuales
            currentFilters = {
                categorias: [],
                marcas: [],
                colores: [],
                destacados: false,
                precioMin: 0,
                precioMax: 1000
            };

            // Limpiar etiquetas activas
            actualizarEtiquetasFiltrosActivos();

            // Renderizar productos sin filtros
            const productosOrdenados = ordenarProductos(productos, currentSort);
            renderProductos(productosOrdenados);
        });
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const form = document.getElementById('filters-form');
    if (!form) return;

    // Obtener valores seleccionados
    const categoriasSeleccionadas = Array.from(form.querySelectorAll('input[name="categoria"]:checked')).map(input => input.value);
    const marcasSeleccionadas = Array.from(form.querySelectorAll('input[name="marca"]:checked')).map(input => input.value);
    const coloresSeleccionados = Array.from(form.querySelectorAll('input[name="color"]:checked')).map(input => input.value);
    const soloDestacados = form.querySelector('input[name="destacados"]')?.checked || false;
    const precioMin = parseFloat(form.querySelector('input[name="precio-min"]')?.value || 0);
    const precioMax = parseFloat(form.querySelector('input[name="precio-max"]')?.value || 1000);

    // Actualizar filtros actuales
    currentFilters = {
        categorias: categoriasSeleccionadas,
        marcas: marcasSeleccionadas,
        colores: coloresSeleccionados,
        destacados: soloDestacados,
        precioMin: precioMin,
        precioMax: precioMax
    };

    // Filtrar productos
    let productosFiltrados = productos.filter(producto => {
        // Filtro por categoría
        if (currentFilters.categorias.length > 0 && !currentFilters.categorias.includes(producto.categoria)) {
            return false;
        }

        // Filtro por marca
        if (currentFilters.marcas.length > 0 && !currentFilters.marcas.includes(producto.marca)) {
            return false;
        }

        // Filtro por color
        if (currentFilters.colores.length > 0 && !currentFilters.colores.includes(producto.color)) {
            return false;
        }

        // Filtro por precio
        const precioFinal = producto.descuento > 0
            ? producto.precio - (producto.precio * producto.descuento / 100)
            : producto.precio;

        if (precioFinal < currentFilters.precioMin || precioFinal > currentFilters.precioMax) {
            return false;
        }

        // Filtro por destacados
        if (currentFilters.destacados && !producto.destacado) {
            return false;
        }

        return true;
    });

    // Aplicar ordenamiento actual
    productosFiltrados = ordenarProductos(productosFiltrados, currentSort);

    // Actualizar etiquetas de filtros activos
    actualizarEtiquetasFiltrosActivos();

    // Renderizar productos filtrados
    renderProductos(productosFiltrados);
}

// Función para actualizar etiquetas de filtros activos
function actualizarEtiquetasFiltrosActivos() {
    const container = document.getElementById('active-filters');
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    // Si no hay filtros activos, no mostrar nada
    if (currentFilters.categorias.length === 0 &&
        currentFilters.marcas.length === 0 &&
        currentFilters.colores.length === 0 &&
        !currentFilters.destacados &&
        currentFilters.precioMin === 0 &&
        (currentFilters.precioMax === 0 || currentFilters.precioMax >= 1000)) {
        return;
    }

    // Crear fragment para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Añadir etiquetas por categoría
    currentFilters.categorias.forEach(categoria => {
        const tag = crearEtiquetaFiltro(`Categoría: ${capitalize(categoria)}`, () => {
            // Eliminar categoría del filtro actual
            currentFilters.categorias = currentFilters.categorias.filter(c => c !== categoria);
            // Actualizar checkbox
            const checkbox = document.querySelector(`input[name="categoria"][value="${categoria}"]`);
            if (checkbox) checkbox.checked = false;
            // Aplicar filtros actualizados
            aplicarFiltros();
        });
        fragment.appendChild(tag);
    });

    // Añadir etiquetas por marca
    currentFilters.marcas.forEach(marca => {
        const tag = crearEtiquetaFiltro(`Marca: ${marca}`, () => {
            // Eliminar marca del filtro actual
            currentFilters.marcas = currentFilters.marcas.filter(m => m !== marca);
            // Actualizar checkbox
            const checkbox = document.querySelector(`input[name="marca"][value="${marca}"]`);
            if (checkbox) checkbox.checked = false;
            // Aplicar filtros actualizados
            aplicarFiltros();
        });
        fragment.appendChild(tag);
    });

    // Añadir etiquetas por color
    currentFilters.colores.forEach(color => {
        const producto = productos.find(p => p.color === color);
        const colorNombre = producto ? producto.colorNombre : color;

        const tag = crearEtiquetaFiltro(`Color: ${capitalize(colorNombre)}`, () => {
            // Eliminar color del filtro actual
            currentFilters.colores = currentFilters.colores.filter(c => c !== color);
            // Actualizar checkbox
            const checkbox = document.querySelector(`input[name="color"][value="${color}"]`);
            if (checkbox) checkbox.checked = false;
            // Aplicar filtros actualizados
            aplicarFiltros();
        });
        fragment.appendChild(tag);
    });

    // Añadir etiqueta por destacado
    if (currentFilters.destacados) {
        const tag = crearEtiquetaFiltro("Solo destacados", () => {
            // Actualizar estado
            currentFilters.destacados = false;
            // Actualizar checkbox
            const checkbox = document.querySelector('input[name="destacados"]');
            if (checkbox) checkbox.checked = false;
            // Aplicar filtros actualizados
            aplicarFiltros();
        });
        fragment.appendChild(tag);
    }

    // Añadir etiqueta por rango de precio
    if (currentFilters.precioMin > 0 || (currentFilters.precioMax > 0 && currentFilters.precioMax < 1000)) {
        const tag = crearEtiquetaFiltro(`Precio: €${currentFilters.precioMin} - €${currentFilters.precioMax}`, () => {
            // Restablecer precio
            currentFilters.precioMin = 0;
            currentFilters.precioMax = 1000;
            // Actualizar inputs
            const inputMin = document.querySelector('input[name="precio-min"]');
            const inputMax = document.querySelector('input[name="precio-max"]');
            if (inputMin) inputMin.value = '';
            if (inputMax) inputMax.value = '';
            // Aplicar filtros actualizados
            aplicarFiltros();
        });
        fragment.appendChild(tag);
    }

    // Añadir todas las etiquetas al DOM
    container.appendChild(fragment);
}

// Función para crear una etiqueta de filtro
function crearEtiquetaFiltro(texto, callbackRemover) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
        <span>${texto}</span>
        <span class="filter-tag-remove">×</span>
    `;

    // Añadir evento para eliminar filtro
    const removeBtn = tag.querySelector('.filter-tag-remove');
    if (removeBtn && typeof callbackRemover === 'function') {
        removeBtn.addEventListener('click', callbackRemover);
    }

    return tag;
}

// Función para configurar ordenamiento
function setupOrdenamiento() {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        aplicarFiltros(); // Reaplica los filtros con el nuevo orden
    });
}

// Función para ordenar productos
function ordenarProductos(productos, criterio) {
    const productosOrdenados = [...productos];

    switch (criterio) {
        case 'precio-asc':
            productosOrdenados.sort((a, b) => {
                const precioA = a.descuento > 0 ? a.precio * (1 - a.descuento/100) : a.precio;
                const precioB = b.descuento > 0 ? b.precio * (1 - b.descuento/100) : b.precio;
                return precioA - precioB;
            });
            break;
        case 'precio-desc':
            productosOrdenados.sort((a, b) => {
                const precioA = a.descuento > 0 ? a.precio * (1 - a.descuento/100) : a.precio;
                const precioB = b.descuento > 0 ? b.precio * (1 - b.descuento/100) : b.precio;
                return precioB - precioA;
            });
            break;
        case 'nombre-asc':
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre-desc':
            productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'descuento':
            productosOrdenados.sort((a, b) => b.descuento - a.descuento);
            break;
        case 'destacados':
            productosOrdenados.sort((a, b) => {
                if (a.destacado === b.destacado) return 0;
                return a.destacado ? -1 : 1;
            });
            break;
        default:
            // No hacemo nada
            break;
    }

    return productosOrdenados;
}

// Función para añadir producto al carrito
function agregarAlCarrito(idProducto) {
    console.log(`Producto ${idProducto} añadido al carrito`);

    // Encontrar el producto
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    // Calcular precio con descuento
    const precioFinal = producto.descuento > 0
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    // Verificar si window.cartAPI existe (añadido por cart.js)
    if (window.cartAPI && typeof window.cartAPI.addToCart === 'function') {
        // Usar la API del carrito para añadir el producto
        window.cartAPI.addToCart({
            id: producto.id.toString(),
            name: producto.nombre,
            price: precioFinal,
            image: producto.imagen || 'assets/products/shoe-placeholder.png'
        });
    } else {
        // Fallback al método original
        // Actualizar contador del carrito
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
        }

        // Mostrar notificación
        mostrarNotificacion(`${producto.nombre} añadido al carrito`);
    }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    // Verificar si ya existe una notificación
    let notificacion = document.querySelector('.notification');

    if (!notificacion) {
        // Crear elemento de notificación
        notificacion = document.createElement('div');
        notificacion.className = 'notification';
        document.body.appendChild(notificacion);
    }

    // Actualizar mensaje y mostrar
    notificacion.textContent = mensaje;
    notificacion.classList.add('notification-show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('notification-show');
    }, 3000);
}

// Utilidad para capitalizar primera letra
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}