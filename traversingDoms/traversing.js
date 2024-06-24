const header = document.querySelector('header')  //gets the header element
const sections = document.querySelectorAll('section') //gets all section 
const currentSec = document.querySelector('section.current')
const nextSec = currentSec.nextElementSibling
const header2 = currentSec.previousElementSibling.children[0]
const highlight = currentSec.parentElement 
const h2Sections = Array.from(document.querySelectorAll('h2')).map(function(h2){return h2.parentElement})

console.log(header)
console.log(sections)
console.log(currentSec)
console.log(nextSec)
console.log(header2)
console.log(highlight)
console.log(h2Sections)

