const startBtn =  document.querySelector('.start-button'),
      mainForm = document.querySelector('.main-form'),
      firstScreen = document.querySelector('.first-screen'),
      formCalculate = document.querySelector('.form-calculate'),
      endBtn = document.querySelector('.end-button'),
      total = document.querySelector('.total'),
      fastRange = document.querySelector('.fast-range'),
      totalPriceSum = document.querySelector('.total_price__sum');
const DATA = {
  whichSite: ['landing', 'multiPage', 'onlineStore'],
  price: [4000, 8000, 26000],
  desktopTemplates: [50, 40,30],
  adapt: 20,
  mobileTemplates: 15,
  editable: 10,
  metrikaYandex: [500, 1000, 2000],
  analyticsGoogle: [850, 1350, 3000],
  sendOrder: 500,
  deadlineDay: [[2, 7], [3, 10], [7, 14]],
  deadlinePercent: [20, 17, 15]
}
const showElem = (el) => {
    el.style.display = 'block';
}
const hideElem = (el) => {
    el.style.display = 'none';
}
const handlerCallBackForm = (event) => {
  const target = event.target;
  if(target.classList.contains('want-faster')){
    target.checked ?  showElem(fastRange) : hideElem(fastRange);
  }
  if(target.classList.contains('calc-handler')){
    priceCalculation(target);
    if(target.closest('.switcher')){
      if(target.checked){
        target.closest('.switcher').querySelector('span:last-child').textContent = 'Да';
      }else{
        target.closest('.switcher').querySelector('span:last-child').textContent = 'Нет';
      }
    }
  }
  if(target.value === 'adapt'){
    let mobileTemplates = document.getElementById('mobileTemplates');
    
    if(target.checked){
      mobileTemplates.disabled = false;
    }else{
      mobileTemplates.closest('.switcher').querySelector('span:last-child').textContent = 'Нет'
      mobileTemplates.checked = false;
      mobileTemplates.disabled = true;
    }
  }
}
const priceCalculation = (elem) => {
  let result = 0, 
      index = 0,
      options = [];
  if(elem.name === 'whichSite'){
    for(const item of formCalculate.elements){
      if(item.type === 'checkbox'){
        item.checked = false;
      }
    }
    hideElem(fastRange);
  }
  
  for(const item of formCalculate.elements){
    if (item.name === "whichSite" && item.checked){
      index = DATA.whichSite.indexOf(item.value);
    }else if (item.classList.contains('calc-handler') && item.checked){
      options.push(item.value);
    }
  }
  options.forEach(key => {
    if (typeof(DATA[key]) === 'number'){
      if( key === 'sendOrder'){
        result += DATA[key]
      }else{
        result += DATA.price[index] * DATA[key]/100
      }
    }else{
      if(key === 'desktopTemplates'){
        result += DATA.price[index] * DATA[key][index]/100;
      }else{
        result += DATA[key][index];
      }
    }
  })
  result += DATA.price[index];

  totalPriceSum.textContent = result;
}
startBtn.addEventListener('click', () => {
    showElem(mainForm);
    hideElem(firstScreen);
});

endBtn.addEventListener('click', () => {
  for (const elem of formCalculate.elements){
    if(elem.tagName.toLowerCase() === 'fieldset'){
      hideElem(elem);
    }
  }
  showElem(total);
});

formCalculate.addEventListener('change', handlerCallBackForm);