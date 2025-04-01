document.getElementById("submitBtn").addEventListener("click", async function (event) {
    event.preventDefault();
    clearErrors();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = {
        email: email,
        password: password
    };

    try {
        const response = await axios.post('https://goose.itstep.click/api/Account/login', user);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.token);

        const userData = JSON.parse(atob(response.data.token.split('.')[1]));
        if (userData.roles.includes("admin")) {
            window.location.href = '/pages/admin/adminPage.html';
        } else {
            window.location.href = '/pages/profile.html';
        }
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
                    case "password": { password_error.hidden = false; password_error.textContent = errorMessages; break; }
                }
            }
        }
    }
}

function clearErrors() {
    email_error.hidden = true;
    password_error.hidden = true;
}
