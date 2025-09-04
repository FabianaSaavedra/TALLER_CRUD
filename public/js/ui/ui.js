export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>${item.category || ""}</td>
            <td>${item.stock || ""}</td>
            <td>${item.date || ""}</td>
            <td>${item.price || ""}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#image").value = item.image;
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#category").value = item.category || "";
    form.querySelector("#stock").value = item.stock || "";
    form.querySelector("#date").value = item.date || "";
    form.querySelector("#price").value = item.price || "";
    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}