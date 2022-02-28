var productName= document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productsContainer;
var updateIndex;
var errors=``;
if(localStorage.getItem("productsList")== null){
    productsContainer=[];
}
else{
    productsContainer= JSON.parse(localStorage.getItem("productsList"));
    displayProducts();
}

function addProduct() {

    if(validateProductName()== true){
        product ={
            productName: productName.value,
            productPrice: productPrice.value,
            productCategory: productCategory.value,
            productDesc: productDesc.value
        };
        productsContainer.push(product);
        localStorage.setItem("productsList",JSON.stringify(productsContainer));
        console.log(productsContainer);
        validateProductName();
         clearForm();
         displayProducts();
        
    }

    else{
        window.alert("product name invalid");
    }
            
        }
    
   

function displayProducts(){
    var cartoona=``;
    for(i=0; i<productsContainer.length; i++){

        cartoona+=`<tr>
        <th>${i}</th>
        <th>${productsContainer[i].productName}</th>
        <th>${productsContainer[i].productPrice}</th>
        <th>${productsContainer[i].productCategory}</th>
        <th>${productsContainer[i].productDesc}</th>
        <th><button onclick="updateProducts(${i})" class="btn btn-outline-info">Update</button></th>
        <th><button onclick="deleteProducts(${i})"  class="btn btn-outline-primary">Delete</button></th>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartoona;
}

function searchProducts( searchTerm ){
    var cartoona=``;
    for(i=0; i<productsContainer.length; i++)
    {
     if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true || productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true){
         
        cartoona+=`<tr>
        <th>${i}</th>
        <th>${productsContainer[i].productName}</th>
        <th>${productsContainer[i].productPrice}</th>
        <th>${productsContainer[i].productCategory}</th>
        <th>${productsContainer[i].productDesc}</th>
        <th><button onclick="updateProducts(${i})" class="btn btn-outline-info">Update</button></th>
        <th><button onclick="deleteProducts(${i})" class="btn btn-outline-primary">Delete</button></th>
        </tr>`

     }
        else{
             
        }
        
    }
    document.getElementById("tableBody").innerHTML=cartoona;
}

function deleteProducts(index){
    productsContainer.splice(index,1);
    localStorage.setItem("productsList",JSON.stringify(productsContainer));
    displayProducts();

}
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";


}
 function updateProducts(index){
     productName.value=productsContainer[index].productName;
     productPrice.value=productsContainer[index].productPrice;
     productCategory.value=productsContainer[index].productCategory;
     productDesc.value=productsContainer[index].productDesc;
     updateIndex=index;

     document.getElementById("save").style.display="inline";

 }
 function saveProduct(){
     var updateProduct={
         productName:productName.value,
         productPrice:productPrice.value,
         productCategory:productCategory.value,
         productDesc:productDesc.value

     }
     productsContainer.splice(updateIndex,1,updateProduct);
     localStorage.setItem("productsList",JSON.stringify(productsContainer));

     document.getElementById("save").style.display="none";
     clearForm();
     displayProducts();

 }
 function validateProductName(){

    var regex=/^[A-Z][a-z]{3,8}$/
    if(regex.test(productName.value)==true){
        return true;
    }
    else{
        errors+=`<p>productName not valid</p>`;
        return false;
    }
    
 }