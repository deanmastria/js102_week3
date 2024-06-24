function initializeCart() {                                                     
    if (!localStorage.getItem('cart')) {                                                                //checks to see if item cart exists in localStorage
        const emptyCart = [];                                                                           // if no cart exists, this liine initializes an empty array named "cart"
        localStorage.setitem('cart', JSON.stringify(emptyCart));                                        //Stores the empty cart in localStorage and converts the array to a JSOn string to sotre complex data
    }}


function displayCart