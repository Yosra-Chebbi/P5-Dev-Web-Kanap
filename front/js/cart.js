
async function addPanierToHtml()
{
    //console.log(localStorage.getItem("resultat"));
  
    let html='';
    
    for (let i = 0; i < localStorage.length; i++) 
    {
     let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
      
      html+= `<article class="cart__item" data-id="{product-ID}">
       <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="${product.altTxt}">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__titlePrice">
           <h2>${product.name}</h2>
           <p>${product.price}€</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
           </div>
           <div class="cart__item__content__settings__delete">
             <p class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article> `;
}
    document.getElementById('cart__items').innerHTML = html;

}

addPanierToHtml();

async function addQuantityPanierToHtml()
{
  let qty = document.getElementById('totalQuantity'); 
  let totalprice = document.getElementById('totalPrice'); 
  let array = document.getElementsByClassName('itemQuantity');
  let array2 = document.getElementsByClassName('cart__item__content__titlePrice');
let sum1 = 0;
let sum2 = 0;

for (let i = 0; i < array.length; i++) {
    sum1 += parseInt(array[i].value);
    sum2 += ( parseInt(array[i].value) * parseInt(array2[i].children[1].innerText));
}
qty.innerHTML = sum1;
totalprice.innerHTML = sum2;
}
addQuantityPanierToHtml();
