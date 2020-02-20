const declOfNum = (n, titles, from) => {
  
  // return titles[n % 10 === 1 && n % 100 !== 11 ?
  //       0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  // Старый вариант

  return titles[from === 'from' ? n % 10 === 1 && n % 100 !== 11 ? 1 : 2 : n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
      
}
const Days = ['день', 'дня', 'дней'];

const startBtn =  document.querySelector('.start-button'),
      mainForm = document.querySelector('.main-form'),
      firstScreen = document.querySelector('.first-screen'),
      formCalculate = document.querySelector('.form-calculate'),
      endBtn = document.querySelector('.end-button'),
      total = document.querySelector('.total'),
      fastRange = document.querySelector('.fast-range'),
      totalPriceSum = document.querySelector('.total_price__sum'),
      typeSite = document.querySelector('.type-site'),
      maxDeadline = document.querySelector('.max-deadline'),
      rangeDeadline = document.querySelector('.range-deadline'),
      deadlineValue = document.querySelector('.deadline-value');
      
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
  deadlineDay: [[2, 7], [3, 10], [2, 14]],
  deadlinePercent: [20, 17, 15]
}

const showElem = (el) => {
    el.style.display = 'block';
}

const hideElem = (el) => {
    el.style.display = 'none';
}

const renderTextContent = (total, site, maxDeadlineDay, minDeadlineDay) => {
  maxDeadline.textContent = `${maxDeadlineDay} ${declOfNum(maxDeadlineDay, Days, 'from')}`; 
  totalPriceSum.textContent = total;
  typeSite.textContent = site;
  rangeDeadline.max = maxDeadlineDay;
  rangeDeadline.min = minDeadlineDay;
  deadlineValue.textContent = `${rangeDeadline.value} ${declOfNum(rangeDeadline.value, Days)}`;   
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
      options = [],
      site =  '',
      maxDeadlineDay = DATA.deadlineDay[0][1],
      minDeadlineDay = DATA.deadlineDay[0][0];
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
      site = item.dataset.site;
      maxDeadlineDay = DATA.deadlineDay[index][1];
      minDeadlineDay = DATA.deadlineDay[index][0];
    }else if (item.classList.contains('calc-handler') && item.checked){
      options.push(item.value);
    }else if (item.name === 'deadline'){
      nowDeadlineDay = item.value;
    }
  }
  options.forEach(key => {
    if (typeof(DATA[key]) === 'number'){
      if( key === 'sendOrder'){
        result += DATA[key]
      }else{
        result += DATA.price[index] * DATA[key]/100;
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

  renderTextContent(result, site, maxDeadlineDay, minDeadlineDay);
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