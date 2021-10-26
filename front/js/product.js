/*Récupérez de la valeur de paramètre id de l'url */
async function getId() {
  let str = window.location.href;
  var url = new URL(str);
  var id = url.searchParams.get("id");
  return id;
}

/*Envoyer une requête GET sur un seul produit et récupérez le résultat*/
async function getProduct() {
  let id = await getId();
  let URL = "http://127.0.0.1:3000/api/products/" + id;
  try {
    let res = await fetch(URL);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/*Afficher le produit, qu'on a choisi de la page d'accueil, sur la page produit .*/
async function addProductToHtml() {
  let res = await getProduct();

  let elem = document.getElementsByClassName("item__img")[0];
  let image = document.createElement("img");
  image.src = res.imageUrl;
  image.alt = res.altTxt;
  elem.appendChild(image);

  let h1 = document.getElementById("title");
  h1.innerText = res.name;

  let prix = document.getElementById("price");
  prix.innerText = res.price;

  let description = document.getElementById("description");
  description.innerText = res.description;

  let color = document.getElementById("colors");
  for (let i = 0; i < res.colors.length; i++) {
    let couleur = document.createElement("option");
    couleur.value = res.colors[i];
    couleur.innerText = res.colors[i];
    color.appendChild(couleur);
  }
  return res;
}

/*Stocker les données du produit en plus de la couleur et la quantité choisis.*/
async function storeData() {
  let product = await addProductToHtml();

  document.getElementById("addToCart").addEventListener("click", function () {
    product.color = document.getElementById("colors").value;
    product.quantity = document.getElementById("quantity").value;

    //clé de local storage est "id" +"couleur", pour permettre de choisir le même produit avec couleurs diffrentes
    let key = product._id + product.color;
    let found = false;
    for (let i = 0; i < localStorage.length; i++) {
      if (key == localStorage.key(i)) {
        console.log("Product already exist :" + localStorage.getItem(key));
        let old_product = JSON.parse(localStorage.getItem(key));
        old_product.quantity =
          parseInt(old_product.quantity) + parseInt(product.quantity);
        localStorage.setItem(key, JSON.stringify(old_product));
        found = true;
      }
    }

    // Produit n'existe pas dans le local storage, ajout d'un nouveau produit
    if (found == false) {
      localStorage.setItem(key, JSON.stringify(product));
      console.log("Add new product :" + localStorage.getItem(key));
    }
  });
}

//Appeller cette fonction au chargement de la page web
storeData();
