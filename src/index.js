
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from "notiflix";
import SlimSelect from "slim-select";

const breedSelect = new SlimSelect({
  select: ".breed-select",
});

const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const error = document.querySelector(".error");

function showLoader() {
  loader.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
}

function displayCatInfo(cat) {
  catInfo.innerHTML = "";
  const catImage = document.createElement("img");
  catImage.src = cat.url;
  catImage.alt = "Cat";
  const catName = document.createElement("h2");
  catName.textContent = `Breed: ${cat.breeds[0].name}`;
  const catDescription = document.createElement("p");
  catDescription.textContent = `Description: ${cat.breeds[0].description}`;
  const catTemperament = document.createElement("p");
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);
  catInfo.style.display = "block";
}

function showError() {
  error.style.display = "block";
}

breedSelect.slim.addEventListener("change", () => {
  const selectedBreedId = breedSelect.selected();
  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      hideLoader();
    })
    .catch(() => {
      showError();
      hideLoader();
    });
});

showLoader();
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      breedSelect.add(breed.id, breed.name);
    });
    hideLoader();
  })
  .catch(() => {
    showError();
    hideLoader();
  });

Notiflix.Notify.init({
  position: "right-top",
  timeout: 3000,
  fontSize: "18px",
  cssAnimationDuration: 300,
}); 