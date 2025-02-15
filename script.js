
// language dropdown
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


// carousel
// carousel
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".service-item");

  if (!slider || slides.length === 0) {
    console.error("Slider or slides not found. Check your HTML structure.");
    return;
  }

  let index = 1; // Start at 1 to account for cloned slides
  let interval;

  // Clone first and last slides for infinite loop effect
  const firstClone = slides[0] ? slides[0].cloneNode(true) : null;
  const lastClone = slides[slides.length - 1] ? slides[slides.length - 1].cloneNode(true) : null;

  if (firstClone) firstClone.setAttribute("id", "first-clone");
  if (lastClone) lastClone.setAttribute("id", "last-clone");

  if (firstClone && lastClone) {
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);
  }

  // Update slides list after cloning
  const allSlides = document.querySelectorAll(".service-item");

  function startSlider() {
    clearInterval(interval); // Prevent multiple intervals
    interval = setInterval(() => moveSlide(1), 3000);
  }

  function moveSlide(dir) {
    if (!allSlides.length) {
      console.warn("No slides available.");
      return;
    }

    index += dir;

    // Determine slides per view based on screen width
    const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    const move = -(index * (100 / visibleSlides)) + "%";

    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${move})`;

    setTimeout(() => {
      if (allSlides[index] && allSlides[index].id === "first-clone") {
        index = 1;
        resetPosition();
      } else if (allSlides[index] && allSlides[index].id === "last-clone") {
        index = allSlides.length - 2;
        resetPosition();
      }
    }, 500); // Wait for transition to complete
  }

  function resetPosition() {
    slider.style.transition = "none";
    const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    const move = -(index * (100 / visibleSlides)) + "%";
    slider.style.transform = `translateX(${move})`;
  }

  // Ensure buttons exist before adding event listeners
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const carousel = document.querySelector(".service-carousel");

  if (nextBtn) nextBtn.addEventListener("click", () => moveSlide(1));
  if (prevBtn) prevBtn.addEventListener("click", () => moveSlide(-1));
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", startSlider);
  }

  // Start slider after ensuring elements exist
  setTimeout(() => {
    slider.style.transition = "transform 0.5s ease-in-out";
    moveSlide(0); // Reset to first actual slide
  }, 50);

  startSlider();
});


// smooth scroll like lenis
// smooth scroll like lenis
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".smooth-scroll");

  if (!scrollContainer) {
    console.error("🚨 Error: .smooth-scroll not found on this page!");
    return;
  }

  const totalHeight = scrollContainer.scrollHeight; // Get total height of the scrollable content
  const viewportHeight = window.innerHeight; // Viewport height for scroll boundaries
  document.body.style.height = `${totalHeight}px`; // Set the body's height to the scrollable content height

  let scrollY = window.scrollY;
  let easeScrollY = scrollY;
  let speed = 0.08;

  // Update the smooth scroll position based on wheel movement
  const smoothScroll = () => {
    easeScrollY += (scrollY - easeScrollY) * speed;
    // Constrain easeScrollY to ensure it doesn't go past the content
    easeScrollY = Math.max(0, Math.min(totalHeight - viewportHeight, easeScrollY));

    scrollContainer.style.transform = `translateY(${-easeScrollY}px)`;
    requestAnimationFrame(smoothScroll);
  };

  // Track scroll position based on window.scrollY
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  // Track wheel event for mouse scroll and update scrollY accordingly
  window.addEventListener("wheel", (event) => {
    scrollY = Math.max(0, Math.min(totalHeight - viewportHeight, scrollY + event.deltaY));
  });

  smoothScroll(); // Start the smooth scroll loop
});




