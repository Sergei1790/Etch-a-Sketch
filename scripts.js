// Creating buttons

const sketchButtonsWrapper = document.createElement('div');
sketchButtonsWrapper.className = 'sketchButtonsWrapper';
document.body.appendChild(sketchButtonsWrapper);

let clearButton = document.createElement('button');
clearButton.className = 'clearButton';
clearButton.innerText = 'Clear';
sketchButtonsWrapper.appendChild(clearButton);

clearButton.addEventListener('click', scetchClear);

let resetButton = document.createElement('button');
resetButton.className = 'resetButton';
resetButton.innerText = 'Reset';
sketchButtonsWrapper.appendChild(resetButton);

let randomColorButton = document.createElement('button');
randomColorButton.className = 'randomColorButton';
randomColorButton.innerText = 'Random Color';
sketchButtonsWrapper.appendChild(randomColorButton);

let darkeningButton = document.createElement('button');
darkeningButton.className = 'darkeningButton';
darkeningButton.innerText = 'Darkening Color';
sketchButtonsWrapper.appendChild(darkeningButton);

// Creating sketchWrapper

const sketchWrapper = document.createElement('div');
sketchWrapper.className = 'sketchWrapper';
document.body.appendChild(sketchWrapper);

randomColorButton.addEventListener('click', function() {
    sketchButtonsWrapper.classList.remove('sketchDarkening');
    sketchButtonsWrapper.classList.toggle('sketchRandomColor');
});

darkeningButton.addEventListener('click', function() {
    sketchButtonsWrapper.classList.remove('sketchRandomColor');
    sketchButtonsWrapper.classList.toggle('sketchDarkening');
});
let brightening = 100;
function sketchItemHover(sketchItem){
    sketchItem.addEventListener('mouseenter', function() {
        sketchItem.style.color = '#fff';
        if(sketchButtonsWrapper.classList.contains('sketchRandomColor')){
            sketchItem.style.backgroundColor = getRandomColor();
        } else if(sketchButtonsWrapper.classList.contains('sketchDarkening')){
            sketchItem.style.backgroundColor = '#369';
            sketchItem.style.filter = `
                brightness(${brightening - 10}%)
            `;
            (brightening == 0) ? brightening = 100 : brightening -=10;
        }
        else{
            sketchItem.style.backgroundColor = '#369';
        }
       
    });
}
function scetchClear(){
    document.querySelectorAll('.sketchItem').forEach((sketchItem) => {
        sketchItem.style.cssText = `
            background-color: #fff;
            color: #000;
        `;
    });
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  
// Building grid

for(let i = 1; i<=256; i++){
    let sketchItem = document.createElement('div');
    // sketchItem.style.cssText=`
    //     width:
    // `;
    sketchItem.className = 'sketchItem';
    sketchItem.innerText = i;
    sketchWrapper.appendChild(sketchItem);
    sketchItemHover(sketchItem);
}
// Rebuilding grid on Reset
resetButton.addEventListener('click', function() {
    sketchButtonsWrapper.classList.remove('sketchRandomColor');
    sketchButtonsWrapper.classList.remove('sketchDarkening');
    let newGrid = +prompt('Number of squares per side for the new grid? Maximim 100');
    if(Number.isInteger(newGrid) && newGrid <=100 && newGrid >0){
        while (sketchWrapper.firstChild) {
            sketchWrapper.removeChild(sketchWrapper.firstChild);
        }
    }else{
        alert('Please input number 100 or less');
    }
    for(let i = 1; i<=(newGrid * newGrid); i++){
        sketchWrapper.style.gridTemplateColumns = `repeat(${newGrid}, 1fr)`;
        let sketchItem = document.createElement('div');
        sketchItem.className = 'sketchItem';
        sketchItem.innerText = i;
        sketchWrapper.appendChild(sketchItem);
        sketchItemHover(sketchItem);
    }
});


