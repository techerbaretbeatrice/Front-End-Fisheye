//on récupère l'id de chaque photographe dans l'url de la page phototographe
const params = (new URL(document.location)).searchParams;
const photographerId = params.get('photographer');
const order = params.get('order')
console.info(photographerId)

//
const displayPhotographer = () => {
    const data = fetchData()
    const photographers = data.photographers // utiliser find()
    const photographer = photographers.find(photographer => photographer.id === Number(photographerId))
    console.log(photographer)
    const infoCard = InfoCard(photographer)
    document.getElementById('photographer_main').appendChild(infoCard)
    ModalForm(photographer)
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
    infoCard.setAttribute("class", "photographer_infos")
    console.log(infoCard)
    const infoBox = document.createElement('div')
    infoBox.setAttribute("class", "info_box")
    const title = Title(photographer)
    const details = Details(photographer)
    infoBox.appendChild(title)
    infoBox.appendChild(details)
    const contactButton = ContactButton(photographer)
    const photo = Photo(photographer)
    const contactModal = document.createElement("div")
    contactModal.setAttribute("id", "contact_modal")

    infoCard.appendChild(infoBox)
    infoCard.appendChild(contactButton)
    infoCard.appendChild(photo)
    infoCard.appendChild(contactModal)
    console.log(infoCard)

    return infoCard

}
//permet de retourner le nom 
const Title = (photographer) => {
    const title = document.createElement('h2')
    title.setAttribute("class", "photographer_name name--size")
    title.textContent = photographer.name
    console.log(title)
    return title;

}
//permet de retourner les infos ville ...
const Details = (photographer) => {
    const details = document.createElement('div')
    details.setAttribute("class", "photographer--info")
    details.innerHTML = `
    <p class="photographer--city ">${photographer.city}
    </p>
    <br>
    <p class="tagline">${photographer.tagline}</p> 
`
    return details;
}

//permet de retourner le bouton contact
const ContactButton = (photographer) => {
    const contactButton = document.createElement('button')
    contactButton.setAttribute("id", "contact-button")
    contactButton.setAttribute("class", "contact_button")
    contactButton.textContent = "Contactez-moi"

    return contactButton
}

//permet de retourner la photo 
const Photo = (photographer) => {
    const photo = document.createElement('img')
    photo.setAttribute("class", "photographer_img")
    console.info(photographer)
    photo.src = `assets/photographers/${photographer.portrait}`
    return photo;
}


displayPhotographer()



//créer en utilisant la méthode filter une fonction qui récupère dans les média les photos selon l'id du photographe 
//afin de pouvoir afficher sa liste de photos
const displayMedia = () => {
    const data = fetchData()
    const media = data.media
    const photographer =  data.photographers.find(photographer => photographer.id === Number(photographerId))
    console.log(photographer)
    const medias = media
        .filter(medias => medias.photographerId === Number(photographerId))
        .sort((a, b) => {
            console.log("a", a)
            console.log("b", b)
            console.log("comparaison like", a.likes < b.likes)
            switch (order) {
                case 'popularity': 
                    if (a.likes < b.likes) return 1;
                    if (a.likes >= b.likes) return -1;   
                  break;
                case 'date':
                    if (a.date < b.date) return -1 ;
                    if (a.date >= b.date) return 1 ;
         
                  break
         
                case 'title':
                    if (a.title < b.title) return -1;
                    if (a.title >= b.title) return 1;
               
                 break;
                
                 default:
         
                 break;
              }
        })
        console.log(medias.likes)
      
    //* fonction
    // * - selon la valeur de `order`:
     //* retourner la comparaison de 
     //*   - la date
     //*   - la popularite
     //*   - le titre
     //* dans sort, les parametres sont 
    
     
    console.log(medias)
    const mediaAll = document.createElement('section')
    mediaAll.setAttribute("class", "media_all")
    document.getElementById('photographer_main').appendChild(mediaAll)
    const mediaContainer = document.createElement('div')
    mediaContainer.setAttribute("class", "media_container")
    mediaAll.appendChild(mediaContainer)
    const filterContainer = document.createElement('div')
    filterContainer.setAttribute("class", "filter_container");
    const filterHead = document.createElement('label')
    filterHead.setAttribute("class","filter_head")
    filterContainer.appendChild(filterHead)
    filterHead.textContent = "Trier par"
    filterContainer.appendChild(SortSelect())
    mediaAll.appendChild(filterContainer);
    console.log(filterContainer);
    mediaContainer.appendChild(StaticInfos(medias, photographer))
    for (let media of medias) {
        const mediaBox = MediaBox(media)
        mediaContainer.appendChild(mediaBox)
        console.log(mediaBox)
    }

}

