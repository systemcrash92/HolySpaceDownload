// Configuración de animaciones y efectos interactivos
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple tracking function
    function trackDownload(platform) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'platform': platform,
                'app_name': 'HolySpace'
            });
        }
        console.log(`Download tracked: ${platform}`);
    }
    
    // Simple page view tracking
    function trackPageView(pageName) {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'G-RS2B3W4587', {
                page_title: pageName,
                page_location: window.location.href
            });
        }
        console.log(`Page view tracked: ${pageName}`);
    }
    
    // Track initial page view
    trackPageView('HolySpace Landing Page');
    
    // Sistema de idiomas automático
    function detectLanguage() {
        const userLanguage = navigator.language || navigator.userLanguage;
        const languageCode = userLanguage.split('-')[0];
        
        // Detectar si es español o inglés
        if (languageCode === 'es') {
            return 'es';
        } else {
            return 'en';
        }
    }
    
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-es][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // También actualizar elementos que pueden tener HTML interno
        const elementsWithHTML = document.querySelectorAll('[data-es-html][data-en-html]');
        elementsWithHTML.forEach(element => {
            const html = element.getAttribute(`data-${lang}-html`);
            if (html) {
                element.innerHTML = html;
            }
        });
        
        // Actualizar meta tags
        if (lang === 'es') {
            document.title = 'HolySpace - Biblia de Escritorio con Pomodoros';
            document.querySelector('meta[name="description"]').setAttribute('content', 
                'HolySpace: Una biblia de escritorio minimalista, rápida y cómoda con sistema de pomodoros y subrayado. La experiencia perfecta para el estudio bíblico.');
        } else {
            document.title = 'HolySpace - Desktop Bible with Pomodoros';
            document.querySelector('meta[name="description"]').setAttribute('content', 
                'HolySpace: A minimalist, fast and comfortable desktop bible with pomodoro system and highlighting. The perfect experience for biblical study.');
        }
        
        // Guardar preferencia
        localStorage.setItem('holySpace-language', lang);
    }
    
    // Detectar idioma al cargar
    const savedLanguage = localStorage.getItem('holySpace-language');
    const detectedLanguage = savedLanguage || detectLanguage();
    setLanguage(detectedLanguage);
    
    // Botón de cambio de idioma (opcional)
    function createLanguageToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'language-toggle';
        toggle.innerHTML = '🌐';
        toggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1001;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        
        toggle.addEventListener('click', function() {
            const currentLang = localStorage.getItem('holySpace-language') || detectLanguage();
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
        
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(59, 130, 246, 0.2)';
        });
        
        toggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        document.body.appendChild(toggle);
    }
    
    createLanguageToggle();
    
    // Animación de scroll suave para enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax para las formas flotantes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Animación de entrada para elementos cuando son visibles
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones de entrada
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot, .demo-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto de hover mejorado para las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación del temporizador Pomodoro
    function animatePomodoroTimer() {
        const timerElements = document.querySelectorAll('.timer-text, .pomodoro-display');
        timerElements.forEach(timer => {
            let time = 25 * 60; // 25 minutos en segundos
            
            function updateTimer() {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                timer.textContent = displayTime;
                
                if (time > 0) {
                    time--;
                    setTimeout(updateTimer, 1000);
                } else {
                    // Reiniciar el temporizador
                    time = 25 * 60;
                    setTimeout(updateTimer, 2000);
                }
            }
            
            updateTimer();
        });
    }

    // Iniciar animación del temporizador
    animatePomodoroTimer();

    // Efecto de typing para el título principal
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

    // Aplicar efecto de typing al título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }

    // Animación de partículas en el fondo
    function createParticles() {
        const particleContainer = document.querySelector('.floating-shapes');
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                border-radius: 50%;
                opacity: 0.6;
                animation: particleFloat ${15 + Math.random() * 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Agregar estilos CSS para las partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Crear partículas
    createParticles();

    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    // Efecto de hover en botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación de carga inicial
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Efecto de scroll en la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animación de números (contador)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Efecto de parallax para el hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Función para detectar el sistema operativo
    function detectOS() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();
        
        if (userAgent.includes('mac') || platform.includes('mac')) {
            return 'mac';
        } else if (userAgent.includes('win') || platform.includes('win')) {
            return 'windows';
        } else if (userAgent.includes('linux') || platform.includes('linux')) {
            return 'windows'; // Default to Windows for Linux users
        } else {
            return 'windows'; // Default fallback
        }
    }

    // Función para manejar descargas
    function handleDownload(platform) {
        // Si no se especifica plataforma, detectar automáticamente
        if (!platform || platform === 'auto') {
            platform = detectOS();
        }
        
        // Track the download
        trackDownload(platform);
        
        // Get the appropriate download URL
        let downloadUrl;
        if (platform === 'windows') {
            downloadUrl = 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-Setup-1.0.0.exe';
        } else if (platform === 'mac') {
            downloadUrl = 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-1.0.0-mac.dmg';
        }
        
        // Open download URL directly
        window.open(downloadUrl, '_blank');
        
        console.log(`${platform} download started:`, downloadUrl);
    }

    // Event listeners for download buttons
    const downloadButtons = document.querySelectorAll('.download-btn, .btn-primary, .hero-buttons .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determine platform based on button text or class
            let platform = 'auto'; // Use auto-detection by default
            const buttonText = this.querySelector('span').textContent.toLowerCase();
            
            if (buttonText.includes('mac') || buttonText.includes('macos')) {
                platform = 'mac';
            } else if (buttonText.includes('windows') || buttonText.includes('pc')) {
                platform = 'windows';
            }
            // If it's "Descargar Ahora" or similar, use auto-detection
            
            // Visual feedback
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Descargando...';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Use the handleDownload function with auto-detection
            handleDownload(platform);
            
            setTimeout(() => {
                this.querySelector('span').textContent = '¡Descargado!';
                this.style.background = 'linear-gradient(135deg, #059669, #047857)';
                
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }, 1000);
        });
    });

    // Efecto de resplandor en elementos interactivos
    const interactiveElements = document.querySelectorAll('.feature-card, .screenshot, .app-window');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    console.log('🚀 HolySpace website loaded successfully!');
});
