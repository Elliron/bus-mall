'use strict';

//global variables
var allProducts = [];
var renderQueue = [];
var maxClickAllowed = 25;
var actualClicks = 0;

//DOM ids
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');

//constructor with productName, imagePath, imageCount
function BusMallProducts(name, src) {
  this.name = name;
  this.src = `img/assets/${name}.${src}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
BusMallProducts.prototype.logger = function () {
  console.log(this);
};

var retrieveProducts = localStorage.getItem('products');
if (retrieveProducts) {
  allProducts = JSON.parse(retrieveProducts);
  console.log(allProducts);
} else {
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
}


//which imageViewed, randomGenerator, useArray
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function renderBusMallProducts() {
  while (renderQueue.length < 6) {
    var tempindex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempindex)) {
      tempindex = getRandomIndex(allProducts.length);
    }
    renderQueue.push(tempindex);
  }
  var productOneIndex = renderQueue.shift();
  var productTwoIndex = renderQueue.shift();
  var productThreeIndex = renderQueue.shift();

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

    renderChart();
    // save to local storage to persist completed datasets
    var stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
  }
}






//executable code
renderBusMallProducts();

function renderChart() {
  var namesArray = [];
  var votesArray = [];
  var viewsArray = [];

  for (var i = 0; i < allProducts.length; i++) {
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var dataObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of Votes',
        data: votesArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 5
      },
      {
        label: 'Number of Views',
        data: viewsArray,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var myChart = new Chart(ctx, dataObject); //eslint-disable-line

}
//event listener attached to container
myContainer.addEventListener('click', handleClick);
