async function getProducts() 
{
    let url = 'http://127.0.0.1:3000/api/products';
    try 
    {
        let res = await fetch(url);
        return await res.json();
    } 
    catch (error) 
    {
        console.log(error);
    }
}

async function addProductsToHtml()
{
    let res = await getProducts();
    let elem = document.getElementById('items');
    
    let html='';
    for (let i = 0; i < res.length; i++) 
    {
        html+= `<a href="./product.html?id=${res[i]._id}">
        <article>
          <img src="${res[i].imageUrl}" alt="${res[i].altTxt}">
          <h3 class="productName">${res[i].name}</h3>
          <p class="productDescription">${res[i].description}</p>
        </article>
      </a>`
        
     }

     elem.innerHTML=html;
   
}

addProductsToHtml();



