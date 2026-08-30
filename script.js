// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// Footer year
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Enquiry form
const enquiryForm = document.getElementById('enquiryForm');
const formStatus = document.getElementById('formStatus');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (
      SUPABASE_URL === 'YOUR_SUPABASE_URL' ||
      SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY'
    ) {
      formStatus.textContent =
        'Database is not configured yet. Add your Supabase URL and anon key in script.js.';
      return;
    }

    const submitButton = enquiryForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    formStatus.textContent = '';

    const data = Object.fromEntries(new FormData(enquiryForm).entries());

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      enquiryForm.reset();
      formStatus.textContent =
        'Thank you. Your enquiry has been submitted successfully.';
    } catch (error) {
      console.error(error);
      formStatus.textContent =
        'Unable to submit right now. Please try again or contact us by phone/email.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Enquiry';
    }
  });
}
