// Підключаємо бібліотеки через термінал
// $ npm i --save lodash.debounce
// $ npm i notiflix


import './css/styles.css';
import Notiflix from 'notiflix';

// Підключаємось до данних сторінки index.html
const refs = {
    formInput: document.querySelector('#search-box'),
    searchList: document.querySelector('.country-list'),
    cardWindow: document.querySelector('.country-info'),
};

console.log(refs.formInput); // TEST
console.log(refs.searchList); // TEST
console.log(refs.cardWindow); // TEST

const DEBOUNCE_DELAY = 300;
let listPut = ""

// Відслідковуваємо подію input
refs.formInput.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value;
    console.log(`searchQuery: ${searchQuery}`); // TEST
    let inputSearch = fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then(response => {
        return response.json();
    })

    console.log(inputSearch); // TEST
    console.log(2); // TEST
    console.log(inputSearch.Array); // TEST

    
    inputSearch.forEach(element => {
        let put = 
        `<li class="country-box-item country-box-top "> 
        <img class="Country-flag" src="${element[i].flags.svg}" alt="" width="70px">
        <h2 class="country-box-name">${element[i].name.official}</h2>
        </li>`;

        listPut += put;
        console.log(listPut);
    }); 

    refs.searchList.innerHTML = listPut;

}


// ----------------------------------------------- 
// Звертаємось на сервер для завантаження данних карточки покемона

let card = fetch(`https://restcountries.com/v3.1/all`).then(response => {
            return response.json();
        })

console.log(card); // TEST


// !!!!!!!!!!!!!!!!!!!!! FOUND ID
const searchQuery = "japan";


fetchCard(searchQuery)
.then(renderCountreCard)
.catch(onFetchError)



function fetchCard(countyID){
    return fetch(`https://restcountries.com/v3.1/name/${countyID}`)
    .then(response => {
        return response.json();
    })
};



function renderCountreCard (countyID){
    console.log(countyID);
    
    const markup = 
        `<ul class="country-box-list">
            <li class="country-box-item country-box-top "> 
            <img class="Country-flag" src="${countyID[0].flags.svg}" alt="" width="70px">
            <h2 class="country-box-name">${countyID[0].name.official}</h2>
            </li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Capital:</span> ${countyID[0].capital}</p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Population:</span>${countyID[0].population} </p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Languages:</span> ${countyID[0].languages.jpn} </p></li>
        </ul>`;

    refs.cardWindow.innerHTML = markup;
};

function onFetchError (error){
    Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});// Повідомлення помилка
};
