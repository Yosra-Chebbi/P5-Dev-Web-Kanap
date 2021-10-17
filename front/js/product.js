
async function getId()
{
    let str =  window.location.href;
    var url = new URL(str);
    var id = url.searchParams.get("id");
    return id;
}

async function getProduct() 
{
    let id = await getId();
    let URL =  "http://127.0.0.1:3000/api/products/"+id;
    try 
    {
        let res = await fetch(URL);
        return await res.json();
    } 
    catch (error) 
    {
        console.log(error);
    }
}

async function addProductToHtml()
{
    let res = await getProduct();

    let elem = document.getElementsByClassName('item__img')[0];
    let image = document.createElement('img');
    image.src = res.imageUrl;
    image.alt = res.altTxt;
    elem.appendChild(image);

    let h1 = document.getElementById('title');
    h1.innerText = res.name;

    let prix = document.getElementById('price');
    prix.innerText = res.price;

    let description = document.getElementById('description');
    description.innerText = res.description;

    let color = document.getElementById('colors');
    for(let i=0; i < res.colors.length;i++)
    {
        let couleur = document.createElement('option');
        couleur.value = res.colors[i];
        couleur.innerText = res.colors[i];
        color.appendChild(couleur);
    }
    return res;

}

async function init()
{
    let product = await addProductToHtml();

    document.getElementById("addToCart").addEventListener("click", 
    function () {
        
        product.color   = document.getElementById('colors').value;
        product.quantity= document.getElementById('quantity').value;

        localStorage.setItem(product._id,  JSON.stringify(product));
    
        console.log("votre clé est :"+localStorage.getItem(product._id));
    });

}


init();