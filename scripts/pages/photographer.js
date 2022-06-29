// on récupère l'id de chaque photographe dans l'url de la page phototographe
const params = (new URL(document.location)).searchParams
const photographerId = params.get('photographer')
const order = params.get('order')
console.info(photographerId)

// permet de récupérer et afficher les datas
const displayPhotographer = async () => {
  // eslint-disable-next-line no-undef
  const data = await fetchData()
  const photographers = data.photographers // utiliser find()
  const photographer = photographers.find(photographer => photographer.id === Number(photographerId))
  console.log(photographer)
  const infoCard = InfoCard(photographer)
  document.getElementById('photographer_main').appendChild(infoCard)
  // eslint-disable-next-line no-undef
  ModalForm(photographer)
  console.log(infoCard)
}

// on créer la fonction qui permet de retourner la card info de la page photographe
// qui contient une descrition, un bouton contact et la photo du photographe
const InfoCard = (photographer) => {
  const infoCard = document.createElement('section')
  infoCard.setAttribute('class', 'photographer_infos')
  console.log(infoCard)
  const infoBox = document.createElement('div')
  infoBox.setAttribute('class', 'info_box')
  const title = Title(photographer)
  const details = Details(photographer)
  infoBox.appendChild(title)
  infoBox.appendChild(details)
  const contactButton = ContactButton(photographer)
  const photo = Photo(photographer)
  const contactModal = document.createElement('div')
  contactModal.setAttribute('id', 'contact_modal')

  infoCard.appendChild(infoBox)
  infoCard.appendChild(contactButton)
  infoCard.appendChild(photo)
  infoCard.appendChild(contactModal)
  console.log(infoCard)

  return infoCard
}
// permet de retourner le nom
const Title = (photographer) => {
  const title = document.createElement('h2')
  title.setAttribute('class', 'photographer_name name--size')
  title.setAttribute('tabindex', '0')
  title.textContent = photographer.name
  console.log(title)
  return title
}
// permet de retourner les infos ville ...
const Details = (photographer) => {
  const details = document.createElement('div')
  details.setAttribute('class', 'photographer--info')
  details.innerHTML = `
    <p class="photographer--city ">${photographer.city}
    </p>
    <br>
    <p id="tagline">${photographer.tagline}</p> 
`
  return details
}

// permet de retourner le bouton contact
const ContactButton = (photographer) => {
  const contactButton = document.createElement('button')
  contactButton.setAttribute('id', 'contact-button')
  contactButton.setAttribute('class', 'contact_button')
  contactButton.textContent = 'Contactez-moi'

  return contactButton
}

// permet de retourner la photo
const Photo = (photographer) => {
  const photo = document.createElement('img')
  photo.setAttribute('class', 'photographer_img')
  console.info(photographer)
  photo.src = `assets/photographers/${photographer.portrait}`
  photo.setAttribute('alt', photographer.name)
  return photo
}

displayPhotographer()

