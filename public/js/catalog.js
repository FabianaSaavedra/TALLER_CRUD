// Script para la vista de catálogo
import { getItems } from "./services/api.js";

const catalogContainer = document.getElementById("catalogContainer");
const emptyState = document.getElementById("emptyState");

// ---------- Modal ----------
const modal = document.getElementById("itemModal");
const closeModalBtn = document.getElementById("closeModal");
const addToCartBtn = document.getElementById("addToCartBtn");

let currentItem = null;

function openModal(item) {
  currentItem = item; // guardamos el producto actual

  document.getElementById("modalImage").src = item.image;
  document.getElementById("modalImage").alt = item.name;
  document.getElementById("modalTitle").textContent = item.name;
  document.getElementById("modalPrice").textContent = `Precio: $ ${item.price} COP`;
  document.getElementById("modalId").textContent = `ID: ${item.id}`;
  document.getElementById("modalDescription").textContent = `Descripción: ${item.description || "Sin descripción"}`;
  document.getElementById("modalCategory").textContent = `Categoría: ${item.category || "Sin categoría"}`;

  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Evento agregar al carrito
addToCartBtn.addEventListener("click", () => {
  if (currentItem) {
    console.log("Producto agregado al carrito:", currentItem);
    alert(`${currentItem.name} agregado al carrito 🛒`);
  }
});

// ---------- Catálogo ----------
async function loadCatalog() {
  try {
    const items = await getItems();
    catalogContainer.innerHTML = "";

    if (!items.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    } else {
      if (emptyState) emptyState.hidden = true;
    }

    items.forEach(item => {
      const card = renderItem(item);
      catalogContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando catálogo:", err);
    catalogContainer.innerHTML = `<p>Error al cargar el catálogo.</p>`;
  }
}

function renderItem(item) {
  const template = document.getElementById("catalogCardTemplate");
  const clone = template.content.cloneNode(true);

  const card = clone.querySelector(".card");
  card.dataset.id = item.id;
  clone.querySelector(".card-img").src = item.image;
  clone.querySelector(".card-img").alt = item.name;
  clone.querySelector(".card-title").textContent = item.name;
  clone.querySelector(".card-price").textContent = `$ ${item.price} COP`;
  clone.querySelector(".card-id").textContent = `ID: ${item.id}`;

  card.addEventListener("click", () => openModal(item));

  return clone;
}

loadCatalog();

