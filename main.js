// Объект с курсами валют
const rates = {};

const input = document.querySelector('#input');
const select = document.querySelector('#select');
const result = document.querySelector('#result');

const courses = document.querySelector('#courses');

async function getCurrencies() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = await data;

    
  // наполнение данными
  for (let param in result.Valute) { 
             
    const balloonTemplate = document.querySelector('#card').content.querySelector('.card-body');
    const cardElement = balloonTemplate.cloneNode(true);       

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
    
}

getCurrencies();

// расчет конверсии
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

// Отправка данных на сервер
function send(event, php){
  console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  var req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
    json = JSON.parse(this.response); 
        console.log(json);
          
        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          alert("Сообщение отправлено");
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        }
      // Если не удалось связаться с php файлом
      } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
  
  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function() {alert("Ошибка отправки запроса");};
  req.send(new FormData(event.target));
  
  }