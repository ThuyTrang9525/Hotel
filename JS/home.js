//Js cho phần chuyển slide
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
console.log(typeof(next));
next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) 
})

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const productId = getQueryParameter('id');
console.log(productId);
//Js cho phần model
var modal = document.getElementById('modal');
var btn = document.getElementById("book-room");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    if(modal.style.display=="block"){
        modal.style.display = "none";
    }else{
        modal.style.display="block"
    }
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
