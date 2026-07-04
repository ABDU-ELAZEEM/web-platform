```javascript
const API_URL = "http://localhost:3000/api/users";

const usersTable = document.getElementById("usersTable");
const userForm = document.getElementById("userForm");
const message = document.getElementById("message");

async function loadUsers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        const users = await response.json();

        usersTable.innerHTML = "";

        users.forEach((user) => {
            usersTable.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);

        message.style.color = "red";
        message.textContent = "Failed to load users.";
    }
}

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error");
        }

        message.style.color = "green";
        message.textContent = data.message;

        userForm.reset();

        loadUsers();

    } catch (err) {

        console.error(err);

        message.style.color = "red";
        message.textContent = err.message;

    }

});

document
    .getElementById("refreshBtn")
    .addEventListener("click", loadUsers);

loadUsers();
```

