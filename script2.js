
window.onload = onpageload;

var loaderComponent = document.getElementById('loader');

//Array to save selected item
var array = [];

//onload function
function onpageload() {
  loaderComponent.style.display = 'block';
  fetchProductData();
}

//funtion to load data dynamically
function fetchProductData() {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => {
      showProductsList(products);
      isCartEmpty()
    });
}

//function to show data on the html page
function showProductsList(products) {    //console.log('Ready to print product');
  loaderComponent.style.display = 'none';
  let output = '<h1 style="color:red;">Lists of products</h1>';
  products.forEach(function(product) {
    output += `
            <hr>
            <div class="product">
              <div class="prod_image">
                <img src="${product.image}" alt="product_Photo">
              </div>
              <diV class="prod_info">
                <div>
                  <h3 id="Name" style="color:blue;">${product.title}</h3>
                  <p><i>${product.description}</i></p>
                  <p>Category : ${product.category}</p>
                  <h5>Rating : ${product.rating.rate}</h5>
                  <div class="checkbox">                 
                    <div><input type="checkbox" value="${product.title}" id="${product.id}" onclick="addToCard(value,id)"></div>
                    <div style="font-style:normal;">Add to cart</div>
                  </div>
                </div>
              </diV>
            </div>
    `;
    document.getElementById("response").innerHTML = output;
  }); 
  console.log('after Fetch call');
}


//Function to add selected item in array or cart
function addToCard(product,Id){ 
  console.log('after Fetch call add');
  console.log(product);
  var checkBox = document.getElementById(Id);
  if (checkBox.checked == true){
    array.push(product);
  } else {
    removeItem(array, product);
  }
  showcart();
}


//function to show all selected item on html page
function showcart() {
 // console.log(array);
  let output = ``;
  //console.log(array.length)
  let size = array.length; 
  if(size == 0)
  {
    output += `
    <div class="cart"> 
       <h3>Empty Cart</h3>
    </div>`;
  }  
  else{         
  for (i = 0; i< size; i++) {
    output += `
    <div class="cart"> 
    ${(i+1)} -- ${array[i]}
    </div>`;          
    }   
  }    
  document.getElementById("target-id").innerHTML = output;
}


//function to remove unchecked items from array or cart
function removeItem(array, item){
  for(var i in array){
      if(array[i]==item){
          array.splice(i,1);
          break;
      }
  }
}


//To show cart or array is empty
function isCartEmpty(){
  let output = ``;
  if(array.length==0)
  {
    output += `
    <div class="cart"> 
      
    </div>`;          
  }
  document.getElementById("target-id").innerHTML = output;
}