const StaticInfos = (medias, photographer) => {
    const staticInfos = document.createElement('div')
    staticInfos.setAttribute("class", "static_infos")
    const infosLikes = document.createElement('div')
    infosLikes.setAttribute("class","infos_likes")
    staticInfos.appendChild(infosLikes)
    console.log(infosLikes)
    const likes = document.createElement('img')
    likes.setAttribute("class","likes")
    infosLikes.appendChild(likes)
    const totalLikes = medias.reduce(
        (previousValue, currentValue) => previousValue + currentValue.likes, 
        0
    );
    console.log(totalLikes)
    staticInfos.textContent = totalLikes
    // faire la somme des likes par media
    // Array.reduce sur medias
    // const totalLikes = medias.reduce .... https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return staticInfos;
}

const MediaBox = (media) => {
    const mediaBox = document.createElement('div')
    mediaBox.setAttribute("class", "media_box")
    const photoBox = document.createElement('div')
    photoBox.setAttribute("class", "photo_box")
    const photoParameters = document.createElement('div')
    photoParameters.setAttribute("class", "photo_parameters")
    const photoMedia = PhotoMedia(media)
    const photoDescription = PhotoDescription(media)
    const numberOfLike = NumberOfLike(media)


    mediaBox.appendChild(photoBox)
    mediaBox.appendChild(photoParameters)
    photoParameters.appendChild(photoDescription)
    photoParameters.appendChild(numberOfLike)
    photoBox.appendChild(photoMedia)

    return mediaBox
}

const PhotoMedia = (media) => {
    const photoMedia = document.createElement('img')
    photoMedia.setAttribute("class", "photo_media")
    photoMedia.src = `assets/images/${media.photographerId}/${media.image}`

    return photoMedia
}

const PhotoDescription = (media) => {
    const photoDescription = document.createElement('h4')
    photoDescription.setAttribute("class", "photo_description")
    photoDescription.textContent = media.title

    return photoDescription
}
// pqasser le nombre
// passer un fonction callback onclick
const NumberOfLike = (media) => {
    const likeContainer = document.createElement("div")
    likeContainer.setAttribute("class","like_container")
    const numberOfLike = document.createElement('span')
    numberOfLike.setAttribute("class", "number_of_like")
    numberOfLike.textContent = media.likes
    const iconLike = document.createElement('img')
    iconLike.setAttribute("class", "icon_like")
    iconLike.src = "assets/icons/heart-solid.svg"
    likeContainer.appendChild(numberOfLike)
    likeContainer.appendChild(iconLike)
    iconLike.addEventListener("click", () => {
        media.likes++
        numberOfLike.textContent = media.likes
    })
    return likeContainer

}

const SortSelect = () => {
    const selectContainer = document.createElement('div')
    selectContainer.setAttribute("class", "select_container")
    const angleOpen = document.createElement('img')
    const angleClose = document.createElement('img')
    angleClose.setAttribute("class","angle_close")
    angleClose.src = "assets/icons/angle-up-white.svg"

    angleOpen.src = "assets/icons/angle-down-white.svg"
    angleOpen.setAttribute("class","angle_open")
    const selectList = document.createElement('nav')
    selectList.setAttribute("class", "select_list")
    const popularity = document.createElement('a')
    popularity.setAttribute("class","popularity")
    const date = document.createElement('a')
    date.setAttribute("class", "date")
    const title = document.createElement('a')
    title.setAttribute("class","title")
    popularity.textContent = 'Popularité'
    popularity.href = `photographer.html?photographer=${photographerId}&order=popularity`
    date.textContent = 'Date'
    date.href = `photographer.html?photographer=${photographerId}&order=date`
    title.textContent = 'titre'
    title.href = `photographer.html?photographer=${photographerId}&order=title`
    selectList.appendChild(popularity)
    selectList.appendChild(date)
    selectList.appendChild(title)
    selectContainer.appendChild(selectList)
    selectContainer.appendChild(angleOpen)
    selectContainer.appendChild(angleClose)
    
    
  

    angleOpen.addEventListener("click",openSelectContainer)

     function openSelectContainer () {
      
        date.style.display = "block";
        title.style.display = "block";
        angleOpen.style.display= "none";
        angleClose.style.display = "flex";
       
     }

     angleClose.addEventListener("click",closeSelectContainer)

     function closeSelectContainer() {
        date.style.display = "none";
        title.style.display = "none";
        angleClose.style.display = "none";
        angleOpen.style.display = "flex"
     }
   

   
   

    return selectContainer;
}

displayMedia()





