function loadProducts() {

    document.getElementById("homeView").style.display = "none";

    let html = `

<h2>Products</h2>

<div class="section">

<button onclick="showCreateProduct()">Create Product</button>
<button onclick="showGetProduct()">Get Product</button>
<button onclick="showUpdateProduct()">Update Product</button>
<button onclick="showAllProducts()">Get All Products</button>

</div>

<div id="productContent"></div>

`;

    document.getElementById("app").innerHTML = html;
}


function showCreateProduct() {

    let html = `

<div class="section">

<h3>Create Product</h3>

<input id="product_name" placeholder="Product Name">
<input id="price" placeholder="Price">
<input id="stock" placeholder="Stock Quantity">

<button onclick="createProduct()">Create</button>

</div>
`;

    document.getElementById("productContent").innerHTML = html;
}


async function createProduct() {

    const name = document.getElementById("product_name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    const response = await fetch("/products/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: parseFloat(price),
            stock_quantity: parseInt(stock)
        })
    });

    if (response.ok) {
        alert("Product created successfully");
        showAllProducts();
    } else {
        alert("Error creating product");
    }
}


function showGetProduct() {

    let html = `

<div class="section">

<h3>Get Product</h3>

<input id="product_id" placeholder="Product ID">

<button onclick="getProduct()">Search</button>

</div>
`;

    document.getElementById("productContent").innerHTML = html;
}


async function getProduct() {

    const id = document.getElementById("product_id").value;

    const response = await fetch(`/products/${id}`);
    const product = await response.json();

    let html = `

<div class="section">

<h3>Product</h3>

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Price</th>
<th>Stock</th>
</tr>

<tr>
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.price}</td>
<td>${product.stock_quantity}</td>
</tr>

</table>

</div>
`;

    document.getElementById("productContent").innerHTML = html;
}


function showUpdateProduct() {

    let html = `

<div class="section">

<h3>Update Product</h3>

<input id="update_id" placeholder="Product ID">
<input id="update_price" placeholder="New Price">
<input id="update_stock" placeholder="New Stock">

<button onclick="updateProduct()">Update</button>

</div>
`;

    document.getElementById("productContent").innerHTML = html;
}


async function updateProduct() {

    const id = document.getElementById("update_id").value;
    const price = document.getElementById("update_price").value;
    const stock = document.getElementById("update_stock").value;

    const response = await fetch(`/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: parseFloat(price),
            stock_quantity: parseInt(stock)
        })
    });

    if (response.ok) {
        alert("Product updated successfully");
        showAllProducts();
    } else {
        alert("Error updating product");
    }
}


async function showAllProducts() {

    const response = await fetch("/products/");
    const products = await response.json();

    let rows = "";

    products.forEach(product => {
        rows += `
<tr>
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.price}</td>
<td>${product.stock_quantity}</td>
</tr>
`;
    });

    let html = `

<div class="section">

<h3>All Products</h3>

<table border="1">

<tr>
<th>ID</th>
<th>Name</th>
<th>Price</th>
<th>Stock</th>
</tr>

${rows}

</table>

</div>
`;

    document.getElementById("productContent").innerHTML = html;
}