/**
 * Página del carrito
 *
 * Este script gestiona la funcionalidad del carrito de compra,
 * incluyendo la visualización, edición y eliminación de productos,
 * así como el cálculo de totales y la interacción con localStorage.
 *
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del carrito al cargar la página
    initCartPage();
});

// Función principal de inicialización
function initCartPage() {
    // Cargar y asegurar los datos del carrito
    const cartData = loadCartFromStorage();

    // Recalcular y guardar el carrito
    recalculateCartTotal(cartData);
    saveCartToStorage(cartData);

    // Renderizar el carrito
    renderCart(cartData);

    // Configurar eventos
    setupCartEvents();
}

// Carga el carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');

    try {
        // Intentar parsear el carrito guardado
        const parsedCart = savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };

        // Asegurar estructura correcta
        if (!parsedCart.items) parsedCart.items = [];
        if (typeof parsedCart.total !== 'number') parsedCart.total = 0;

        return parsedCart;
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        return { items: [], total: 0 };
    }
}

// Guarda el carrito en localStorage
function saveCartToStorage(cart) {
    // Asegurar que el total es un número
    if (cart && typeof cart.total !== 'number') {
        cart.total = parseFloat(cart.total) || 0;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderiza el carrito completo
function renderCart(cartData) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartActions = document.getElementById('cart-actions');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Formatear el total
    const totalValue = parseFloat(cartData.total) || 0;
    const formattedTotal = formatPrice(totalValue);

    // Actualizar totales en la interfaz
    updateTotals(formattedTotal, totalValue);

    // Manejar carrito vacío
    const isEmpty = !cartData.items || cartData.items.length === 0;
    toggleEmptyCartUI(isEmpty, emptyCartMessage, cartActions, checkoutBtn);

    // Si está vacío, limpiar el contenedor y salir
    if (isEmpty) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }
        return;
    }

    // Renderizar los items del carrito
    renderCartItems(cartData.items, cartItemsContainer);
}

// Actualiza los totales en la interfaz
function updateTotals(formattedTotal, totalValue) {
    // Actualizar subtotal
    const subtotalElement = document.getElementById('cart-subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = formattedTotal;
    }

    // Actualizar total (usando el ID específico para la página de carrito)
    const totalElement = document.getElementById('cart-total-in-page');
    if (totalElement) {
        totalElement.textContent = formattedTotal;
    }

    // Actualizar texto de envío
    const shippingElement = document.getElementById('cart-shipping');
    if (shippingElement) {
        if (totalValue >= 50) {
            shippingElement.textContent = 'Gratis';
        } else if (totalValue > 0) {
            shippingElement.textContent = 'Calculado en el checkout';
        } else {
            shippingElement.textContent = '-';
        }
    }
}

// Muestra/oculta elementos según si el carrito está vacío
function toggleEmptyCartUI(isEmpty, emptyCartMessage, cartActions, checkoutBtn) {
    // Mostrar/ocultar mensaje de carrito vacío
    if (emptyCartMessage) {
        emptyCartMessage.style.display = isEmpty ? 'flex' : 'none';

        // Forzar visibilidad si está vacío
        if (isEmpty) {
            setTimeout(() => {
                emptyCartMessage.style.display = 'flex';
            }, 100);
        }
    }

    // Mostrar/ocultar acciones del carrito
    if (cartActions) {
        cartActions.style.display = isEmpty ? 'none' : 'flex';
    }

    // Habilitar/deshabilitar botón de checkout
    if (checkoutBtn) {
        checkoutBtn.disabled = isEmpty;
    }
}

// Renderiza los ítems del carrito
function renderCartItems(items, container) {
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    // Usar fragmento para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Añadir cada item
    items.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        fragment.appendChild(cartItemElement);
    });

    // Añadir todos los items de una vez
    container.appendChild(fragment);
}

// Crea un elemento DOM para un ítem del carrito
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;

    // Asegurar que price y quantity sean números
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    const itemTotal = price * quantity;

    // Crear el HTML del item
    cartItem.innerHTML = `
        <div class="cart-item-product">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/products/shoe-placeholder.png'">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-meta">
                    <span class="cart-item-id">Ref: ${item.id}</span>
                </div>
            </div>
        </div>
        <div class="cart-item-price">${formatPrice(price)}</div>
        <div class="cart-item-quantity">
            <div class="cart-item-controls">
                <button type="button" class="cart-quantity-btn decrease-quantity" data-id="${item.id}" aria-label="Disminuir cantidad">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <div class="cart-item-quantity-number">${quantity}</div>
                <button type="button" class="cart-quantity-btn increase-quantity" data-id="${item.id}" aria-label="Aumentar cantidad">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="cart-item-total">${formatPrice(itemTotal)}</div>
        <div class="cart-item-remove">
            <button type="button" class="remove-btn" data-id="${item.id}" aria-label="Eliminar producto">×</button>
        </div>
    `;

    return cartItem;
}

// Formatea precios con 2 decimales y símbolo €
function formatPrice(price) {
    const numPrice = parseFloat(price);
    return Number.isNaN(numPrice) ? "0.00 €" : `${numPrice.toFixed(2)} €`;
}

// Configura los eventos del carrito
function setupCartEvents() {
    // Agregar estilos para los controles de cantidad
    addQuantityStyles();

    // Delegación de eventos para botones de cantidad y eliminar
    document.addEventListener('click', function(e) {
        // Botón aumentar cantidad
        if (e.target.closest('.increase-quantity')) {
            const button = e.target.closest('.increase-quantity');
            button.classList.add('btn-active');
            setTimeout(() => button.classList.remove('btn-active'), 200);
            updateItemQuantity(button.dataset.id, 1);
            e.preventDefault();
        }

        // Botón disminuir cantidad
        if (e.target.closest('.decrease-quantity')) {
            const button = e.target.closest('.decrease-quantity');
            button.classList.add('btn-active');
            setTimeout(() => button.classList.remove('btn-active'), 200);
            updateItemQuantity(button.dataset.id, -1);
            e.preventDefault();
        }

        // Botón eliminar item
        if (e.target.closest('.remove-btn')) {
            const button = e.target.closest('.remove-btn');
            removeCartItem(button.dataset.id);
            e.preventDefault();
        }
    });

    // Botón vaciar carrito
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Botón checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

// Agrega estilos específicos para los controles de cantidad
function addQuantityStyles() {
    const style = document.createElement('style');
    style.id = 'cart-page-specific-styles';

    style.textContent = `
        /* Estilos específicos para la página de carrito */
        .cart-item-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }

        .cart-quantity-btn {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-background);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-sm);
            cursor: pointer;
            transition: background-color var(--transition-normal);
        }

        .cart-quantity-btn:hover {
            background-color: var(--color-border);
        }

        .cart-quantity-btn:active {
            transform: scale(0.95);
        }

        .cart-item-quantity-number {
            width: 30px;
            height: 30px;
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size-sm);
            background-color: var(--color-white);
        }

        .quantity-updated {
            animation: highlight-background 0.5s ease-out;
        }

        .btn-active {
            background-color: var(--color-border) !important;
        }

        @media (max-width: 992px) {
            .cart-item-quantity {
                display: flex;
                justify-content: flex-start;
            }

            .cart-item-controls {
                margin-left: var(--spacing-md);
            }
        }
    `;

    document.head.appendChild(style);
}

// Actualiza la cantidad de un item
function updateItemQuantity(itemId, change) {
    // Cargar carrito actual
    const cart = loadCartFromStorage();

    // Encontrar el ítem
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        const oldQuantity = cart.items[itemIndex].quantity;

        // Incrementar/decrementar asegurando un mínimo de 1
        cart.items[itemIndex].quantity = Math.max(1, oldQuantity + change);

        // Si la cantidad no cambió, no hacer nada más
        if (oldQuantity === cart.items[itemIndex].quantity) {
            return;
        }

        // Recalcular total y guardar
        recalculateCartTotal(cart);
        saveCartToStorage(cart);

        // Actualizar UI: cantidad y total del ítem específico
        updateItemUI(itemId, cart.items[itemIndex].quantity, cart);

        // Notificar al usuario
        mostrarNotificacion('Cantidad actualizada');
    }
}

// Actualiza la UI de un ítem específico
function updateItemUI(itemId, newQuantity, cart) {
    // Actualizar el indicador de cantidad
    const quantityElement = document.querySelector(`.cart-item[data-id="${itemId}"] .cart-item-quantity-number`);
    if (quantityElement) {
        quantityElement.textContent = newQuantity;
        quantityElement.classList.add('quantity-updated');
        setTimeout(() => {
            quantityElement.classList.remove('quantity-updated');
        }, 500);
    }

    // Actualizar el total del ítem
    const itemTotalElement = document.querySelector(`.cart-item[data-id="${itemId}"] .cart-item-total`);
    if (itemTotalElement) {
        const item = cart.items.find(item => item.id === itemId);
        if (item) {
            const price = parseFloat(item.price) || 0;
            itemTotalElement.textContent = formatPrice(price * newQuantity);
        }
    }

    // Actualizar los totales generales
    const totalValue = parseFloat(cart.total) || 0;
    const formattedTotal = formatPrice(totalValue);
    updateTotals(formattedTotal, totalValue);

    // Actualizar contador en la navbar
    updateNavbarCartCount();
}

// Elimina un item del carrito
function removeCartItem(itemId) {
    // Cargar carrito actual
    const cart = loadCartFromStorage();

    // Filtrar el item a eliminar
    cart.items = cart.items.filter(item => item.id !== itemId);

    // Actualizar, guardar y renderizar
    recalculateCartTotal(cart);
    saveCartToStorage(cart);

    // Comprobar si el carrito quedó vacío
    const isEmpty = cart.items.length === 0;

    // Renderizar carrito actualizado
    renderCart(cart);

    // Si quedó vacío, mostrar mensaje explícitamente
    if (isEmpty) {
        const emptyCartMessage = document.getElementById('empty-cart-message');
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'flex';
        }
    }

    // Actualizar contador en la navbar
    updateNavbarCartCount();

    // Notificar al usuario
    mostrarNotificacion('Producto eliminado del carrito');
}

// Recalcula el total del carrito
function recalculateCartTotal(cart) {
    // Asegurar que items es un array
    if (!Array.isArray(cart.items)) {
        cart.items = [];
    }

    // Calcular total
    cart.total = cart.items.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);

    return cart;
}

// Vacía completamente el carrito
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        // Crear carrito vacío
        const emptyCart = { items: [], total: 0 };

        // Limpiar directamente el contenedor de items
        const cartItemsContainer = document.getElementById('cart-items-container');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }

        // Guardar y renderizar
        saveCartToStorage(emptyCart);
        renderCart(emptyCart);

        // Mostrar mensaje de carrito vacío
        const emptyCartMessage = document.getElementById('empty-cart-message');
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'flex';
        }

        // Actualizar contador en la navbar
        updateNavbarCartCount();

        // Notificar al usuario
        mostrarNotificacion('Carrito vaciado');
    }
}

// Procede al checkout (simulación)
function proceedToCheckout() {
    alert('Esta funcionalidad estaría conectada con una pasarela de pago real. Por ahora, gracias por tu compra simulada.');
    // Aquí se podría redirigir: window.location.href = 'checkout.html';
}

// Muestra una notificación al usuario
function mostrarNotificacion(mensaje) {
    // Eliminar notificación existente si hay
    const notificacionExistente = document.querySelector('.notification');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }

    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;

    // Añadir al DOM
    document.body.appendChild(notificacion);

    // Forzar reflow para la transición
    notificacion.offsetHeight;

    // Mostrar
    notificacion.classList.add('notification-show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('notification-show');

        // Eliminar del DOM después de la transición
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Actualiza el contador del carrito en la navbar
function updateNavbarCartCount() {
    const cartData = loadCartFromStorage();

    // Calcular total de items
    const totalItems = cartData.items.reduce((sum, item) => {
        return sum + (parseInt(item.quantity) || 0);
    }, 0);

    // Actualizar UI
    const cartCountElement = document.querySelector('.navbar .cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Actualizar el contador cuando la navbar esté lista
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('navbarReady', updateNavbarCartCount);
});