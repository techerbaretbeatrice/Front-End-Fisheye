//on récupère l'id de chaque photographe dans l'url de la page phototographe
const params = (new URL(document.location)).searchParams;
const photographerId = params.get('photographer'); 
console.info(photographerId)

//
const displayPhotographer = () => {
    const data = fetchData()
    const photographers = data.photographers // utiliser find()
    const photographer = photographers.find(photographer => photographer.id === Number(photographerId))
    console.log(photographer)
    const infoCard = InfoCard(photographer)
    document.getElementById('photographer_main').appendChild(infoCard)
    console.log(infoCard)
}

// Ne pas se focus sur cette methode
const fetchData = () => {
    return window.DATA
}
//on créer la fonction qui permet de retourner la card info de la page photographe
//qui contient une descrition, un bouton contact et la photo du photographe
const InfoCard = (photographer) => {
    const infoCard = document.createElement('section')
    infoCard.setAttribute("class","photographer_infos")
    console.log(infoCard)
    const infoBox = document.createElement('div')
    infoBox.setAttribute("class","info_box")
    const title = Title(photographer)
    const details = Details(photographer)
    infoBox.appendChild(title)
    infoBox.appendChild(details)
    const contactButton = ContactButton(photographer)
    const photo = Photo(photographer)
    
    infoCard.appendChild(infoBox)
    infoCard.appendChild(contactButton)
    infoCard.appendChild(photo)
    console.log(infoCard)
    return infoCard
   
}
//permet de retourner le nom 
const Title = (photographer) =>{
    const title = document.createElement('h2')
    title.setAttribute("class", "photographer_name")
    title.textContent = photographer.name
    console.log(title)
    return title;
    
}
//permet de retourner les infos ville ...
const Details = (photographer) =>{
    const details = document.createElement('div')
    details.setAttribute("class", "photographer_info")
    details.innerHTML = `
    <p class="photographer_city">${photographer.city}
    </p>
    <br>
    <p>${photographer.tagline}</p> 
`
    return details;   
}

//permet de retourner le bouton contact
const ContactButton = (photographer) =>{
    const contactButton = document.createElement('button')
    contactButton.setAttribute("class" , "contact_button")
    contactButton.textContent = "Contactez-moi"

    return contactButton
}

//permet de retourner la photo
const Photo = (photographer) => {
    const photo = document.createElement('img')
    photo.setAttribute("class","photographer_img")
    console.info(photographer)
    photo.src = `assets/photographers/${photographer.portrait}`
    return photo;
}


displayPhotographer()

//créer en utilisant la méthode filter une fonction qui récupère dans les média les photos selon l'id du photographe 
//afin de pouvoir afficher sa liste de photos
const displayMedia = () =>{
    const data = fetchData()  
    const media = data.media
    const medias = media.filter(medias => medias.photographerId === Number(photographerId) )
    console.log(medias)
    for(let media of medias){
        const mediaBox = MediaBox(media)
    document.getElementById('photographer_main').appendChild(mediaBox)
    console.log(mediaBox)
    }
    
}

const MediaBox = (media) =>{
    const mediaBox = document.createElement('section')
    mediaBox.setAttribute("class", "media_box")
    const photoBox = document.createElement('div')
    photoBox.setAttribute("class", "photo_box")
    const photoParameters = document.createElement('div')
    photoParameters.setAttribute("class","photo_parameters")
    const photoMedia = PhotoMedia(media)
    const photoDescription = PhotoDescription(media)
    const numberOfLike = NumberOfLike(media)
    
    mediaBox.appendChild(photoBox)
    mediaBox.appendChild(photoParameters)
    photoBox.appendChild(photoMedia)
   // photoParameters.appendChild(photoDescription)
    //photoParameters.appendChild(numberOfLike)
    
    return mediaBox
}

const PhotoMedia = (media) =>{
  const photoMedia = document.createElement('img')
  photoMedia.setAttribute("class", "photo_media")
  photoMedia.src = `assets/images/${media.photographerId}/${media.image}`

  return photoMedia
}

const PhotoDescription = (media) =>{

}

const NumberOfLike = (media) =>{

}

displayMedia()

