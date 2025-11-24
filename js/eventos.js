const animarElementos = document.querySelectorAll('.info-item, .split-section-item, .timeline-item, .integrantes-item, .about-item');

    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    animarElementos.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animarElementos.forEach(el => {
        observador.observe(el);
    });

    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        details.addEventListener('toggle', (e) => {
            if (details.open) {
                detailsElements.forEach(other => {
                    if (other !== details && other.open) {
                        other.open = false;
                    }
                });
                
                setTimeout(() => {
                    details.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
                
                details.style.backgroundColor = '#dbeafe';
                setTimeout(() => {
                    details.style.backgroundColor = '#fff';
                }, 300);
            }
        });
        
        details.addEventListener('mouseenter', () => {
            if (!details.open) {
                details.style.borderColor = '#2563eb';
            }
        });
        
        details.addEventListener('mouseleave', () => {
            if (!details.open) {
                details.style.borderColor = '#ddd';
            }
        });
    });