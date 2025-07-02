document.getElementById("form-registro").addEventListener("submit", async function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/usuarios/registro", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Usuario registrado con éxito");
    window.location.href = "login.html";
  } else {
    alert(data.mensaje || "Error en el registro");
  }
});

