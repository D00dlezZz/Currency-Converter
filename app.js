
let pInpuntFrom = document.querySelector('.from-currency-value');
let pInpuntTo = document.querySelector('.to-currency-value');
let inputFromValue = document.querySelector('.ihave-input');
let inputToValue = document.querySelector('.ineed-input');
let switchButton = document.querySelector('.switch')
let rigthButtons = Array.from(document.querySelectorAll('.in-section'));
let leftButtons = Array.from(document.querySelectorAll('.ih-section'));
let selectFrom = document.querySelector('.drop-from');
let selectTo = document.querySelector('.drop-to');
let timeoutId;


inputFromValue.value = '1';
let from = 'RUB';
let to = 'USD';

// Обращение к API и получение изначальных FROM and TO и возвращает объект
async function returnValueFromAPI() {
        if (from === to) {
            return { From: 1, To: 1 }
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        document.querySelector('.loading-scrin').style.display = "flex"
        }, 500)
        let responseFrom = await fetch(`https://api.ratesapi.io/api/latest?symbols=${from}&base=${to}`);
        let dataFrom = await responseFrom.json();
    
        let responseTo = await fetch(`https://api.ratesapi.io/api/latest?symbols=${to}&base=${from}`);
        clearTimeout(timeoutId);
        document.querySelector('.loading-scrin').style.display = "none"
        let dataTo = await responseTo.json();
        return { To: dataTo.rates[to], From: dataFrom.rates[from] }
}

// Функция записывает полученный из API объект в строку
returnValueFromAPI()
    .then((data) => {
        pInpuntFrom.innerText = ` 1 ${from} = ${data.To.toFixed(4)} ${to}`;
        pInpuntTo.innerText = ` 1 ${to} = ${data.From.toFixed(4)} ${from}`;
        inputToValue.value = ((inputFromValue.value).replace(',','.') * data.To).toFixed(4);
    })
    .catch(() => {
        alert ('УПС')
    })

/** Выделяем выбранную валюту левого столбца */
// Меняем цвет кнопок и селектора левого столбца и записывает полученные значения в inpunt
async function setLeftCurr(curr) {
    leftButtons.forEach((el) => {
        el.style.color = "#C6C6C6";
        el.style.backgroundColor = "#FFFF";
    })
    selectFrom.style.backgroundColor = "#FFFFFF";
    selectFrom.style.color = "#C6C6C6";

    let buttonValue = leftButtons.find((btn) => {
        return btn.innerText === curr;
    });
    if (buttonValue) {
        buttonValue.style.backgroundColor = "#833AE0";
        buttonValue.style.color = "#FFFFFF";
    } else {
        selectFrom.style.backgroundColor = "#833AE0";
        selectFrom.style.color = "#FFFFFF";

        selectFrom.value = curr;
    }
    from = curr;
    let data = await returnValueFromAPI()
    pInpuntFrom.innerText = ` 1 ${from} = ${data.To.toFixed(4)} ${to}`;
    pInpuntTo.innerText = ` 1 ${to} = ${data.From.toFixed(4)} ${from}`;
    inputToValue.value = ((inputFromValue.value).replace(',','.') * data.To).toFixed(4);
}


// Вызов функции setLeftCurr() для селектора
selectFrom.addEventListener('change', (event) => {
    setLeftCurr(event.target.value)
});

// Вызов функции setLeftCurr() для кнопок
leftButtons.forEach((item) => {
    item.addEventListener('click', () => {
        setLeftCurr(item.innerText)
    });

// Обработка измененных значений в левом input 
    inputFromValue.addEventListener('keyup', checkInput)

    function checkInput() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            returnValueFromAPI()
                .then((data) => {
                    console.log(data);
                    pInpuntFrom.innerText = ` 1 ${from} = ${data.To.toFixed(4)} ${to}`;
                    pInpuntTo.innerText = ` 1 ${to} = ${data.From.toFixed(4)} ${from}`;
                    inputToValue.value = ((inputFromValue.value).replace(',','.') * data.To).toFixed(4);
                })
        }, 500)
    }
})


/** Выделяем выбранную валюту правого столбца */
// Меняем цвет кнопок и селектора правого столбца и записывает полученные значения в inpunt
async function setRightCurr(curr) {
    rigthButtons.forEach((el) => {
        el.style.color = "#C6C6C6";
        el.style.backgroundColor = "#FFFF";
    })
    selectTo.style.backgroundColor = "#FFFFFF";
    selectTo.style.color = "#C6C6C6";

    let buttonValue = rigthButtons.find((btn) => {
        return btn.innerText === curr;
    });
    if (buttonValue) {
        buttonValue.style.backgroundColor = "#833AE0";
        buttonValue.style.color = "#FFFFFF";
    } else {
        selectTo.style.backgroundColor = "#833AE0";
        selectTo.style.color = "#FFFFFF";

        selectTo.value = curr;
    }
    to = curr;

    let data = await returnValueFromAPI()
    pInpuntFrom.innerText = ` 1 ${from} = ${data.To.toFixed(4)} ${to}`;
    pInpuntTo.innerText = ` 1 ${to} = ${data.From.toFixed(4)} ${from}`;
    inputToValue.value =((inputFromValue.value).replace(',','.') * data.To).toFixed(4);
}
//  Вызов функции setRightCurr() для селектора
selectTo.addEventListener('change', (event) => {
    setRightCurr(event.target.value)
});
// Вызов функции setRightCurr() для кнопок
rigthButtons.forEach((item) => {
    item.addEventListener('click', () => {
        setRightCurr(item.innerText)
    });
})

inputToValue.addEventListener('keyup', checkInput)
// Обработка измененных значений в правом input 
function checkInput() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        returnValueFromAPI()
            .then((data) => {
                pInpuntFrom.innerText = ` 1 ${from} = ${data.To.toFixed(4)} ${to}`;
                pInpuntTo.innerText = ` 1 ${to} = ${data.From.toFixed(4)} ${from}`;
                inputFromValue.value = ((inputToValue.value).replace(',','.') * data.From).toFixed(4);
            })
    }, 500)
}

// Обработка назатия на стрелки
switchButton.addEventListener('click', async () => {
    let localFrom = from;
    let localTo = to;
    await setRightCurr(localFrom);
    await setLeftCurr(localTo);
});

