document.getElementById("form-login").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:3000/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("usuarioId", data.usuario.id);
    localStorage.setItem("usuarioNombre", data.usuario.nombre);
    window.location.href = "tareas.html";
  } else {
    alert(data.mensaje || "Error al iniciar sesión");
  }
});

