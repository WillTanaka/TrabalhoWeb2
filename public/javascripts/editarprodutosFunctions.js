window.addEventListener("load", async function () {

    await fetch('/produtos/editarProduto/' + obterIdDaURL(), {
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
            const id = this.document.getElementById("id")
            id.value = data.produtos._id

            const nome = this.document.getElementById("nome")
            nome.value = data.produtos.nome

            const medida = this.document.getElementById("medida")
            medida.value = data.produtos.medida

            const antnome = this.document.getElementById("antnome")
            antnome.value = data.produtos.nome
        })
})

function obterIdDaURL() {
    const path = window.location.pathname;
    const partesDoCaminho = path.split('/');
    const id = partesDoCaminho[partesDoCaminho.length - 1];
    return id;
}

function cadastrar() {
    fetch('/produtos/editarProduto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            id: this.document.getElementById("id").value,
            nome: this.document.getElementById("nome").value,
            medida: this.document.getElementById("medida").value,
            antnome: this.document.getElementById("antnome").value
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
}