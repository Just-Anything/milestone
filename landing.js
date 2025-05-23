// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated
  if (!sessionStorage.getItem("authToken")) {
    window.location.href = "index.html"
    return
  }
  // Initialize AOS (Animate on Scroll) with more options
  AOS.init({
    duration: 1000,
    once: false, // Changed to false to allow animations to occur every time element scrolls into view
    offset: 100,
    easing: "ease-out-cubic",
    mirror: true, // Whether elements should animate out while scrolling past them
  })

  // Initialize section animations when visible
  const sectionTitles = document.querySelectorAll(".section-title")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation")
          entry.target.classList.add(animation)
        }
      })
    },
    { threshold: 0.1 },
  )

  sectionTitles.forEach((title) => {
    observer.observe(title)
  })

  // Initialize all animations for the landing page
  initLandingPageAnimations()

  // Initialize scroll animations
  initScrollAnimations()

  // Add scroll progress indicator
  initScrollProgressIndicator()
})

// Initialize landing page animations
function initLandingPageAnimations() {
  // Section 1: Grid Gallery Animation
  anime({
    targets: "#section1 .photo-card",
    scale: [0.8, 1],
    opacity: [0, 1],
    delay: anime.stagger(100),
    easing: "easeOutElastic(1, .6)",
  })

  // Section 3: Masonry Animation
  anime({
    targets: "#section3 .photo-card",
    translateY: [50, 0],
    opacity: [0, 1],
    delay: anime.stagger(150),
    easing: "easeOutQuad",
  })

  // Section 4: Polaroid Animation
  anime({
    targets: "#section4 .polaroid-card",
    rotateY: [90, 0],
    opacity: [0, 1],
    delay: anime.stagger(200),
    easing: "easeOutSine",
  })

  // Section 5: Fade Gallery Animation
  initFadeGallery()
}

// Initialize cool scroll animations
function initScrollAnimations() {
  // Create parallax effect for section backgrounds
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    // Parallax effect for sections
    document.querySelectorAll(".section").forEach((section, index) => {
      const speed = index % 2 === 0 ? 0.5 : 0.3
      const yPos = -(scrollPosition * speed)
      section.style.backgroundPosition = `center ${yPos}px`
    })

    // Floating elements animation
    document.querySelectorAll(".floating-element").forEach((element, index) => {
      const amplitude = 15 + index * 5
      const period = 0.002 + index * 0.0005
      const phase = index * 0.5
      const yPos = amplitude * Math.sin(scrollPosition * period + phase)
      element.style.transform = `translateY(${yPos}px)`
    })

    // Rotate elements on scroll
    document.querySelectorAll(".rotate-on-scroll").forEach((element, index) => {
      const rotationSpeed = 0.02 + index * 0.005
      const rotation = scrollPosition * rotationSpeed
      element.style.transform = `rotate(${rotation}deg)`
    })
  })

  // Add floating decorative elements to each section
  addFloatingElements()
}

// Add floating decorative elements
function addFloatingElements() {
  // Add floating hearts to section 1
  const section1 = document.getElementById("section1")
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div")
    heart.className = "floating-element heart"
    heart.style.left = `${Math.random() * 90 + 5}%`
    heart.style.top = `${Math.random() * 70 + 15}%`
    heart.style.animationDelay = `${Math.random() * 5}s`
    section1.appendChild(heart)
  }

  // Add floating circles to section 3
  const section3 = document.getElementById("section3")
  for (let i = 0; i < 7; i++) {
    const circle = document.createElement("div")
    circle.className = "floating-element circle"
    circle.style.left = `${Math.random() * 90 + 5}%`
    circle.style.top = `${Math.random() * 70 + 15}%`
    circle.style.animationDelay = `${Math.random() * 5}s`
    section3.appendChild(circle)
  }

  // Add rotating stars to section 5
  const section5 = document.getElementById("section5")
  for (let i = 0; i < 6; i++) {
    const star = document.createElement("div")
    star.className = "rotate-on-scroll star"
    star.style.left = `${Math.random() * 90 + 5}%`
    star.style.top = `${Math.random() * 70 + 15}%`
    section5.appendChild(star)
  }
}

// Initialize scroll progress indicator
function initScrollProgressIndicator() {
  // Create progress bar element
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress-bar"
  document.body.appendChild(progressBar)

  // Update progress bar on scroll
  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    progressBar.style.width = scrolled + "%"
  })
}

// Fade Gallery functionality for Section 5
function initFadeGallery() {
  const items = document.querySelectorAll(".fade-item")
  if (items.length === 0) return

  let currentIndex = 0

  // Show first item
  items[0].classList.add("active")

  // Function to change active item
  function changeItem() {
    // Hide current item
    items[currentIndex].classList.remove("active")

    // Update index
    currentIndex = (currentIndex + 1) % items.length

    // Show next item
    items[currentIndex].classList.add("active")
  }

  // Change item every 5 seconds
  setInterval(changeItem, 2000)
}

// Smooth scrolling for navigation links with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      // Add a class to the target section for a special entrance animation
      targetElement.classList.add("section-highlight")

      // Remove the class after animation completes
      setTimeout(() => {
        targetElement.classList.remove("section-highlight")
      }, 1500)

      // Smooth scroll to the section
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for navbar height
        behavior: "smooth",
      })
    }
  })
})

// Add random rotation to polaroid items
document.querySelectorAll(".polaroid-card").forEach((item) => {
  const randomRotation = Math.random() * 6 - 3
  item.style.setProperty("--rotation", `${randomRotation}deg`)
})

// Add 3D tilt effect to photo cards
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    const mouseX = e.clientX - cardCenterX
    const mouseY = e.clientY - cardCenterY

    const rotateY = mouseX / 10
    const rotateX = -mouseY / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
  })
})

document.querySelectorAll('a[href="index.html"]').forEach((logoutLink) => {
  logoutLink.addEventListener("click", async (e) => {
    e.preventDefault()
    const authToken = sessionStorage.getItem("authToken")
    if (authToken) {
      try {
        await fetch("/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        })
      } catch (err) {
        // Optionally handle error
        console.error("Logout failed:", err)
      }
    }
    // Clear token on logout
    sessionStorage.removeItem("authToken")
    window.location.href = "index.html"
  })
})