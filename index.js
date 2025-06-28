const mockDeliveries = [
  { id: 1, recipient: "Alice Wanjiku", address: "Kilimani, Nairobi", status: "Pending" },
  { id: 2, recipient: "Brian Otieno", address: "Westlands, Nairobi", status: "Out for Delivery" },
  { id: 3, recipient: "Clara Kim", address: "Runda, Nairobi", status: "Delivered" },
];

function renderDeliveries(deliveries = mockDeliveries) {
  const list = document.getElementById("delivery-list");
  list.innerHTML = "";

  if (deliveries.length === 0) {
    list.innerHTML = `<p class="text-gray-400">No deliveries found.</p>`;
    return;
  }

  deliveries.forEach(delivery => {
    const item = document.createElement("div");
    item.className = "bg-white p-4 rounded shadow flex justify-between items-center";

    item.innerHTML = `
      <div onclick="showDeliveryDetails(${delivery.id})" class="cursor-pointer">
        <strong class="text-gray-800">${delivery.recipient}</strong>
        <p class="text-sm text-gray-600">${delivery.status}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="editDelivery(${delivery.id})" class="text-indigo-600 hover:text-indigo-800 text-sm"><i class="fas fa-edit"></i></button>
        <button onclick="deleteDelivery(${delivery.id})" class="text-red-600 hover:text-red-800 text-sm"><i class="fas fa-trash"></i></button>
      </div>
    `;

    list.appendChild(item);
  });
}

function showDeliveryDetails(id) {
  const detail = document.getElementById("delivery-detail");
  const delivery = mockDeliveries.find(d => d.id === id);
  if (!delivery) return;

  detail.classList.remove("text-gray-500");
  detail.innerHTML = `
    <div class="text-left">
      <h2 class="text-2xl font-bold text-gray-800">${delivery.recipient}</h2>
      <p class="text-gray-600">Address: ${delivery.address}</p>
      <p class="text-gray-600">Status: <span class="font-semibold">${delivery.status}</span></p>
    </div>
  `;
}

function editDelivery(id) {
  const delivery = mockDeliveries.find(d => d.id === id);
  if (!delivery) return;

  document.getElementById("edit-delivery-form").classList.remove("hidden");
  document.getElementById("delivery-detail").classList.add("hidden");
  document.getElementById("edit-delivery-form").dataset.id = id;
  document.getElementById("edit-status").value = delivery.status;
}

function deleteDelivery(id) {
  if (confirm("Are you sure you want to delete this delivery?")) {
    const index = mockDeliveries.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDeliveries.splice(index, 1);
      renderDeliveries();
      document.getElementById("delivery-detail").innerHTML = `<p class="text-gray-500">Select a delivery to view details</p>`;
    }
  }
}

document.getElementById("new-delivery-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const recipient = document.getElementById("recipient").value;
  const address = document.getElementById("address").value;
  const status = document.getElementById("status").value;
  const id = mockDeliveries.length ? Math.max(...mockDeliveries.map(d => d.id)) + 1 : 1;

  mockDeliveries.push({ id, recipient, address, status });
  e.target.reset();
  renderDeliveries();
});

document.getElementById("edit-delivery-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = +e.target.dataset.id;
  const newStatus = document.getElementById("edit-status").value;
  const delivery = mockDeliveries.find(d => d.id === id);
  if (delivery) {
    delivery.status = newStatus;
    renderDeliveries();
    showDeliveryDetails(id);
    document.getElementById("edit-delivery-form").classList.add("hidden");
    document.getElementById("delivery-detail").classList.remove("hidden");
  }
});

document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-delivery-form").classList.add("hidden");
  document.getElementById("delivery-detail").classList.remove("hidden");
});

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = mockDeliveries.filter(d => d.recipient.toLowerCase().includes(query));
  renderDeliveries(filtered);
});

document.getElementById("refresh-btn").onclick = renderDeliveries;

document.addEventListener("DOMContentLoaded", () => {
  renderDeliveries();
});

