// Close lightbox
document.getElementById("gallery-close").onclick = function(){
    const modal = document.getElementById("gallery_modal");
    modal.style.display = "none";
};

// Next button in lightbox
document.getElementById("gallery-next").onclick = function(){

    let total = document.getElementsByClassName("gallery-item-img").length-1;
    let current = parseInt(this.getAttribute('src-current'));
    let next = current+1;
    if(current === total) {
        next = 0;
    }
    navButton(next);
};

// Previous button in lightbox
document.getElementById("gallery-previous").onclick = function(){
    let total = document.getElementsByClassName("gallery-item-img").length-1;
    let current = parseInt(this.getAttribute('src-current'));
    let next = current-1;
    if(current === 0) {
        next = total;
    }
    navButton(next);

};

// Navigation lightbox buttons
function navButton(next){
    let imgs = document.getElementsByClassName("gallery-item-img");

    if(imgs[next].getAttribute('data-type') == 'img'){
        document.getElementById("gallery-video").classList.add('d-none');
        document.getElementById("gallery-img").classList.remove('d-none');
        document.getElementById("gallery-img").src = imgs[next].getAttribute('src');
    } else {
        document.getElementById("gallery-img").classList.add('d-none');
        document.getElementById("gallery-video").classList.remove('d-none');
        document.getElementById("gallery-video").src = imgs[next].getAttribute('src');
    }

    document.getElementById("gallery-title").innerHTML = imgs[next].getAttribute('data-title');
    document.getElementById("gallery-previous").setAttribute('src-current', next);
    document.getElementById("gallery-next").setAttribute('src-current', next);

}