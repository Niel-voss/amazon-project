import { addOrder, customerOrders} from "../../data/order.js";
import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";

import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){

  let productPriceCents = 0;
    let ShippingPriceCents = 0; 

  
  //now, do as usual 
  //save the data(model)
  //Generate the HTML
  //then make it interactive

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity
   const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId)
   ShippingPriceCents += deliveryOption.priceCents
  });


  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents
  const taxCents = totalBeforeTaxCents * 0.1;
 const totalCentsPrime = totalBeforeTaxCents + taxCents 


  const paymentSummaryHTML = `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Checkout()</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency( ShippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCentsPrime)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your fucking order mf!
          </button>
  `

 document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML

 document.querySelector('.js-place-order').addEventListener('click', async () => {

  try {
      const response = await fetch('https:/supersimplebackend.dev/orders', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart
    })
  })
   const order = await response.json()
   addOrder(order)
    
  } catch (error) { 
    console.log('unexpected error try again later')
  }

  window.location.href = 'orders.html'

 });

}

