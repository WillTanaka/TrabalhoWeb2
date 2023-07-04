window.addEventListener("load", async function () {

    await fetch('/pedidos/editarPed/' + obterIdDaURL(), {
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
                console.error('Ocorreu um erro ao obter a lista de pedidos:', error);
                localStorage.clear()
                window.location.href = "/logout"
            }
        })
        .then(data => {

            const id = this.document.getElementById("id")
            id.value = data.pedidos._id

            const usina = this.document.getElementById("usina")
            usina.value = data.pedidos.usina

            const select = this.document.getElementById("produto")
            const certo = document.createElement('option');
            certo.value = data.produto.nome
            certo.textContent = data.produto.nome
            select.appendChild(certo)

            data.produtos.forEach(produto => {
                const option = document.createElement('option');
                option.value = produto.nome
                option.textContent = produto.nome
                select.appendChild(option)
            })

            const quantidade = this.document.getElementById("quantidade")
            quantidade.value = data.pedidos.quantidade

            const preco = this.document.getElementById("preco")
            preco.value = data.pedidos.preco

            const destino = this.document.getElementById("destino")
            destino.value = data.pedidos.destino

        })
})

function obterIdDaURL() {
    const path = window.location.pathname;
    const partesDoCaminho = path.split('/');
    const id = partesDoCaminho[partesDoCaminho.length - 1];
    return id;
}

function cadastrar() {
    fetch('/pedidos/editarPedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            id: this.document.getElementById("id").value,
            usina: this.document.getElementById("usina").value,
            produto: this.document.getElementById("produto").value,
            quantidade: this.document.getElementById("quantidade").value,
            preco: this.document.getElementById("preco").value,
            destino: this.document.getElementById("destino").value,
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "/telapedidos"
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