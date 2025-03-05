/**
 * Funcionalidad para el carrito desplegable
 * - Mostrar/ocultar el carrito al hacer clic en el icono
 * - Añadir/eliminar productos
 * - Actualizar cantidades
 * - Calcular totales
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrito script loaded');

    // Estado del carrito
    let cart = {
        items: [], // Array de objetos con id, name, price, quantity, image
        total: 0
    };

    // Elementos del DOM
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Verificar que los elementos existan
    if (!cartIcon || !cartDropdown) {
        console.error('Elementos del carrito no encontrados');
        return;
    }

    // Función para abrir/cerrar el carrito
    function toggleCart() {
        cartDropdown.classList.toggle('active');
        cartOverlay.classList.toggle('active');

        // Si el carrito está abierto, actualizar contenido
        if (cartDropdown.classList.contains('active')) {
            renderCart();
        }
    }

    // Función para renderizar el contenido del carrito
    function renderCart() {
        // Limpiar el contenido actual
        cartItems.innerHTML = '';

        // Si no hay elementos, mostrar mensaje
        if (cart.items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
            return;
        }

        // Renderizar cada elemento del carrito
        cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-quantity" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <div class="cart-item-quantity">${item.quantity}</div>
                        <button class="quantity-btn increase-quantity" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">&times;</div>
            `;
            cartItems.appendChild(itemElement);
        });

        // Actualizar el total
        cartTotal.textContent = formatPrice(cart.total);

        // Asignar eventos a los botones de cantidad
        setupQuantityButtons();
    }

    // Configurar eventos para los botones de incrementar/decrementar cantidad
    function setupQuantityButtons() {
        // Botones de aumentar cantidad
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                updateItemQuantity(id, 1);
            });
        });

        // Botones de disminuir cantidad
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                updateItemQuantity(id, -1);
            });
        });

        // Botones de eliminar elemento
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                removeFromCart(id);
            });
        });
    }

    // Función para actualizar la cantidad de un producto
    function updateItemQuantity(id, change) {
        const itemIndex = cart.items.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += change;

            // Si la cantidad llega a 0, eliminar el producto
            if (cart.items[itemIndex].quantity <= 0) {
                removeFromCart(id);
                return;
            }

            // Actualizar el total
            recalculateTotal();

            // Actualizar el contador y el carrito
            updateCartCount();
            renderCart();

            // Guardar el carrito en localStorage
            saveCart();
        }
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(id) {
        cart.items = cart.items.filter(item => item.id !== id);

        // Actualizar el total
        recalculateTotal();

        // Actualizar el contador y el carrito
        updateCartCount();
        renderCart();

        // Guardar el carrito en localStorage
        saveCart();
    }

    // Función para añadir un producto al carrito
    function addToCart(product) {
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            // Si ya existe, aumentar cantidad
            cart.items[existingItemIndex].quantity += 1;
        } else {
            // Si no existe, añadir nuevo
            cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }

        // Recalcular el total
        recalculateTotal();

        // Actualizar contador del carrito
        updateCartCount();

        // Guardar en localStorage
        saveCart();

        // Mostrar notificación
        showNotification(`${product.name} añadido al carrito`);
    }

    // Función para recalcular el total del carrito
    function recalculateTotal() {
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Mostrar/ocultar el contador según si hay productos
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para cargar el carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    // Función para formatear precios
    function formatPrice(price) {
        return `${price.toFixed(2)} €`;
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

    // Función para inicializar los eventos del carrito
    function initCartEvents() {
        // Evento de clic en icono de carrito
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });

        // Evento de clic en cerrar carrito
        cartClose.addEventListener('click', toggleCart);

        // Evento de clic en overlay (fondo oscuro)
        cartOverlay.addEventListener('click', toggleCart);

        // Asignar eventos a los botones de "Añadir al carrito"
        document.querySelectorAll('.product-add-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                // Obtener los datos del producto desde el data-attribute
                const productId = this.dataset.id;

                // Simulación de producto (en una aplicación real, esto vendría de tu API o base de datos)
                const product = {
                    id: productId,
                    name: this.dataset.name || 'Zapatilla',
                    price: parseFloat(this.dataset.price) || 99.99,
                    image: this.dataset.image || 'assets/products/shoe-placeholder.png'
                };

                // Añadir al carrito
                addToCart(product);
            });
        });
    }

    // Función de inicialización principal
    function init() {
        // Cargar carrito guardado
        loadCart();

        // Configurar eventos
        initCartEvents();

        console.log('Carrito inicializado');
    }

    // Inicializar carrito
    init();

    // Sacamos funciones para usarlas fuera
    window.cartAPI = {
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCart: () => cart
    };
});