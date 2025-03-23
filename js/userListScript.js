document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.querySelector("tbody");

    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "border-gray-200", "hover:bg-gray-50", "dark:hover:bg-gray-600");

        row.innerHTML = `
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img class="w-10 h-10 rounded-full" src="${user.photo}" alt="Profile Image">
                        <div class="ps-3">
                            <div class="text-base font-semibold">${user.firstName} ${user.secondName}</div>
                        </div>
                    </th>
                    <td class="px-6 py-4">${user.email}</td>
                    <td class="px-6 py-4">${user.phone}</td>
                    <td class="px-6 py-4">
                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="goToProfile(${index})">Edit</button>
                    </td>
                    <td class="px-6 py-4">
                        <button class="font-medium text-red-600 dark:text-red-500 hover:underline" onclick="deleteUser(${index})">Delete</button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
});

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}

function goToProfile(index) {
    localStorage.setItem("selectedUser", index);
    window.location.href = "/pages/editProfile.html";
}