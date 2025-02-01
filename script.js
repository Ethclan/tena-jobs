// Loading Screen
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Particle System
const particlesContainer = document.querySelector('.particles');
let mouseX = 0, mouseY = 0;
let particles = [];
let lastCall = 0;

class Particle {
    constructor(x, y) {
        this.el = document.createElement('div');
        this.el.className = 'particle';
        particlesContainer.appendChild(this.el);
        
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 3;
        this.speedX = (Math.random() - 0.5) * 2.5;
        this.speedY = (Math.random() - 0.5) * 2.5;
        this.life = Math.random() * 0.8 + 0.5;
    }

    update() {
        this.life -= 0.008;
        this.x += this.speedX + (mouseX - this.x) * 0.03;
        this.y += this.speedY + (mouseY - this.y) * 0.03;
        
        this.el.style.cssText = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            opacity: ${this.life};
            background: radial-gradient(circle at 50% 50%, 
                hsl(${Math.random() * 360}, 70%, 60%) 0%, 
                transparent 70%);
        `;
        
        if(this.life < 0) {
            this.el.remove();
            particles = particles.filter(p => p !== this);
        }
    }
}

// Mouse Tracking
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if(now - lastCall > 10) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastCall = now;
        
        for(let i = 0; i < 2; i++) {
            particles.push(new Particle(
                mouseX + Math.random() * 20 - 10,
                mouseY + Math.random() * 20 - 10
            ));
        }
    }
});

// Particle Animation
function animate() {
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}
animate();

// Job Data and Filtering
const jobs = [
    { title: "Medical Doctor", type: "Full-time / Hospital" },
    { title: "Lab Technician", type: "Contract / Laboratory" },
    { title: "Pharmacist", type: "Full-time / Clinic" },
    { title: "BSC Nurse", type: "Full-time / Hospital" },
    { title: "Internist", type: "Full-time / Clinic" },
    { title: "Health Officer", type: "Contract / Field" },
    { title: "Radiologist", type: "Coming Soon" },
    { title: "Pediatrician", type: "Coming Soon" },
];

const googleFormLink = "https://docs.google.com/forms/d/1I25qK4k8K_8AOpqbbqZ3vZjGKS6_0CNx2Z_LOrdU8GQ/edit";

function renderJobs(jobList) {
    const container = document.getElementById('jobListings');
    container.innerHTML = jobList.map(job => `
        <div class="job-card">
            <h4>${job.title}</h4>
            <p>${job.type}</p>
            <a href="${googleFormLink}" target="_blank" class="apply-btn">Apply Now</a>
        </div>
    `).join("");
}

document.querySelector('.search-btn').addEventListener('click', () => {
    const term = document.getElementById('jobSearch').value.toLowerCase();
    const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(term)
    );
    renderJobs(filtered);
});

// Initialize Jobs
renderJobs(jobs);

// Card Hover Effects
document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2)/15}deg)
            rotateY(${-(x - rect.width/2)/15}deg)
            translateZ(10px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Performance Optimization
window.addEventListener('blur', () => {
    particles = [];
    document.querySelectorAll('.particle').forEach(p => p.remove());
});