
async function addPanierToHtml()
{
    let html='';
    
    for (let i = 0; i < localStorage.length; i++) 
    {
     let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
      
      html+= `<article class="cart__item" data-id=${product._id+product.color}>
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
    Supprimerproduit();
}

addPanierToHtml();

async function totalQuantityPricePanierToHtml()
{
  let qty = document.getElementById('totalQuantity'); 
  let totalprice = document.getElementById('totalPrice'); 
  let array = document.getElementsByClassName('itemQuantity');
  let array2 = document.getElementsByClassName('cart__item__content__titlePrice');
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < array.length; i++) 
  {
      sum1 += parseInt(array[i].value);
      sum2 += ( parseInt(array[i].value) * parseInt(array2[i].children[1].innerText));
  }
  qty.innerHTML = sum1;
  totalprice.innerHTML = sum2;
}

totalQuantityPricePanierToHtml();

async function changequantitypanier()
{
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for(let i = 0; i < itemQuantity.length; i++) 
  {
    itemQuantity[i].addEventListener("change", function() 
    {
        let key = document.querySelectorAll("article")[i].dataset.id;
        console.log("product :"+key);
        let quantity= itemQuantity[i].value;

        let product =JSON.parse(localStorage.getItem(key));
        product.quantity = quantity;
        localStorage.setItem(key,  JSON.stringify(product));
        totalQuantityPricePanierToHtml();
    });
    }
  
}

changequantitypanier(); 

async function Supprimerproduit()
{
  let deleteProduct = document.querySelectorAll(".deleteItem");
  for(let i = 0; i < deleteProduct.length; i++) 
  {
    deleteProduct[i].addEventListener("click", function() 
    {
      let key = document.querySelectorAll("article")[i].dataset.id;
      localStorage.removeItem(key);
      addPanierToHtml();
      totalQuantityPricePanierToHtml();
    });
  }
}

async function ReglerFormulaire()
{
  let formulaire = document.querySelectorAll(".cart__order__form__question");
  for(let i = 0; i < formulaire.length; i++) 
  {
    if (i==0 || i== 1 || i==3 )
    {
        formulaire[i].children[1].addEventListener("input", function(e) {
        if (/^[a-zA-ZéèçàÀÉÈÇ ]+$/.test(e.target.value)) {
          formulaire[i].children[2].innerText=" ";
          
        } else {
          
          formulaire[i].children[2].innerText="ci est un message d'erreur";
          
        }
      });
   }
  }
   let address = document.getElementById("address");
   address.addEventListener("input", function(e) {
  if (/^[a-zA-Z0-9\s\,\''\-]*$/.test(e.target.value)) {
    document.getElementById("addressErrorMsg").innerText=" ";
    
  } else {
    
    document.getElementById("addressErrorMsg").innerText="ci est un message d'erreur";
    
  }
});
  var email = document.getElementById('email');
email.addEventListener("input", function () {
  if (email.validity.valid) {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }else {
    
      document.getElementById("emailErrorMsg").innerText="ci est un message d'erreur";
    }
  });
  
}

ReglerFormulaire();

