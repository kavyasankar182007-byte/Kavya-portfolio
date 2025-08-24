// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when a link is clicked (mobile)
  navLinks.forEach(link =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Smooth scroll + active link highlight
const sections = document.querySelectorAll("section[id]");
const opts = { rootMargin: "-40% 0px -55% 0px", threshold: 0 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}, opts);

sections.forEach(sec => observer.observe(sec));

// Fake contact form handling (no backend)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

function setError(el, msg) {
  const small = el.parentElement.querySelector(".error");
  if (small) small.textContent = msg || "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    let ok = true;
    setError(form.querySelector('input[name="name"]'), "");
    setError(form.querySelector('input[name="email"]'), "");
    setError(form.querySelector('textarea[name="message"]'), "");

    if (!name) { setError(form.querySelector('input[name="name"]'), "Please enter your name."); ok = false; }
    if (!email || !validateEmail(email)) { setError(form.querySelector('input[name="email"]'), "Enter a valid email."); ok = false; }
    if (!message || message.length < 5) { setError(form.querySelector('textarea[name="message"]'), "Message is too short."); ok = false; }

    if (!ok) return;

    status.textContent = "Thanks! Your message has been captured (demo only).";
    form.reset();
  });
}

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
