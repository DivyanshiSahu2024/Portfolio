// Tab functionality in the About section
function opentab(tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu toggle
const sidemenu = document.getElementById("sidemenu");
const menuToggle = document.querySelector(".menu-toggle");

function toggleMenu() {
    sidemenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
}

// Close mobile menu when a link is clicked
document.querySelectorAll('#sidemenu a').forEach(link => {
    link.addEventListener('click', () => {
        sidemenu.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// Contact form submission with loader
const scriptURL = 'https://script.google.com/macros/s/AKfycbzDnYSLdEP3RbfKnE7TrqspnkQ8pEfsw1OKv7k-h-xJ-tPmoWxKSwsmSCGaVxf1Hfv2Jg/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = document.getElementById("submit-button");
const buttonText = submitButton.querySelector(".button-text");
const buttonLoader = submitButton.querySelector(".button-loader");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Start loading animation
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        submitButton.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                // Stop loading on success
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;

                // Display success message
                msg.innerHTML = "Message sent successfully!";
                setTimeout(function(){ msg.innerHTML = ""; }, 5000);
                form.reset();
            })
            .catch(error => {
                // Stop loading on error
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;

                // Display an error message
                console.error('Error!', error.message);
                msg.innerHTML = "Error sending message. Please try again.";
                setTimeout(function(){ msg.innerHTML = ""; }, 5000);
            });
    });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation bar
window.addEventListener('scroll', function () {
    const nav = document.querySelector('#header nav');
    if (window.scrollY > 50) {
         nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});


// --- SCRIPTS THAT RUN AFTER THE PAGE IS LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typing effect for the hero section
    if (typeof Typed !== 'undefined') {
        const options = {
            strings: [
                'Aspiring Software Developer',
                'Data Engineering Enthusiast',
                'Cloud Computing Professional'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            loop: true
        };
        new Typed('#typing-tagline', options);
    }

    // 2. Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoImg = document.querySelector('.logo img'); // Get the logo image element

    const darkThemeLogo = 'images/logo-dt.png';
    const lightThemeLogo = 'images/logo-lt.png';


    // This guard is important in case the theme toggle element doesn't exist
    if (themeToggle && logoImg) {
        // Function to apply the saved theme on page load
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.add('light-theme');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                logoImg.src = lightThemeLogo; // Set light theme logo
            } else {
                body.classList.remove('light-theme');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                logoImg.src = darkThemeLogo; // Set dark theme logo
                
            }
        };

        // Event listener for the toggle button
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            // Save the theme and update the icon
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                logoImg.src = lightThemeLogo; // Change to light theme logo
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                logoImg.src = darkThemeLogo; // Change to dark theme logo
            }
        });

        // Apply the theme when the page loads
        applySavedTheme();
    }
});