window.addEventListener("load", async function () {
    console.log("teste")
    console.log(localStorage.getItem('token'))
    await fetch('/clientes/editarCliente', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Ocorreu um erro ao obter a lista de pedidos');
                localStorage.clear()
                window.location.href = "/logout"
            }
        })
        .then(data => {
            console.log(data)
            const nome = this.document.getElementById("nome")
            nome.value = data.cliente.nome

            const email = this.document.getElementById("email")
            email.value = data.cliente.email

            const senha = this.document.getElementById("senha")
            senha.value = data.cliente.senha

            const confirma = this.document.getElementById("confirmar-senha")
            confirma.value = data.cliente.senha
        })
})

async function cadastrar() {
    await fetch('/clientes/editarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            nome: this.document.getElementById("nome").value,
            email: this.document.getElementById("email").value,
            senha: this.document.getElementById("senha").value
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = `/home?token=${localStorage.getItem('token')}`
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

async function excluirCliente() {
    if (confirm('Tem certeza de que deseja excluir o usuário? Essa ação não pode ser desfeita.')) {
        await fetch('/clientes/excluirCliente', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.clear()
                    window.location.href = "/logout"
                } else {
                    response.json().then(data => {
                        const error = data.error;
                        alert(error)
                        document.getElementById("error").textContent = error
                    });
                }
            })
    }
}