// HolySpace Premium - JavaScript Moderno
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Inicialización de componentes
    initializeNavigation();
    initializeVideos();
    initializeAnimations();
    initializeScrollEffects();
    initializeFeatureCards();
    initializeDemoSection();
    
    // Configuración de Google Analytics
    setupAnalytics();
    
    // Efectos de partículas (opcional)
    createParticleEffect();
});

// Navegación
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (navToggle && navMenu) {
        // Toggle del menú hamburguesa
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer clic en el overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al cambiar tamaño de ventana (si se vuelve desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
    
    // Efecto de scroll en la navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Inicialización de videos
function initializeVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Configuración básica
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Intentar reproducir automáticamente
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video autoplay iniciado:', video.src);
            }).catch(error => {
                console.log('Autoplay falló:', error);
                // Agregar botón de play si falla
                addPlayButton(video);
            });
        }
        
        // Efectos de hover
        video.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        video.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Manejo de errores
        video.addEventListener('error', function() {
            console.error('Error cargando video:', this.src);
            this.style.display = 'none';
        });
    });
    
    // Inicializar rotación de videos en el hero
    initializeHeroVideoRotation();
}

// Agregar botón de play si falla autoplay
function addPlayButton(video) {
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.className = 'video-play-button';
    playButton.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.9);
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
    `;
    
    playButton.addEventListener('click', function() {
        video.play();
        this.style.display = 'none';
    });
    
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(playButton);
}

// Rotación de videos en el hero
function initializeHeroVideoRotation() {
    const heroVideos = document.querySelectorAll('.hero-background .hero-video');
    let currentVideoIndex = 0;
    
    if (heroVideos.length <= 1) return;
    
    // Ocultar todos los videos excepto el primero
    heroVideos.forEach((video, index) => {
        if (index > 0) {
            video.style.display = 'none';
        }
    });
    
    // Función para cambiar al siguiente video
    function nextVideo() {
        // Ocultar video actual
        heroVideos[currentVideoIndex].style.display = 'none';
        
        // Mostrar siguiente video
        currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
        heroVideos[currentVideoIndex].style.display = 'block';
        
        // Reproducir el nuevo video
        heroVideos[currentVideoIndex].play().catch(error => {
            console.log('Error reproduciendo video:', error);
        });
    }
    
    // Cambiar video cada 8 segundos
    setInterval(nextVideo, 8000);
}

// Animaciones
function initializeAnimations() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animateElements = document.querySelectorAll('.feature-card, .section-header, .pricing-card, .demo-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Efectos de scroll
function initializeScrollEffects() {
    // Parallax effect para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Efecto de fade en elementos
        const elements = document.querySelectorAll('.feature-card');
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Tarjetas de características
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.3)';
            
            // Efecto de resplandor
            const overlay = this.querySelector('.feature-overlay');
            if (overlay) {
                overlay.style.transform = 'scale(1.1)';
                overlay.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            
            const overlay = this.querySelector('.feature-overlay');
            if (overlay) {
                overlay.style.transform = 'scale(1)';
                overlay.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Efecto de click
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            }, 150);
        });
    });
}

// Sección de demo
function initializeDemoSection() {
    const demoVideo = document.querySelector('.main-demo-video');
    const playButton = document.querySelector('.play-button');
    
    if (demoVideo && playButton) {
        playButton.addEventListener('click', function() {
            if (demoVideo.paused) {
                demoVideo.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                demoVideo.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Cambiar icono según estado del video
        demoVideo.addEventListener('play', function() {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        demoVideo.addEventListener('pause', function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
}

// Configuración de Google Analytics
function setupAnalytics() {
    // Función para manejar suscripciones
    function handleSubscription() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'subscription_click', {
                'event_category': 'engagement',
                'event_label': 'premium_subscription'
            });
        }
        console.log('Premium subscription started');
    }
    
    // Agregar event listeners a botones de suscripción
    const subscriptionButtons = document.querySelectorAll('.btn-primary, .pricing-btn, .cta-btn, .nav-cta');
    subscriptionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Analytics
            handleSubscription();
        });
    });
}

// Efecto de partículas
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Crear contenedor de partículas
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particleContainer);
    
    // Crear partículas
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: float ${duration}s ${delay}s infinite linear;
    `;
    
    container.appendChild(particle);
}

// Función para scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Efectos de typing para títulos
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

// Inicializar efectos de typing en el hero
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Efectos de cursor personalizado
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Efectos de sonido (opcional)
function addSoundEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-btn, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Crear efecto de sonido visual
            createRippleEffect(this, event);
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(59, 130, 246, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    }
`;
document.head.appendChild(style);

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    addSoundEffects();
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Página cargada en ${loadTime.toFixed(2)}ms`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
            'event_category': 'performance',
            'value': Math.round(loadTime)
        });
    }
});