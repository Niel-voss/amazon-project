import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cartOop.js'

import { loadProducts } from "../data/products.js";

import { loadCart } from "../data/cart.js";
//import '../data/backendPractice.js'



async function initPage() {
// now this runs the load product and load cart at the same time 

  await Promise.all([
    new Promise((resolve) =>{
      loadProducts(resolve)
    }),
    new Promise((resolve) => {
      loadCart(resolve)
    })
  ])

  // after both finish, run the render summaries
  renderOrderSummary();
  renderPaymentSummary()

}

// now run the full  function

initPage()

//note that async and await does make use of callbacks

/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve()
    })
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary()
})*/


/*
new Promise((resolve) => {
loadProducts(() => {
  resolve(); // we wait for it to finish
});
}).then(() => {
   renderPaymentSummary()

  renderOrderSummary()
})*/


//runs the function inside it only after it has run or resolved the load products function
// the resolve function is the render


/*loadProducts(() => {
  renderPaymentSummary()

  renderOrderSummary()
})*/

//the anonymous function is actually a parameter 'fun'

//more notes about the promise and resolve sintax is that it runs the all the function and the next step at the same time