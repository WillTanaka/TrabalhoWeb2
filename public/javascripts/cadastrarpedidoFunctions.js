function cadastrar() {
    fetch('/pedidos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            usina: this.document.getElementById("usina").value,
            produto: this.document.getElementById("produto").value,
            quantidade: this.document.getElementById("quantidade").value,
            preco: this.document.getElementById("preco").value,
            destino: this.document.getElementById("destino").value,
        })
    })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log(response)
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

window.addEventListener("load", async function () {

    await fetch('/pedidos/pedido', {
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
            const produtos = Object.values(data);
            if (Array.isArray(produtos)) {
                const select = this.document.getElementById("produto")
                produtos[0].forEach(produto => {

                    const option = document.createElement('option');
                    option.value = produto.nome
                    option.textContent = produto.nome
                    select.appendChild(option)
                })
            }


        })
})

function obterIdDaURL() {
    const path = window.location.pathname;
    const partesDoCaminho = path.split('/');
    const id = partesDoCaminho[partesDoCaminho.length - 1];
    return id;
}