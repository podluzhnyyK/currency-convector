// Объект с курсами валют
const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector('#input');
const select = document.querySelector('#select');
const result = document.querySelector('#result');

const courses = document.querySelector('#courses');






async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    console.log(result);
    console.log(result.Valute);    

    // rates.Valute = result.Valute;
    // console.log(rates);
    // rates.EUR = result.Valute.EUR;
    //  rates.GBP = result.Valute.GBP;
    //  console.log(rates.GBP);

    

    // elementUSD.textContent = rates.USD.Value.toFixed(2);
    // elementEUR.textContent = rates.EUR.Value.toFixed(2);
    // elementGBP.textContent = rates.GBP.Value.toFixed(2);

    for (let param in result.Valute) { 
             
      const balloonTemplate = document.querySelector('#card').content.querySelector('.card-body');
      const cardElement = balloonTemplate.cloneNode(true); 
      const select = document.querySelector('#select')     

      let currency = result.Valute[param];
      rates[`${param}`] = Number(currency.Value.toFixed(2));

      cardElement.querySelector('.course-item-title').textContent = param;
      cardElement.querySelector('.course-item-value').textContent = currency.Value.toFixed(2);
      let option = `<option value="${param}">${param} — ${currency.Name}</option>`;
      
      courses.append(cardElement);
      select.insertAdjacentHTML("beforeend", option);

      
      
      // цвет для информера
    if (currency.Value > currency.Previous) {
      cardElement.querySelector('.course-item-value').classList.add('top');
  } else {
    cardElement.querySelector('.course-item-value').classList.add('bottom');
  }

  

  

    }

    console.log(rates);
    
}

getCurrencies();


input.oninput = convertValue;
select.oninput = convertValue;


function convertValue() {
  result.value = (parseFloat(input.value) / rates[select.value]).toFixed(2);    
    
}


// слайдер
const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 10,  
  loop: true,
  updateOnWindowResize: true,
  observer: true,
  observeParents: true,
  speed: 5000,

  autoplay: {
    enabled: true,
    delay: 0,
  },
});