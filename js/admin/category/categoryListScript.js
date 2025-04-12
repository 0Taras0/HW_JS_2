let currentPage = 1;
let lastPage = 1;

function getParamsFromUrl() {
    const params = Qs.parse(location.search, { ignoreQueryPrefix: true });
    document.getElementById('category-search').value = params.Title || '';
    document.getElementById('priority-search').value = params.Priority || '';
    currentPage = parseInt(params.Page) || 1;
}

function updateUrlParams() {
    const title = document.getElementById('category-search').value;
    const priority = document.getElementById('priority-search').value;

    const query = Qs.stringify({
        Title: title,
        Priority: priority,
        Page: currentPage
    });

    const newUrl = `${location.pathname}?${query}`;
    window.history.pushState(null, '', newUrl);
}

async function fetchAndRender() {
    const title = document.getElementById('category-search').value;
    const priority = document.getElementById('priority-search').value;

    const query = Qs.stringify({
        Title: title,
        Priority: priority,
        Page: currentPage
    });

    const url = `https://goose.itstep.click/api/Categories/search?${query}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (data.categories.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center p-4 text-gray-500 dark:text-gray-300">Nothing found</td></tr>`;
        } else {
            data.categories.forEach(cat => {
                const row = document.createElement('tr');
                row.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";
                row.innerHTML = `
                    <td class="p-4">
                        <img src="https://goose.itstep.click/images/200_${cat.image}" class="w-16 md:w-32 max-w-full max-h-full" alt="${cat.title}">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">${cat.title}</td>
                    <td class="px-6 py-4">${cat.urlSlug}</td>
                    <td class="px-6 py-4">${cat.priority}</td>
                    <td class="px-6 py-4">
                        <a href="/pages/admin/category/editCategory.html?id=${cat.id}" class="font-medium text-blue-600 dark:text-blue-400 hover:underline" data-id="${cat.id}">Edit</a> |
                        <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" data-id="${cat.id}">Delete</a>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }

        currentPage = data.currentPage;
        lastPage = data.pages;
        document.getElementById('page-info').innerText = `Page ${currentPage} of ${lastPage}`;
        document.getElementById('prev-page').disabled = currentPage <= 1;
        document.getElementById('next-page').disabled = currentPage >= lastPage;

    } catch (err) {
        console.error("Помилка при отриманні даних:", err);
    }
}

document.getElementById('search-button').addEventListener('click', () => {
    currentPage = 1;
    updateUrlParams();
    fetchAndRender();
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateUrlParams();
        fetchAndRender();
        window.scrollTo(0, 0);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < lastPage) {
        currentPage++;
        updateUrlParams();
        fetchAndRender();
        window.scrollTo(0, 0);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getParamsFromUrl();
    fetchAndRender();
});
