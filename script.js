// language dropdown
const dropdownBtn = document.getElementById("selected-lang");
const dropdownMenu = document.getElementById("dropdown");
const arrow = document.querySelector(".arrow");

if (!dropdownBtn || !dropdownMenu || !arrow) {
  console.error("Required elements for language dropdown not found.");
} else {
  dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
    arrow.classList.toggle("rotate");
  });

  document.querySelectorAll(".dropdown-content div").forEach((item) => {
    item.addEventListener("click", function () {
      const selectedFlag = this.dataset.flag;
      if (!selectedFlag) {
        console.error("Selected flag data not found.");
        return;
      }
      dropdownBtn.innerHTML = `<img src="${selectedFlag}" alt="">
        <span class="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.47634 5.01749L0.964577 0.982514L8.03564 0.982513C8.01816 1 4.47634 5.01749 4.47634 5.01749Z" fill="#121212"/>
            </svg>
        </span>`;
      dropdownMenu.classList.remove("show");
      arrow.classList.remove("rotate");
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownBtn.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
      arrow.classList.remove("rotate");
    }
  });
}

// mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("open");
    overlay.classList.toggle("active");

    if (mobileMenu.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
});

// aos animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".aos");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(element => observer.observe(element));
});

// carousel
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".service-item");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const pagination = document.querySelector(".pagination");

  if (!slider || slides.length === 0) {
      console.error("Slider or slides not found.");
      return;
  }

  let index = slides.length;
  let isMoving = false;
  let interval;
  let slideWidth = getSlideWidth();

  function getSlideWidth() {
      return document.querySelector(".service-item").offsetWidth + 24;
  }

  function updateSlideWidth() {
      slideWidth = getSlideWidth();
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  window.addEventListener("resize", updateSlideWidth);

  slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      slider.appendChild(clone);
  });

  slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      slider.insertBefore(clone, slides[0]);
  });

  slider.style.transform = `translateX(-${index * slideWidth}px)`;

  pagination.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
      const circle = document.createElement("div");
      circle.classList.add("pagination-circle");
      if (i === 0) circle.classList.add("active");
      circle.dataset.index = i;
      pagination.appendChild(circle);
  }

  function updatePagination() {
      document.querySelectorAll(".pagination-circle").forEach((dot, i) => {
          dot.classList.toggle("active", i === (index % slides.length));
      });
  }

  function moveSlide(direction) {
      if (isMoving) return;
      isMoving = true;

      index = direction === "next" ? index + 1 : index - 1;
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(-${index * slideWidth}px)`;

      setTimeout(() => {
          if (index >= slides.length * 2) {
              slider.style.transition = "none";
              index = slides.length;
              slider.style.transform = `translateX(-${index * slideWidth}px)`;
          }
          if (index <= 0) {
              slider.style.transition = "none";
              index = slides.length;
              slider.style.transform = `translateX(-${index * slideWidth}px)`;
          }
          updatePagination();
          isMoving = false;
      }, 500);
  }

  function startSlider() {
      interval = setInterval(() => moveSlide("next"), 3000);
  }

  function stopSlider() {
      clearInterval(interval);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => moveSlide("next"));
  if (prevBtn) prevBtn.addEventListener("click", () => moveSlide("prev"));

  document.querySelectorAll(".pagination-circle").forEach((dot) => {
      dot.addEventListener("click", function () {
          if (isMoving) return;
          index = parseInt(this.dataset.index) + slides.length;
          moveSlide();
      });
  });

  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
      if (startX - endX > 50) {
          moveSlide("next");
      } else if (endX - startX > 50) {
          moveSlide("prev");
      }
  });

  startSlider();
});

// smooth scroll like lenis
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".smooth-scroll");

  if (!scrollContainer) {
    console.error(".smooth-scroll not found on this page!");
    return;
  }

  const totalHeight = scrollContainer.scrollHeight;
  const viewportHeight = window.innerHeight;
  document.body.style.height = `${totalHeight}px`;

  let scrollY = window.scrollY;
  let easeScrollY = scrollY;
  let speed = 0.08;

  const smoothScroll = () => {
    easeScrollY += (scrollY - easeScrollY) * speed;
    easeScrollY = Math.max(0, Math.min(totalHeight - viewportHeight, easeScrollY));

    scrollContainer.style.transform = `translateY(${-easeScrollY}px)`;
    requestAnimationFrame(smoothScroll);
  };

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  window.addEventListener("wheel", (event) => {
    scrollY = Math.max(0, Math.min(totalHeight - viewportHeight, scrollY + event.deltaY));
  });

  smoothScroll();
});





