// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add active class to navigation links
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
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
handleScroll();

// Add scroll event listener with debounce for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// Load projects from JSON file
fetch('/static/data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectsContainer = document.getElementById('projects-container');
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-card-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <p class="project-technologies">Technologies: ${project.technologies.join(', ')}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="view-project-btn">View Project</a>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    })
    .catch(error => console.error('Error loading projects:', error));

// Add hover animations to project cards
document.addEventListener('mouseover', function(event) {
    if (event.target.closest('.project-card')) {
        const card = event.target.closest('.project-card');
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    }
});

document.addEventListener('mouseout', function(event) {
    if (event.target.closest('.project-card')) {
        const card = event.target.closest('.project-card');
        card.style.transform = 'scale(1)';
    }
});

// Add typing animation to the header
const headerTitle = document.querySelector('header h1');
const headerSubtitle = document.querySelector('header h2');

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100);
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        headerTitle.innerHTML = '';
        typeWriter(headerTitle, 'Mar Benitez');
        setTimeout(() => {
            headerSubtitle.innerHTML = '';
            typeWriter(headerSubtitle, 'Data Scientist / Analyst');
        }, 1500);
    }, 500);
});

// Add fade-in animation for sections
function fadeInSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
}

window.addEventListener('load', fadeInSections);
