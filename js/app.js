'use strict';

var alphabetMagnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
//var magnetArea = document.getElementById('magnets');
var myFreezer = document.getElementById('freezer');
var myFridge = document.getElementById('fridge');
var tag;


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
  for (var i = 0; i < alphabetMagnets.length; i++) {
    console.log('In for loop');
    var x = rando(50, 450);
    var y = rando(10, 450);
    new Magnet(alphabetMagnets[i], x, y);
    tag = addElement('p', alphabetMagnets[i], myFreezer);
   // console.log(alphabetMagnets[i].magnetName);
   // tag.setAttribute('style', `left: ${x}px; top: ${y}px;`);
    tag.addEventListener('dragstart', dragstart_handler);
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
  var selectedel = document.getElementById(data); 
  selectedel.style.position = 'absolute';
  selectedel.style.left = ev.pageX - selectedel.offsetWidth / 2 + 'px';
  selectedel.style.top = ev.pageY - selectedel.offsetHeight / 2 + 'px';

  console.log(data);
  console.log(tag.id);
}

 

myFridge.addEventListener('dragover', dragover_handler);
myFridge.addEventListener('drop', drop_handler);

myFreezer.addEventListener('dragover', dragover_handler);
myFreezer.addEventListener('drop', drop_handler);

initialize();
