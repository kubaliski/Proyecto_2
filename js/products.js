/**
 * Gestión de productos y filtros
 *
 * Este script maneja la visualización, filtrado y ordenamiento
 * de productos en la tienda, así como la interacción con el carrito.
 *
 */

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    setupFilterDrawer();
});

// Catálogo de productos disponibles
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
        stock: 15
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
        imagen: '',  // Imagen vacía intencionalmente para probar el fallback
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

// Inicializa los productos y filtros en la página
const initProducts = () =>  {
    // Exponemos los productos para que otros módulos puedan acceder
    window.productosDisponibles = productos;

    // Inicialización de componentes
    renderProductos(productos);
    setupFiltros();
    setupOrdenamiento();
}

// Configura el drawer de filtros
const setupFilterDrawer = () =>  {
    // Selección de elementos
    const filterToggle = document.getElementById('filter-toggle');
    const mobileFilterButton = document.getElementById('mobile-filter-button');
    const filtersDrawer = document.getElementById('filters-drawer');
    const filtersDrawerClose = document.getElementById('filters-drawer-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const body = document.body;

    // Funciones para manejar el drawer
    const  openFilterDrawer = () =>  {
        filtersDrawer.classList.add('active');
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    }

    const closeFilterDrawer= ()  => {
        filtersDrawer.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Definimos la función de manera explícita para mejor compatibilidad
    const handleMobileFilterClick = (e) =>  {
        e.preventDefault();

        // Comprobamos el estado actual del drawer y lo alternamos
        if (filtersDrawer.classList.contains('active')) {
            closeFilterDrawer();
        } else {
            openFilterDrawer();
        }
    }

    // Eventos para el drawer de filtros
    if (filterToggle) {
        filterToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openFilterDrawer();
        });
    }

    // Enfoque directo para el botón móvil: sin usar removeEventListener para evitar problemas de referencia
    if (mobileFilterButton) {
        // Limpiamos handlers antiguos clonando el nodo (enfoque más radical pero efectivo)
        const newMobileButton = mobileFilterButton.cloneNode(true);
        if (mobileFilterButton.parentNode) {
            mobileFilterButton.parentNode.replaceChild(newMobileButton, mobileFilterButton);
        }

        // Agregamos el nuevo event listener al botón clonado
        newMobileButton.addEventListener('click', handleMobileFilterClick);
    }

    if (filtersDrawerClose) {
        filtersDrawerClose.addEventListener('click', () => {
            closeFilterDrawer();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', ()  =>{
            // Cerrar el drawer de filtros si está abierto
            if (filtersDrawer.classList.contains('active')) {
                closeFilterDrawer();
            }
        });
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aplicarFiltros();
            closeFilterDrawer();
        });
    }
}

// Inicialización diferida para asegurar que todos los elementos están cargados
document.addEventListener('DOMContentLoaded', () => {
    // Las funciones originales se mantienen
    initProducts();

    // Ejecutar setupFilterDrawer después de un pequeño retraso
    setTimeout(() => {
        setupFilterDrawer();
    }, 100);
});


// Genera el HTML para un producto individual
const generarProductoTemplate  = (producto)  => {
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

// Renderiza la lista de productos en la página
const renderProductos = (productos) =>  {
    const productosContainer = document.getElementById('products-grid');
    if (!productosContainer) return;

    // Limpiar contenedor
    productosContainer.innerHTML = '';

    // Si no hay productos mostrar mensaje
    if (productos.length === 0) {
        productosContainer.innerHTML = '<div class="no-products">No se encontraron productos con los filtros seleccionados</div>';
        return;
    }

    // Usar fragment para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Renderizar cada producto
    productos.forEach(producto => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = generarProductoTemplate(producto);

        // Añadir evento al botón de carrito
        const addButton = tempDiv.querySelector('.product-add-cart');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
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

// Configura los filtros de productos
const setupFiltros = () =>  {
    // Obtener formulario de filtros
    const filtrosForm = document.getElementById('filters-form');
    if (!filtrosForm) return;

    // Obtener categorías únicas y otros valores para generar filtros
    const categorias = [...new Set(productos.map(p => p.categoria))];
    const marcas = [...new Set(productos.map(p => p.marca))];
    const colores = [...new Set(productos.map(p => p.color))];

    // Generar filtros de categoría
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

    // Generar filtros de marca
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

    // Generar filtros de color
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
        limpiarFiltrosBtn.addEventListener('click', (e) =>{
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

// Aplica los filtros seleccionados a la lista de productos
const aplicarFiltros = () =>  {
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

// Actualiza las etiquetas visuales de filtros activos
const actualizarEtiquetasFiltrosActivos = () =>  {
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

    // Usar fragment para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Etiquetas por categoría
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

    // Etiquetas por marca
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

    // Etiquetas por color
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

    // Etiqueta por destacado
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

    // Etiqueta por rango de precio
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

// Crea una etiqueta visual para un filtro activo
const crearEtiquetaFiltro = (texto, callbackRemover) =>  {
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

// Configura el selector de ordenamiento
const setupOrdenamiento = () =>  {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', ()=> {
        currentSort = this.value;
        aplicarFiltros();
    });
}

// Ordena los productos según el criterio seleccionado
const ordenarProductos =(productos, criterio) => {
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
    }

    return productosOrdenados;
}

// Añade un producto al carrito
const agregarAlCarrito = (idProducto)  => {
    // Encontramos el producto
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    // Calcular precio con descuento
    const precioFinal = producto.descuento > 0
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    // Usar la API del carrito si está disponible
    if (window.cartAPI && typeof window.cartAPI.addToCart === 'function') {
        window.cartAPI.addToCart({
            id: producto.id.toString(),
            name: producto.nombre,
            price: precioFinal,
            image: producto.imagen || 'assets/products/shoe-placeholder.png'
        });
    } else {
        // Método alternativo si no está disponible la API
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
        }

        // Mostrar notificación
        mostrarNotificacion(`${producto.nombre} añadido al carrito`);
    }
}

// Muestra una notificación al usuario
const mostrarNotificacion = (mensaje) =>  {
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

// Ponemos en mayúscula la primera letra de un string
const capitalize = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
}