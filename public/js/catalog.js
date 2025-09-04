// Script para la vista de catálogo
import { getItems } from "./services/api.js";

// Seleccionar el contenedor donde se mostrarán los items
const catalogContainer = document.getElementById("catalogContainer");
const emptyState = document.getElementById("emptyState"); // opcional si usas el <p id="emptyState">

// Función principal para cargar los items desde la API
async function loadCatalog() {
  try {
    const items = await getItems();

    // Limpiar contenedor
    catalogContainer.innerHTML = "";

    if (!items.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    } else {
      if (emptyState) emptyState.hidden = true;
    }

    // Renderizar cada item
    items.forEach(item => {
      const card = renderItem(item);
      catalogContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando catálogo:", err);
    catalogContainer.innerHTML = `<p>Error al cargar el catálogo.</p>`;
  }
}

// Función para renderizar un item en el catálogo
function renderItem(item) {
  // Usar el <template> definido en catalog.html
  const template = document.getElementById("catalogCardTemplate");
  const clone = template.content.cloneNode(true);

  // Llenar datos
  clone.querySelector(".card").dataset.id = item.id;
  clone.querySelector(".card-img").src = item.image;
  clone.querySelector(".card-img").alt = item.name;
  clone.querySelector(".card-title").textContent = item.name;
  clone.querySelector(".card-price").textContent = `$${item.price}`;
  clone.querySelector(".card-id").textContent = `ID: ${item.id}`;

  return clone;
}

// Inicializar el catálogo cuando cargue la página
loadCatalog();