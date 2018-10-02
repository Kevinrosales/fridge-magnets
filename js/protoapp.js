
'use strict';
// var alphabetMagnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];

var alphabetMagnets = ["A", "B", "C"];

Magnet.allMagnets = [];

function Magnet(magnet, x, y) {
  this.magnetName = magnet;
  this.positionX = x;
  this.positionY = y;

  Magnet.allMagnets.push(this);
}


function initialize() {
  checkLocalStorage();
}

function checkLocalStorage() {
  console.log('In local storage');
  var localMagnets = localStorage.getItem('magnets');
  console.log(`localMagnets = ${localMagnets}`);
  var magnets = JSON.parse(localMagnets);
  console.log(`magnets = ${magnets}`);

  if (magnets && magnets.length) {
    console.log('Found it in storage');
    Magnet.allMagnets = magnets;
  }
  else {
    createMagnets();
  }
}

function createMagnets() {
  console.log('In createMagnets()');
  // Create a for loop set to the length of the alphabetMagnets array
  for (var i = 0; i < alphabetMagnets.length; i++) {
    console.log('In for loop');
    // During each iteration, create a new Magnet
    // Assign the alphabetMagnets[i] to the magnetName property
    // Use rando to assign values to positionX and positionY
    new Magnet(alphabetMagnets[i], rando(50, 450), rando(10, 450));
  }

  console.log(`Magnets Created: ${Magnet.allMagnets}`);
}

function rando(min, max) {
  var randomNumber = Math.floor(Math.random()*(max-min+1))+min;
 
  return randomNumber;
}

initialize();

var magnet = document.getElementById(Magnet.allMagnets[0].magnetName);
var myFridge = document.getElementById('fridge');
var myFreezer = document.getElementById('freezer');

function dragstart_handler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dropEffect = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text/plain");
  ev.target.appendChild(document.getElementById(data));
  magnet.style.position = 'absolute';
  magnet.style.left = ev.pageX - magnet.offsetWidth / 2 + 'px';
  magnet.style.top = ev.pageY - magnet.offsetHeight / 2 + 'px';

}

// myOtherParagraph.addEventListener('dragstart', dragstart_handler);
magnet.addEventListener('dragstart', dragstart_handler);  //instead of 'a', use the section "freezer"?

myFridge.addEventListener('dragover', dragover_handler);
myFridge.addEventListener('drop', drop_handler);

myFreezer.addEventListener('dragover', dragover_handler);
myFreezer.addEventListener('drop', drop_handler);
