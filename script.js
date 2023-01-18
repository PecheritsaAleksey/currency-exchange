const currencyIds = [
  "bitcoin",
  "ethereum",
  "litecoin",
  "bitcoin-cash",
  "dogecoin",
];

const URL = `https://api.coingecko.com/api/v3/simple/price?ids=${currencyIds.join(
  "%2C"
)}&vs_currencies=usd`;

let exchangeRates = {};

async function getExchangeRate() {
  const respose = await fetch(URL, {
    method: "GET",
  });
  return respose.json();
}

getExchangeRate().then((data) => {
  exchangeRates = data;

  Object.entries(data).forEach((currency) => {
    let currencyElement = document.getElementById(currency[0]);
    let currencyPrice = currencyElement.querySelector(".currency-exchange");
    currencyPrice.innerText = `${currency[1].usd}$`;
  });

  convert();
});

const currencyConvertSelect = document.getElementById("currency-select");
const currencyConvertAmount = document.getElementById("convert-amount");
const currencyConvertResult = document.getElementById("convert-result");

(function () {
  currencyIds.forEach((currencyId) => {
    let newOption = document.createElement("option");
    newOption.value = currencyId;
    newOption.innerHTML = currencyId;
    currencyConvertSelect.appendChild(newOption);
  });
})();

function convert() {
  const amount = currencyConvertAmount.value;
  const currency = currencyConvertSelect.value;

  let currencyPrice = exchangeRates[currency].usd;

  currencyConvertResult.innerText = (amount / currencyPrice).toFixed(5);
}

currencyConvertSelect.addEventListener("change", () => {
  convert();
});

currencyConvertAmount.addEventListener("change", () => {
  convert();
});
