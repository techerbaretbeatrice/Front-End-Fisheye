// ouvrir la modale
function modalOpen () {
  const modalContact = document.getElementById('contact_modal')
  modalContact.style.display = 'flex'
  const bodyScreen = document.getElementById('body_screen')
  bodyScreen.style.display = 'flex'
}

// fermer la modale
function modalClose () {
  const modalContact = document.getElementById('contact_modal')
  modalContact.style.display = 'none'
  const bodyScreen = document.getElementById('body_screen')
  bodyScreen.style.display = 'none'
}

// fonction affichant la modale et son contenu
const displayForm = (photographer) => {
  const modalHeader = ModalHeader(photographer)
  const modalContact = document.getElementById('contact_modal')
  modalContact.setAttribute('tabindex', '0')
  modalContact.setAttribute('aria-description', 'formulaire de contact photographe')
  modalContact.setAttribute('aria-label', 'form')
  modalContact.appendChild(modalHeader)
}

// creation de l'entête du formulaire de contact
const ModalHeader = (photographer) => {
  const modalHeader = document.createElement('div')
  modalHeader.setAttribute('class', 'modal_header')
  const titleHeader = document.createElement('h1')
  titleHeader.setAttribute('class', 'title_header')
  modalHeader.appendChild(titleHeader)
  const titlefirstline = 'Contactez-moi '
  titleHeader.innerHTML = titlefirstline.concat(`${photographer.name}`)

  return modalHeader
}
// creation du formulaire de contact
const ContactForm = () => {
  const form = document.createElement('form')
  form.setAttribute('id', 'form')
  const formField = document.createElement('div')
  formField.setAttribute('id', 'form_field')
  form.appendChild(formField)
  const labelName = document.createElement('label')
  formField.appendChild(labelName)
  labelName.textContent = 'Nom'
  labelName.setAttribute('for', 'input-name')
  const inputName = document.createElement('input')
  inputName.setAttribute('id', 'input-name')
  inputName.setAttribute('name', 'lastname')
  formField.appendChild(inputName)
  const labelFirst = document.createElement('label')
  formField.appendChild(labelFirst)
  labelFirst.textContent = 'Prénom'
  labelFirst.setAttribute('for', 'input-first')
  const inputFirst = document.createElement('input')
  inputFirst.setAttribute('name', 'firstname')
  inputFirst.setAttribute('id', 'input-first')
  formField.appendChild(inputFirst)
  const labelEmail = document.createElement('label')
  formField.appendChild(labelEmail)
  labelEmail.textContent = 'Email'
  labelEmail.setAttribute('for', 'email')
  const inputEmail = document.createElement('input')
  inputEmail.setAttribute('name', 'email')
  inputEmail.setAttribute('id', 'email')
  formField.appendChild(inputEmail)
  const labelText = document.createElement('label')
  formField.appendChild(labelText)
  labelText.textContent = 'Message'
  labelText.setAttribute('for', 'input-text')
  const inputText = document.createElement('textarea')
  inputText.setAttribute('id', 'input-text')
  inputText.setAttribute('name', 'message')
  formField.appendChild(inputText)
  const sendButton = document.createElement('button')
  sendButton.setAttribute('class', ' send_button')
  sendButton.textContent = 'Envoyer'
  formField.appendChild(sendButton)

  // récupération des données du formulaire dans la console
  form.addEventListener('submit', submitForm)

  function submitForm (event) {
    event.preventDefault()

    form.reset()
  }

  return form
}

// eslint-disable-next-line no-unused-vars
const ModalForm = (photographer) => {
  const contactButton = document.getElementById('contact-button')
  const modalContact = document.getElementById('contact_modal')
  modalContact.setAttribute('class', 'modal')
  const closeButton = document.createElement('button')
  const closeImg = document.createElement('img')
  closeButton.setAttribute('id', 'close_button')
  closeButton.setAttribute('type', 'image')
  closeImg.setAttribute('alt', 'fermer formulaire de contact')
  closeImg.src = 'assets/icons/xmark-white.svg'
  closeButton.appendChild(closeImg)
  modalContact.appendChild(closeButton)

  contactButton.addEventListener('click', modalOpen)
  closeButton.addEventListener('click', modalClose)

  displayForm(photographer)

  modalContact.appendChild(ContactForm())
}
