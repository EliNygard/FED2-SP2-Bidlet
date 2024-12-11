export function handleCarousel() {
  const slides = document.querySelectorAll("#slideContainer");
  let currentIndex = 0;
  const navButtonsDiv = document.getElementById("navButtonsDiv");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "flex flex-row gap-4 items-center";
  dotsContainer.id = "dotsContainer";

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className =
      index === 0
        ? "fa-solid fa-circle text-brand-dark text-[8px] md:text-xs"
        : "fa-regular fa-circle text-brand-dark text-[8px] md:text-xs";
    dot.dataset.index = index.toString();
    dot.setAttribute("aria-label", `Navigate to image number ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  navButtonsDiv?.insertBefore(dotsContainer, nextButton);

  function showSlide(index: number) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== index);
    });

    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach((dot, i) => {
      dot.className =
        i === index
          ? "fa-solid fa-circle text-brand-dark text-[8px] md:text-xs"
          : "fa-regular fa-circle text-brand-dark text-[8px] md:text-xs";
    });
  }

  showSlide(currentIndex);

  nextButton?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevButton?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
}
