const profileImage = document.getElementById("profileImage");
const editPhotoBtn = document.getElementById("editPhotoBtn");
const photoModal = document.getElementById("photoModal");
const uploadImage = document.getElementById("uploadImage");
const cropperImage = document.getElementById("cropperImage");
const saveCrop = document.getElementById("saveCrop");
const closeModal = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");

let cropper;
let uploadImageURL = profileImage.src;
let initialImageSrc = profileImage.src;

document.getElementById("submitBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const remember = document.getElementById("remember").checked;
    const profileImageSrc = document.getElementById("profileImage").src;

    if (!email || !firstName || !lastName || !phone || !password || !confirmPassword) {
        return;
    }

    if (password !== confirmPassword) {
        alert("Паролі не співпадають.");
        return;
    }

    if (!remember) {
        alert("Ви повинні погодитися з умовами.");
        return;
    }

    if (!profileImageSrc || profileImageSrc.includes("centralcalshrm.org/wp-content/uploads/2021/08/profile-icon-empty.png")) {
        alert("Будь ласка, виберіть зображення профілю.");
        return;
    }

    window.location.href = "/pages/listUsers.html";
});


document.getElementById("rotateLeft").addEventListener("click", () => {
    if (cropper) cropper.rotate(-90);
});

document.getElementById("rotateRight").addEventListener("click", () => {
    if (cropper) cropper.rotate(90);
});

editPhotoBtn.addEventListener("click", () => {
    initialImageSrc = profileImage.src;
    cropperImage.src = initialImageSrc;

    if (cropper) cropper.destroy();

    cropper = new Cropper(cropperImage, {
        aspectRatio: 1,
        viewMode: 1,
        responsive: true
    });

    photoModal.classList.remove("hidden");
    overlay.style.display = "block";
    document.body.classList.add("overflow-hidden");
});

closeModal.addEventListener("click", () => {
    cropperImage.src = initialImageSrc;
    uploadImage.value = "";

    photoModal.classList.add("hidden");
    overlay.style.display = "none";
    document.body.classList.remove("overflow-hidden");
});

uploadImage.addEventListener("change", (event) => {
    const { files } = event.target;
    const file = files[0];

    if (file && /^image\/\w+/.test(file.type)) {
        if (uploadImageURL) {
            URL.revokeObjectURL(uploadImageURL);
        }

        cropperImage.src = uploadImageURL = URL.createObjectURL(file);

        if (cropper) cropper.destroy();

        cropper = new Cropper(cropperImage, {
            aspectRatio: 1,
            viewMode: 1,
            responsive: true
        });

        uploadImage.value = "";
    }
});

saveCrop.addEventListener("click", () => {
    if (cropper) {
        const croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
        profileImage.src = croppedImage;
        initialImageSrc = croppedImage;

        photoModal.classList.add("hidden");
        overlay.style.display = "none";
        document.body.classList.remove("overflow-hidden");
    }
});