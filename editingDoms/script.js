let list = document.getElementById('list');                                                     //retrieves the DOM elemenet with the id 'list' and stores it in the variable `list`, allowing direct manipulation to the elements themselves

list.innerHTML = list.innerHTML.replace('Apples', 'Granny Smith Apples');                       //updates the HTML content inside `list and replaces apples with Granny smiths

let oatMilkItem = Array.from(list.children).find(item => item.textContent === 'Oat Milk');      //Finds Oat Milk, wherever it is in the array and removes it if it exists (previously used (document.querySelector('li:last-child').remove();) but that would not have specifically accounted for the criteria in the assignement
if (oatMilkItem) {
    oatMilkItem.remove();
}                                             

let newLI = document.createElement('li');                                                       //creates a new `<li>` element and sets its innerHTML to Kombucha
newLI.innerHTML = 'Kombucha';

list.appendChild(newLI);                                                                        //Appendds the new `li` element  to the end of the `list` element

let itemsToAdd = ['Protein Bars', 'Almonds', 'Peanut Butter'];                                  //Defines an arrat `itemsToAdd` containing strings of itmes to be added to the shopping list

list.innerHTML = ' ';                                                                           //Clears the list, setting `innerHTML` to an empty string

itemsToAdd.forEach(item => {                                                                    //Dynamically adds each item from the `itemsToAdd` array to the `list` element, stating that: if the item === Almonds, add it to the class "important"

    let newItem = document.createElement('li');
    newItem.innerHTML = item;

    if (item === 'Almonds') {                                                                   //if the item === Almonds, add it to the class "important"
        newItem. classList.add('important');
    }

    list.appendChild(newItem);                                                                  //Iterate through each itme in the `iTA` array using `forEach()` creating a new `<li>` element before appending it to the `list`
});

