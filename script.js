const body = document.body
const header = document.querySelector('[data-header]')
const progress = document.querySelector('#scroll-progress')
const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-nav')
const themeToggle = document.querySelector('.theme-toggle')

const setTheme = (theme) => {
  body.classList.toggle('light', theme === 'light')
  body.classList.toggle('dark', theme !== 'light')
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme')
  localStorage.setItem('portfolio-theme', theme)
}

setTheme(localStorage.getItem('portfolio-theme') || 'dark')
themeToggle.addEventListener('click', () => setTheme(body.classList.contains('light') ? 'dark' : 'light'))

const closeMenu = () => {
  nav.classList.remove('is-open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Open navigation menu')
}

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
})
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu()
})

const updateScrollState = () => {
  const scrollTop = window.scrollY
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight
  progress.style.width = `${scrollRange ? (scrollTop / scrollRange) * 100 : 0}%`
  header.classList.toggle('is-scrolled', scrollTop > 30)
  document.querySelector('.back-to-top').classList.toggle('is-visible', scrollTop > 500)
}
window.addEventListener('scroll', updateScrollState, { passive: true })
window.addEventListener('resize', updateScrollState)
updateScrollState()

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12, rootMargin: '0px 0px -30px' })
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')]
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`
        link.classList.toggle('is-active', active)
        if (active) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }
  })
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 })
sectionLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'))
  if (section) sectionObserver.observe(section)
})

const filterButtons = document.querySelectorAll('.filter-button')
const projects = document.querySelectorAll('.project-card')
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
const textNodes = []
let currentTextNode
while ((currentTextNode = textWalker.nextNode())) textNodes.push(currentTextNode)
textNodes.forEach((node) => {
  if (/^\s*\+\s*$/.test(node.textContent)) node.remove()
})
filterButtons.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('is-active')))
  button.addEventListener('click', () => {
    const filter = button.dataset.filter
    filterButtons.forEach((item) => {
      const active = item === button
      item.classList.toggle('is-active', active)
      item.setAttribute('aria-pressed', String(active))
    })
    projects.forEach((project) => {
      const categories = project.dataset.category.split(' ')
      const hidden = filter !== 'all' && !categories.includes(filter)
      project.classList.toggle('is-hidden', hidden)
    })
  })
})
