/* 
eslint-disable no-unused-vars 
*/
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  const button = document.querySelector(".display_modal");

    // Récupérer le nom du photographe depuis l'attribut data-photographer
  const photographer_name = document.getElementById("photographer__name")

  // Afficher le nom du photographe à côté du texte "Contactez moi"
  const contactText = document.querySelector(".modal header h2 span");
  contactText.textContent = photographer_name.textContent;

  // Empêcher la navigation en utilisant la touche Tab
  const modalFocusableElements = modal.querySelectorAll(
    "input, textarea, button"
  );
  const firstFocusableElement = modalFocusableElements[0];
  const lastFocusableElement =
    modalFocusableElements[modalFocusableElements.length - 1];

  modal.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    event.preventDefault();
  }
});

// Submit contact elements
function contact() {
  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  console.log("FirstName : " + first_name);
  console.log("LastName : " + last_name);
  console.log("Email : " + email);
  console.log("Message : " + message);
  closeModal();
}
