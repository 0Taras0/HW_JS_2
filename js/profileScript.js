document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !token) {
        window.location.href = "/pages/loginPage.html";
        return;
    }

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    const userData = parseJwt(token);
    if (!userData) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        window.location.href = "/pages/loginPage.html";
    }






    if (localStorage.getItem("token")) {
        show_loading();
        axios.get('https://goose.itstep.click/api/Account/profile', {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => {
                const { data } = resp;
                const { id, email, firstName, secondName, phone, photo } = data;
                document.getElementById("user-image").src = `https://goose.itstep.click/images/1200_${photo}`;
                document.getElementById("user-name").innerText = `${secondName} ${firstName}`;
                document.getElementById("user-email").innerText = ` ${email}`;
                document.getElementById("user-phone").innerText = ` ${phone}`;
                console.log("User profile", data);
            })
            .catch(err => {
                console.log("Error", err);
            })
            .finally(() => hide_loading());
    }
});