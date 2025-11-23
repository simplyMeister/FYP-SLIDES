document.addEventListener("DOMContentLoaded", () => {
  // Configuration
  const CONFIG = {
    totalSlides: 20,
    transitionSpeed: 600,
  }

  // State
  let currentSlide = 1
  let isAnimating = false

  // DOM Elements
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const slideIndicator = document.getElementById("slideIndicator")
  const progressBar = document.getElementById("progressBar")

  // Initialization
  init()

  function init() {
    updateClasses() // Set initial state
    updateUI()
    setupEventListeners()
  }

  function setupEventListeners() {
    // Click Events
    nextBtn.addEventListener("click", () => changeSlide("next"))
    prevBtn.addEventListener("click", () => changeSlide("prev"))

    // Keyboard Events
    document.addEventListener("keydown", handleKeyboard)

    // Touch Support (Simple Swipe)
    let touchStartX = 0
    let touchEndX = 0

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })

    function handleSwipe() {
      if (touchStartX - touchEndX > 50) changeSlide("next") // Swipe Left
      if (touchEndX - touchStartX > 50) changeSlide("prev") // Swipe Right
    }
  }

  function handleKeyboard(e) {
    if (isAnimating) return

    switch (e.key) {
      case "ArrowRight":
      case " ":
      case "PageDown":
        changeSlide("next")
        break
      case "ArrowLeft":
      case "PageUp":
        changeSlide("prev")
        break
      case "Home":
        jumpToSlide(1)
        break
      case "End":
        jumpToSlide(CONFIG.totalSlides)
        break
    }
  }

  function changeSlide(direction) {
    if (isAnimating) return

    let nextIndex
    if (direction === "next") {
      if (currentSlide >= CONFIG.totalSlides) return
      nextIndex = currentSlide + 1
    } else {
      if (currentSlide <= 1) return
      nextIndex = currentSlide - 1
    }

    performTransition(nextIndex)
  }

  function jumpToSlide(index) {
    if (index === currentSlide || isAnimating) return
    performTransition(index)
  }

  function performTransition(nextIndex) {
    isAnimating = true
    currentSlide = nextIndex

    // Update classes for all slides to trigger CSS transitions
    updateClasses()
    updateUI()

    // Release Lock after transition
    setTimeout(() => {
      isAnimating = false
    }, CONFIG.transitionSpeed)
  }

  function updateClasses() {
    slides.forEach((slide, index) => {
      // Slide indices are 1-based in our state, but 0-based in DOM collection
      const slideIndex = index + 1

      // Reset classes
      slide.className = "slide"

      if (slideIndex === currentSlide) {
        slide.classList.add("active")
      } else if (slideIndex < currentSlide) {
        slide.classList.add("prev")
      } else {
        slide.classList.add("next")
      }
    })
  }

  function updateUI() {
    // Update Slide Counter
    const formattedCurrent = currentSlide.toString().padStart(2, "0")
    const formattedTotal = CONFIG.totalSlides.toString().padStart(2, "0")
    slideIndicator.textContent = `${formattedCurrent} / ${formattedTotal}`

    // Update Progress Bar
    const progress = ((currentSlide - 1) / (CONFIG.totalSlides - 1)) * 100
    progressBar.style.width = `${progress}%`

    // Update Button States
    prevBtn.disabled = currentSlide === 1
    nextBtn.disabled = currentSlide === CONFIG.totalSlides
  }
})
