
let btn2 = document.querySelector('.in-section');
let pInpuntFrom = document.querySelector('.from-currency-value')
let pInpuntTo = document.querySelector('.to-currency-value')

let from = 'RUB';
let to = 'CZK';


async function returnValueFromAPI(el) {

    let response2 = await fetch(`https://api.ratesapi.io/api/latest?symbols=${el}&base=${to}`);
    let data2 = await response2.json();

    let response = await fetch(`https://api.ratesapi.io/api/latest?symbols=${to}&base=${el}`);
    let data = await response.json();
    return { data: data.rates[to], data2: data2.rates[el] }
}

returnValueFromAPI(from)
    .then((data) => {
        console.log(data);
        pInpuntFrom.innerText = ` 1 ${from} = ${data.data.toFixed(4)} ${to}`;
        pInpuntTo.innerText = ` 1 ${to} = ${data.data2.toFixed(4)} ${from}`;

    })


function returnButtonValue() {
    let btn = document.querySelectorAll('.ih-section');
    btn.forEach((item) => {
        item.addEventListener('click', () => {
            from = item.innerText
            console.log(from)
        });
    })
    return from
};


returnButtonValue()