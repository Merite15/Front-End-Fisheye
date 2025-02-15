/* 
eslint-disable no-undef 
*/
/* 
eslint-disable no-unused-vars 
*/

//Mettre le code JavaScript lié à la page photographer.html

/**
 * Fonction pour récupérer les photographes à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */
async function getPhotographer(id) {
  // Penser à remplacer par les données récupérées dans le json
  let photographers = [];

  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then(function (data) {
      photographers = data.photographers;
    });

  let photographer = null;

  for (let item in photographers) {
    if (id == photographers[item]["id"]) {
      photographer = photographers[item];
    }
  }

  // et bien retourner le tableau photographers seulement une fois
  return {
    photographer: photographer,
  };
}

/**
 * Fonction pour récupérer les photos à partir d'un json
 * @returns {Promise<{photographers: ({country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string}|{country: string, city: string, price: number, name: string, tagline: string, id: number, portrait: string})[]}>}
 */

async function getPhotos() {
  // Penser à remplacer par les données récupérées dans le json
  let photos = [];

  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then(function (data) {
      photos = data.media;
    });

  // et bien retourner le tableau photographers seulement une fois
  return {
    photos: [...photos],
  };
}

/**
 * Récupère les valeurs des photographes via Json et les affiche
 * @param photographer
 * @returns {Promise<void>}
 */
async function displayData(photographer) {
  document.getElementById("photographer__name").innerHTML = photographer.name;
  document.getElementById("photographer__localisation").innerHTML =
    photographer.city + ", " + photographer.country;
  document.getElementById("photographer__slogan").innerHTML =
    photographer.tagline;
  document
    .getElementById("photographer__image")
    .setAttribute("src", "assets/photographers/" + photographer.portrait);
  document
    .getElementById("photographer__image")
    .setAttribute("alt", photographer.name);
  document.getElementById("photograph-price").innerHTML = photographer.price;

  // Récupère la liste des photos et affiches celle du photographe courant
  const photosSection = document.querySelector(".section-gallery");

  const { photos } = await getPhotos();

  let count = 0;
  let position = 1;

  // Trier les photos par popularité (nombre de likes)
  photos.sort(function (a, b) {
    return b.likes - a.likes;
  });

  photos.forEach((photo) => {
    if (photo.photographerId === photographer.id) {
      count += photo.likes;
      const photoModel = photoFactory(photo, position);
      const photoCard = photoModel.getPhoto();
      photosSection.appendChild(photoCard);
      position += 1;
    }
  });

  document.getElementById("photograph-likes").innerHTML = count;
}

async function init() {
  // Récupère l'id du photographes courant
  let params = new URLSearchParams(document.location.search);
  let id = params.get("id");

  // Récupère les datas des photographes
  const { photographer } = await getPhotographer(id);
  displayData(photographer);
}

// Like img
function likePicture(element) {
  let count = parseInt(element.getAttribute("data-like"));
  let id = element.getAttribute("data-id");
  let total = parseInt(document.getElementById("photograph-likes").innerHTML);
  let current = parseInt(document.getElementById("like-" + id).innerHTML);
  let img = element.getElementsByTagName("img")[0];

  if (count === 1) {
    document.getElementById("photograph-likes").innerHTML = total + 1;
    document.getElementById("like-" + id).innerHTML = current + 1;
    element.setAttribute("data-like", 0);
    img.setAttribute("src", "assets/icons/dislike.svg");
  } else {
    document.getElementById("photograph-likes").innerHTML = total - 1;
    document.getElementById("like-" + id).innerHTML = current - 1;
    element.setAttribute("data-like", 1);
    img.setAttribute("src", "assets/icons/like.svg");
  }
}

function openGallery(object) {
  let img =
    object.getElementsByTagName("img")[0] ??
    object.getElementsByTagName("video")[0];
  let modal = document.getElementById("gallery_modal");

  if (img.getAttribute("data-type") == "img") {
    document.getElementById("gallery-video").classList.add("d-none");
    document.getElementById("gallery-img").classList.remove("d-none");
    document.getElementById("gallery-img").src = img.getAttribute("src");
    document.getElementById("gallery-img").setAttribute("alt", img.title);
  } else {
    document.getElementById("gallery-img").classList.add("d-none");
    document.getElementById("gallery-video").classList.remove("d-none");
    document.getElementById("gallery-video").src = img.getAttribute("src");
    document.getElementById("gallery-video").setAttribute("alt", img.title);
  }

  document.getElementById("gallery-title").innerHTML =
    img.getAttribute("data-title");
  document
    .getElementById("gallery-previous")
    .setAttribute("src-current", img.getAttribute("data-position"));
  document
    .getElementById("gallery-next")
    .setAttribute("src-current", img.getAttribute("data-position"));
  modal.style.display = "flex";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    document.getElementById("gallery-previous").click();
  } else if (event.key === "ArrowRight") {
    document.getElementById("gallery-next").click();
  } else if (event.key === "Escape") {
    document.getElementById("gallery-close").click();
    document.getElementById("contact_modal_close").click();
  } else if (event.key === "Enter") {
    document.getElementById("contact_modal_send").click();
  }
});

init();
