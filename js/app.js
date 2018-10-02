'use strict';

var alphabetMagnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
var freezerArea = document.getElementById('freezer');

function Magnet(magnet, x, y) {
  this.magnetName = magnet;
  this.positionX = x;
  this.positionY = y;

  Magnet.allMagnets.push(this);
}

Magnet.allMagnets = [];


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

function addElement(element, content, parent){
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);
  var newId = document.createAttribute('id');
  var newDrag = document.createAttribute('draggable');

  newId.value = content;
  newDrag.value = true;

  newElement.setAttributeNode(newId);
  newElement.setAttributeNode(newDrag);
}

function rando(min, max) {
  var randomNumber = Math.floor(Math.random()*(max-min+1))+min;
 
  return randomNumber;
}

initialize();
