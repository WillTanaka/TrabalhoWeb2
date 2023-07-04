async function cadastrar() {
    await fetch('/clientes/novoCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: this.document.getElementById("nome").value,
            email: this.document.getElementById("email").value,
            senha: this.document.getElementById("senha").value
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "/"
            } else {
                response.json().then(data => {
                    console.log(data)
                    const error = data.error.details[0].message;
                    alert(error)
                    document.getElementById("error").textContent = error
                });
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao obter a lista de pedidos:', error);
        });
}