// créer en utilisant la méthode filter une fonction qui récupère dans les média les photos selon l'id du photographe
// afin de pouvoir afficher sa liste de photos
const displayMedia = async () => {
  // eslint-disable-next-line no-undef
  const data = await fetchData()
  const media = data.media
  const photographer = data.photographers.find(photographer => photographer.id === Number(photographerId))
  console.log(photographer)
  const medias = media
    .filter(medias => medias.photographerId === Number(photographerId))
    .sort((a, b) => {
      console.log('a', a)
      console.log('b', b)
      console.log('comparaison like', a.likes < b.likes)
      switch (order) {
        case 'popularity':
          if (a.likes < b.likes) return 1
          if (a.likes >= b.likes) return -1
          break
        case 'date':
          if (a.date < b.date) return -1
          if (a.date >= b.date) return 1

          break

        case 'title':
          if (a.title < b.title) return -1
          if (a.title >= b.title) return 1

          break

        default:
          return 1
      }
      return 1
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
  mediaAll.setAttribute('class', 'media_all')
  document.getElementById('photographer_main').appendChild(mediaAll)
  const mediaContainer = document.createElement('div')
  mediaContainer.setAttribute('class', 'media_container')
  mediaContainer.setAttribute('aria-description', 'liste des médias photos et vidéo')
  mediaContainer.setAttribute('role', 'listbox')
  mediaContainer.setAttribute('tabindex', '0')
  const filterContainer = document.createElement('div')
  filterContainer.setAttribute('class', 'filter_container')
  const filterHead = document.createElement('label')
  filterHead.setAttribute('class', 'filter_head')
  filterContainer.appendChild(filterHead)
  filterHead.textContent = 'Trier par'
  filterContainer.appendChild(SortSelect())
  mediaAll.appendChild(filterContainer)
  mediaAll.appendChild(mediaContainer)
  console.log(filterContainer)
  const staticInfos = StaticInfos(medias, photographer)
  mediaContainer.appendChild(staticInfos)

  // instancier la lightbox dans displayMedias
  //  pour chaque mediaBox, on ajout l'évènement au click qui appelera la method open de la lightbox
  // resultat attendu: console log de la liste des medias et de l'index du media qui a genere l'évènement
  for (const index in medias) {
    const media = medias[index]
    const mediaBox = MediaBox(media, (event) => {
      // eslint-disable-next-line no-undef
      LightBox.open(medias, index)
    })
    mediaContainer.appendChild(mediaBox)
    console.log(mediaBox)
  }
}
// faire la somme des likes par media
// Array.reduce sur medias
// const totalLikes = medias.reduce
const StaticInfos = (medias, photographer) => {
  const staticInfos = document.createElement('div')
  staticInfos.setAttribute('id', 'static_infos')
  staticInfos.setAttribute('tabindex', '0')
  staticInfos.setAttribute('aria-description', 'popularité et taux journalier moyen ')
  const infosLikes = document.createElement('div')
  infosLikes.setAttribute('class', 'infos_likes')
  const likes = document.createElement('img')
  likes.setAttribute('class', 'likes')
  likes.setAttribute('alt', 'like')
  likes.src = 'assets/icons/heart-solid-black.svg'
  const likeCount = document.createElement('div')
  likeCount.setAttribute('id', 'like_count')
  const photographerPrice = document.createElement('div')
  photographerPrice.setAttribute('class', 'photographer_price')
  infosLikes.appendChild(likeCount)
  staticInfos.appendChild(infosLikes)
  staticInfos.appendChild(photographerPrice)
  console.log(photographerPrice)
  console.log(infosLikes)
  infosLikes.appendChild(likes)
  const totalLikes = medias.reduce(
    (previousValue, currentValue) => previousValue + currentValue.likes,
    0
  )
  console.log(totalLikes)
  likeCount.textContent = totalLikes
  photographerPrice.textContent = `${photographer.price}€/jour`

  return staticInfos
}

// mediabox contient tous les paramètres du media (photoBox), son titre, le nombre de like qui peut être incrémenter
const MediaBox = (media, onclick) => {
  const mediaBox = document.createElement('div')
  mediaBox.setAttribute('class', 'media_box')
  const photoBoxLink = document.createElement('a')
  photoBoxLink.setAttribute('href', '#icon-next')
  const photoBox = document.createElement('div')
  photoBox.setAttribute('class', 'photo_box')
  photoBox.addEventListener('click', onclick)
  photoBoxLink.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      onclick()
    }
  })

  photoBox.setAttribute('role', 'option')
  const photoParameters = document.createElement('div')
  photoParameters.setAttribute('class', 'photo_parameters')
  // on appelle un composant abstrait ThumbnailMedia
  const thumbnailMedia = ThumbnailMedia(media)
  const photoDescription = PhotoDescription(media)
  const numberOfLike = NumberOfLike(media)
  mediaBox.appendChild(photoBoxLink)
  photoBoxLink.appendChild(photoBox)
  mediaBox.appendChild(photoParameters)
  photoParameters.appendChild(photoDescription)
  photoParameters.appendChild(numberOfLike)
  photoBox.appendChild(thumbnailMedia)

  return mediaBox
}

/**
 * pattern factory
 * ThumbnailMedia
 * va verifier si media.image exist => va retourner un PhotoMedia
 * sinon, si media.video exist => va retourner un VideoMedia
 */
const ThumbnailMedia = (media) => {
  if (media.image) {
    return PhotoMedia(media)
  }
  if (media.video) {
    return VideoMedia(media)
  }
}

const VideoMedia = (media) => {
  const videoMedia = document.createElement('video')
  videoMedia.setAttribute('class', 'video_media')
  videoMedia.setAttribute('controls', 'true')
  videoMedia.src = `assets/images/${media.photographerId}/${media.video}`
  videoMedia.setAttribute('alt', media.title)

  return videoMedia
}

const PhotoMedia = (media) => {
  const photoMedia = document.createElement('img')
  photoMedia.setAttribute('class', 'photo_media')
  photoMedia.src = `assets/images/${media.photographerId}/${media.image}`
  photoMedia.setAttribute('alt', media.title)

  return photoMedia
}

