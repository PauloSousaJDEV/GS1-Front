const form = document.querySelector(".form");
const apenasTexto = /^[A-Za-zÀ-ÿ\s]+$/;

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!apenasTexto.test(nome)) {
    alert("Nome inválido."); return; }
  if (!apenasTexto.test(mensagem)) {
    alert("Mensagem inválida."); return; }

  const dados = {
    nome: nome,
    email: email,
    mensagem: mensagem
  };

  localStorage.setItem("formContato", JSON.stringify(dados));

  console.log("Dados do formulário:");
  console.log(dados);

  alert("Formulário válido! Enviado com sucesso.");

  form.submit();
});