const ADMIN_PASSWORD = "LFVA2026";
let isAdmin = false;
let apps = [];

// pedir contraseña
function checkAdmin() {
  const pass = prompt("Clave admin");
  if(pass === ADMIN_PASSWORD){
    document.getElementById("adminPanel").classList.remove("hidden");
    isAdmin = true;
  }
}

// cargar apps desde apps.json
async function loadApps(){
  const response = await fetch("apps.json");
  apps = await response.json();

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

// agregar app (te muestra el código para copiar)
function addApp(){
  if(!isAdmin) return;

  const name = document.getElementById("name").value;
  const icon = document.getElementById("icon").value;
  const file = document.getElementById("file").value;

  const newApp = {
    name,
    icon,
    file
  };

  alert(
`Copia esto y pégalo en apps.json:

${JSON.stringify(newApp, null, 2)},`
  );
}

// eliminar app (también manual)
function deleteApp(index){
  if(!isAdmin) return;

  alert("Para borrar apps edita apps.json manualmente");
}

window.onload = function(){
  checkAdmin();
  loadApps();
};
