function loadUsers() {

    document.getElementById("homeView").style.display = "none";

    let html = `

<h2>Users</h2>

<div class="section">

<button onclick="showCreateUser()">Create User</button>
<button onclick="showGetUser()">Get User</button>
<button onclick="showAllUsers()">Get All Users</button>

</div>

<div id="userContent"></div>

`;

    document.getElementById("app").innerHTML = html;
}


function showCreateUser() {

    let html = `

<div class="section">

<h3>Create User</h3>

<input id="name" placeholder="Name">
<input id="email" placeholder="Email">

<button onclick="createUser()">Create</button>

</div>
`;

    document.getElementById("userContent").innerHTML = html;
}


async function createUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const response = await fetch("/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    });

    if (response.ok) {

        alert("User created successfully");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";

        showAllUsers();

    } else {

        alert("Error creating user");

    }
}


function showGetUser() {

    let html = `

<div class="section">

<h3>Get User</h3>

<input id="userid" placeholder="User ID">

<button onclick="getUser()">Search</button>

</div>
`;

    document.getElementById("userContent").innerHTML = html;
}


async function getUser() {

    const id = document.getElementById("userid").value;

    const response = await fetch(`/users/${id}`);
    const user = await response.json();

    let html = `

<div class="section">

<h3>User</h3>

<table border="orderTable">

<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
</tr>

<tr>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
</tr>

</table>

</div>
`;

    document.getElementById("userContent").innerHTML = html;
}


async function showAllUsers() {

    const response = await fetch("/users/");
    const users = await response.json();

    let rows = "";

    users.forEach(user => {

        rows += `
<tr>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
</tr>
`;

    });

    let html = `

<div class="section">

<h3>All Users</h3>

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
</tr>

${rows}

</table>

</div>
`;

    document.getElementById("userContent").innerHTML = html;
}