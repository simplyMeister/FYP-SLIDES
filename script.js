document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentSlide = 1
  const slides = document.querySelectorAll(".slide")
  const totalSlides = slides.length

  // Elements
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const slideIndicator = document.getElementById("slideIndicator")
  const progressBar = document.getElementById("progressBar")

  // Initialize
  updateUI()

  // Event Listeners
  nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1))
  prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1))

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "Space") {
      goToSlide(currentSlide + 1)
    } else if (e.key === "ArrowLeft") {
      goToSlide(currentSlide - 1)
    }
  })

  // Functions
  function goToSlide(slideIndex) {
    // Bounds check
    if (slideIndex < 1 || slideIndex > totalSlides) return

    // Update state
    currentSlide = slideIndex
    updateUI()
  }

  function updateUI() {
    // Update Slides Visibility
    slides.forEach((slide) => {
      const id = Number.parseInt(slide.getAttribute("data-id"))
      if (id === currentSlide) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    // Update Controls
    prevBtn.disabled = currentSlide === 1
    nextBtn.disabled = currentSlide === totalSlides

    // Update Indicator
    slideIndicator.textContent = `${currentSlide} / ${totalSlides}`

    // Update Progress Bar
    const progressPercentage = ((currentSlide - 1) / (totalSlides - 1)) * 100
    progressBar.style.width = `${progressPercentage}%`
  }
})
