// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active class to navigation links and animate sections
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
            section.classList.add('animate');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Initial call to handleScroll
window.addEventListener('load', handleScroll);

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Add resize event listener to recalculate section positions
window.addEventListener('resize', handleScroll);

// Animate skill buttons
function animateSkillButtons() {
    const skillButtons = document.querySelectorAll('.skill-button');
    skillButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 50}ms`;
        button.classList.add('animate-skill');
    });
}

// Animate project cards
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.classList.add('animate-project');
    });
}

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const projectsContainer = document.getElementById('projects-container');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-card-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <p>Technologies: ${project.technologies.join(', ')}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });

        animateProjectCards();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Call animation functions and load projects when the page loads
window.addEventListener('load', () => {
    animateSkillButtons();
    loadProjects();
});

// Intersection Observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});
