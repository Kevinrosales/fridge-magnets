'use strict';

var alphabetMagnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
var magnetArea = document.getElementById('magnets');


function Magnet(magnet, x, y, id) {
  this.magnetName = magnet;
  this.positionX = x;
  this.positionY = y;
  this.id = id;
  

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
  for (var i = 0; i < alphabetMagnets.length; i++) {
    console.log('In for loop');
    var x = rando(50, 450);
    var y = rando(10, 450);

    new Magnet(alphabetMagnets[i], rando(50, 450), rando(10, 450));
  
    var tag = addElement('p', alphabetMagnets[i], freezerArea);

<<<<<<< HEAD
    addElement('p',alphabetMagnets[i],magnetArea);
    // console.log(alphabetMagnets[i].magnetName);
=======
    tag.setAttribute('style', `left: ${x}px; top: ${y}px;`);
>>>>>>> f06b0561d9f04b40d0576bac7d829da96561921c
  }

  console.log(`Magnets Created: ${Magnet.allMagnets}`);
}

function addElement(element, content, parent){
  console.log('in add element function');
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);
  var newId = document.createAttribute('id');
  var newDrag = document.createAttribute('draggable');


  newId.value = content;
  newDrag.value = true;

  newElement.setAttributeNode(newId);
  newElement.setAttributeNode(newDrag);
  newElement.appendChild(newContent);
  parent.appendChild(newElement);

  return newElement;
}

function rando(min, max) {
  var randomNumber = Math.floor(Math.random()*(max-min+1))+min;

  return randomNumber;
}

initialize();
