/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector(".navbar");

function updateNavbar(){
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

/* ==========================
   STAGGER COUNTER
========================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    counters.forEach((counter, index) => {

      setTimeout(() => {
        animateCounter(counter);
      }, index * 180);   // stagger 180ms

    });

    observer.disconnect();

  });

}, { threshold: 0.45 });

counters.forEach(counter => observer.observe(counter));

function animateCounter(el){

  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix;

  let frame = 0;
  const totalFrames = 48;

  const timer = setInterval(() => {

    frame++;

    // Random rolling
    if(frame < totalFrames - 8){

      el.textContent = Math.floor(Math.random() * (target + 60));

    }else{

      // Ease-out ke angka asli
      const progress = (frame - (totalFrames - 8)) / 8;
      const value = Math.round(target * progress);

      el.textContent = value;

    }

    if(frame >= totalFrames){

      clearInterval(timer);

      el.textContent = target + suffix;

      // little pop ✨
      el.classList.add("settled");

    }

  }, 1000 / 60);

}

/* ==========================
   SCROLL REVEAL
========================== */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(!entry.isIntersecting) return;

    entry.target.classList.add("active");

    // stagger khusus product cards
    if(entry.target.classList.contains("products-home")){

      const cards = entry.target.querySelectorAll(".product-card");

      cards.forEach((card,index)=>{

        setTimeout(()=>{
          card.classList.add("active");
        }, index * 120);

      });

    }

    revealObserver.unobserve(entry.target);

  });

},{
  threshold:.18
});

reveals.forEach(el=>revealObserver.observe(el));

/* ===== FAQ Accordion ===== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    const opened = item.classList.contains("active");

    faqItems.forEach(i => i.classList.remove("active"));

    if(!opened){
      item.classList.add("active");
    }
  });
});

/* ==========================
   PAGE TRANSITION
========================== */

const links = document.querySelectorAll("a[href]");

links.forEach(link => {

  const href = link.getAttribute("href");

  // Skip external links, email, anchor
  if (
    href.startsWith("http") ||
    href.startsWith("#") ||
    href.startsWith("mailto")
  ) return;

  link.addEventListener("click", e => {

    e.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(()=>{
      window.location.href = href;
    },250);

  });

});

/* ==========================
   PIPELINE STAGGER
========================== */

const stepCards = document.querySelectorAll(".step-card");

if(stepCards.length){

  const stepObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      stepCards.forEach((card,index)=>{

        setTimeout(()=>{
          card.classList.add("active");
        }, index * 180);

      });

      stepObserver.disconnect();

    });

  },{ threshold:.25 });

  stepCards.forEach(card=> stepObserver.observe(card));

}

/* ==========================
   CERTIFICATE STAGGER
========================== */

const certLogos = document.querySelectorAll(".cert-grid img");

if(certLogos.length){

  const certObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      certLogos.forEach((logo,index)=>{

        setTimeout(()=>{
          logo.classList.add("active");
        }, index * 120);

      });

      certObserver.disconnect();

    });

  },{ threshold:.3 });

  certLogos.forEach(logo=> certObserver.observe(logo));

}

/* ===== HERO PARALLAX ===== */

const heroImage = document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {
  if (!heroImage) return;

  const offset = window.scrollY * 0.18;
  heroImage.style.transform = `translateY(${offset}px)`;
});


/* ==========================
   CONTACT FORM POPUP
========================== */

function showPopup(type, title, text, callback = null) {
  const popup = document.getElementById("popup");
  const icon = document.getElementById("popupIcon");

  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupText").textContent = text;

  if (type === "success") {
    icon.textContent = "✓";
    icon.classList.remove("error");
  } else {
    icon.textContent = "!";
    icon.classList.add("error");
  }

  popup.classList.add("show");
  window.popupCallback = callback;
}

function closePopup() {
  document.getElementById("popup").classList.remove("show");

  if (window.popupCallback) {
    window.popupCallback();
    window.popupCallback = null;
  }
}

/* ==========================
   SEND TO WHATSAPP
========================== */

