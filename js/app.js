'use strict';

var magnets = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];

function Magnet(magnet, x, y) {
  this.magnetName = magnet;
  this.positionX = x;
  this.positionY = y;

  Magnet.allMagnets.push(this);
}

Magnet.allMagnets = [];

function checkLocalStorage()
{
  var localMagnets = localStorage.getItem('magnets');
  var magnets = JSON.parse(localMagnets);

  if (magnets && magnets.length) {
    console.log('Found it in storage');
    Magnet.allMagnets = magnets;
  }
}

checkLocalStorage();
