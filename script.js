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
