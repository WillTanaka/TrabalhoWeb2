function excluirCliente() {
  if (confirm('Tem certeza de que deseja excluir o usuário? Essa ação não pode ser desfeita.')) {
  fetch('/clientes/excluirCliente', { method: "DELETE" })
    .then(() => {
      window.location.href = '/logout';
    })
  }
}

function editarCliente() {
  window.location.href = `/clientes/editarCliente`;
}
