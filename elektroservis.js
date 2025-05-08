// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(startCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Start counters when the element is in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (counters.length > 0) {
    observer.observe(document.querySelector('.counter').parentElement.parentElement);
}

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateProgressBars, 300);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (progressBars.length > 0) {
    progressObserver.observe(document.querySelector('.progress-bar').parentElement.parentElement);
}

// Kirim data form ke WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value.trim();
        const message = document.getElementById('message').value.trim();
        let layanan = '';
        switch(service) {
            case 'kompor': layanan = 'Servis Kompor Gas'; break;
            case 'kipas': layanan = 'Servis Kipas Angin'; break;
            case 'kulkas': layanan = 'Servis Kulkas'; break;
            case 'setrika': layanan = 'Servis Setrika'; break;
            case 'mesin_cuci': layanan = 'Servis Mesin Cuci'; break;
            case 'lainnya': layanan = 'Lainnya'; break;
            default: layanan = service;
        }
        const text = `Halo, saya ingin melakukan servis.\nNama: ${name}\nNo. Telepon: ${phone}\nLayanan: ${layanan}\nPesan: ${message}`;
        const url = `https://wa.me/6285728748711?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });
} 