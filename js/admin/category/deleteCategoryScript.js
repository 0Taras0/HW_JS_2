
let selectedCategoryId = null;

document.getElementById('table-body').addEventListener('click', function (e) {
    if (e.target.textContent === 'Delete') {
        e.preventDefault();
        selectedCategoryId = e.target.dataset.id;
        document.getElementById('deleteModal').classList.remove('hidden');
    }
});

document.getElementById('cancelDelete').addEventListener('click', function () {
    document.getElementById('deleteModal').classList.add('hidden');
    selectedCategoryId = null;
});

document.getElementById('confirmDelete').addEventListener('click', async function () {
    if (!selectedCategoryId) return;

    try {
        await axios.delete(`https://goose.itstep.click/api/Categories/delete/${selectedCategoryId}`);
        document.getElementById('deleteModal').classList.add('hidden');
        selectedCategoryId = null;
        location.href = "/pages/admin/category/categoryList.html";
    } catch (err) {
        console.error("Помилка при видаленні категорії:", err);
    }
});