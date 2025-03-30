document.getElementById("submitBtn").addEventListener("click", async function (event) {
    event.preventDefault();
    clearErrors();
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const remember = document.getElementById("remember").checked;
    const profileImageSrc = document.getElementById("profileImage").src;

    if (!remember) {
        remember_error.hidden = false;
        remember_error.textContent = "Ви повинні погодитися з умовами.";
        return;
    }

    if (!profileImageSrc || profileImageSrc.includes("centralcalshrm.org/wp-content/uploads/2021/08/profile-icon-empty.png")) {
        profileImage_error.hidden = false;
        profileImage_error.textContent = "Будь ласка, виберіть зображення профілю.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        email_error.hidden = false;
        email_error.textContent = "Користувач з таким email вже існує!";
        return;
    }

    const user = {
        email: email,
        firstName: firstName,
        secondName: lastName,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
        photo: profileImageSrc
    }

    try {
        const response = await axios.post('https://goose.itstep.click/api/Account/register', user);
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = '/pages/profile.html';
    } catch (error) {
        handleError(error.response?.data.errors);
    }
});

function handleError(responseText) {
    const response = responseText;
    if (response) {
        for (const field in response) {
            if (response.hasOwnProperty(field)) {
                const fieldErrors = response[field];

                errorMessages = fieldErrors;
                switch (field) {
                    case "email": { email_error.hidden = false; email_error.textContent = errorMessages; break; }
                    case "firstName": { first_name_error.hidden = false; first_name_error.textContent = errorMessages; break; }
                    case "secondName": { last_name_error.hidden = false; last_name_error.textContent = errorMessages; break; }
                    case "photo": { profileImage_error.hidden = false; profileImage_error.textContent = errorMessages; break; }
                    case "phone": { phone_error.hidden = false; phone_error.textContent = errorMessages; break; }
                    case "password": { password_error.hidden = false; password_error.textContent = errorMessages; break; }
                    case "confirmPassword": { confirm_password_error.hidden = false; confirm_password_error.textContent = errorMessages; break; }
                }
            }
        }
    }
}

function clearErrors() {
    email_error.hidden = true;
    first_name_error.hidden = true;
    last_name_error.hidden = true;
    profileImage_error.hidden = true;
    phone_error.hidden = true;
    password_error.hidden = true;
    confirm_password_error.hidden = true;
    profileImage_error.hidden = true;
    remember_error.hidden = true;
}