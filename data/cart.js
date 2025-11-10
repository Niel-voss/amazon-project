export let cart = JSON.parse(localStorage.getItem('cart')) ||
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

}]

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}


 export function addToCart(productId, button){
  //included the two parameters because...


   let macthingItem = '';

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        macthingItem = cartItem;
      }
    });

    // get the selected quantity for this specific product
    const container = button.closest('.product-container'); //closest looks up for parents div so button is the parent
    const quantitySelector = container.querySelector('.js-quantity-selector'); //document.queryselctor here would'nt have been specific enough we cant loop tro selectors in each container
    const quantity = +(quantitySelector.value); // convert to number

    
    if (macthingItem) {
      macthingItem.quantity += quantity;
    } else {
      cart.push({
        productId, quantity
      });
    }
    saveToStorage()
}

export function removeFromCart(productId){

  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) //if an item as been deleted from the original cart the rest item will push to the new cart

    {newCart.push(cartItem)}
  })

  cart = newCart

  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionId){
  
   let macthingItem = '';

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        macthingItem = cartItem;
      }
    });

    macthingItem.deliveryOptionId = deliveryOptionId

    saveToStorage()

}



//this function loads the api for the cart from an external library or database

export function loadCart(fun){

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
  
fun()
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart')

  xhr.send();
}