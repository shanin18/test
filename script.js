const dropdownBtn = document.getElementById("selected-lang");
const dropdownMenu = document.getElementById("dropdown");
const arrow = document.querySelector(".arrow");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
  arrow.classList.toggle("rotate");
});

document.querySelectorAll(".dropdown-content div").forEach((item) => {
  item.addEventListener("click", function () {
    const selectedFlag = this.dataset.flag;
    dropdownBtn.innerHTML = `<img src="${selectedFlag}" alt="">
        <span class="arrow">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="6"
            viewBox="0 0 9 6"
            fill="none"
            >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.47634 5.01749L0.964577 0.982514L8.03564 0.982513C8.01816 1 4.47634 5.01749 4.47634 5.01749Z"
                fill="#121212"
            />
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



const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.service-item');
let index = 0;
let interval;

// Clone first and last slides for infinite effect
slider.appendChild(slides[0].cloneNode(true));
slider.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);

function startSlider() {
    interval = setInterval(() => moveSlide(1), 1000);
}

function moveSlide(dir) {
    index += dir;
    if (index < 0) {
        index = slides.length - 1;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${index * 100}%)`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out";
                moveSlide(1);
            });
        });
        return;
    }
    if (index >= slides.length) {
        index = 0;
        slider.style.transition = "none";
        slider.style.transform = `translateX(0%)`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out";
                moveSlide(1);
            });
        });
        return;
    }
    const move = -(index * (100 / (window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3))) + '%';
    slider.style.transform = `translateX(${move})`;
}

document.getElementById('nextBtn').addEventListener('click', () => moveSlide(1));
document.getElementById('prevBtn').addEventListener('click', () => moveSlide(-1));
document.querySelector('.service-carousel').addEventListener('mouseenter', () => clearInterval(interval));
document.querySelector('.service-carousel').addEventListener('mouseleave', startSlider);

startSlider();
