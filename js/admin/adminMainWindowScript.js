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


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item button");

    menuItems.forEach(button => {
        button.addEventListener("click", function () {
            const submenu = this.nextElementSibling;

            if (submenu) {
                submenu.classList.toggle("hidden");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("[data-url]");
    //const mainWindow = document.getElementById("mainAminWindow");

    //const loadContent = async (url) => {
    //    try {
    //        const response = await fetch(url);
    //        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    //        const text = await response.text();

    //        // Вставляємо HTML в mainWindow
    //        mainWindow.innerHTML = text;

    //        // Тепер обробляємо скрипти
    //        mainWindow.querySelectorAll("script").forEach((script) => {
    //            const newScript = document.createElement("script");

    //            // Якщо є атрибут src, додаємо як зовнішній скрипт
    //            if (script.src) {
    //                newScript.src = script.src;
    //            } else {
    //                // Вставляємо внутрішній скрипт
    //                newScript.textContent = script.textContent;
    //            }

    //            // Додаємо скрипт у body (щоб він спрацював)
    //            document.body.appendChild(newScript).parentNode.removeChild(newScript);
    //        });
    //    } catch (error) {
    //        console.error("Помилка завантаження:", error);
    //    }
    //};


    menuItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const url = this.getAttribute("data-url");
            location.href = url;
            loadContent(url);
        });
    });
});