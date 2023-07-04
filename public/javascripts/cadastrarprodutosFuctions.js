async function cadastrar() {
    await fetch('/produtos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            nome: this.document.getElementById("nome").value,
            medida: this.document.getElementById("medida").value,
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "/telaprodutos"
            } else {
                response.json().then(data => {
                    if (data.error == "Token inválido") {
                        localStorage.clear()
                        window.location.href = "/logout"
                        alert(data.error);
                    } else {
                        const error = data.error.details[0].message;
                        alert(error)
                        document.getElementById("error").textContent = error
                    }
                });
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao obter a lista de pedidos:', error);

        });
}