// titre du media
const PhotoDescription = (media) => {
  const photoDescription = document.createElement('h4')
  photoDescription.setAttribute('class', 'photo_description')
  photoDescription.textContent = media.title

  return photoDescription
}
// nombre de like qui peut-être incrémenter
const NumberOfLike = (media) => {
  const likeContainer = document.createElement('div')
  likeContainer.setAttribute('class', 'like_container')
  const numberOfLike = document.createElement('span')
  numberOfLike.setAttribute('class', 'number_of_like')
  numberOfLike.textContent = media.likes
  const iconLike = document.createElement('input')
  iconLike.setAttribute('class', 'icon_like')
  iconLike.setAttribute('type', 'image')
  iconLike.src = 'assets/icons/heart-solid.svg'
  iconLike.setAttribute('alt', 'iconlike')
  iconLike.setAttribute('aria-description', 'bouton jaime')
  likeContainer.appendChild(numberOfLike)
  likeContainer.appendChild(iconLike)
  iconLike.addEventListener('click', () => {
    media.likes++
    numberOfLike.textContent = media.likes
    const likeCount = document.getElementById('like_count')
    likeCount.textContent = Number(likeCount.textContent) + 1
  })
  return likeContainer
}

// selecteur par catégorie
const SortSelect = () => {
  let opened = false

  let selectTitle = 'Popularité'
  switch (order) {
    case 'popularity':
      selectTitle = 'Popularité'
      break

    case 'date':
      selectTitle = 'Date'
      break

    case 'title':
      selectTitle = 'titre'
      break

    default:
      selectTitle = 'Popularité'
      break
  }
  const selectContainer = document.createElement('div')
  selectContainer.setAttribute('id', 'select_container')
  selectContainer.setAttribute('role', 'listbox')
  selectContainer.setAttribute('tabindex', '0')
  selectContainer.setAttribute('aria-description', 'filtre média')
  const angleOpen = document.createElement('img')
  angleOpen.src = 'assets/icons/angle-down-white.svg'
  angleOpen.setAttribute('alt', 'ouverture et fermeture liste sélecteur')
  angleOpen.setAttribute('id', 'angle_open')
  angleOpen.setAttribute('role', 'button')
  angleOpen.setAttribute('ariahaspopup', 'listbox')
  angleOpen.setAttribute('tabindex', '0')
  const selectList = document.createElement('nav')
  selectList.setAttribute('aria-activedescendant', 'select-list')
  selectList.setAttribute('class', 'select_list')
  selectList.setAttribute('id', 'select-list')
  const itemSelect = document.createElement('a')
  itemSelect.setAttribute('class', 'item_select')
  itemSelect.textContent = selectTitle
  itemSelect.href = `photographer.html?photographer=${photographerId}&order=popularity`
  const popularity = document.createElement('a')
  popularity.setAttribute('class', 'popularity')
  popularity.setAttribute('role', 'option')
  const date = document.createElement('a')
  date.setAttribute('class', 'date')
  date.setAttribute('role', 'option')
  const title = document.createElement('a')
  title.setAttribute('class', 'title')
  title.setAttribute('role', 'option')
  popularity.textContent = 'Popularité'
  popularity.href = `photographer.html?photographer=${photographerId}&order=popularity`
  date.textContent = 'Date'
  date.href = `photographer.html?photographer=${photographerId}&order=date`
  title.textContent = 'titre'
  title.href = `photographer.html?photographer=${photographerId}&order=title`
  selectList.appendChild(angleOpen)
  selectList.appendChild(itemSelect)
  selectList.appendChild(popularity)
  selectList.appendChild(date)
  selectList.appendChild(title)
  selectContainer.appendChild(selectList)

  console.log(itemSelect)

  angleOpen.addEventListener('click', openSelectContainerControl)
  function openSelectContainerControl (ev) {
    if (opened) {
      opened = false
      angleOpen.style.transform = 'rotate(0deg)'
      date.style.display = 'none'
      title.style.display = 'none'
      popularity.style.display = 'none'
      itemSelect.style.display = 'flex'
    } else {
      opened = true
      angleOpen.style.transform = 'rotate(180deg)'
      date.style.display = 'flex'
      title.style.display = 'flex'
      popularity.style.display = 'flex'
      itemSelect.style.display = 'none'
    }
  }

  angleOpen.addEventListener('keypress', openSelectContainerKeyControl)
  function openSelectContainerKeyControl (ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      angleOpen.click()
    }
  }
  return selectContainer
}

displayMedia()
