var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);

//Page js utilisée par deux pages html
if (page == "cart.html") {
  /*Affichage des produits ajoutés dans le panier.*/
  async function addPanierToHtml() {
    let html = "";

    for (let i = 0; i < localStorage.length; i++) {
      let product = JSON.parse(localStorage.getItem(localStorage.key(i)));

      html += `<article class="cart__item" data-id=${
        product._id + product.color
      }>
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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                product.quantity
              }">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `;
    }
    document.getElementById("cart__items").innerHTML = html;
    //Ajout des events listeners, chaque fois qu'on construit la page html
    SupprimerProduit();
  }

  addPanierToHtml();

  /*Calculer le total de la quantité et le prix des produits.*/
  async function totalQuantityPricePanierToHtml() {
    let qty = document.getElementById("totalQuantity");
    let totalprice = document.getElementById("totalPrice");
    let array = document.getElementsByClassName("itemQuantity");
    let array2 = document.getElementsByClassName(
      "cart__item__content__titlePrice"
    );
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < array.length; i++) {
      sum1 += parseInt(array[i].value);
      sum2 +=
        parseInt(array[i].value) * parseInt(array2[i].children[1].innerText);
    }
    qty.innerHTML = sum1;
    totalprice.innerHTML = sum2;
  }

  totalQuantityPricePanierToHtml();

  /*Modification de la qunantité des produits.*/
  async function changeQuantityPanier() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < itemQuantity.length; i++) {
      itemQuantity[i].addEventListener("change", function () {
        let key = document.querySelectorAll("article")[i].dataset.id;
        console.log("product :" + key);
        let quantity = itemQuantity[i].value;

        let product = JSON.parse(localStorage.getItem(key));
        product.quantity = quantity;
        localStorage.setItem(key, JSON.stringify(product));
        totalQuantityPricePanierToHtml();
      });
    }
  }

  changeQuantityPanier();

  /*Suppression des produits par le bouton supprimer.*/
  async function SupprimerProduit() {
    let deleteProduct = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteProduct.length; i++) {
      deleteProduct[i].addEventListener("click", function () {
        let key = document.querySelectorAll("article")[i].dataset.id;
        localStorage.removeItem(key);
        addPanierToHtml(); //reconstruire le html
        totalQuantityPricePanierToHtml(); // recalculer la quantity et le prix total
      });
    }
  }

  /*Fonction activer et désactiver le bouton commander.*/
  function disableSubmit(disabled) {
    if (disabled) {
      document.getElementById("order").setAttribute("disabled", true);
    } else {
      document.getElementById("order").removeAttribute("disabled");
    }
  }

  /*Analyser les données saisies par l’utilisateur dans le formulaire.*/
  async function ReglerFormulaire() {
    let formulaire = document.querySelectorAll(".cart__order__form__question");
    //Traitement commun pour : firstName, lastName et city
    for (let i = 0; i < formulaire.length; i++) {
      if (i == 0 || i == 1 || i == 3) {
        formulaire[i].children[1].addEventListener("input", function (e) {
          if (/^[a-zA-ZéèçàÀÉÈÇ ]+$/.test(e.target.value)) {
            formulaire[i].children[2].innerText = " ";
            disableSubmit(false);
          } else {
            formulaire[i].children[2].innerText = "ci est un message d'erreur";
            disableSubmit(true);
          }
        });
      }
    }

    let address = document.getElementById("address");
    address.addEventListener("input", function (e) {
      if (/^[a-zA-Z0-9\s\,\''\-]+$/.test(e.target.value)) {
        document.getElementById("addressErrorMsg").innerText = "";
        disableSubmit(false);
      } else {
        document.getElementById("addressErrorMsg").innerText =
          "ci est un message d'erreur";
        disableSubmit(true);
      }
    });

    var email = document.getElementById("email");
    email.addEventListener("input", function () {
      if (email.validity.valid) {
        document.getElementById("emailErrorMsg").innerHTML = "";
        disableSubmit(false);
      } else {
        document.getElementById("emailErrorMsg").innerText =
          "ci est un message d'erreur";
        disableSubmit(true);
      }
    });
  }

  ReglerFormulaire();

  /*Fonction qui retourne un tableau d'ids des produits commandés.*/
  function getProductKey() {
    let array = [];

    for (let i = 0; i < localStorage.length; i++) {
      array.push(JSON.parse(localStorage.getItem(localStorage.key(i)))._id);
    }
    return array;
  }

  /*Envoyer des données avec une requête POST et recevoir le numéro du commande.*/
  function send(e) {
    console.log("TEST");
    e.preventDefault();
    fetch("http://127.0.0.1:3000/api/products//order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          email: document.getElementById("email").value,
        },
        products: getProductKey(),
      }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        window.location.href = `confirmation.html?order=${value.orderId}`;
        localStorage.clear(); //vider le panier après le passage de commande
      });
  }

  document.getElementById("order").addEventListener("click", send);
} // page confirmation.html
else {
  let str = window.location.href;
  var url = new URL(str);
  var order = url.searchParams.get("order");
  document.getElementById("orderId").innerText = order;
}
