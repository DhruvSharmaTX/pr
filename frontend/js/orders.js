function loadOrders() {

    document.getElementById("homeView").style.display = "none";

    let html = `

<h2>Orders</h2>

<div class="section">

<button onclick="showCreateOrder()">Create Order</button>
<button onclick="showGetOrder()">Get Order</button>
<button onclick="showAllOrders()">Get All Orders</button>
<button onclick="showUpdateStatus()">Update Status</button>
<button onclick="showCancelOrder()">Cancel Order</button>

</div>

<div id="orderContent"></div>

`;

    document.getElementById("app").innerHTML = html;
}


function showCreateOrder() {

    let html = `

<div class="section">

<h3>Create Order</h3>

<input id="user_id" placeholder="User ID">

<h4>Products</h4>

<div id="items">

<div class="item">
<input class="product_id" placeholder="Product ID">
<input class="quantity" placeholder="Quantity">
</div>

</div>

<button onclick="addItem()">Add Another Product</button>

<br><br>

<button onclick="createOrder()">Create Order</button>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


function addItem() {

    let html = `

<div class="item">
<input class="product_id" placeholder="Product ID">
<input class="quantity" placeholder="Quantity">
</div>

`;

    document.getElementById("items").innerHTML += html;
}


async function createOrder() {

    const user_id = document.getElementById("user_id").value;

    const productIds = document.querySelectorAll(".product_id");
    const quantities = document.querySelectorAll(".quantity");

    let items = [];

    for (let i = 0; i < productIds.length; i++) {

        items.push({
            product_id: productIds[i].value,
            quantity: parseInt(quantities[i].value)
        });

    }

    const response = await fetch("/orders/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            items: items
        })
    });

    if (response.ok) {
        alert("Order created successfully");
        showAllOrders();
    } else {
        alert("Error creating order");
    }
}


function showGetOrder() {

    let html = `

<div class="section">

<h3>Get Order</h3>

<input id="order_id" placeholder="Order ID">

<button onclick="getOrder()">Search</button>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


async function getOrder() {

    const id = document.getElementById("order_id").value;

    const response = await fetch(`/orders/${id}`);
    const order = await response.json();

    let rows = "";

    order.items.forEach(item => {

        rows += `
<tr>
<td>${item.product_id}</td>
<td>${item.quantity}</td>
</tr>
`;

    });

    let html = `

<div class="section">

<h3>Order ${order.id}</h3>

<p><b>User:</b> ${order.user_id}</p>
<p><b>Status:</b> ${order.status}</p>
<p><b>Total:</b> ${order.total_amount}</p>
<p><b>Created:</b> ${order.created_at}</p>

<table border="orderTable">

<tr>
<th>Product</th>
<th>Quantity</th>
</tr>

${rows}

</table>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


async function showAllOrders() {

    const response = await fetch("/orders/");
    const orders = await response.json();

    let rows = "";

    orders.forEach(order => {

        rows += `
<tr>
<td>${order.id}</td>
<td>${order.user_id}</td>
<td>${order.total_amount}</td>
<td>${order.status}</td>
<td>${order.created_at}</td>
</tr>
`;

    });

    let html = `

<div class="section">

<h3>All Orders</h3>

<table border="orderTable">

<tr>
<th>Order ID</th>
<th>User</th>
<th>Total</th>
<th>Status</th>
<th>Created</th>
</tr>

${rows}

</table>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


function showUpdateStatus() {

    let html = `

<div class="section">

<h3>Update Order Status</h3>

<input id="update_order_id" placeholder="Order ID">

<select id="order_status">
<option>PENDING</option>
<option>SHIPPED</option>
<option>DELIVERED</option>
<option>CANCELLED</option>
</select>

<button onclick="updateStatus()">Update Status</button>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


async function updateStatus() {

    const id = document.getElementById("update_order_id").value;
    const status = document.getElementById("order_status").value;

    const response = await fetch(`/orders/${id}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    });

    if (response.ok) {
        alert("Status updated");
        showAllOrders();
    } else {
        alert("Error updating status");
    }
}


function showCancelOrder() {

    let html = `

<div class="section">

<h3>Cancel Order</h3>

<input id="cancel_order_id" placeholder="Order ID">

<button onclick="cancelOrder()">Cancel Order</button>

</div>
`;

    document.getElementById("orderContent").innerHTML = html;
}


async function cancelOrder() {

    const id = document.getElementById("cancel_order_id").value;

    const response = await fetch(`/orders/${id}/cancel`, {
        method: "PUT"
    });

    if (response.ok) {
        alert("Order cancelled");
        showAllOrders();
    } else {
        alert("Error cancelling order");
    }
}