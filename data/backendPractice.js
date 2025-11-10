const xhr = new XMLHttpRequest()


xhr.addEventListener('load', () => {
  console.log(xhr.response)
})
xhr.open('GET', 'https://supersimplebackend.dev');


// We have 'POST', 'PUT' and 'DELETE' too
xhr.send();
// this is a request respond cycle in backend
