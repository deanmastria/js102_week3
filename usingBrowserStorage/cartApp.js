function initializeCart() {                                                     
    if (!localStorage.getItem('cart')) {                                                                //checks to see if item cart exists in localStorage

        const emptyCart = [];                                                                           // if no cart exists, this liine initializes an empty array named "cart"

        localStorage.setItem('cart', JSON.stringify(emptyCart));                                        //Stores the empty cart in localStorage and converts the array to a JSOn string to sotre complex data, store it in the key 'cart
    }
}

    function addItem(item) {
        const cart = JSON.parse(localStorage.getItem('cart'));                                          //Gets the current cart from localStorage, parses it from JSON format bac into a JS array and assigns it to the cart value
    
        cart.push(item);                                                                                // adds the item to the cart array
    
        localStorage.setItem('cart', JSON.stringify(cart));                                             // converts the cart array back into a JSOn string and updates the cart item in LocalStorage
    }
    
    function removeItem(itemId) {                                                               
        
        let cart = JSON.parse(localStorage.getItem('cart'));                                            //gets the current cart from localStorage, parses it from JSOn to a JS array and assigns the 'cart' variable
        const index = cart.findIndex(item => item.id === itemId);                                       //Uses findIndex method, finds the index of the item in the cart array whose id matched the item id
        if(index !== -1) {                                                                              //Checks to see if the item was found (doesnt equal -1)
            cart.splice(index, 1);                                                                      //remove item from the array using splice method based on the index found
        }
        localStorage.setItem('cart', JSON.stringify(cart));                                             //Converts the cart array back into a JSON string and updates the cart item in LocalStorage
    }
    

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));                                              //gets the current cart from localStorage, parses it from JSON to a JS array and assigns the 'cart' variable

    console.log(cart);                                                                                  //Logs whats in the cart array to the console
}

initializeCart();

document.getElementById('addItemForm').addEventListener('submit', function(event) {                     //Event listener added to the form with id 'addItemForm' for the 'submit' event.
    event.preventDefault();                                                                             //prevents the default form submission behaviourto stop the page reloading 

    const itemName = document.getElementById('itemName').value;                                         //Retrieves the value itemName when entered by user
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);                           //Same as above but parses the input into a floating point number

    const itemId = Date.now();                                                                          //creates a unique intemID using the current timestamp

    const item = { id: itemId, name: itemName, price: itemPrice};                                       //Creates an item object with properties id, name, and price 

    addItem(item);                                                                                      //calls the addItem function

    document.getElementById('itemName').value = '';                                                     //clears the itemName input field
    document.getElementById('itemPrice').value = '';                                                    //same as above for itemPrice
});

document.getElementById('displayCartButton').addEventListener('click', displayCart);                    //Event listener added to the button with id 'displayCartButton' for the 'click' event. Executes the displayCart function when the button is clicked.
