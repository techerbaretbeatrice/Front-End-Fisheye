

 function modalOpen () {
    const modalContact = document.getElementById("contact_modal");
    modalContact.style.display = "flex";

}

function modalClose () {
    const modalContact = document.getElementById("contact_modal");
    modalContact.style.display = "none"
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
    const label = document.createElement('label')
    const input= document.createElement('input')  
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
    // creer le header
    displayHeaderForm(photographer)
    // creer le formulaire

    modalContact.appendChild(ContactForm())

}



      
