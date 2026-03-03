const API = "http://localhost:4000";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

async function cargarTareas() {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const contenedor = document.getElementById("tasks");
  contenedor.innerHTML = "";

  data.data.forEach(task => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || "Sin descripción"}</p>
      <p><strong>Estado:</strong> ${task.status}</p>
      <p><strong>Prioridad:</strong> ${task.priority}</p>
      <button onclick="cambiarEstado(${task.id}, '${task.status}')">
        Cambiar Estado
      </button>
      <button onclick="eliminarTarea(${task.id})">
        Eliminar
      </button>
    `;

    contenedor.appendChild(card);
  });
}

document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      priority
    })
  });

  document.getElementById("taskForm").reset();
  cargarTareas();
});

async function eliminarTarea(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  cargarTareas();
}

async function cambiarEstado(id, estadoActual) {
  const nuevoEstado = estadoActual === "pending" ? "completed" : "pending";

  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: "Sin cambios",
      description: "",
      status: nuevoEstado,
      priority: "medium",
      due_date: null
    })
  });

  cargarTareas();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

cargarTareas();