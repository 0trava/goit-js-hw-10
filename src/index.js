// Підключаємо бібліотеки через термінал
// $ npm i --save lodash.debounce
// $ npm i notiflix


import './css/styles.css';
import Notiflix from 'notiflix'; // для сповіщень
import debounce from 'lodash.debounce'; // для затримки запиту


const DEBOUNCE_DELAY = 300;

// Підключаємось до данних сторінки index.html
const refs = {
    formInput: document.querySelector('#search-box'),
    searchList: document.querySelector('.country-list'),
    cardWindow: document.querySelector('.country-info'),
};

console.log(refs.formInput); // TEST
console.log(refs.searchList); // TEST
console.log(refs.cardWindow); // TEST

// -------------------------------------------------------------


// Відслідковуваємо подію input
refs.formInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY)); // затримка для запиту


//   ФУНКЦІЯ: Аналіз введенного значення в input
function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value.trim(); // Отримуэмо значення з input

    if (searchQuery !== '') {
    // СТВОРЕННЯ Промісу на отримання данних з сайту https://restcountries.com/v3.1/

    fetchList(searchQuery)
    .then(chackList)
    .catch(onFetchError)
    } else {
      refs.cardWindow.innerHTML = "";//   CARD - чистимо
      refs.searchList.innerHTML = "";//   LIST - чистимо
    }
    //   ФУНКЦІЯ: Проміс 1/2 - отримаємо список країн з сайту
    function fetchList(countyID){

        return fetch(`https://restcountries.com/v3.1/name/${countyID}`)
        .then(response => {return response.json(); })
        .catch(onListError)


    };

    //   ФУНКЦІЯ: Проміс 2/2 - оброблюємо отриманний список країн
    function chackList (countyID){
        let textList ="";

        

        if (countyID.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});

            // якщо знайдено 0 країн - виводимо сповіщення
          } else if (countyID.length === 0) {
            console.log(`SOSS`)
            Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
            
            //Очищюємо сторінку 
            refs.cardWindow.innerHTML = "";//   CARD - чистимо
            refs.searchList.innerHTML = "";//   LIST - чистимо
            // якщо знайдено >= 2 країн і <= 10 виводимо на сторінку дані
          } else if (countyID.length >= 2 && countyID.length <= 10) {
            refs.cardWindow.innerHTML = "";//   CARD - чистимо
            renderCountryList(countyID); // вивід списку-країн на сторінку
  
            // якщо знайдена 1 країна - виводимо на сторінку 1 країну
          } else if (countyID.length === 1) {
            refs.searchList.innerHTML = "";//   LIST - чистимо
            renderOneCountry(countyID); // вивід 1 країни на сторінку
          } else {
            refs.cardWindow.innerHTML = "";//   CARD - чистимо
            refs.searchList.innerHTML = "";//   LIST - чистимо
            Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
          }

        //   ФУНКЦІЯ: виводу на екран списку країн
          function renderCountryList(ID){
            for (let i=0; i<ID.length; i += 1){
                let markup = 
                `<li class="country-box-item country-box-top "> 
                <img class="Country-flag" src="${ID[i].flags.svg}" alt="" width="70px">
                <h2 class="country-box-name">${ID[i].name.official}</h2>
                </li>`;
                textList += markup;   
            };
            refs.searchList.innerHTML = textList;//   LIST - Виводимо згрупованний список на екран
        };};

};



//   ФУНКЦІЯ: виводу на екран ОДНА Картка Країни
function renderOneCountry (countyID){
    console.log(countyID);
    let languages = Object.values(countyID[0].languages).join(", ");
    
    const markup = 
        `<ul class="country-box-list">
            <li class="country-box-item country-box-top "> 
            <img class="Country-flag" src="${countyID[0].flags.svg}" alt="" width="70px">
            <h2 class="country-box-name">${countyID[0].name.official}</h2>
            </li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Capital:</span> ${countyID[0].capital}</p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Population:</span>${countyID[0].population} </p></li>
            <li class="country-box-item"> <p><span class="coutry-box-span">Languages:</span> ${languages} </p></li>
        </ul>`;

    refs.cardWindow.innerHTML = markup;//   CARD - - Виводимо на екран
};


//   ФУНКЦІЯ: Зловили помилку
function onFetchError (error){
    refs.cardWindow.innerHTML = "";//   CARD - чистимо
    refs.searchList.innerHTML = "";//   LIST - чистимо
    Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});// Повідомлення помилка
};

function onListError (error) {
    refs.cardWindow.innerHTML = "";//   CARD - чистимо
    refs.searchList.innerHTML = "";//   LIST - чистимо
    Notiflix.Notify.failure('Oops, there is no country with that name',{width:'350px', borderRadius: '10px', position: 'center-center',clickToClose: true, useIcon: false,});
}
