document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.7}px`;
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Welcome to the Galactic Fan Club! ${email} has been registered for exclusive SUPERSTAR content.`);
        newsletterForm.reset();
    });

    // Animated entrance for tour dates
    const tourItems = document.querySelectorAll('.tour-list li');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    tourItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').textContent = `© ${currentYear} SUPERSTAR. All rights reserved across the universe.`;

    // 3D particle background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particles-background').appendChild(renderer.domElement);

    const particles = new THREE.Group();
    scene.add(particles);

    const particleTexture = new THREE.TextureLoader().load('/placeholder.svg?height=32&width=32');

    for (let i = 0; i < 1000; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(3);
        
        positions[0] = Math.random() * 2000 - 1000;
        positions[1] = Math.random() * 2000 - 1000;
        positions[2] = Math.random() * 2000 - 1000;
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 5,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            color: Math.random() < 0.5 ? 0xFFD700 : 0x00FFFF
        });

        const particle = new THREE.Points(geometry, material);
        particles.add(particle);
    }

    camera.position.z = 1000;

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        particles.children.forEach(particle => {
            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Glitch effect for hero title
    const glitchElement = document.querySelector('.glitch');
    setInterval(() => {
        glitchElement.style.animation = 'none';
        void glitchElement.offsetWidth;
        glitchElement.style.animation = null;
    }, 5000);

    // Interactive gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
            if (item.classList.contains('expanded')) {
                item.style.transform = 'scale(1.5)';
                item.style.zIndex = '1000';
            } else {
                item.style.transform = '';
                item.style.zIndex = '';
            }
        });
    });

    // Animated counters for VIP packages
    const vipItems = document.querySelectorAll('.vip-item');
    vipItems.forEach(item => {
        const counter = item.querySelector('.vip-counter');
        if (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const updateCounter = () => {
                const increment = target / 200;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }
    });

    // Animated background for featured VIP package
    const featuredVIP = document.querySelector('.vip-item.featured');
    if (featuredVIP) {
        const gradientAnimation = () => {
            const hue = (Date.now() / 50) % 360;
            featuredVIP.style.background = `linear-gradient(45deg, hsl(${hue}, 100%, 50%), hsl(${(hue + 60) % 360}, 100%, 50%))`;
            requestAnimationFrame(gradientAnimation);
        };
        gradientAnimation();
    }
});