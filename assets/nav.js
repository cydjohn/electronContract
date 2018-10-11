const settings = require('electron-settings')

document.body.addEventListener('click', (event) => {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
})

function handleSectionTrigger(event) {
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add('is-selected')

  // Display the current section
  const sectionId = `${event.target.dataset.section}-section`
  document.getElementById(sectionId).classList.add('is-shown')

  // Save currently active button in localStorage
  const buttonId = event.target.getAttribute('id')
  settings.set('activeSectionButtonId', buttonId)
}

function activateDefaultSection() {
  document.getElementById('button-new-loan').click()
}

function showMainContent() {
  document.querySelector('.js-nav').classList.add('is-shown')
  document.querySelector('.js-content').classList.add('is-shown')
}

function handleModalTrigger(event) {
  hideAllModals()
  const modalId = `${event.target.dataset.modal}-modal`
  document.getElementById(modalId).classList.add('is-shown')
}

function hideAllModals() {
  const modals = document.querySelectorAll('.modal.is-shown')
  Array.prototype.forEach.call(modals, (modal) => {
    modal.classList.remove('is-shown')
  })
  showMainContent()
}

function hideAllSectionsAndDeselectButtons() {
  const sections = document.querySelectorAll('.js-section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })

  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, (button) => {
    button.classList.remove('is-selected')
  })
}

function displayAbout() {
  document.querySelector('#about-modal').classList.add('is-shown')
}

// Default to the view that was active the last time the app was open
const sectionId = settings.get('activeSectionButtonId')

const passwordMess = document.getElementById('wrongPass')
passwordMess.hidden = true

let canLogin = false
let pass = document.getElementById('pass')
const loginButton = document.getElementById('get-started')
loginButton.addEventListener('click', () => {
  if (pass.value == "123456") {
    canLogin = true
    document.querySelector('#about-modal').remove('is-shown')
    document.getElementById('bootstrap').innerHTML = '<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">'
    showMainContent()
    const section = document.getElementById(sectionId)
    if (section) section.click()
  }
  else {
    passwordMess.hidden = false
  }
})


if (sectionId && canLogin) {
  showMainContent()
  const section = document.getElementById(sectionId)
  if (section) section.click()
} else {
  displayAbout()
  activateDefaultSection()
}
