// Tab functionality in the About section (with explicit event parameter)
function opentab(event, tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active-link");
    }
    const targetTab = document.getElementById(tabname);
    if (targetTab) {
        targetTab.classList.add("active-tab");
    }
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

// Interactive Project Filtering
function filterProjects(event, category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact form submission with loader & honeypot spam protection
const scriptURL = 'https://script.google.com/macros/s/AKfycbzDnYSLdEP3RbfKnE7TrqspnkQ8pEfsw1OKv7k-h-xJ-tPmoWxKSwsmSCGaVxf1Hfv2Jg/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = document.getElementById("submit-button");

if (form && submitButton) {
    const buttonText = submitButton.querySelector(".button-text");
    const buttonLoader = submitButton.querySelector(".button-loader");

    form.addEventListener('submit', e => {
        e.preventDefault();

        // 1. Honeypot Bot Detection
        const honeypot = form.elements['_gotcha']?.value;
        if (honeypot) {
            console.warn('Spam submission detected and discarded.');
            msg.innerHTML = "Message sent successfully!";
            setTimeout(() => { msg.innerHTML = ""; }, 5000);
            form.reset();
            return;
        }

        // 2. Start loading animation
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        submitButton.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;

                msg.innerHTML = "Message sent successfully!";
                setTimeout(() => { msg.innerHTML = ""; }, 5000);
                form.reset();
            })
            .catch(error => {
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;

                console.error('Error!', error.message);
                msg.innerHTML = "Error sending message. Please try again.";
                setTimeout(() => { msg.innerHTML = ""; }, 5000);
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

// Scroll effect for navigation bar
window.addEventListener('scroll', function () {
    const nav = document.querySelector('#header nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }
});

// Back to Top button logic
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- SCRIPTS THAT RUN AFTER DOM IS READY ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typing effect for hero section
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
    const docEl = document.documentElement;
    const logoImg = document.querySelector('.logo img');

    const darkThemeLogo = 'images/logo-dt.png';
    const lightThemeLogo = 'images/logo-lt.png';

    if (themeToggle && logoImg) {
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.add('light-theme');
                docEl.classList.add('light-theme');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                logoImg.src = lightThemeLogo;
            } else {
                body.classList.remove('light-theme');
                docEl.classList.remove('light-theme');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                logoImg.src = darkThemeLogo;
            }
        };

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            docEl.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                logoImg.src = lightThemeLogo;
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                logoImg.src = darkThemeLogo;
            }
        });

        applySavedTheme();
    }
});

// ===================================
// CV VERIFICATION & DOWNLOAD WORKFLOW
// ===================================
let cvApplicantName = '';
let cvApplicantEmail = '';
let resendTimerInterval = null;

function openCvModal() {
    const modal = document.getElementById('cv-modal');
    const requestForm = document.getElementById('cv-request-form');
    const verifyForm = document.getElementById('cv-verify-form');
    const statusMsg = document.getElementById('cv-status-msg');

    if (modal) {
        if (requestForm) {
            requestForm.reset();
            requestForm.style.display = 'block';
        }
        if (verifyForm) {
            verifyForm.reset();
            verifyForm.style.display = 'none';
        }
        if (statusMsg) {
            statusMsg.textContent = '';
            statusMsg.className = 'modal-status-msg';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            const nameInput = document.getElementById('cv-name');
            if (nameInput) nameInput.focus();
        }, 150);
    }
}

function closeCvModal() {
    const modal = document.getElementById('cv-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (resendTimerInterval) {
            clearInterval(resendTimerInterval);
        }
    }
}

function handleCvModalBackdrop(event) {
    if (event.target && event.target.id === 'cv-modal') {
        closeCvModal();
    }
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCvModal();
    }
});

function handleEditEmail() {
    const requestForm = document.getElementById('cv-request-form');
    const verifyForm = document.getElementById('cv-verify-form');
    const statusMsg = document.getElementById('cv-status-msg');

    if (requestForm && verifyForm) {
        verifyForm.style.display = 'none';
        requestForm.style.display = 'block';
        if (statusMsg) statusMsg.textContent = '';
        const emailInput = document.getElementById('cv-email');
        if (emailInput) emailInput.focus();
    }
}

function startResendCountdown(durationSeconds = 60) {
    const resendBtn = document.getElementById('resend-otp-btn');
    if (!resendBtn) return;

    if (resendTimerInterval) clearInterval(resendTimerInterval);

    let remaining = durationSeconds;
    resendBtn.disabled = true;
    resendBtn.textContent = `Resend in ${remaining}s`;

    resendTimerInterval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            clearInterval(resendTimerInterval);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend Code';
        } else {
            resendBtn.textContent = `Resend in ${remaining}s`;
        }
    }, 1000);
}

