/* ============================================
   UrinoAI Research Website — Main JavaScript
   Minimal vanilla JS for interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Active Nav Link Highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- System Demo: Image Upload & Preview ---
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const demoPreview = document.getElementById('demoPreview');
  const previewImage = document.getElementById('previewImage');

  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('active');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('active');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('active');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        showPreview(file);
      }
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) showPreview(file);
    });

    function showPreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (previewImage) previewImage.src = e.target.result;
        if (demoPreview) demoPreview.classList.add('show');
        uploadZone.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Contact Form Submission (static) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, var(--success), #43a047)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }
});
