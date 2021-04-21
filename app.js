
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


async function returnValueFromAPI() {

    let response2 = await fetch(`https://api.ratesapi.io/api/latest?symbols=${from}&base=${to}`);
    let data2 = await response2.json();

    let response = await fetch(`https://api.ratesapi.io/api/latest?symbols=${to}&base=${from}`);
    let data = await response.json();
    return { data: data.rates[to], data2: data2.rates[from] }
}

returnValueFromAPI()
    .then((data) => {
        console.log(data);
        pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
        pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
    })


function setLeftCurr(curr) {
    console.log(curr)
    leftButtons.forEach((el) => {
        el.style.color = "#C6C6C6";
        el.style.backgroundColor = "#FFFF";
    })
    selectFrom.style.backgroundColor = "#FFFFFF";
    selectFrom.style.color = "#C6C6C6";

    let a = leftButtons.find((btn) => {
        return btn.innerText === curr;
    });
    if (a) {
        a.style.backgroundColor = "#833AE0";
        a.style.color = "#FFFFFF";
    } else {
        selectFrom.style.backgroundColor = "#833AE0";
        selectFrom.style.color = "#FFFFFF";
    }
    from = curr;
    returnValueFromAPI()
        .then((data) => {
            console.log(data);
            pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
            pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
            inputToValue.value = inputFromValue.value * data.data.toFixed(4);
        })
}



selectFrom.addEventListener('change', (event) => {
    setLeftCurr(event.target.value)
});

leftButtons.forEach((item) => {
    item.addEventListener('click', () => {
        setLeftCurr(item.innerText)
    });

    inputFromValue.addEventListener('keyup', checkInput)

    function checkInput() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            returnValueFromAPI()
                .then((data) => {
                    console.log(data);
                    pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                    pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                    inputToValue.value = inputFromValue.value * data.data.toFixed(4);
                    console.log(inputFromValue.value);
                })
        }, 1000)
    }
})


/** Выделяем выбранную валюту правого столбца */

function setRightCurr(curr) {
    console.log(curr)
    rigthButtons.forEach((el) => {
        el.style.color = "#C6C6C6";
        el.style.backgroundColor = "#FFFF";
    })
    selectTo.style.backgroundColor = "#FFFFFF";
    selectTo.style.color = "#C6C6C6";

    let a = rigthButtons.find((btn) => {
        return btn.innerText === curr;
    });
    if (a) {
        a.style.backgroundColor = "#833AE0";
        a.style.color = "#FFFFFF";
    } else {
        selectTo.style.backgroundColor = "#833AE0";
        selectTo.style.color = "#FFFFFF";
    }
    to = curr;
    returnValueFromAPI()
        .then((data) => {
            console.log(data);
            pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
            pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
            inputToValue.value = inputFromValue.value * data.data.toFixed(4);
        })
}

selectTo.addEventListener('change', (event) => {
    setRightCurr(event.target.value)
});

rigthButtons.forEach((item) => {
    item.addEventListener('click', () => {
        setRightCurr(item.innerText)
    });
})

inputToValue.addEventListener('keyup', checkInput)

function checkInput() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        returnValueFromAPI()
            .then((data) => {
                console.log(data);
                pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                inputFromValue.value = inputToValue.value * data.data2.toFixed(4);
                console.log(inputFromValue.value);
            })
    }, 1000)
}

switchButton.addEventListener('click', () => {

    console.log('hi')
});