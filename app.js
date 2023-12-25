const baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

let dropdowns = document.querySelectorAll('form select');
let btn = document.querySelector('form button');
let fromCurrency = document.querySelector('.from select');
let toCurrency = document.querySelector('.to select');

for (const select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }
    else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener('change',(evt) =>{
    updateFlag(evt.target);
  })
}

const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  console.log(currCode);
  let img = element.parentElement.querySelector('img');
  img.src = flagUrl;
}

btn.addEventListener('click', async (evt) =>{
  evt.preventDefault();
  let amount = document.querySelector('.amount input');
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
   amount.value = "1";
  }
  const URL = baseURL + `/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
  const response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurrency.value.toLowerCase()]
  console.log(rate);
  console.log(data);
  console.log(response);

  let finalAmount = `${amtVal} ${fromCurrency.value} = ${amtVal * rate} ${toCurrency.value}` ;
  document.querySelector('.display p').innerText = finalAmount;
})
