/**
 * la lightbox
 * - un ensemble d'image 
 * - affichage successif d'une image
 * - la possibilité d'avancer et de reculer au clavier ou avec les icones
 * - la possibilité d'afficher et de cacher la lightbox: en cliquant sur une photo / cacher en cliquant sur l'icone croix
 * objectif: ecrire la lightbox sous forme de classe
 * methodes :
 * - previous
 * - next
 * - open avec la liste des media, et l'index du media sur lequel le clic a ete fait
 * - close
 */

/**
 * etape 1 
 * - creer la classe
 * - instancier la lightbox dans displayMedias
 * - pour chaque mediaBox, on ajout l'évènement au click qui appelera la method open de la lightbox
 * resultat attendu: console log de la liste des medias et de l'index du media qui a genere l'évènement
 */

class LightBoxSingleton {
    constructor() {
        this.lightBoxModal = document.createElement('div')
        this.lightBoxModal.setAttribute("id", "lightbox-modal")
        this.lightBoxContainer = document.createElement('div')
        this.lightBoxContainer.setAttribute("id", "lightbox-container")
        this.iconPrevious = document.createElement('img')
        this.iconPrevious.setAttribute("id", "icon-previous")
        this.iconPrevious.src = "assets/icons/angle-left-solid.svg"
        this.iconNext = document.createElement('img')
        this.iconNext.setAttribute("id", "icon-next")
        this.iconNext.src = "assets/icons/angle-right-solid.svg"
        this.iconClose = document.createElement('img')
        this.iconClose.setAttribute("id", "icon-close")
        this.iconClose.src = "assets/icons/close-red.svg"
        this.mediaLightBox = document.createElement('div')
        this.mediaLightBox.setAttribute("id", "media-lightbox")
        this.iconNext.addEventListener("click", () => {
            LightBox.getInstance().next()
        })

        this.iconPrevious.addEventListener("click", () => {
            LightBox.getInstance().previous()
        })
        this.iconClose.addEventListener("click", () => {
            LightBox.getInstance().close()
        })

        window.addEventListener("keydown",(event)=>{
            if(event.code === "ArrowRight"){
                LightBox.getInstance().next()
            }
            if(event.code === "ArrowLeft"){
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

    getInstance() {
        if (LightBox.instance) return LightBox.instance
        LightBox.instance = new LightBoxSingleton()
        return LightBox.instance
    }

    previous() {
        if (LightBox.getInstance().index > 0) {
            LightBox.getInstance().index--
        } else {
            LightBox.getInstance().index = LightBox.getInstance().medias.length - 1
        }

        LightBox.getInstance().displayMedia()

    }

    next() {
        if (LightBox.getInstance().medias.length - 1 > LightBox.getInstance().index) {
            LightBox.getInstance().index++
        } else {
            LightBox.getInstance().index = 0
        }

        LightBox.getInstance().displayMedia()

    }

    open(medias, index) {
        LightBox.getInstance().index = Number(index)
        LightBox.getInstance().medias = medias

        document.body.appendChild(LightBox.getInstance().lightBoxModal)

        LightBox.getInstance().displayMedia()

        console.log(medias)
        console.log(index)
    }
    displayMedia() {
        const currentMedia = LightBox.getInstance().medias[LightBox.getInstance().index]
        let mediaElement = CurrentMedia(currentMedia)

        const titleElement = document.createElement('h2')
        titleElement.setAttribute("id", "title-element")
        titleElement.textContent = currentMedia.title

        LightBox.getInstance().mediaLightBox.textContent = ""
        LightBox.getInstance().mediaLightBox.appendChild(mediaElement)
        LightBox.getInstance().mediaLightBox.appendChild(titleElement)

    }

    close() {
        LightBox.getInstance().lightBoxModal.remove()
    }

}


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
    mediaElement.setAttribute("class", "media-element")
    mediaElement.src = `assets/images/${Number(photographerId)}/${media.video}`

    return mediaElement
}

const ImageMedia = (media) => {
    mediaElement = document.createElement('img')
    mediaElement.setAttribute("class", "media-element")
    mediaElement.src = `assets/images/${Number(photographerId)}/${media.image}`

    return mediaElement
}

const LightBox = new LightBoxSingleton()