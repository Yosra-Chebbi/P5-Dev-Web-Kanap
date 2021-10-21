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
      /* 
       let elem = document.getElementById('items');
        let a = document.createElement('a');
        a.href = "./product.html?id=${res[i]._id}";
        elem.appendChild(a);
        
        let article = document.createElement('article');
        a.appendChild(article);
        
        let image = document.createElement('img');
        image.src = res[i].imageUrl;
        image.alt = res[i].altTxt;
        article.appendChild(image);
        
        let h3 = document.createElement('h3');
        h3.class = "productName";
        h3.innerText = res[i].name;
        article.appendChild(h3);  
        
        let p = document.createElement('p');
        p.class = "productDescription";
        p.innerText = res[i].description;
        article.appendChild(p);
         
     }

     elem.innerHTML=html;
   
}

addProductsToHtml();



