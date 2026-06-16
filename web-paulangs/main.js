    // Seleccionamos todos los enlaces que apuntan a un ID (los que empiezan con #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto brusco

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculamos la posición
                const targetPosition = targetElement.offsetTop - 80; // El -80 es para que el menú sticky no tape el título
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                // --- CONFIGURACIÓN DE VELOCIDAD ---
                const duration = 1500; // 1500ms = 1.5 segundos. ¡Aquí puedes subirlo a 2000 para hacerlo más lento!
                // ----------------------------------

                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    
                    // Esta fórmula matemática (ease-in-out) hace que el viaje empiece lento, 
                    // acelere y luego frene suavemente al llegar.
                    const ease = progress / duration < 0.5
                        ? 2 * (progress / duration) * (progress / duration)
                        : -1 + (4 - 2 * (progress / duration)) * (progress / duration);

                    window.scrollTo(0, startPosition + distance * ease);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            }
        });
    });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculamos la posición del objetivo menos un margen para la navbar fija
            const navbarOffset = 90; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
            
            // Hace el salto rápido y suave controlado
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' // Aquí se ejecuta de forma optimizada por JS
            });
        }
    });
});