
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');

var productContainer = [];
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var currentIndex = -1;
if (localStorage.getItem('products') != null) {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productContainer);
} else {
    localStorage.setItem('products', JSON.stringify(productContainer));
}

function addProduct() {

    if (!validateInputs()) {
        return;
    }

    var confirmed = confirm("Are you sure you want to add a new product?");
    if (!confirmed) {
        return;
    }

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value
    };

    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
}

function updateProduct() {
    if (currentIndex === -1) return;

    if (!validateInputs()) {
        return;
    }

    var confirmed = confirm("Are you sure you want to update this product?");
    if (!confirmed) {
        clearForm();
        return;
    }

    var updatedProduct = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value
    };

    productContainer[currentIndex] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
    currentIndex = -1;
    addBtn.classList.replace('d-none', 'd-block');
    updateBtn.classList.replace('d-block', 'd-none');
}

function displayProducts(arr) {
    var table = '';
    for (var i = 0; i < arr.length; i++) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button type="button" class="btn btn-outline-warning" onclick="setFormForUpdate(${i})">Update</button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = table;
}

function deleteProduct(productIndex) {
    var confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return; // Cancel the deletion if not confirmed
    }
    
    productContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
}
function searchProducts(term) {
    var matchedProducts = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            matchedProducts.push(productContainer[i]);
        }
    }
    console.log(matchedProducts);
    displayProducts(matchedProducts);
}

function setFormForUpdate(i) {
    if (productContainer == null || productContainer.length === 0) {
        if (confirm("No products found. Do you want to add a new product?")) {

        }
        return;
    }
    var selectedProduct = productContainer[i];
    productNameInput.value = selectedProduct.name;
    productPriceInput.value = selectedProduct.price;
    productCategoryInput.value = selectedProduct.category;
    productDescriptionInput.value = selectedProduct.desc;
    currentIndex = i;
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
}

function validateInputs() {

    var namePattern = /^[a-zA-Z0-9\s]+$/;
    var pricePattern = /^\d+(\.\d{1,2})?$/;
    var categoryPattern = /^[a-zA-Z0-9\s]+$/;
    var descriptionPattern = /.+/;


    if (!namePattern.test(productNameInput.value)) {
        alert("Invalid product name. Please use letters, numbers, and spaces only.");
        return false;
    }

    if (!pricePattern.test(productPriceInput.value)) {
        alert("Invalid product price. Please enter a positive number .");
        return false;
    }

    if (!categoryPattern.test(productCategoryInput.value)) {
        alert("Invalid product category. Please use letters, numbers, and spaces only.");
        return false;
    }

    if (!descriptionPattern.test(productDescriptionInput.value)) {
        alert("Invalid product description. Please enter a non-empty description.");
        return false;
    }

    return true;
}


updateBtn.addEventListener('click', updateProduct);
