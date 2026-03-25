// script.js

// Contraseña secreta para el panel admin
const ADMIN_PASSWORD = "LFVA2026";

// Mostrar panel admin si la contraseña es correcta
const userPassword = prompt("Clave admin (solo el creador)");
if(userPassword === ADMIN_PASSWORD){
    document.getElementById("adminPanel").style.display = 'block';
}

// Función para cargar apps guardadas en localStorage
function loadApps(){
    const apps = JSON.parse(localStorage.getItem("apps") || "[]");
    const container = document.getElementById("apps");
    container.innerHTML = "";

    apps.forEach((app, index) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';

        const img = document.createElement('img');
        img.src = app.icon;
        img.alt = app.name;

        const title = document.createElement('div');
        title.textContent = app.name;

        const installLink = document.createElement('a');
        installLink.href = app.file;
        installLink.target = '_blank';

        const installBtn = document.createElement('button');
        installBtn.textContent = 'Instalar';
        installLink.appendChild(installBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteApp(index);

        appCard.appendChild(img);
        appCard.appendChild(title);
        appCard.appendChild(installLink);
        appCard.appendChild(deleteBtn);

        container.appendChild(appCard);
    });
}

// Función para agregar nueva app desde el panel admin
function addApp(){
    const name = document.getElementById('name').value.trim();
    const icon = document.getElementById('icon').value.trim();
    const file = document.getElementById('file').value.trim();

    if(!name || !icon || !file){
        alert('Completa todos los campos antes de subir la app');
        return;
    }

    const apps = JSON.parse(localStorage.getItem('apps') || '[]');
    apps.push({name, icon, file});
    localStorage.setItem('apps', JSON.stringify(apps));

    // Limpiar campos
    document.getElementById('name').value = '';
    document.getElementById('icon').value = '';
    document.getElementById('file').value = '';

    loadApps();
}

// Función para eliminar app
function deleteApp(index){
    const apps = JSON.parse(localStorage.getItem('apps') || '[]');
    apps.splice(index, 1);
    localStorage.setItem('apps', JSON.stringify(apps));
    loadApps();
}

// Cargar apps al iniciar la página
window.onload = loadApps;