// Step 1: Send OTP via Google Apps Script
function handleSendOtp(event) {
    event.preventDefault();
    const nameInput = document.getElementById('cv-name');
    const emailInput = document.getElementById('cv-email');
    const sendBtn = document.getElementById('cv-send-otp-btn');

    if (!nameInput || !emailInput || !sendBtn) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();

    if (!name || !email) {
        showModalStatus('Please provide both your name and a valid email.', 'error');
        return;
    }

    cvApplicantName = name;
    cvApplicantEmail = email;

    const btnLabel = sendBtn.querySelector('.btn-label');
    const btnSpinner = sendBtn.querySelector('.btn-spinner');

    if (btnLabel) btnLabel.textContent = 'Sending Code...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    sendBtn.disabled = true;
    showModalStatus('', '');

    const formData = new FormData();
    formData.append('action', 'request_cv_otp');
    formData.append('name', name);
    formData.append('email', email);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(res => res.json().catch(() => ({ status: 'success' })))
        .then(data => {
            if (btnLabel) btnLabel.textContent = 'Send Verification Code';
            if (btnSpinner) btnSpinner.style.display = 'none';
            sendBtn.disabled = false;

            if (data.status === 'error') {
                if (data.message && data.message.includes('MailApp.sendEmail')) {
                    showModalStatus('Apps Script setup needed: Open your Apps Script editor, run authorizeScript(), and re-deploy.', 'error');
                } else {
                    showModalStatus(data.message || 'Failed to send verification code. Please try again.', 'error');
                }
                return;
            }

            const requestForm = document.getElementById('cv-request-form');
            const verifyForm = document.getElementById('cv-verify-form');
            const displayedEmail = document.getElementById('displayed-email');

            if (displayedEmail) displayedEmail.textContent = email;
            if (requestForm) requestForm.style.display = 'none';
            if (verifyForm) verifyForm.style.display = 'block';

            showModalStatus('Verification code sent to ' + email, 'success');
            startResendCountdown(60);

            setTimeout(() => {
                const otpInput = document.getElementById('cv-otp');
                if (otpInput) otpInput.focus();
            }, 100);
        })
        .catch(err => {
            console.error('OTP Request Error:', err);
            if (btnLabel) btnLabel.textContent = 'Send Verification Code';
            if (btnSpinner) btnSpinner.style.display = 'none';
            sendBtn.disabled = false;
            showModalStatus('Network error while requesting code. Please try again.', 'error');
        });
}

function handleResendOtp() {
    if (!cvApplicantEmail) return;
    const resendBtn = document.getElementById('resend-otp-btn');
    if (resendBtn && resendBtn.disabled) return;

    showModalStatus('Resending verification code...', '');

    const formData = new FormData();
    formData.append('action', 'request_cv_otp');
    formData.append('name', cvApplicantName);
    formData.append('email', cvApplicantEmail);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(res => res.json().catch(() => ({ status: 'success' })))
        .then(data => {
            if (data.status === 'error') {
                showModalStatus(data.message || 'Unable to resend code.', 'error');
            } else {
                showModalStatus('A new code has been sent to your email.', 'success');
                startResendCountdown(60);
            }
        })
        .catch(() => {
            showModalStatus('Error resending code. Please try again.', 'error');
        });
}

// Step 2: Verify OTP and trigger CV download
function handleVerifyOtp(event) {
    event.preventDefault();
    const otpInput = document.getElementById('cv-otp');
    const verifyBtn = document.getElementById('cv-verify-btn');

    if (!otpInput || !verifyBtn) return;

    const otp = otpInput.value.trim();
    if (!otp || otp.length !== 6) {
        showModalStatus('Please enter the full 6-digit verification code.', 'error');
        return;
    }

    const btnLabel = verifyBtn.querySelector('.btn-label');
    const btnSpinner = verifyBtn.querySelector('.btn-spinner');

    if (btnLabel) btnLabel.textContent = 'Verifying...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    verifyBtn.disabled = true;

    const formData = new FormData();
    formData.append('action', 'verify_cv_otp');
    formData.append('name', cvApplicantName);
    formData.append('email', cvApplicantEmail);
    formData.append('otp', otp);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(res => res.json().catch(() => ({ status: 'success', verified: true })))
        .then(data => {
            if (data.status === 'error') {
                if (btnLabel) btnLabel.textContent = 'Verify & Download CV';
                if (btnSpinner) btnSpinner.style.display = 'none';
                verifyBtn.disabled = false;
                showModalStatus(data.message || 'Incorrect verification code. Please check and try again.', 'error');
                return;
            }

            if (btnLabel) btnLabel.textContent = 'Verified!';
            if (btnSpinner) btnSpinner.style.display = 'none';
            showModalStatus('✓ Email verified! Starting download...', 'success');

            triggerCvDownload();

            setTimeout(() => {
                closeCvModal();
            }, 2500);
        })
        .catch(err => {
            console.error('Verification Error:', err);
            if (btnLabel) btnLabel.textContent = 'Verify & Download CV';
            if (btnSpinner) btnSpinner.style.display = 'none';
            verifyBtn.disabled = false;
            showModalStatus('Verification service error. Please try again.', 'error');
        });
}

function triggerCvDownload() {
    const link = document.createElement('a');
    link.href = 'images/my-cv.pdf';
    link.download = 'Divyanshi_Sahu_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showModalStatus(message, type) {
    const statusMsg = document.getElementById('cv-status-msg');
    if (statusMsg) {
        statusMsg.textContent = message;
        statusMsg.className = 'modal-status-msg' + (type ? ' ' + type : '');
    }
}