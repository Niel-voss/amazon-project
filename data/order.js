export const customerOrders = JSON.parse(localStorage.getItem('customerOrders')) || []; 

export function addOrder(order){
  customerOrders.unshift(order)
  saveToStorage()
}

function saveToStorage(){
  localStorage.setItem('customerOrders', JSON.stringify(customerOrders))
}