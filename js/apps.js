'use strict';

//global variables
var allProducts = [];
var renderQueue = [];
var maxClickAllowed = 25;
var actualClicks = 0;
// var randomNumber[] = 0
// var randomNumberTwo[] = 0

//DOM ids
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultList = document.getElementById('results');
//constructor with productName, imagePath, imageCount
function BusMallProducts(name, src) {
  this.name = name;
  this.src = `img/assets/${name}.${src}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
  console.log(this.votes);
}
//instantiations
new BusMallProducts('bag', 'jpg');
new BusMallProducts('banana', 'jpg');
new BusMallProducts('bathroom', 'jpg');
new BusMallProducts('boots', 'jpg');
new BusMallProducts('breakfast', 'jpg');
new BusMallProducts('bubblegum', 'jpg');
new BusMallProducts('chair', 'jpg');
new BusMallProducts('cthulhu', 'jpg');
new BusMallProducts('dog-duck', 'jpg');
new BusMallProducts('dragon', 'jpg');
new BusMallProducts('pen', 'jpg');
new BusMallProducts('pet-sweep', 'jpg');
new BusMallProducts('scissors', 'jpg');
new BusMallProducts('shark', 'jpg');
new BusMallProducts('sweep', 'png');
new BusMallProducts('tauntaun', 'jpg');
new BusMallProducts('unicorn', 'jpg');
new BusMallProducts('usb', 'gif');
new BusMallProducts('water-can', 'jpg');
new BusMallProducts('wine-glass', 'jpg');

//which imageViewed, randomGenerator, useArray
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function renderBusMallProducts() {
  while (renderQueue.length < 3) {
    var tempindex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempindex)) {
      tempindex = getRandomIndex(allProducts.length);
    }
    renderQueue.push(tempindex);
  }
  console.log(renderQueue);
  var productOneIndex = renderQueue.pop();
  var productTwoIndex = renderQueue.pop();
  var productThreeIndex = renderQueue.pop();
  //validation

  //assign product info
  imageOneElement.src = allProducts[productOneIndex].src;
  imageOneElement.alt = allProducts[productOneIndex].name;
  imageOneElement.title = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imageTwoElement.src = allProducts[productTwoIndex].src;
  imageTwoElement.alt = allProducts[productTwoIndex].name;
  imageTwoElement.title = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imageThreeElement.src = allProducts[productThreeIndex].src;
  imageThreeElement.alt = allProducts[productThreeIndex].name;
  imageThreeElement.title = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}
//event handler
function handleClick(event) {
  actualClicks++;
  var clickedProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  //reassign image src properties - call again

  renderBusMallProducts();

  //validation for max clicks
  if (actualClicks === maxClickAllowed) {
    myContainer.removeEventListener('click', handleClick);
    //which image and numberClicks increment
    for (var j = 0; j < allProducts.length; j++) {
      var liElement = document.createElement('li');
      liElement.textContent = `${allProducts[j].name} was viewed ${allProducts[j].views} and clicked ${allProducts[j].votes} times`;
      resultList.appendChild(liElement);
    }
  }
}






//executable code
renderBusMallProducts();
//event listener attached to container
myContainer.addEventListener('click', handleClick);
