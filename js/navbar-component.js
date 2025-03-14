/**
 * Componente Navbar
 *
 * Este script genera la barra de navegación para todas las páginas del sitio
 * y gestiona sus elementos interactivos (carrito, buscador, cuenta de usuario).
 *
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elemento donde se insertará la navbar
    const navbarContainer = document.getElementById('navbar');

    if (!navbarContainer) {
        console.error('Elemento navbar no encontrado en el DOM');
        return;
    }

    // Detectar en qué página estamos para ajustar el comportamiento
    const isHomePage = window.location.pathname === '/' ||
                       window.location.pathname === '/index.html' ||
                       window.location.href.includes('index.html');

    const isCartPage = window.location.pathname === '/carrito.html' ||
                      window.location.href.includes('carrito.html');

    // Estado del carrito
    let cart = {
        items: [], // Array de objetos con id, name, price, quantity, image etc
        total: 0
    };

    // HTML para la navbar
    const navbarHTML = `
        <div class="container">
            <!-- Lado izquierdo: marca -->
            <div class="navbar-left">
                <div class="navbar-brand">
                    <a href="index.html">ECO Step</a>
                </div>
            </div>

            <!-- Lado derecho: iconos -->
            <div class="navbar-right">
                <div class="navbar-icons">
                    <a href="#" class="navbar-icon search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>

                        <!-- Search dropdown -->
                        <div class="search-dropdown" id="search-dropdown">
                            <div class="search-dropdown-header">
                                <h3 class="search-dropdown-title">Buscar productos</h3>
                                <div class="search-close" id="search-close">&times;</div>
                            </div>
                            <div class="search-form">
                                <input type="text" class="search-input" id="search-input" placeholder="Buscar productos...">
                                <button class="search-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                            <div class="search-results" id="search-results">
                                <div class="empty-search">Busca productos por nombre, categoría o marca</div>
                            </div>
                        </div>
                    </a>
                    ${isHomePage ? `
                    <a href="#" class="navbar-icon filter-icon" id="filter-toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                    </a>
                    ` : ''}
                    <a href="#" class="navbar-icon user-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>

                        <!-- User dropdown -->
                        <div class="user-dropdown" id="user-dropdown">
                            <div class="user-dropdown-header">
                                <h3 class="user-dropdown-title">Mi cuenta</h3>
                                <div class="user-close" id="user-close">&times;</div>
                            </div>
                            <div class="user-dropdown-content">
                                <div class="user-buttons">
                                    <a href="#" class="btn btn-primary">Iniciar sesión</a>
                                    <a href="#" class="btn btn-outline">Registrarse</a>
                                </div>
                            </div>
                        </div>
                    </a>
                    ${!isCartPage ? `
                    <a href="#" class="navbar-icon cart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <span class="cart-count">0</span>

                        <!-- Carrito desplegable -->
                        <div class="cart-dropdown" id="cart-dropdown">
                            <div class="cart-dropdown-header">
                                <h3 class="cart-dropdown-title">Carrito</h3>
                                <div class="cart-close" id="cart-close">&times;</div>
                            </div>
                            <div class="cart-items" id="cart-items">
                                <!-- Los items del carrito se generarán dinámicamente -->
                                <div class="empty-cart">Tu carrito está vacío</div>
                            </div>
                            <div class="cart-footer">
                                <div class="cart-total">
                                    <span class="cart-total-title">Total:</span>
                                    <span class="cart-total-amount" id="cart-total">0.00 €</span>
                                </div>
                                <div class="cart-buttons">
                                    <a href="carrito.html" class="btn btn-outline">Ver carrito</a>
                                    <a href="#" class="btn btn-primary">Comprar</a>
                                </div>
                            </div>
                        </div>
                    </a>
                    ` : ''}
                </div>
            </div>

            <!-- Overlays para fondos oscuros de dropdowns -->
            <div class="menu-overlay" id="menu-overlay"></div>
            <div class="search-overlay" id="search-overlay"></div>
            <div class="user-overlay" id="user-overlay"></div>
            <div class="cart-overlay" id="cart-overlay"></div>

            ${isHomePage ? `
            <!-- Filtros en drawer lateral (solo en la página principal) -->
            <aside class="filters-drawer" id="filters-drawer">
                <div class="filters-drawer-header">
                    <h3>Filtros</h3>
                    <div class="filters-drawer-close" id="filters-drawer-close">&times;</div>
                </div>
                <div class="filters-drawer-content">
                    <form id="filters-form">
                        <!-- Filtro de categorías -->
                        <div class="filter-section">
                            <div class="filter-section-title">Categorías</div>
                            <div id="categorias-filter">
                                <!-- Generado dinámicamente con JS -->
                            </div>
                        </div>

                        <!-- Filtro de marcas -->
                        <div class="filter-section">
                            <div class="filter-section-title">Marcas</div>
                            <div id="marcas-filter">
                                <!-- Generado dinámicamente con JS -->
                            </div>
                        </div>

                        <!-- Filtro de colores -->
                        <div class="filter-section">
                            <div class="filter-section-title">Colores</div>
                            <div id="colores-filter">
                                <!-- Generado dinámicamente con JS -->
                            </div>
                        </div>

                        <!-- Filtro de precio -->
                        <div class="filter-section">
                            <div class="filter-section-title">Precio</div>
                            <div class="price-range">
                                <div class="price-inputs">
                                    <input type="number" name="precio-min" placeholder="Min €" min="0">
                                    <input type="number" name="precio-max" placeholder="Max €" min="0">
                                </div>
                            </div>
                        </div>

                        <!-- Filtro de destacados -->
                        <div class="filter-section">
                            <label class="filter-checkbox">
                                <input type="checkbox" name="destacados">
                                <span class="checkbox-text">Solo destacados</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="filters-drawer-footer">
                    <button id="apply-filters" class="btn btn-primary">Aplicar filtros</button>
                    <button id="clear-filters" class="btn btn-outline">Limpiar filtros</button>
                </div>
            </aside>
            ` : ''}
        </div>
    `;

    // Insertar el HTML de la navbar
    navbarContainer.innerHTML = navbarHTML;

    // Cambia apariencia de la navbar al hacer scroll
    const handleScroll = () =>  {
        if (!isHomePage || window.scrollY > 50) {
            navbarContainer.classList.add('navbar-scrolled');
        } else if (isHomePage && window.scrollY <= 50) {
            navbarContainer.classList.remove('navbar-scrolled');
        }

        // Mantener clase para páginas interiores
        if (!isHomePage) {
            navbarContainer.classList.add('navbar-inner-page');
        }
    }

    // Configurar scroll hacia abajo en la página principal
    const  setupScrollIndicator = () =>  {
        if (isHomePage) {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.addEventListener('click', () => {
                    const heroHeight = document.querySelector('.video-hero').offsetHeight;
                    window.scrollTo({
                        top: heroHeight - 50,
                        behavior: 'smooth'
                    });
                });
            }
        }
    }

    // Intenta reproducir el video de fondo en la página principal
    const setupVideo = () =>  {
        if (isHomePage) {
            const heroVideo = document.getElementById('hero-video');
            if (heroVideo) {
                heroVideo.play().catch((error)=> {
                    console.log('Auto-play impedido:', error);

                    // Añadir botón para reproducir en móviles si es necesario
                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent && !document.querySelector('.video-play-btn')) {
                        const playButton = document.createElement('button');
                        playButton.className = 'video-play-btn';
                        playButton.innerHTML = 'Reproducir video';
                        playButton.addEventListener('click', () => {
                            heroVideo.play();
                            playButton.remove();
                        });
                        heroContent.prepend(playButton);
                    }
                });
            }
        }
    }

    // Inicialización del módulo de búsqueda
    const initSearchModule = () =>  {
        // Elementos del DOM para la búsqueda
        const searchIcon = document.querySelector('.search-icon');
        const searchDropdown = document.getElementById('search-dropdown');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchOverlay = document.getElementById('search-overlay');

        if (!searchIcon || !searchDropdown || !searchOverlay) {
            console.error('Elementos del buscador no encontrados');
            return;
        }

        // Abrir/cerrar el buscador
        const toggleSearch = (e)=> {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            searchDropdown.classList.toggle('active');
            searchOverlay.classList.toggle('active');

            if (searchDropdown.classList.contains('active')) {
                document.body.classList.add('search-open');
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            } else {
                document.body.classList.remove('search-open');
            }
        }

        // Cerrar el buscador
        const  closeSearch = () =>  {
            searchDropdown.classList.remove('active');
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-open');
        }

        // Realizar búsqueda de productos
        const performSearch = (query)  => {
            // Si la consulta está vacía, mostrar mensaje predeterminado
            if (!query || query.trim() === '') {
                searchResults.innerHTML = '<div class="empty-search">Busca productos por nombre, categoría o marca</div>';
                return;
            }

            // Mostrar indicador de carga
            searchResults.innerHTML = '<div class="empty-search">Buscando...</div>';

            // Simulación de demora de red
            setTimeout(() => {
                // Buscar en los productos disponibles
                const resultados = window.productosDisponibles ?
                    window.productosDisponibles.filter(p =>
                        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                        p.categoria.toLowerCase().includes(query.toLowerCase()) ||
                        p.marca.toLowerCase().includes(query.toLowerCase())
                    ) : [];

                if (resultados.length === 0) {
                    searchResults.innerHTML = '<div class="no-results">No se encontraron resultados para "' + query + '"</div>';
                    return;
                }

                // Mostrar resultados (limitado a 5 para el dropdown)
                const maxResults = Math.min(5, resultados.length);
                let resultsHTML = '<div class="search-results-container">';

                for (let i = 0; i < maxResults; i++) {
                    const producto = resultados[i];
                    resultsHTML += `
                        <div class="search-result-item" data-id="${producto.id}">
                            <div class="search-result-image">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                            </div>
                            <div class="search-result-info">
                                <h4 class="search-result-title">${producto.nombre}</h4>
                                <div class="search-result-category">${producto.marca} | ${producto.categoria}</div>
                                <div class="search-result-price">
                                    <span class="search-result-price-final">${producto.precio.toFixed(2)} €</span>
                                    ${producto.precioOriginal ? `<span class="search-result-price-original">${producto.precioOriginal.toFixed(2)} €</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }

                // Si hay más resultados, mostrar enlace para ver todos
                if (resultados.length > maxResults) {
                    resultsHTML += `
                        <div class="view-all-results">
                            Ver todos los resultados (${resultados.length})
                        </div>
                    `;
                }

                resultsHTML += '</div>';
                searchResults.innerHTML = resultsHTML;

                // Configurar eventos para los resultados
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () =>{
                        const id = item.dataset.id;
                        window.location.href = `producto.html?id=${id}`;
                    });
                });

                // Configurar evento para "Ver todos los resultados"
                const viewAllResults = document.querySelector('.view-all-results');
                if (viewAllResults) {
                    viewAllResults.addEventListener('click', ()=> {
                        // Aplicar los filtros de búsqueda y cerrar el dropdown
                        if (typeof window.aplicarFiltrosBusqueda === 'function') {
                            window.aplicarFiltrosBusqueda(query);
                        }
                        closeSearch();
                    });
                }
            }, 300); // Simula un pequeño retraso de red
        }

        // Aplicar filtros desde la búsqueda
        const aplicarFiltrosBusqueda = (query) =>  {
            window.ultimaConsultaBusqueda = query;
            if (typeof window.aplicarFiltros === 'function') {
                window.aplicarFiltros();
            }
        }

        // Agregar eventos para la búsqueda
        searchIcon.addEventListener('click', toggleSearch);
        searchClose.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', closeSearch);

        // Evitar que los clics dentro del dropdown propaguen al documento
        searchDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Búsqueda en tiempo real
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Evitar recarga al enviar el formulario
        const searchForm = searchDropdown.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e)=> {
                e.preventDefault();
                const query = searchInput.value;
                if (query.trim() !== '') {
                    aplicarFiltrosBusqueda(query);
                }
            });
        }

        // Exponer API para usar desde otros scripts
        window.searchAPI = {
            open: ()=> {
                searchDropdown.classList.add('active');
                searchOverlay.classList.add('active');
                document.body.classList.add('search-open');
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            },
            close: closeSearch,
            search: performSearch,
            aplicarFiltrosBusqueda: aplicarFiltrosBusqueda
        };
    }

    // Inicialización del módulo de usuario
    const initUserModule = () =>  {
        // Elementos del DOM para el usuario
        const userIcon = document.querySelector('.user-icon');
        const userDropdown = document.getElementById('user-dropdown');
        const userOverlay = document.getElementById('user-overlay');
        const userClose = document.getElementById('user-close');

        if (!userIcon || !userDropdown || !userOverlay || !userClose) {
            console.error('Elementos del dropdown de usuario no encontrados');
            return;
        }

        // Abrir/cerrar el dropdown de usuario
        const toggleUserDropdown = (e)  => {
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

        // Cerrar el dropdown de usuario
        const closeUserDropdown =()  =>  {
            userDropdown.classList.remove('active');
            userOverlay.classList.remove('active');
            document.body.classList.remove('user-open');
        }

        // Eventos para abrir/cerrar panel de usuario
        userIcon.addEventListener('click', toggleUserDropdown);
        userClose.addEventListener('click', closeUserDropdown);
        userOverlay.addEventListener('click', closeUserDropdown);

        // Evitar que los clics dentro del dropdown se propaguen
        userDropdown.addEventListener('click', (e) =>{
            e.stopPropagation();
        });

        // Exponer API para uso externo
        window.userAPI = {
            open: () =>{
                userDropdown.classList.add('active');
                userOverlay.classList.add('active');
                document.body.classList.add('user-open');
            },
            close: closeUserDropdown,
            toggle: toggleUserDropdown
        };
    }

    // Inicialización del módulo de carrito
    const  initCartModule = ()  =>  {
        // Si estamos en la página de carrito, solo actualizamos el contador
        if (isCartPage) {
            // Cargar carrito desde localStorage
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    cart = JSON.parse(savedCart);
                }
            } catch (e) {
                console.error('Error al cargar el carrito: ', e);
            }

            // Actualizar contador
            updateCartCount();

            // Notificar que la navbar está lista
            document.dispatchEvent(new CustomEvent('navbarReady'));
            return;
        }

        // Cargar carrito desde localStorage
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        } catch (e) {
            console.error('Error al cargar el carrito: ', e);
        }

        // Elementos del DOM para el carrito
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        const cartDropdown = document.getElementById('cart-dropdown');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartClose = document.getElementById('cart-close');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cartIcon || !cartDropdown || !cartOverlay || !cartClose) {
            console.error('Elementos del carrito no encontrados');
            return;
        }

        // Abrir/cerrar el carrito
        const  toggleCart = (e)  =>  {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            cartDropdown.classList.toggle('active');
            cartOverlay.classList.toggle('active');

            // Si el carrito está abierto, actualizar contenido
            if (cartDropdown.classList.contains('active')) {
                document.body.classList.add('cart-open');
                renderCart();
            } else {
                document.body.classList.remove('cart-open');
            }
        }

        // Cerrar el carrito
        const closeCart = () =>  {
            cartDropdown.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.classList.remove('cart-open');
        }

        // Formatear precios con dos decimales y símbolo €
        const  formatPrice = (price)  => {
            return `${price.toFixed(2)} €`;
        }

        // Renderizar el contenido del carrito
        const  renderCart = ()  => {
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
        const setupQuantityButtons = () =>  {
            // Botones de aumentar cantidad
            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', () =>{
                    const id = button.dataset.id;
                    updateItemQuantity(id, 1);
                });
            });

            // Botones de disminuir cantidad
            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', ()=> {
                    const id = button.dataset.id;
                    updateItemQuantity(id, -1);
                });
            });

            // Botones de eliminar elemento
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', ()  =>{
                    const id = button.dataset.id;
                    removeFromCart(id);
                });
            });
        }

        // Actualizar cantidad de un producto en el carrito
        const updateItemQuantity = (id, change) =>  {
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

        // Eliminar un producto del carrito
        const removeFromCart = (id) =>  {
            cart.items = cart.items.filter(item => item.id !== id);

            // Actualizar el total
            recalculateTotal();

            // Actualizar el contador y el carrito
            updateCartCount();
            renderCart();

            // Guardar el carrito en localStorage
            saveCart();
        }

        // Añadir un producto al carrito
        const addToCart = (product) =>  {
            // Verificar si el producto ya está en el carrito
            const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                // Si ya existe, aumentar cantidad
                cart.items[existingItemIndex].quantity += product.quantity || 1;
            } else {
                // Si no existe, añadir nuevo
                cart.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity || 1,
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

        // Recalcular el total del carrito
        const  recalculateTotal = () =>  {
            cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }

        // Actualizar el contador del carrito
        const updateCartCount = () =>  {
            const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.querySelector('.cart-count');

            if (cartCount) {
                cartCount.textContent = totalItems;

                // Mostrar/ocultar el contador según si hay productos
                if (totalItems > 0) {
                    cartCount.style.display = 'flex';
                } else {
                    cartCount.style.display = 'none';
                }
            }
        }

        // Guardar el carrito en localStorage
        const  saveCart = () =>  {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Mostrar notificación de acción realizada
        const showNotification= (message) =>  {
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

            // Mostrar notificación con animación
            setTimeout(() => {
                notification.classList.add('notification-show');
            }, 100);

            // Ocultar después de 3 segundos
            setTimeout(() => {
                notification.classList.remove('notification-show');
            }, 3000);
        }

        // Configurar botones de añadir al carrito en productos de la página
        const setupAddToCartButtons = () =>  {
            document.querySelectorAll('.product-add-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Obtener datos del producto desde el data-attribute
                    const productId = button.dataset.id;

                    // Crear objeto de producto con los datos disponibles
                    const product = {
                        id: productId,
                        name: button.dataset.name || 'Zapatilla',
                        price: parseFloat(button.dataset.price) || 99.99,
                        image: button.dataset.image || 'assets/products/shoe-placeholder.png'
                    };

                    // Añadir al carrito
                    addToCart(product);
                });
            });
        }

        // Eventos para el carrito
        if (!isCartPage) {
            // Icono del carrito
            cartIcon.addEventListener('click', toggleCart);

            // Botón cerrar carrito
            cartClose.addEventListener('click', closeCart);

            // Fondo oscuro (overlay)
            cartOverlay.addEventListener('click', closeCart);

            // Evitar que clics en el dropdown se propaguen
            cartDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Inicializar carrito
        recalculateTotal();
        updateCartCount();
        setupAddToCartButtons();

        // API pública del carrito para otros scripts
        window.cartAPI = {
            addToCart,
            updateItemQuantity,
            removeFromCart,
            getCart: () => cart,
            openCart: ()=> {
                // Solo funciona si no estamos en la página de carrito
                if (!isCartPage && cartDropdown) {
                    cartDropdown.classList.add('active');
                    cartOverlay.classList.add('active');
                    document.body.classList.add('cart-open');
                    renderCart();
                }
            },
            closeCart: () => {
                // Solo funciona si no estamos en la página de carrito
                if (!isCartPage && cartDropdown) {
                    cartDropdown.classList.remove('active');
                    cartOverlay.classList.remove('active');
                    document.body.classList.remove('cart-open');
                }
            },
            toggleCart: (e) => {
                // Solo funciona si no estamos en la página de carrito
                if (!isCartPage && cartDropdown) {
                    toggleCart(e);
                }
            }
        };

        // Notificar que la navbar está lista
        document.dispatchEvent(new CustomEvent('navbarReady'));
    }

    // Inicializar elementos interactivos de la navbar
    const  initNavbarElements = () =>  {
        // Manejar filtros (solo en la página principal)
        if (isHomePage) {
            const filterToggle = document.getElementById('filter-toggle');
            const mobileFilterButton = document.getElementById('mobile-filter-button');
            const filtersDrawer = document.getElementById('filters-drawer');
            const filtersDrawerClose = document.getElementById('filters-drawer-close');
            const menuOverlay = document.getElementById('menu-overlay');

            if (filterToggle && filtersDrawer && filtersDrawerClose && menuOverlay) {
                // Abrir filtros desde navbar
                filterToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    filtersDrawer.classList.toggle('active');
                    menuOverlay.classList.toggle('active');
                    document.body.classList.toggle('no-scroll');
                });

                // Abrir filtros desde botón móvil (si existe)
                if (mobileFilterButton) {
                    mobileFilterButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        filtersDrawer.classList.toggle('active');
                        menuOverlay.classList.toggle('active');
                        document.body.classList.toggle('no-scroll');
                    });
                }

                // Cerrar filtros
                filtersDrawerClose.addEventListener('click', () => {
                    filtersDrawer.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });

                menuOverlay.addEventListener('click', ()=> {
                    filtersDrawer.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            }
        }
    }

    // Función principal de inicialización
    const init =() =>  {
        // Aplicar el estilo inicial según la página
        if (!isHomePage) {
            navbarContainer.classList.add('navbar-scrolled');
            navbarContainer.classList.add('navbar-inner-page');
        }

        // Configurar eventos y comportamientos
        window.addEventListener('scroll', handleScroll);
        setupScrollIndicator();
        setupVideo();
        initNavbarElements();

        // Inicializar módulos interactivos
        initSearchModule();
        initUserModule();
        initCartModule();
    }

    // Ejecutar inicialización
    init();
});