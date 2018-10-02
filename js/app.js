'use strict';

var magnetLetters = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];

function Magnet(magnet, x, y) {
  this.magnetName = magnet;
  this.positionX = x;
  this.positionY = y;

  Magnet.allMagnets.push(this);
}

Magnet.allMagnets = [];

function checkLocalStorage()
{
  console.log('In local storage');
  var localMagnets = localStorage.getItem('magnets');
  console.log(`localMagnets = ${localMagnets}`);
  var magnets = JSON.parse(localMagnets);
  console.log(`magnets = ${magnets}`);

  if (magnets && magnets.length) {
    console.log('Found it in storage');
    Magnet.allMagnets = magnets;
  }
}

function createMagnets()
{
  // Create a for loop set to the length of the magnets array
}

function rando(min, max)
{
  var randomNumber = Math.floor(Math.random()*(max-min+1))+min;
 
  return randomNumber;
}

checkLocalStorage();
