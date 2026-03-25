const ADMIN_PASSWORD = "LFVA2026"; // clave admin segura
let isAdmin = false;

// Función para pedir contraseña y mostrar panel solo si es correcta
function checkAdmin() {
  const pass = prompt("Clave admin (solo el creador)");
  if(pass === ADMIN_PASSWORD){
    const panel = document.getElementById("adminPanel");
    if(panel) panel.classList.remove("hidden"); // se muestra solo después de validar
    isAdmin = true;
  }
}

// Cargar apps y mostrar botones de eliminar solo si es admin
function loadApps(){
  const apps = JSON.parse(localStorage.getItem("apps") || "[]");
  const container = document.getElementById("apps");
  container.innerHTML = "";

  apps.forEach((app, index) => {
    container.innerHTML += `
      <div class="app-card">
        <img src="${app.icon}">
        <h3>${app.name}</h3>
        <a href="${app.file}" target="_blank">
          <button>Instalar</button>
        </a>
        ${isAdmin ? `<button onclick="deleteApp(${index})">Eliminar</button>` : ""}
      </div>
    `;
  });
}

// Agregar app solo si es admin
function addApp(){
  if(!isAdmin) return;
  const name = document.getElementById("name").value;
  const icon = document.getElementById("icon").value;
  const file = document.getElementById("file").value;

  const apps = JSON.parse(localStorage.getItem("apps") || "[]");
  apps.push({name, icon, file});
  localStorage.setItem("apps", JSON.stringify(apps));

  loadApps();
}

// Eliminar app solo si es admin
function deleteApp(index){
  if(!isAdmin) return;
  const apps = JSON.parse(localStorage.getItem("apps") || "[]");
  apps.splice(index, 1);
  localStorage.setItem("apps", JSON.stringify(apps));
  loadApps();
}

// Ejecutar al cargar la página
window.onload = function() {
  checkAdmin(); // pide clave al inicio
  loadApps();    // carga apps pero panel admin solo visible si es admin
};