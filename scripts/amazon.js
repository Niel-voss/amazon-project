import {cart, addToCart, saveToStorage} from '../data/cart.js' //works only on live server

import { products, loadProducts } from '../data/products.js';



// now we loop tro the array of object sowe can generate them in the page


loadProducts(renderProductGrid)

// had to wait for the load product function to complete fetch the data from the back end before doing anything so i created the  render product grid, exported it and the called it inside my api function and we call it a call ack function


/* set time out of atleast 10 seconds works but what if the user has a bad network reception

they're all call backs atleast

setTimeout(() => {
  renderProductGrid()
}, 5)*/


export function renderProductGrid(){

updateCartQuantity()
let productsHTML = '';
products.forEach((product) => {
  const html =`  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div> 

          <div class="product-price">  ${product.getPrice()}
          
          </div>

          <div class="product-quantity-container">
            <select class= "js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-feedback">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${product.id}> <!--data atribute here-->
            Add to Cart
          </button>
        </div>`

        //we used a data attribute on the add to cart button so that the button has acces to some data when we click on it
    //we attached a data attribute to the buttns using a data attribute and kebhab case so that we get get a data when we click on a button also using button.dataset (gives all the data attribute that are in the button)
    //change of mind i no longer want to use data attribute because its too complicated so i used the closest method where we target the parent di then use that  parent div to get our desired qquery selector

        productsHTML +=html;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML



function  updateCartQuantity(){
  let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
        document.querySelector('.js-cart-increment').innerHTML = cartQuantity;
}




document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; //used closest here again

  
    addToCart(productId, button)

 updateCartQuantity()

const productDiv = button.closest('.product-container')
const feedback = productDiv.querySelector('.js-added-feedback')
     feedback.classList.add('show');

     setTimeout(() => {
      feedback.classList.remove('show')
     }, 800)
  });
}); 

}