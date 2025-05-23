// Import animejs (if you're using a module system)
// import anime from 'animejs/lib/anime.es.js';

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  // Create animated particles for login background
  createParticles()

  // Login functionality with validation
  const loginButton = document.getElementById("login-button")
  loginButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Replace with your real API endpoint
    try {
      const response = await fetch("https://auth.cornercabin.net/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok && data.token) {
        // Store token in sessionStorage
        sessionStorage.setItem("authToken", data.token)
        document.querySelector(".login-form").innerHTML =
          '<div class="alert alert-success">Login successful! Redirecting...</div>'
        setTimeout(() => {
          window.location.href = "landing.html"
        }, 1000)
      } else {
        throw new Error(data.message || "Invalid username or password!")
      }
    } catch (err) {
      // Show error message
      const errorMsg = document.createElement("div")
      errorMsg.className = "alert alert-danger mt-3"
      errorMsg.textContent = err.message
      const existingError = document.querySelector(".alert-danger")
      if (existingError) existingError.remove()
      document.querySelector(".login-form").appendChild(errorMsg)
      anime({
        targets: ".login-card",
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 500,
        easing: "easeInOutQuad",
      })
    }
  })

  // Trigger login on Enter key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      loginButton.click()
    }
  })
})

// Create animated particles for the login background
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  if (!particlesContainer) return

  const particleCount = 30 // Reduced number of particles

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    // Random size - smaller particles
    const size = Math.random() * 3 + 1

    // Random animation duration - slower
    const duration = Math.random() * 30 + 15

    // Set styles - more transparent
    particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
    `

    // Add animation - slower and more subtle
    anime({
      targets: particle,
      translateX: anime.random(-50, 50),
      translateY: anime.random(-50, 50),
      opacity: [0.4, 0, 0.4],
      scale: [1, 1.2, 1],
      easing: "easeInOutQuad",
      duration: duration * 1000,
      loop: true,
      direction: "alternate",
    })

    particlesContainer.appendChild(particle)
  }
}
