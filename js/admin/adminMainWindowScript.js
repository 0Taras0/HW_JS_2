function getUserEmailFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        redirectToLogin();
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.name;
        const role = payload.roles;

        if (!role || role !== "admin") {
            redirectToLogin();
            return;
        }


        const emailElement = document.querySelector('p.text-sm.font-medium');
        if (emailElement) {
            emailElement.textContent = email;
        }
    } catch (error) {
        console.error('Помилка при розшифруванні токена:', error);
    }
}

function redirectToLogin() {
    window.location.reload();
    window.location.href = "/index.html";
}


document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    redirectToLogin();
});

document.addEventListener('DOMContentLoaded', getUserEmailFromToken);