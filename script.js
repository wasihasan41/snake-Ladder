const boxes = document.querySelector('.boxes')
// const activeBox = document.getElementsByClassName('color')[0];
const dice = document.querySelector('.randomNumber');
const diceButton = document.querySelector('button');

diceButton.addEventListener('click', throwDice);

const diceValues = [
  [36, 35, 34, 33, 32, 31],
  [25, 26, 27, 28, 29, 30],
  [24, 23, 22, 21, 20, 19],
  [13, 14, 15, 16, 17, 18], 
  [12, 11, 10, 9, 8, 7], 
  [1, 2, 3, 4, 5, 6]
]

window.onload = () => {
  const table = document.createElement('table');
  diceValues.forEach((currentArray)=>{
    const row = document.createElement('tr');
    currentArray.forEach((currentNumber)=>{
      const data = document.createElement('td')
      data.innerHTML = currentNumber
      row.appendChild(data);
      table.appendChild(row)
      boxes.appendChild(table)
      data.className='color'
      data.classList.remove('color')
      // console.log(typeof(data))
      if(data.textContent == 1){
        data.classList.add("color")
      }
      if (snakeMap[currentNumber]){
        data.innerHTML='🐍';
      }
      if (ladderMap[currentNumber]){
        data.innerHTML='🦅';
      }
      let dataNumber  = data.dataset.number =  currentNumber   
      // console.log(dataNumber)
    })  
})
}
const snakeMap = {
  8: 2,
  16: 4,
}
const ladderMap = {
  9: 15,
  21: 35
}
function throwDice(){
  const diceValue  = generateRandomNumber();
  const diceImage = `<img src="/assets/dice${diceValue}.png" style="height:50px; width:50px;">`;
  dice.innerHTML = diceImage;
  
  const finalCount = getNewBoxNumber(diceValue)
  const finalCountBox = document.querySelector(`[data-number='${finalCount}']`);
  
  if(finalCount > 36){
    return
  }else{
    finalCountBox.classList.add("color");
  }
   
    
  if(checkIfGameWon(finalCount)){
      return alert("You won");
  }
  // check if it's ladder or snake
  if(finalCountBox.textContent.includes('🐍')){
    return handleSnakeBite(finalCount);
  }
  if(finalCountBox.textContent.includes('🦅')){
    // early return
    return handleLadder(finalCount);
  }
  console.log(finalCount)
}

// Single Responsibility Principle
const getNewBoxNumber = (diceValue) => {
  // get active number
  // make it inactive
  // add dice value
  // find next active box
  const currentActiveBox = document.getElementsByClassName('color')[0];
  currentActiveBox.classList.remove("color");
  const currentCount = parseInt(currentActiveBox.dataset.number)
  const finalCount = currentCount + diceValue;
  return finalCount;

}

const handleLadder = (currentValue) => {
  setTimeout(()=>{
    const newCurrentValue = document.querySelector(`[data-number='${currentValue}']`);
    console.log(newCurrentValue)
    newCurrentValue.classList.remove('color')    
    const newValue = ladderMap[currentValue]
    const newValueBox = document.querySelector(`[data-number='${newValue}']`);
    newValueBox.classList.add('color')
  },1000)
  return
}

const handleSnakeBite = (currentValue) => {
  setTimeout(()=>{
    const newCurrentValue = document.querySelector(`[data-number='${currentValue}']`);
    console.log(newCurrentValue)
      newCurrentValue.classList.remove('color')
    const newValue = snakeMap[currentValue];
    const newValueBox = document.querySelector(`[data-number='${newValue}']`);
    newValueBox.classList.add('color')
  },1000)
  return
}

const generateRandomNumber = () => {
  
  const random  = Math.floor(Math.random() * 6) + 1;
  return random;
}

const checkIfGameWon = (value) => {
  // if(value === 36){
  //   return true
  // } else {
  //   return false
  // }
  return value === 36
}

