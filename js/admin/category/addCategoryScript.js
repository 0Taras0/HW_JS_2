document.getElementById("submitBtn").addEventListener("click", async function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const priority = document.getElementById("priority").value.trim();
    const profileImageSrc = document.getElementById("profileImage").src;

    const progressContainer = document.getElementById("uploadProgressContainer");
    const progressBar = document.getElementById("uploadProgressBar");

    if (!profileImageSrc || profileImageSrc.includes("profile-icon-empty.png")) {
        profileImage_error.hidden = false;
        profileImage_error.textContent = "Будь ласка, виберіть зображення для категорії.";
        return;
    }

    if (!name) {
        name_error.hidden = false;
        name_error.textContent = "Назва категорії обов’язкова.";
        return;
    }

    if (!priority || isNaN(priority) || parseInt(priority) < 0) {
        priority_error.hidden = false;
        priority_error.textContent = "Пріоритет має бути цілим невід’ємним числом.";
        return;
    }

    const slug = slugify(name);

    const category = {
        title: name,
        priority: parseInt(priority),
        urlSlug: slug,
        image: profileImageSrc
    };

    try {
        progressContainer.classList.remove("hidden");
        progressBar.style.width = "0%";

        let progress = 0;
        const interval = setInterval(() => {
            progress = Math.min(progress + 10, 90);
            progressBar.style.width = progress + "%";
        }, 100);

        const response = await axios.post("https://goose.itstep.click/api/Categories/add", category, {
            headers: { "Content-Type": "application/json" }
        });

        clearInterval(interval);
        progressBar.style.width = "100%";

        setTimeout(() => {
            progressContainer.classList.add("hidden");
            progressBar.style.width = "0%";
        }, 500);

        document.getElementById("add_category_form").reset();
        document.getElementById("profileImage").src = "https://centralcalshrm.org/wp-content/uploads/2021/08/profile-icon-empty.png";

    } catch (error) {
        clearInterval(progressBar);
        progressContainer.classList.add("hidden");
        progressBar.style.width = "0%";
        handleError(error.response?.data?.errors || {});
    }
});


function handleError(response) {
    for (const field in response) {
        if (response.hasOwnProperty(field)) {
            const errorMessages = response[field];
            switch (field) {
                case "title":
                    name_error.hidden = false;
                    name_error.textContent = errorMessages;
                    break;
                case "priority":
                    priority_error.hidden = false;
                    priority_error.textContent = errorMessages;
                    break;
                case "image":
                    profileImage_error.hidden = false;
                    profileImage_error.textContent = errorMessages;
                    break;
            }
        }
    }
}

function clearErrors() {
    name_error.hidden = true;
    priority_error.hidden = true;
    profileImage_error.hidden = true;
}