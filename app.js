
let btn2 = document.querySelector('.in-section');
let pInpuntFrom = document.querySelector('.from-currency-value');
let pInpuntTo = document.querySelector('.to-currency-value');
let inputFromValue = document.querySelector('.ihave-input');
let inputToValue = document.querySelector('.ineed-input');


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


function returnFromButtonValue() {

    let selectFrom = document.querySelector('.drop-from')
    let btn = document.querySelectorAll('.ih-section');
    let timeoutId;

    selectFrom.addEventListener('change', (event) => {
        from = event.target.value
        console.log(from)
        returnValueFromAPI()
            .then((data) => {
                console.log(data);
                pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                inputToValue.value = inputFromValue.value * data.data.toFixed(4);
                console.log(typeof (inputToValue.value))
            })
    });

    btn.forEach((item) => {
        item.addEventListener('click', () => {
            from = item.innerText
            console.log(from)
            returnValueFromAPI()
                .then((data) => {
                    console.log(data);
                    pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                    pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                    inputToValue.value = inputFromValue.value * data.data.toFixed(4);
                    console.log(inputFromValue.value);
                })
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

};

function returnToButtonValue() {

    let btn = document.querySelectorAll('.in-section');
    let selectFrom = document.querySelector('.drop-to')

    selectFrom.addEventListener('change', (event) => {
        to = event.target.value
        console.log(to)
        returnValueFromAPI()
            .then((data) => {
                console.log(data);
                pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                inputToValue.value = inputFromValue.value * data.data.toFixed(4);
            })
    });

    btn.forEach((item) => {
        item.addEventListener('click', () => {
            to = item.innerText
            console.log(to)
            returnValueFromAPI()
                .then((data) => {
                    console.log(data);
                    pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
                    pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;
                    inputToValue.value = inputFromValue.value * data.data.toFixed(4);

                })
        });
    })
};

returnToButtonValue()
returnFromButtonValue()


