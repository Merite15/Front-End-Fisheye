/* eslint-disable no-unused-vars */
function photoFactory(data, position) {
    const { id, photographerId, title, image, video, likes, date } = data;
  
    const mediaImage = `assets/photographers/${photographerId}/${image}`;
    const mediaVideo = `assets/photographers/${photographerId}/${video}`;
  
    function getPhoto() {
      const item = document.createElement("div");
      item.setAttribute("class", "gallery-item");
      item.setAttribute("data-title", title);
      item.setAttribute("data-likes", likes);
      item.setAttribute("data-date", date);
  
      let button = document.createElement("button");
      button.setAttribute("class", "light-button");
      button.setAttribute("aria-label", title);
      button.setAttribute("onclick", "openGallery(this)");
  
      let media = null;
  
      if (image) {
        media = document.createElement("img");
        media.setAttribute("src", mediaImage);
        media.setAttribute("class", "gallery-item-img");
        media.setAttribute("alt", "PHOTOGRAPHY OF" + title.toUpperCase());
        media.setAttribute("data-title", title);
        media.setAttribute("data-type", "img");
        media.setAttribute("data-position", position);
      }
  
      if (video != null) {
        const source = document.createElement("source");
        source.setAttribute("src", mediaVideo);
        source.setAttribute("type", "video/mp4");
  
        media = document.createElement("video");
        media.setAttribute("playsinline", "");
        media.setAttribute("autoplay", "");
        media.setAttribute("muted", "");
        media.setAttribute("loop", "");
        media.setAttribute("class", "gallery-item-img");
        media.setAttribute("data-title", title);
        media.setAttribute("alt", "VIDEO OF " + title.toUpperCase());
        media.setAttribute("src", mediaVideo);
        media.setAttribute("data-type", "video");
        media.setAttribute("data-position", position);
        media.appendChild(source);
      }
  
      const informations = document.createElement("div");
      informations.setAttribute("class", "gallery-item-informations");
  
      const h2 = document.createElement("h2");
      h2.textContent = title;
  
      const dislikes = document.createElement("button");
      dislikes.setAttribute("class", "gallery-item-likes btn-like light-button");
      dislikes.setAttribute("data-like", "1");
      dislikes.setAttribute("data-id", id);
  
      const counter = document.createElement("span");
      counter.setAttribute("class", "counter");
      counter.setAttribute("id", "like-" + id);
      counter.textContent = likes;
  
      const likeImg = document.createElement("img");
      likeImg.setAttribute("src", "assets/icons/like.svg");
      likeImg.setAttribute("alt", "likes");
  
      dislikes.appendChild(counter);
      dislikes.appendChild(likeImg);
      informations.appendChild(h2);
      informations.appendChild(dislikes);
      button.appendChild(media);
      item.appendChild(button);
      item.appendChild(informations);
  
      return item;
    }
  
    return { getPhoto };
  }
  