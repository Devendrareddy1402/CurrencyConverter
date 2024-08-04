const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");



const updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async ()=>{

let amount = document.querySelector(".amount input");
let amntVal = amount.value;

  if(amntVal === "" || amntVal < 1)
  {
    amntVal = 1;
    amount.innerText = 1;
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amntVal * rate;
  msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
  
};

for (let select of dropdowns)
{
  for(let code in countryList)
  {
    let newOption = document.createElement("option");
    newOption.value = code;
    newOption.innerText = code;
    if(select.name === "from" && code === "USD")
        newOption.selected = "selected";
    else if(select.name === "to" && code === "INR")
        newOption.selected = "selected";
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", ()=>{
  updateExchangeRate();
});





