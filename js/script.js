const startBtn =  document.querySelector('.start-button'),
      mainForm = document.querySelector('.main-form'),
      firstScreen = document.querySelector('.first-screen'),
      formCalculate = document.querySelector('.form-calculate'),
      endBtn = document.querySelector('.end-button'),
      total = document.querySelector('.total'),
      fastRange = document.querySelector('.fast-range');

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