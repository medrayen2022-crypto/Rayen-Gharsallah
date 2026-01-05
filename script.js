window.addEventListener("load", () => {
    // Intro animations
    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.3 },
        { selector: ".desc", class: "from-left", delay: 0.6 },
        { selector: ".live-line", class: "from-bottom", delay: 0.9 },
        { selector: ".buttons", class: "zoom-in", delay: 1.2 },
        { selector: ".site-link", class: "from-bottom", delay: 1.5 },
        { selector: ".right", class: "from-right", delay: 0.6 },
        { selector: ".stats", class: "from-bottom", delay: 1.8 },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    // Hide intro and show real site after 5 seconds
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations();
        }, 1200);
    }, 5000);
});

// Scroll reveal animations
function initScrollAnimations() {
    const elements = document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-up");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}

// Navigation active state
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});
// Validations
function verifNom(nom) {
    return nom.length > 4 && /^[a-zA-Z\s]+$/.test(nom);
}

function verifMail(mail) {
    return mail.includes("@gmail.com") && mail.length > 10;
}

function verifText(text) {
    return text.trim() !== "";
}

// boutton envoyer
(function(){
    emailjs.init("TON_PUBLIC_KEY"); // ← remplace par ta clé publique EmailJS
})();

// Initialisation
(function(){
    emailjs.init("TON_PUBLIC_KEY"); // remplace par ta clé publique EmailJS
})();

function envoyerMessage(e) {
    e.preventDefault();

    let nom = document.getElementById("n").value;
    let mail = document.getElementById("m").value;
    let text = document.getElementById("t").value;

    // Vérifications simples
    if (!verifNom(nom) || !verifMail(mail) || !verifText(text)) {
        alert("Vérifie les informations !");
        return false ;
    }

    // Envoi du mail
    emailjs.send("service_xsudljh", "template_98uevbm", {
        name: nom,
        email: mail,
        message: text,
    })
    .then(() => {
        alert("Message envoyé avec succès ✅");
        document.querySelector("form").reset();
    })
    .catch(() => {
        alert("Erreur lors de l’envoi ❌");
    });
}


// Load projects dynamically from JSON
function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            container.innerHTML = ''; // Clear existing content

            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">Voir le projet</a>
                `;

                container.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des projets:', error);
            const container = document.getElementById('projects-container');
            container.innerHTML = '<p>Erreur lors du chargement des projets.</p>';
        });
}
