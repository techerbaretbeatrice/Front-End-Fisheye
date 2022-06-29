/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */
/**
 * la lightbox
 * - un ensemble d'image
 * - affichage successif d'une image
 * - la possibilité d'avancer et de reculer au clavier ou avec les icones
 * - la possibilité d'afficher et de cacher la lightbox: en cliquant sur une photo / cacher en cliquant sur l'icone croix
 * objectif: ecrire la lightbox sous forme de classe
 * methodes :
 * -getinstance
 * - previous
 * - next
 * - open avec la liste des media, et l'index du media sur lequel le clic a ete fait
 * - close
 * - displayMedia
 */

class LightBoxSingleton {
  constructor () {
    this.lightBoxModal = document.createElement('div')
    this.lightBoxModal.setAttribute('id', 'lightbox-modal')
    this.lightBoxContainer = document.createElement('div')
    this.lightBoxContainer.setAttribute('id', 'lightbox-container')
    this.lightBoxContainer.setAttribute('aria-label', 'image closeup view')
    this.iconPrevious = document.createElement('input')
    this.iconPrevious.setAttribute('id', 'icon-previous')
    this.iconPrevious.setAttribute('type', 'image')
    this.iconPrevious.src = 'assets/icons/angle-left-solid.svg'
    this.iconPrevious.setAttribute('alt', 'previous image')
    this.iconNext = document.createElement('input')
    this.iconNext.setAttribute('id', 'icon-next')
    this.iconNext.setAttribute('type', 'image')
    this.iconNext.src = 'assets/icons/angle-right-solid.svg'
    this.iconNext.setAttribute('alt', 'next image')
    this.iconClose = document.createElement('input')
    this.iconClose.setAttribute('id', 'icon-close')
    this.iconClose.setAttribute('type', 'image')
    this.iconClose.src = 'assets/icons/close-red.svg'
    this.iconClose.setAttribute('alt', 'close dialog')
    this.mediaLightBox = document.createElement('div')
    this.mediaLightBox.setAttribute('id', 'media-lightbox')
    this.iconNext.addEventListener('click', () => {
      LightBox.getInstance().next()
    })

    this.iconPrevious.addEventListener('click', () => {
      LightBox.getInstance().previous()
    })
    this.iconClose.addEventListener('click', () => {
      LightBox.getInstance().close()
    })

    // navigation au clavier
    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        LightBox.getInstance().next()
      }
      if (event.code === 'ArrowLeft') {
        LightBox.getInstance().previous()
      }
    })

    this.index = 0
    this.medias = []

    this.lightBoxModal.appendChild(this.lightBoxContainer)
    this.lightBoxContainer.appendChild(this.iconPrevious)
    this.lightBoxContainer.appendChild(this.iconNext)
    this.lightBoxContainer.appendChild(this.iconClose)
    this.lightBoxContainer.appendChild(this.mediaLightBox)
  }

  getInstance () {
    if (LightBox.instance) return LightBox.instance
    LightBox.instance = new LightBoxSingleton()
    return LightBox.instance
  }

  previous () {
    if (LightBox.getInstance().index > 0) {
      LightBox.getInstance().index--
    } else {
      LightBox.getInstance().index = LightBox.getInstance().medias.length - 1
    }

    LightBox.getInstance().displayMedia()
  }

  next () {
    if (LightBox.getInstance().medias.length - 1 > LightBox.getInstance().index) {
      LightBox.getInstance().index++
    } else {
      LightBox.getInstance().index = 0
    }

    LightBox.getInstance().displayMedia()
  }

  open (medias, index) {
    LightBox.getInstance().index = Number(index)
    LightBox.getInstance().medias = medias

    document.body.appendChild(LightBox.getInstance().lightBoxModal)

    LightBox.getInstance().displayMedia()
  }
  displayMedia () {
    const currentMedia = LightBox.getInstance().medias[LightBox.getInstance().index]
    const mediaElement = CurrentMedia(currentMedia)

    const titleElement = document.createElement('h2')
    titleElement.setAttribute('id', 'title-element')
    titleElement.textContent = currentMedia.title

    LightBox.getInstance().mediaLightBox.textContent = ''
    LightBox.getInstance().mediaLightBox.appendChild(mediaElement)
    LightBox.getInstance().mediaLightBox.appendChild(titleElement)
  }

  close () {
    LightBox.getInstance().lightBoxModal.remove()
  }
}

// pattern factory permettant d' afficher le media selon sa nature (video ou photo)
const CurrentMedia = (media) => {
  if (media.image) {
    return ImageMedia(media)
  }
  if (media.video) {
    return VideoPlayer(media)
  }
}

const VideoPlayer = (media) => {
  mediaElement = document.createElement('video')
  mediaElement.setAttribute('class', 'media-element')
  mediaElement.setAttribute('controls', 'true')
  mediaElement.src = `assets/images/${Number(photographerId)}/${media.video}`

  return mediaElement
}

const ImageMedia = (media) => {
  mediaElement = document.createElement('img')
  mediaElement.setAttribute('class', 'media-element')
  mediaElement.src = `assets/images/${Number(photographerId)}/${media.image}`

  return mediaElement
}

const LightBox = new LightBoxSingleton()
