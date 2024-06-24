const header = document.querySelector('header')                                                                                 //gets the header element

const sections = document.querySelectorAll('section')                                                                           //gets all section elements in the document

const currentSec = document.querySelector('section.current')                                                                    //References the firsst section element with the class "current"

const nextSec = currentSec.nextElementSibling                                                                                   //references the next siblimg of `currentSec`

const header2 = currentSec.previousElementSibling.children[0]                                                                   //references the first chils element of the prev sibling of currentSec

const highlight = currentSec.parentElement                                                                                      //References the parent element of currentSec

const h2Sections = Array.from(document.querySelectorAll('h2')).map(function(h2){return h2.parentElement})                       //contains an array of references to the parent elements of all h2 elements in the document (converts the resulting NodeList to an array and maps each h2 element to its parent)

console.log(header)
console.log(sections)
console.log(currentSec)
console.log(nextSec)
console.log(header2)
console.log(highlight)
console.log(h2Sections)

