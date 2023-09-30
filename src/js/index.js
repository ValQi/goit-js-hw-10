
import { fetchBreeds, fetchCatByBreed } from ".js/cat-api.js";

const breedSelect = document.querySelector('.breed-select');

const infoLoader = document.querySelector('.loader');
const selectError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

window.addEventListener('load', init);
// start
function init() {
    let breedsData;
    fetchBreeds()
        .then(data => {
            breedsData = data;
            data.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);

                breedSelect.classList.remove('hidden');
                infoLoader.classList.add('hidden');
            })
        })
  // catch
        .catch(error => {
            console.log(error);
            selectError.classList.remove('hidden');
            breedSelect.classList.add('hidden');
            infoLoader.classList.add('hidden');
        })
// breed
    breedSelect.addEventListener('change', () => {
        const selectBreedId = breedSelect.value;
        infoLoader.classList.remove('hidden');
        catInfo.classList.add('hidden');
        selectError.classList.add('hidden');

        fetchCatByBreed(selectBreedId)
            .then(result => {
                const catData = result[0];
                const breedData = breedsData.find(breed => breed.id === catData.breeds[0].id);

                const markup = createMarkup(catData, breedData);
                catInfo.innerHTML = markup;

                infoLoader.classList.add('hidden');
                catInfo.classList.remove('hidden');
            })
            .catch(error => {
                console.log(error);
                selectError.classList.remove('hidden');
                infoLoader.classList.add('hidden');
            })
    });
};


// Mark
function createMarkup(catData, breedData) {
    return `<img src='${catData.url}' width='400' alt='${breedData.name}'/>
        <div class='textInfo'><h1>${breedData.name}</h1>
        <p>${breedData.description}</p>
        <p><b>Temperament:</b> ${breedData.temperament}</p></div>`
};