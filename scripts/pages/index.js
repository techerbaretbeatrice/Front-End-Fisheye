const displayPhotographerList = () => {
    const data = fetchData()
    const photographers = data.photographers
    for (let photographer of photographers) {
        const card = Card(photographer)
        document.getElementById('main').appendChild(card)
    }

}

// Ne pas se focus sur cette methode
const fetchData = () => {
    return window.DATA
}

// cree une boite qui va contenir la card d'un photographe
// on lui passe un parametre photographe
const Card = (photographer) => {
    const card = document.createElement('div')
    card.setAttribute("class","photographer_card")
    const link = Link(photographer)
    const photo = Photo(photographer)
    const title = Title(photographer)
    const details = Details(photographer)
//
    link.appendChild(photo)
    link.appendChild(title)
    card.appendChild(link)
    card.appendChild(details)

    return card;
}

const Photo = (photographer) => {
    const photo = document.createElement('img')
    photo.setAttribute("class","photographer_img")
    console.info(photographer)
    // creer un lien qui contient assets/photographers/PORTRAIT
    photo.src = `assets/photographers/${photographer.portrait}`
    return photo;
}

const Link = (photographer) => {
    const link = document.createElement('a')
    link.href = `photographer.html?photographer=${photographer.id}`
    return link;
}

const Title = (photographer) => {
    const title = document.createElement('h2')
    title.setAttribute("class", "photographer_name")
    title.textContent = photographer.name
    return title;
}

const Details = (photographer) => {
    const details = document.createElement('div')
    details.setAttribute("class", "photographer_info")
    details.innerHTML =`
    <p class="photographer_city">${photographer.city}
    </p>
    <br>
    <p>${photographer.tagline}</p>
    <br>
    <p>${photographer.price}€/jour</p>
`
    return details;
}


displayPhotographerList()