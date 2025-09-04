// Script base para la vista de catálogo
// Aquí deben consumir la API de items y mostrarlos en la página

import { getItems } from "./services/api";

// Constante con la URL base de la API
const API_URL = "/api/items";

// TODO: Seleccionar el contenedor donde se mostrarán los items
// const catalogContainer = document.getElementById("...");
const catalogContainer = document.getElementById("catalogContainer");

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        const items = await getItems();
        console.log(items);
        items.array.forEach(item => {
            const card = renderItem(item);
            catalogContainer.appendChild(card);
        });
        // 1. Hacer fetch a la API (GET /api/items)
        // 2. Parsear la respuesta a JSON
        // 3. Limpiar el contenedor del catálogo
        // 4. Iterar sobre cada item y llamar a renderItem()
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        // TODO: Mostrar mensaje de error en la UI
    }
}

// Función para renderizar un item en el catálogo
function renderItem(item) {
    // TODO: Crear un elemento HTML (ej: div o card)
    // TODO: Asignar los datos del item (name, description, etc.)
    // TODO: Insertar el elemento en el contenedor
}

// Inicializar el catálogo cuando cargue la página
loadCatalog();