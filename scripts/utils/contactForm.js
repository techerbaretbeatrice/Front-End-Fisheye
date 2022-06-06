

 function modalOpen () {
    const modalContact = document.getElementById("contact_modal");
    modalContact.style.display = "flex";
    const bodyScreen = document.getElementById('body_screen')
    bodyScreen.style.display = "flex"
    console.log(bodyScreen)


}

function modalClose () {
    const modalContact = document.getElementById("contact_modal");
    modalContact.style.display = "none"
    const bodyScreen = document.getElementById('body_screen')
    bodyScreen.style.display = "none"
    
    
}

//entête du formulaire contient un texte suivi du nom du photographe
const displayHeaderForm = (photographer) =>{
    const modalHeader = ModalHeader(photographer)
    const modalContact = document.getElementById("contact_modal");
    modalContact.appendChild(modalHeader)
}

const ModalHeader = (photographer) =>{
   const  modalHeader = document.createElement('div')
   modalHeader.setAttribute("class","modal_header")
   console.log(modalHeader)
   const titleHeader = document.createElement('h1')
   titleHeader.setAttribute("class", "title_header")
   modalHeader.appendChild(titleHeader)
   const titlefirstline = "Contactez-moi "
   titleHeader.innerHTML = titlefirstline.concat(`${photographer.name}`)

   return modalHeader
}

const ContactForm = () => {
    const form = document.createElement('form')
    form.setAttribute("id","form")
    const formField = document.createElement('div')
    formField.setAttribute("id","form_field")
    form.appendChild(formField)
    const labelName = document.createElement('label')
    formField.appendChild(labelName)
    labelName.textContent = "Nom"
    const inputName= document.createElement('input')
    inputName.setAttribute("name","lastname")
    formField.appendChild(inputName) 
    const labelFirst = document.createElement('label')
    formField.appendChild(labelFirst)
    labelFirst.textContent = "Prénom"
    const inputFirst= document.createElement('input')
    inputFirst.setAttribute("name","firstname")
    formField.appendChild(inputFirst)
    const labelEmail = document.createElement('label')
    formField.appendChild(labelEmail)
    labelEmail.textContent = "Email"
    const inputEmail= document.createElement('input')
    inputEmail.setAttribute("name","email")
    formField.appendChild(inputEmail) 
    const labelText = document.createElement('label')
    formField.appendChild(labelText)
    labelText.textContent = "Message"
    const inputText= document.createElement('textarea')
    inputText.setAttribute("class","input_text")
    inputText.setAttribute("name","message")
    formField.appendChild(inputText)
    const sendButton = document.createElement('button')
    sendButton.setAttribute("class"," send_button")
    sendButton.textContent = "Envoyer"
    formField.appendChild(sendButton)
    
    form.addEventListener("submit",submitForm)

    function submitForm (event) {
       event.preventDefault()
       console.log(event.currentTarget.lastname.value)
       console.log(event.currentTarget.firstname.value)
       console.log(event.currentTarget.email.value)
       console.log(event.currentTarget.message.value)
    
       form.reset()
    }
    
    return form;
}

const ModalForm = (photographer) => {
    const contactButton = document.getElementById("contact-button");
    const modalContact = document.getElementById("contact_modal");
    modalContact.setAttribute("class", "modal")
    const closeButton = document.createElement('img')
    closeButton.setAttribute("id","close_button")
    closeButton.src = "assets/icons/xmark-white.svg"
    modalContact.appendChild(closeButton)

    contactButton.addEventListener("click", modalOpen);
    closeButton.addEventListener("click", modalClose);
    
    displayHeaderForm(photographer)

    modalContact.appendChild(ContactForm())

}



      
