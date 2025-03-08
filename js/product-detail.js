/**
 * Gestión de la product page
 *
 * Este script maneja la visualización de información detallada de un producto,
 * gestión de cantidades, adición al carrito y productos relacionados.
 *
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductDetail();
});

// Inicializa la product page
function initProductDetail() {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Validar si hay un ID válido
    if (!productId) {
        showProductNotFound();
        return;
    }

    // Cargar datos del producto
    loadProductData(productId);

    // Configurar eventos de la página
    setupProductEvents();
}

// Carga los datos del producto seleccionado
function loadProductData(productId) {
    // Buscar el producto en el array de productos
    const producto = productos.find(p => p.id === productId);

    // Si no se encuentra el producto, mostrar error
    if (!producto) {
        showProductNotFound();
        return;
    }

    // Llenar la página con los datos del producto
    populateProductPage(producto);

    // Cargar productos relacionados
    loadRelatedProducts(producto);
}

// Muestra un mensaje cuando el producto no se encuentra
function showProductNotFound() {
    const container = document.getElementById('product-detail-container');

    if (container) {
        container.innerHTML = `
            <div class="container">
                <div class="product-not-found">
                    <h1>Producto no encontrado</h1>
                    <p>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
                    <a href="index.html#productos" class="btn btn-primary">Volver a la tienda</a>
                </div>
            </div>
        `;
    }
}

// Inserta los datos del producto en la página
function populateProductPage(producto) {
    // Calcular precio con descuento
    const precioFinal = producto.descuento > 0
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    // Actualizar título de la página
    document.title = `${producto.nombre} | ECO Step`;

    // Actualizar breadcrumb
    const breadcrumbName = document.getElementById('product-name-breadcrumb');
    if (breadcrumbName) {
        breadcrumbName.textContent = producto.nombre;
    }

    // Actualizar imagen principal
    const mainImage = document.getElementById('product-main-image');
    if (mainImage) {
        // Asignar un valor predeterminado en caso de que imagen esté vacía
        if (producto.imagen && producto.imagen.trim() !== '') {
            mainImage.src = producto.imagen;
        } else {
            mainImage.src = 'assets/products/shoe-placeholder.png';
        }
        mainImage.alt = producto.nombre;

        // Imagen de respaldo si hay error
        mainImage.onerror = function() {
            this.src = 'assets/products/shoe-placeholder.png';
        };
    }

    // Actualizar información del producto
    document.getElementById('product-title').textContent = producto.nombre;
    document.getElementById('product-brand').textContent = producto.marca;
    document.getElementById('product-id').textContent = producto.id;
    document.getElementById('product-category').textContent = capitalize(producto.categoria);
    document.getElementById('product-color-name').textContent = capitalize(producto.colorNombre);
    document.getElementById('product-color-circle').style.backgroundColor = producto.color;

    // Actualizar precios
    const priceElement = document.getElementById('product-price');
    const originalPriceElement = document.getElementById('product-price-original');
    const discountBadgeElement = document.getElementById('product-discount-badge');
    const discountPriceElement = document.getElementById('product-discount-price');

    priceElement.textContent = `${precioFinal.toFixed(2)} €`;

    // Mostrar/ocultar elementos de descuento
    if (producto.descuento > 0) {
        originalPriceElement.textContent = `${producto.precio.toFixed(2)} €`;

        if (discountBadgeElement) {
            discountBadgeElement.textContent = `-${producto.descuento}%`;
            discountBadgeElement.style.display = 'block';
        }

        if (discountPriceElement) {
            discountPriceElement.textContent = `-${producto.descuento}%`;
            discountPriceElement.style.display = 'inline-block';
        }

        originalPriceElement.style.display = 'inline-block';
    } else {
        originalPriceElement.style.display = 'none';

        if (discountBadgeElement) {
            discountBadgeElement.style.display = 'none';
        }

        if (discountPriceElement) {
            discountPriceElement.style.display = 'none';
        }
    }

    // Actualizar descripción
    const descriptionElement = document.getElementById('product-description');
    descriptionElement.innerHTML = `
        <p>Descubre el modelo ${producto.nombre} de ${producto.marca}, diseñado para ofrecerte la mejor experiencia en ${producto.categoria}.</p>
        <p>Con su estilo único y materiales de primera calidad, estas zapatillas son perfectas para cualquier ocasión.</p>
    `;

    // Actualizar características según la categoría del producto
    const featuresElement = document.getElementById('product-features');

    // Definir características específicas según la categoría
    let caracteristicasEspecificas = '';

    switch (producto.categoria) {
        case 'running':
            caracteristicasEspecificas = `
                <li>Suela con tecnología de amortiguación avanzada</li>
                <li>Material transpirable para mayor comodidad en carrera</li>
                <li>Refuerzos laterales para mejor estabilidad</li>
                <li>Plantilla anatómica extraíble</li>
                <li>Diseño ligero de solo ${Math.round(200 + Math.random() * 100)}g</li>
            `;
            break;
        case 'casual':
            caracteristicasEspecificas = `
                <li>Diseño moderno para uso diario</li>
                <li>Interior acolchado para mayor comodidad</li>
                <li>Materiales flexibles que se adaptan al pie</li>
                <li>Suela antideslizante duradera</li>
                <li>Combinable con diferentes estilos</li>
            `;
            break;
        case 'trail':
            caracteristicasEspecificas = `
                <li>Suela con agarre multidireccional para terrenos irregulares</li>
                <li>Protección reforzada en puntera y talón</li>
                <li>Membrana impermeable y transpirable</li>
                <li>Cordones de alta resistencia con sistema de bloqueo</li>
                <li>Soporte de tobillo mejorado para terrenos difíciles</li>
            `;
            break;
        case 'formal':
            caracteristicasEspecificas = `
                <li>Acabados elegantes con costuras precisas</li>
                <li>Interior forrado en piel suave</li>
                <li>Plantilla con soporte para el arco</li>
                <li>Tacón de altura ergonómica</li>
                <li>Diseño atemporal para ocasiones especiales</li>
            `;
            break;
        default:
            caracteristicasEspecificas = `
                <li>Materiales de alta calidad y durabilidad</li>
                <li>Diseño moderno y ergonómico</li>
                <li>Suela antideslizante para mayor seguridad</li>
                <li>Interior acolchado para máxima comodidad</li>
                <li>Fabricación sostenible y respetuosa con el medio ambiente</li>
            `;
    }

    featuresElement.innerHTML = caracteristicasEspecificas;

    // Configuración del botón de añadir al carrito
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-id', producto.id);
        addToCartBtn.setAttribute('data-price', precioFinal.toFixed(2));

        // Deshabilitar el botón si no hay stock
        if (producto.stock <= 0) {
            addToCartBtn.disabled = true;
            addToCartBtn.classList.add('btn-disabled');
            addToCartBtn.textContent = 'Agotado';
        } else {
            addToCartBtn.disabled = false;
            addToCartBtn.classList.remove('btn-disabled');
            addToCartBtn.textContent = 'Añadir al carrito';
        }
    }

    // Actualizar estado de stock
    const stockBadge = document.querySelector('.stock-badge');
    if (stockBadge) {
        if (producto.stock > 10) {
            stockBadge.className = 'stock-badge in-stock';
            stockBadge.textContent = 'En stock';
        } else if (producto.stock > 0) {
            stockBadge.className = 'stock-badge low-stock';
            stockBadge.textContent = `Quedan ${producto.stock} unidades`;
        } else {
            stockBadge.className = 'stock-badge out-of-stock';
            stockBadge.textContent = 'Agotado';
        }
    }
}

// Configura los eventos de la página de producto
function setupProductEvents() {
    // Obtener el producto actual
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === productId);

    if (!producto) return;

    // Configurar el selector de cantidad
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');

    // Establecer el valor máximo según el stock disponible
    if (quantityInput && producto.stock > 0) {
        quantityInput.setAttribute('max', producto.stock);
    }

    // Evento para disminuir cantidad
    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    // Evento para aumentar cantidad
    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            // No permitir aumentar más allá del stock disponible
            if (currentValue < producto.stock) {
                quantityInput.value = currentValue + 1;
            } else if (producto.stock > 0) {
                mostrarNotificacion(`Solo hay ${producto.stock} unidades disponibles`);
            }
        });
    }

    // Configurar el botón de añadir al carrito
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            addProductToCart();
        });
    }

    // Validación para el input de cantidad
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);

            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > producto.stock) {
                this.value = producto.stock;
                mostrarNotificacion(`Solo hay ${producto.stock} unidades disponibles`);
            }
        });
    }
}

// Añade el producto actual al carrito
function addProductToCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('product-quantity');

    if (!addToCartBtn || !quantityInput) return;

    const productId = addToCartBtn.getAttribute('data-id');
    const quantity = parseInt(quantityInput.value);

    if (!productId || isNaN(quantity)) return;

    // Buscar el producto
    const producto = productos.find(p => p.id === parseInt(productId));

    if (!producto) return;

    // Verificar stock
    if (producto.stock <= 0) {
        mostrarNotificacion('Lo sentimos, este producto está agotado');
        return;
    }

    // Verificar cantidad solicitada
    if (quantity > producto.stock) {
        mostrarNotificacion(`Solo hay ${producto.stock} unidades disponibles`);
        quantityInput.value = producto.stock;
        return;
    }

    // Calcular precio con descuento
    const precioFinal = producto.descuento > 0
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    // Usar la API del carrito
    if (window.cartAPI && typeof window.cartAPI.addToCart === 'function') {
        // Crear objeto del producto
        const productToAdd = {
            id: producto.id.toString(),
            name: producto.nombre,
            price: precioFinal,
            image: producto.imagen || 'assets/products/shoe-placeholder.png',
            quantity: quantity
        };

        // Añadir al carrito
        window.cartAPI.addToCart(productToAdd);

        // Mostrar notificación
        mostrarNotificacion(`${quantity}x ${producto.nombre} añadido al carrito`);
    } else {
        // Método alternativo si no está disponible la API
        mostrarNotificacion(`${quantity}x ${producto.nombre} añadido al carrito`);
    }
}

// Carga los productos relacionados
function loadRelatedProducts(producto) {
    const container = document.getElementById('related-products-grid');
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    // Obtener productos de la misma categoría, excluyendo el actual
    let relacionados = productos
        .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
        .slice(0, 4); // Máximo 4 productos relacionados

    // Si no hay suficientes productos en la misma categoría, añadir algunos más
    if (relacionados.length < 4) {
        const adicionales = productos
            .filter(p => p.id !== producto.id && !relacionados.includes(p))
            .slice(0, 4 - relacionados.length);

        relacionados = [...relacionados, ...adicionales];
    }

    // Si no hay productos relacionados, ocultar la sección
    if (relacionados.length === 0) {
        const relatedSection = document.querySelector('.related-products');
        if (relatedSection) {
            relatedSection.style.display = 'none';
        }
        return;
    }

    // Renderizar cada producto relacionado
    relacionados.forEach(producto => {
        // Calcular precio con descuento
        const precioFinal = producto.descuento > 0
            ? producto.precio - (producto.precio * producto.descuento / 100)
            : producto.precio;

        // Crear elemento para el producto relacionado
        const productoElement = document.createElement('div');
        productoElement.className = 'related-product-card';
        productoElement.innerHTML = `
            <a href="producto.html?id=${producto.id}" class="related-product-link">
                <div class="related-product-image">
                    <img src="${producto.imagen || 'assets/products/shoe-placeholder.png'}"
                         alt="${producto.nombre}"
                         onerror="this.src='assets/products/shoe-placeholder.png'">
                    ${producto.descuento > 0 ? `<span class="related-product-discount">-${producto.descuento}%</span>` : ''}
                </div>
                <div class="related-product-info">
                    <h3 class="related-product-title">${producto.nombre}</h3>
                    <div class="related-product-brand">${producto.marca}</div>
                    <div class="related-product-price-container">
                        ${producto.descuento > 0 ?
                            `<span class="related-product-price-original">€${producto.precio.toFixed(2)}</span>` : ''}
                        <span class="related-product-price">€${precioFinal.toFixed(2)}</span>
                    </div>
                </div>
            </a>
        `;

        // Añadir al contenedor
        container.appendChild(productoElement);
    });
}

// Muestra una notificación al usuario
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

// Capitaliza la primera letra de un texto
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}