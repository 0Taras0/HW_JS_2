const params = new URLSearchParams(window.location.search);
const categoryId = params.get('id');
let originalCategory = {};

const form = document.getElementById('edit_category_form');

if (categoryId) {
    fetchCategory(categoryId);
}

async function fetchCategory(id) {
    try {
        const response = await axios.get(`https://goose.itstep.click/api/Categories/get/${id}`);
        const category = response.data;

        originalCategory = { ...category };

        document.getElementById('name').value = category.title;
        document.getElementById('priority').value = category.priority;
        document.getElementById('profileImage').src = `https://goose.itstep.click/images/200_${category.image}`;
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;

    const updatedCategory = {
        id: categoryId,
        title: name,
        urlSlug: slugify(name),
        priority: parseInt(document.getElementById('priority').value),
        image: document.getElementById('profileImage').src
    };

    try {
        await axios.put(`https://goose.itstep.click/api/Categories/edit`, updatedCategory);
        location.href = '/pages/admin/category/categoryList.html';
    } catch (err) {
        console.error(err);
    }
});