function sendToWhatsApp() {

  const company = document.getElementById("company").value.trim();
  const person  = document.getElementById("person").value.trim();
  const email   = document.getElementById("email").value.trim();
  const product = document.getElementById("product").value;
  const volume  = document.getElementById("volume").value.trim();
  const notes   = document.getElementById("notes").value.trim();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    showPopup(
      "error",
      "Invalid Email",
      "Please enter a valid company email (example: name@company.com)."
    );
    return;
  }

  const message = `Hello Deprama Cocoa,

I'd like to request a sample.

Company: ${company}
Contact Person: ${person}
Email: ${email}

Product Interest: ${product}
Estimated Monthly Volume: ${volume}

Technical Requirements:
${notes}`;

  const phone = "6285157917335";

  showPopup(
    "success",
    "Inquiry Ready",
    "Thank you! Click Continue to send your inquiry via WhatsApp.",
    () => {
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  );

}

/* ==========================
   PRODUCT STAGGER REVEAL
========================== */

const productCards = document.querySelectorAll(".product-spec");

if(productCards.length){

  const productObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const cards = [...productCards];

      cards.forEach((card,index)=>{

        setTimeout(()=>{
          card.classList.add("active");
        }, index * 180);

      });

      productObserver.disconnect();

    });

  },{
    threshold:.15
  });

  productObserver.observe(productCards[0]);

}

/* ==========================
   PACKAGING REVEAL
========================== */

const packaging = document.querySelector(".packaging");

if (packaging) {

  const content = packaging.querySelector(".packaging-content");
  const image = packaging.querySelector(".packaging-image");

  const packagingObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      content.classList.add("active");

      setTimeout(() => {
        image.classList.add("active");
      }, 220);

      packagingObserver.disconnect();

    });

  }, {
    threshold: 0.25
  });

  packagingObserver.observe(packaging);

}

/* ==========================
   CONTACT REVEAL
========================== */

const contactSection = document.querySelector(".contact-section");

if (contactSection) {

  const info = contactSection.querySelector(".contact-info");
  const card = contactSection.querySelector(".contact-card");

  const contactObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      info.classList.add("active");

      setTimeout(() => {
        card.classList.add("active");
      }, 180);

      contactObserver.disconnect();

    });

  }, {
    threshold: 0.2
  });

  contactObserver.observe(contactSection);

}

/* ===== MOBILE MENU ===== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if(menuToggle && navMenu){

  menuToggle.addEventListener("click",()=>{

    navMenu.classList.toggle("active");

    menuToggle.textContent =
      navMenu.classList.contains("active") ? "✕" : "☰";

  });

}

/* ==========================
   APPLICATION FLIP CARDS
========================== */

const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach(card => {
  card.addEventListener("click", () => {

    const isOpen = card.classList.contains("active");

    // Tutup semua card
    flipCards.forEach(c => c.classList.remove("active"));

    // Kalau tadi belum terbuka, buka card ini
    if (!isOpen) {
      card.classList.add("active");
    }

  });
});

/* ==========================
   APPLICATION STAGGER REVEAL
========================== */

const appCards = document.querySelectorAll(".flip-card");

if(appCards.length){

  const appObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      appCards.forEach((card,index)=>{
        setTimeout(()=>{
          card.classList.add("visible");
        }, index * 120);
      });

      appObserver.disconnect();

    });

  },{ threshold:0.2 });

  appObserver.observe(appCards[0]);
}

/* ===== APPLICATION CAROUSEL DOTS ===== */

const appGrid = document.querySelector(".app-grid");
const dots = document.querySelectorAll(".app-indicators .dot");

if (appGrid && dots.length) {
  appGrid.addEventListener("scroll", () => {
    const cards = appGrid.querySelectorAll(".flip-card");
    const cardWidth = cards[0].offsetWidth + 16; // 16 = gap
    const index = Math.round(appGrid.scrollLeft / cardWidth);

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  });
}

// ===== GLOBAL REACH ROUTE ANIMATION =====

const reachSection = document.querySelector(".global-reach");

const reachObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      reachSection.classList.add("active");
    }
  });
},{ threshold:0.35 });

if(reachSection){
  reachObserver.observe(reachSection);
}


