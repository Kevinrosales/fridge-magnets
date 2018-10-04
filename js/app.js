'use strict';

var alphabetMagnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
//var magnetArea = document.getElementById('magnets');
var myFreezer = document.getElementById('freezer');
var myFridge = document.getElementById('fridge');
var button = document.getElementById('btn');

var colors = ['#FC0A08', '#7F00C9', '#196CFC', '#FD761C', '#5FFC3C'];
var randomColor;



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
  var localMagnets = localStorage.getItem('magnet');
  console.log(`localMagnets = ${localMagnets}`);
  var magnets = JSON.parse(localMagnets);
  console.log(`magnet = ${magnets}`);

  if (magnets && magnets.length) {
    console.log('Found it in storage');
    Magnet.allMagnets = magnets;
    reuseMagnets();
  }
  else {
    createMagnets();
  }
}

function reuseMagnets()
{
  for (var i = 0; i < Magnet.allMagnets.length; i++)
  {
    var tag = addElement('p', Magnet.allMagnets[i].magnetName, myFreezer);
    randomColor = Math.floor(Math.random() * 5);

    tag.setAttribute('style', `position: absolute; left: ${Magnet.allMagnets[i].positionX}px; top: ${Magnet.allMagnets[i].positionY}px; color: ${colors[randomColor]}`);
    tag.addEventListener('dragstart', dragstart_handler);
  }
}



function createMagnets() {
  console.log('In createMagnets()');
  for (var i = 0; i < alphabetMagnets.length; i++) {
    console.log('In for loop');
    var x = rando(375, 875);
    var y = rando(30, 400);
    randomColor = Math.floor(Math.random() * 5);

    new Magnet(alphabetMagnets[i], x, y);

    var tag = addElement('p', alphabetMagnets[i], myFreezer);
    tag.setAttribute('style', `position: absolute; left: ${x}px; top: ${y}px; color: ${colors[randomColor]};`);
    tag.addEventListener('dragstart', dragstart_handler);

  }
}

function addElement(element, content, parent){
  // console.log('in add element function');
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

function setLocalStorage(magnet){
  console.log(`in local storage function ${magnet}`);
  localStorage.setItem('magnet', JSON.stringify(Magnet.allMagnets));
}

function grabMagnet(ev,data){
  var pId = data;
  for(var i = 0; i < Magnet.allMagnets.length; i++){

    if(Magnet.allMagnets[i].magnetName === pId){
      Magnet.allMagnets[i].positionX = ev.pageX;
      Magnet.allMagnets[i].positionY = ev.pageY;
      setLocalStorage(Magnet.allMagnets[i]);
      break;
    }

  }

}

function dragstart_handler(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.id);
  ev.dropEffect = 'move';
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
}

function drop_handler(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text/plain');
  var selected = document.getElementById(data);
  ev.target.appendChild(document.getElementById(data));
  selected.style.position = 'absolute';
  selected.style.left = ev.pageX - selected.offsetWidth / 2 + 'px';
  selected.style.top = ev.pageY - selected.offsetHeight / 2 + 'px';


  grabMagnet(ev,data);


  //set to local storage.
  // console.log(data);
  // console.log(ev);
  button.onclick = function(){
    localStorage.clear();
    document.location.reload(true);
  }


  grabMagnet(ev,data);

}

function changeBackground() {
  var x = document.getElementById('background').value;
  document.body.style.backgroundImage='url(' + x + ')';
}


myFridge.addEventListener('dragover', dragover_handler);
myFridge.addEventListener('drop', drop_handler);

myFreezer.addEventListener('dragover', dragover_handler);
myFreezer.addEventListener('drop', drop_handler);



initialize();

