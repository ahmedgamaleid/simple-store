 // Define an array to store selected products in the global scope
 let selectedProducts = [];

 // Define bodyproduct at the global scope
 const bodyproduct = document.getElementById('bodyproduct');

 // Function to fetch and display products from the fakestoreapi
 async function searchProducts() {
   let response = await fetch("https://fakestoreapi.com/products");
   if (!response.ok) {
     console.error(`HTTP error! Status: ${response.status}`);
     return;
   }

   const data = await response.json();
   console.log(data);
   displayProducts(data);
 }

 function displayProducts(arr) {
   let cartona = "";
   for (let i = 0; i < arr.length; i++) {
     // Add a data attribute to store the product information
     cartona += `
       <div class="col-lg-2 g-4 data  g-3 d-flex flex-column justify-content-between">
         <div class="show position-relative overflow-hidden rounded-2  d-flex justify-content-center">
           <img src="${arr[i].image}" class="w-100 p-4">
           <div class="show-layer position-absolute d-flex align-items-center justify-content-center text-black p-3">
             <p style="color:white;">${arr[i].description.split(" ").slice(0, 5).join(" ")}</p>
           </div>
         </div>
         <div class="infocont d-flex justify-content-between px-1 py-1">
           <h5 style="font-family: 'Merienda', cursive;" class="pt-1"><i class="fa-regular fa-heart" style="color: #00040a;"></i></h5>
           <div class="rate p-1 rounded-3" style="color: rgb(255, 0, 0);">$${arr[i].price}</div>
         </div>
       </div>`;
   }
   const rowdata = document.getElementById('rowdata');
   if (rowdata) {
     rowdata.innerHTML = cartona;
   } else {
     console.error('Element with id "rowdata" not found.');
   }

   // Add click event listeners to each product div
   const productDivs = document.querySelectorAll(".data");
   productDivs.forEach((div, index) => {
     div.addEventListener("click", () => {
       // Add the clicked product to the selectedProducts array
       selectedProducts.push(arr[index]);
       console.log("Selected Products:", selectedProducts);

       // Store selectedProducts in localStorage with the name "product"
       localStorage.setItem('product', JSON.stringify(selectedProducts));

       // Call a function to display products in the 'bodyproduct' element
       showProducts();
     });
   });
 }

//  // Call the function to fetch and display products
//  searchProducts();

 // Function to load and display products from localStorage
 function loadProductsFromLocalStorage() {
   const storedProducts = localStorage.getItem('product');
   if (storedProducts) {
     selectedProducts = JSON.parse(storedProducts);

     // Call a function to display products in the 'bodyproduct' element
     showProducts();
   }
 }

 // Call the function to load products from localStorage when the page loads
 loadProductsFromLocalStorage();

 // Function to delete a product from bodyproduct and update localStorage
 function deleteProduct(index) {
   // Remove the product from the selectedProducts array
   selectedProducts.splice(index, 1);

   // Update localStorage with the modified selectedProducts array
   localStorage.setItem('product', JSON.stringify(selectedProducts));

   // Call a function to display products in the 'bodyproduct' element
   showProducts();
 }

 // Function to display products in the 'bodyproduct' element
 function showProducts() {
   // bodyproduct is accessible here because it's declared at the global scope
   let cartona = "";
   let totalPrice = 0; // Initialize total price variable

   for (let i = 0; i < selectedProducts.length; i++) {
     const product = selectedProducts[i];
     cartona += `
     <div class="COL-LG-4 g-3">

     <img  src="${product.image}" class="w-50 p-3 text-center">
     <p>${product.description.split(" ").slice(0, 5).join(" ")}</p>
     <P>$${product.price}</P>
     <div class="d-flex justify-content-between">
         <h5 style="font-family: 'Merienda', cursive;" class="pt-1"><i class="fa-solid fa-heart fs-2" style="color: #fb0707;"></i></h5>  <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
     </div>
     

 </div>`;
     
     // Calculate and update the total price
     totalPrice += parseFloat(product.price);
   }

   // Display the total price at the end
   cartona += `<div class="col-lg-12 mt-3">
                 <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
               </div>`;

   // Update the 'bodyproduct' element with the generated content
   if (bodyproduct) {
     bodyproduct.innerHTML = cartona;
   }
 }

 // Call the showProducts function to display products initially
 showProducts();

 
    // Initial "About" content
    const aboutContent = `
      <div class="skewed-div p-5 col-lg-12">
        <h1 class="text-center">About</h1>
        <h3>
          Welcome to our online store! We are your one-stop destination for all your shopping needs. Whether you're looking for the latest fashion trends, high-quality electronics, home decor, or anything in between, you'll find it all right here on our website.

          Our mission is to provide you with a seamless and enjoyable shopping experience. We offer a wide range of products from trusted brands, all at competitive prices. Browse through our extensive catalog and discover a world of possibilities.

          With user-friendly navigation, secure payment options, and prompt delivery services, we make it convenient for you to shop from the comfort of your home. Our dedicated customer support team is always ready to assist you with any questions or concerns you may have.

          Thank you for choosing us as your go-to online store. We look forward to serving you and helping you find the products you love. Happy shopping!
        </h3>
      </div>`;

    // Initially display the "About" content
    if (rowdata) {
      rowdata.innerHTML = aboutContent;
    }