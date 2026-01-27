const body = document.body
const btnTheme = document.querySelector('#btn-theme')
const btnHamburger = document.querySelector('.fa-bars')

// Initialize theme from localStorage or use default
const savedTheme = localStorage.getItem('portfolio-theme')
const savedIcon = localStorage.getItem('portfolio-btn-theme')

if (savedTheme && savedIcon) {
  body.classList.remove('light', 'dark')
  body.classList.add(savedTheme)
  btnTheme.className = `fas ${savedIcon}`
}

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, iconClass) => {
  // Remove both theme classes and add the new one
  body.classList.remove('light', 'dark')
  body.classList.add(bodyClass)
  
  // Update icon class while preserving 'fas'
  btnTheme.className = `fas ${iconClass}`
  
  // Save to localStorage
  localStorage.setItem('portfolio-theme', bodyClass)
  localStorage.setItem('portfolio-btn-theme', iconClass)
}

const toggleTheme = () => {
  if (isDark()) {
    setTheme('light', 'fa-moon')
  } else {
    setTheme('dark', 'fa-sun')
  }
}

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// Scroll progress bar
const updateProgress = () => {
  const bar = document.getElementById('scroll-progress')
  if (!bar) return
  const h = document.documentElement
  const scrollTop = h.scrollTop || body.scrollTop || 0
  const height = (h.scrollHeight - h.clientHeight) || 1
  const pct = Math.max(0, Math.min(100, (scrollTop / height) * 100))
  bar.style.width = pct + '%'
  
  // Header background on scroll
  const header = document.querySelector('.header');
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('load', updateProgress)
window.addEventListener('resize', updateProgress)
document.addEventListener('scroll', updateProgress)

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const animateOnScroll = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, index * 100)
      observer.unobserve(entry.target)
    }
  })
}

const observer = new IntersectionObserver(animateOnScroll, observerOptions)

// Observe all animated elements and reveal those already in view on load
const animatedElements = document.querySelectorAll('.project, .education, .experience, .skill-category')
animatedElements.forEach(el => observer.observe(el))

const revealIfInView = () => {
  animatedElements.forEach(el => {
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight - 50) {
      el.classList.add('visible')
    }
  })
}

window.addEventListener('load', revealIfInView)
window.addEventListener('resize', revealIfInView)

// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#60a5fa'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#60a5fa',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
})

  // Typed.js - rotating headline in the about section
  try {
    new Typed('.about__role', {
      strings: [
        'M.S. in Computer Science at The George Washington University.',
        'Backend Engineer · Distributed Systems',
        'Full‑Stack Developer · Cloud'
      ],
      typeSpeed: 40,
      backSpeed: 18,
      backDelay: 1400,
      smartBackspace: true,
      loop: true
    })
  } catch (e) {
    // Typed.js not loaded — safely ignore
  }

  // VanillaTilt - subtle depth effect on cards
  try {
    VanillaTilt.init(document.querySelectorAll('.project, .experience, .skill-category'), {
      max: 8,
      speed: 400,
      glare: false,
      scale: 1.03
    })
  } catch (e) {
    // VanillaTilt not loaded — safely ignore
  }

// Custom cursor removed

