const animatedElements = document.querySelectorAll(
    '.service-preview, .work-card, .template-card, .service-card, .booking-card, .cta'
);

animatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.8s ease";
});

function revealOnScroll() {
    animatedElements.forEach(element => {
        const top = element.getBoundingClientRect().top;
        const visible = window.innerHeight - 80;

        if (top < visible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if(menu){
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() * 0.6) - 0.3;
        this.speedY = (Math.random() * 0.6) - 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(0,229,180,0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for(let i = 0; i < 70; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for(let a = 0; a < particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 120) {
                ctx.strokeStyle = "rgba(0,229,180,0.08)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
const typingText = document.getElementById("typing-text");

if (typingText) {
    const text = "Building Modern Websites For Brands & Businesses";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 55);
        }
    }

    typeEffect();
}
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".hero-stats");

let counterStarted = false;

function startCounters() {
    if (!statsSection || counterStarted) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const speed = target / 60;

            function updateCounter() {
                count += speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + "+";
                }
            }

            updateCounter();
        });
    }
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

reveals.forEach(section=>observer.observe(section));          

/* ===========================
   MY WORK
=========================== */

const projectsGrid = document.getElementById("projectsGrid");

if (projectsGrid && typeof projects !== "undefined") {

    projectsGrid.innerHTML = projects.map(project => {

        return `

            <article class="project-card reveal">

                <div class="project-image">

                    <img
                        src="${project.image}"
                        alt="${project.name}"
                        loading="lazy"
                    >

                    <div class="project-overlay">

                        <a
                            href="${project.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-view"
                        >

                            <i class="fa-solid fa-arrow-up-right-from-square"></i>

                        </a>

                    </div>

                </div>


                <div class="project-content">

                    <span class="project-type">
                        ${project.type}
                    </span>

                    <h3>
                        ${project.name}
                    </h3>

                    <p>
                        ${project.description}
                    </p>


                    <a
                        href="${project.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-btn"
                    >

                        Visit Website

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>

                </div>

            </article>

        `;

    }).join("");

}