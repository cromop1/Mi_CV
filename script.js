document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.querySelector("[data-intro-overlay]")

  if (introOverlay) {
    // Logos appear at 0s and 3s, text at 4.5s, so we wait 7s total for smooth completion
    setTimeout(() => {
      introOverlay.classList.remove("active")
      document.body.classList.remove("intro-active")
    }, 7000)
  }

  // Navigation
  const navigationLinks = document.querySelectorAll("[data-nav-link]")
  const pages = document.querySelectorAll("[data-page]")

  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetPage = this.getAttribute("data-target")

      // Update active link
      navigationLinks.forEach((navLink) => navLink.classList.remove("active"))
      this.classList.add("active")

      // Update active page
      pages.forEach((page) => page.classList.remove("active"))
      const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`)
      if (targetPageElement) {
        targetPageElement.classList.add("active")
        window.scrollTo({ top: 0, behavior: "smooth" })

        if (targetPage === "habilidades") {
          targetPageElement.querySelectorAll(".cert-card").forEach((card) => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          })
        }
      }
    })
  })

  // Subpage navigation cards
  const subpageCards = document.querySelectorAll("[data-subpage-target]")

  subpageCards.forEach((card) => {
    card.addEventListener("click", function () {
      const targetPage = this.getAttribute("data-subpage-target")

      // Find and click the corresponding nav link
      const targetNavLink = document.querySelector(`[data-nav-link][data-target="${targetPage}"]`)
      if (targetNavLink) {
        targetNavLink.click()
      }
    })
  })

  // Form validation
  const form = document.querySelector("[data-form]")
  const formInputs = document.querySelectorAll("[data-form-input]")
  const formBtn = document.querySelector("[data-form-btn]")

  if (form && formBtn) {
    // Enable/disable submit button based on form validity
    const checkFormValidity = () => {
      let isValid = true
      formInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
        }
      })
      formBtn.disabled = !isValid
    }

    formInputs.forEach((input) => {
      input.addEventListener("input", checkFormValidity)
    })

    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)

      // Show success message
      alert("¡Mensaje enviado correctamente! Te contactaré pronto.")

      // Reset form
      form.reset()
      formBtn.disabled = true
    })
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 50)
      }
    })
  }, observerOptions)

  // Observe animated elements
  document.querySelectorAll(".service-item, .project-item, .fact-card, .timeline-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
