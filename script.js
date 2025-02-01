// Loading Screen
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mouse Effects
const follower = document.querySelector('.cursor-follower');
const particlesContainer = document.querySelector('.particles');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let particles = [];

class Particle {
    constructor(x, y) {
        this.el = document.createElement('div');
        this.el.className = 'particle';
        particlesContainer.appendChild(this.el);
        
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 1;
        
        this.update();
    }

    update() {
        this.life -= 0.02;
        this.x += this.speedX;
        this.y += this.speedY;
        
        this.el.style.cssText = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            opacity: ${this.life};
            background: hsl(${Math.random() * 360}, 70%, 60%);
        `;
        
        if(this.life < 0) {
            this.el.remove();
            particles = particles.filter(p => p !== this);
        }
    }
}

// Mouse Tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add new particles
    if(particles.length < 30) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function updateFollower() {
    followerX += (mouseX - followerX - 30) * 0.15;
    followerY += (mouseY - followerY - 30) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    particles.forEach(p => p.update());
    requestAnimationFrame(updateFollower);
}
updateFollower();

// Job Search Functionality
const jobs = [
    { title: "Medical Doctor", type: "Full-time / Remote" },
    { title: "Lab Technician", type: "Contract / On-site" },
    { title: "Pharmacist", type: "Part-time / Hybrid" },
    { title: "BSC Nurse", type: "Full-time / Hospital" },
    { title: "Internist", type: "Full-time / Clinic" },
    { title: "Health Officer", type: "Contract / Field" },
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

// Initial render
renderJobs(jobs);

// Hover Effects
document.querySelectorAll('.job-card, .search-btn, .contact-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        particles.push(new Particle(
            mouseX + Math.random() * 20 - 10,
            mouseY + Math.random() * 20 - 10
        ));
    });
});

// Performance Optimization
let lastFrame = 0;
function optimizeParticles(now) {
    if(now - lastFrame > 1000/60) {
        lastFrame = now;
        particles = particles.slice(-50); // Limit to 50 particles
    }
    requestAnimationFrame(optimizeParticles);
}
requestAnimationFrame(optimizeParticles);
