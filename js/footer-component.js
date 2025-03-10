/**
 * Componente Footer
 *
 * Este script genera dinámicamente el pie de página en todas las páginas del sitio
 * y gestiona la funcionalidad del formulario de newsletter.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el footer para insertar el contenido
    const footer = document.querySelector('.site-footer');

    if (!footer) return;

    // Crear el contenido del footer
    const footerHtml = `
        <div class="container">
            <div class="footer-content">
                <!-- Columna 1: Información y Newsletter -->
                <div class="footer-column footer-column-large">
                    <div class="footer-logo">ECO Step</div>
                    <p class="footer-description">Las mejores zapatillas del mercado al mejor precio.</p>

                    <div class="newsletter-section">
                        <h3 class="footer-title">Newsletter</h3>
                        <p>Suscríbete y obtén un 10% de descuento en tu primera compra.</p>
                        <form class="newsletter-form">
                            <div class="newsletter-form-group">
                                <input type="email" placeholder="Tu email" class="newsletter-input" required>
                                <button type="submit" class="newsletter-button btn btn-primary">Suscribirme</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Columna 2: Enlaces legales -->
                <div class="footer-column">
                    <h3 class="footer-title">Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Aviso legal</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Política de cookies</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>

                <!-- Columna 3: Información de contacto -->
                <div class="footer-column">
                    <h3 class="footer-title">Contacto</h3>
                    <ul class="footer-contact">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Calle Comercio, 23<br>28012 Madrid, España</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>+34 912 345 678</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>info@ecostep.com</span>
                        </li>
                    </ul>
                </div>

                <!-- Columna 4: Redes sociales -->
                <div class="footer-column">
                    <h3 class="footer-title">Síguenos</h3>
                    <div class="footer-social">
                        <a href="#" class="social-icon" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-icon" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://github.com/kubaliski" class="social-icon" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">&copy; ${new Date().getFullYear()} ECO Step. Todos los derechos reservados.</p>
            </div>
        </div>
    `;

    // Insertar el HTML en el footer
    footer.innerHTML = footerHtml;

    // Gestionar el formulario de newsletter
    setupNewsletterForm();
});

// Configura el formulario de newsletter y su comportamiento
const  setupNewsletterForm  = () =>  {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');

        if (emailInput && emailInput.value) {
            // Procesar la suscripción
            const email = emailInput.value;

            // Mostrar notificación de éxito
            mostrarNotificacionFooter(`¡Gracias por suscribirte! Recibirás tu 10% de descuento pronto.`);

            // Limpiar el input
            emailInput.value = '';
        }
    });
}

// Muestra una notificación al usuario
const mostrarNotificacionFooter= (mensaje)  => {
    // Verificar si ya existe una notificación y eliminarla
    let notificacionExistente = document.querySelector('.notification');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }

    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;

    // Añadir al DOM
    document.body.appendChild(notificacion);

    // Forzar un reflow antes de añadir la clase para asegurar la transición
    notificacion.offsetHeight;

    // Mostrar la notificación
    notificacion.classList.add('notification-show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('notification-show');

        // Eliminar el elemento del DOM después de la transición
        setTimeout(() => {
            notificacion.remove();
        }, 300); // 300ms es la duración de la transición
    }, 3000);
}