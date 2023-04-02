const selectSort = document.querySelector(".selectBox");

selectSort.innerHTML = `   <div class="works-sort">
        <div>
          <p class="sort-title">Trier par</p>
        </div>
        <div id="sort-wrapper" >
          <div class="sort-base" >
            <button id="select-first-option" class="select-option" aria-label="Section trier par: ">
              <span id="select-first-option-text" data-filtre="likes" >Popularité</span>
            </button>
            <span class="fas fa-chevron-up arrow-down-open"></span>
          </div>
          <div class="flex-block-button">
          <div id="select-block-options" role="listbox">
            <button type="button" class="select-option date" data-filtre="date" >Date</button>
            <button type="button" class="select-option titre" data-filtre="title" >Titre</button>
          </div>
          </div>
        </div>
      </div>`;

let isOpen = false;

const selectOptions = document.querySelector("#select-block-options");

let firstButtonText = document.querySelector("#select-first-option-text");

const arrow = document.querySelector(".arrow-down-open");

const optionsButtons = selectOptions.querySelectorAll("button");

const select = document.querySelector(".sort-base");

document.querySelector("#select-first-option").addEventListener("click", () => {
  arrow.classList.toggle("arrow-down-open");
  if (isOpen === false) {
    // On ouvre le faux select

    selectOptions.style.display = "block";
    select.style.borderRadius = "7px 7px 0 0";

    isOpen = true;

    return handleButtonsOptions();
  }

  if (isOpen === true) {
    return closeSelect();
  }
});

function closeSelect() {
  // On ferme le faux select

  selectOptions.style.display = "none";
  select.style.borderRadius = "7px";

  return (isOpen = false);
}

function handleButtonsOptions() {
  optionsButtons.forEach((button) => {
    button.onclick = () => {

      const buttonText = button.textContent;

      const sortValue = button.dataset.filtre;

      button.innerHTML = firstButtonText.textContent;
      button.dataset.filtre = firstButtonText.dataset.filtre;

      firstButtonText.innerHTML = buttonText;
      firstButtonText.dataset.filtre = sortValue;

      closeSelect();
      //

      let items = document.querySelectorAll('.gallery-item');

      [].slice.call(items).sort(function(a, b) {
          let textA = a.getAttribute('data-'+sortValue);
          let textB = b.getAttribute('data-'+sortValue);
          if(sortValue == 'likes'){
              return (parseInt(textA) < parseInt(textB)) ? -1 : (parseInt(textA) > parseInt(textB)) ? 1 : 0;
          } else {
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }
  
      }).forEach(function(el) {el.parentNode.appendChild(el)});

    };
  });
}
