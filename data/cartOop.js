
const cartOop = {

  cartItems : JSON.parse(localStorage.getItem('cart-oop')) ||
[{
  productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
  quantity: 2,
  deliveryOptionId: '1'
}, {
  productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  quantity: 3,
  deliveryOptionId: '2'
}, {
  productId:  "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
  quantity: 5,
  deliveryOptionId: '3'

}],

   saveToStorage : function(){
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems))
},

/*   u can use this instead('its called a method)
 saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
*/

addToCart: function(productId, button){
  //included the two parameters because...


   let macthingItem = '';

   this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        macthingItem = cartItem;
      }
    });

    // get the selected quantity for this specific product
    const container = button.closest('.product-container'); //closest looks up for parents div so button is the parent
    const quantitySelector = container.querySelector('.js-quantity-selector'); //document.queryselctor here wouldnt have been specific enough we cant loop tro selectors in each container
    const quantity = +(quantitySelector.value); // convert to number

    
    if (macthingItem) {
      macthingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId, quantity
      });
    }
   this.saveToStorage()
},



 removeFromCart: function(productId){

  const newCart = [];

  this.cartItems.forEach((cartItem) => {
    if(cartItem.productId !== productId) //if an item as been deleted from the original cart the rest item will push to the new cart

    {newCart.push(cartItem)}
  })

  this.cartItems = newCart

  this.saveToStorage()
},


updateDeliveryOption: function(productId, deliveryOptionId){
  
   let macthingItem = '';

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        macthingItem = cartItem;
      }
    });

    macthingItem.deliveryOptionId = deliveryOptionId

   this.saveToStorage()

}

};


console.log(cartOop)



