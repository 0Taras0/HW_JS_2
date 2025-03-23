document.addEventListener("DOMContentLoaded", function () {
    loadProfileData();
});

function loadProfileData() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = localStorage.getItem("selectedUser");

    if (index === null || !users[index]) {
        window.location.href = "/pages/listUsers.html";
        return;
    }

    const user = users[index];

    document.getElementById("profileImage").src = user.photo || "https://centralcalshrm.org/wp-content/uploads/2021/08/profile-icon-empty.png";
    document.getElementById("first_name").value = user.firstName;
    document.getElementById("last_name").value = user.secondName;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("password").value = user.password;
    document.getElementById("confirm_password").value = user.confirmPassword;
}

document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = localStorage.getItem("selectedUser");

    if (index === null || !users[index]) {
        return;
    }

    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const photo = document.getElementById("profileImage").src;

    if (!email || !firstName || !lastName || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
    }

    users[index].firstName = firstName;
    users[index].secondName = lastName;
    users[index].phone = phone;
    users[index].email = email;
    users[index].photo = photo;
    users[index].password = password;
    users[index].confirmPassword = confirmPassword;

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/pages/listUsers.html";
});