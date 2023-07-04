
async function excluirProduto(id, nome) {
    await fetch(`/produtos/${id}/${nome}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    })
        .then(() => {
            location.href = location.href;
        })
        .catch((error) => {
            console.error(error);
        });
}

function editarProduto(id) {
    window.location.href = `/produtos/editarProd/${id}`;
}

window.addEventListener("load", function () {
    fetch('/produtos', {
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
                throw new Error('Erro ao obter a lista de produtos');
            }
        })
        .then(data => {
            const produtos = Object.values(data);
            let i = 0
            console.log(produtos)
            if (Array.isArray(produtos)) {
                const tabelaProdutos = document.getElementById('tabela-produtos');

                produtos[0].forEach(produto => {
                    console.log(produto._id)
                    const tr = document.createElement('tr');
                    tr.classList.add('produto');

                    const codigoTd = document.createElement('td');
                    codigoTd.textContent = produto._id;

                    const nomeTd = document.createElement('td');
                    nomeTd.classList.add('nome');
                    nomeTd.textContent = produto.nome;

                    const medidaTd = document.createElement('td');
                    medidaTd.classList.add('medida');
                    medidaTd.textContent = produto.medida;

                    const editarBtn = document.createElement('button');
                    editarBtn.classList.add('btn-editar');
                    editarBtn.textContent = 'editar';
                    editarBtn.addEventListener('click', function () {
                        editarProduto(produto._id);
                    });

                    const excluirBtn = document.createElement('button');
                    excluirBtn.classList.add('btn-excluir');
                    excluirBtn.textContent = 'excluir';
                    excluirBtn.addEventListener('click', function () {
                        excluirProduto(produto._id, produto.nome);
                    });
                    const editar = document.createElement('td');
                    const excluir = document.createElement('td');
                    editar.appendChild(editarBtn)
                    excluir.appendChild(excluirBtn)
                    tr.appendChild(codigoTd);
                    tr.appendChild(nomeTd);
                    tr.appendChild(medidaTd);
                    tr.appendChild(editar);
                    tr.appendChild(excluir);

                    tabelaProdutos.appendChild(tr);
                    i++;
                })
            }
            console.log("deu bomn")
        })
        .catch(error => {
            console.error('Ocorreu um erro ao obter a lista de produtos:', error);
            localStorage.clear()
            window.location.href = "/logout"
            alert('Erro ao obter a lista de produtos. Tente novamente mais tarde.');
        });
})

document.addEventListener("DOMContentLoaded", function () {
    const buscarInput = document.getElementById("buscar");
    const tabelaProdutos = document.getElementById("tabela-produtos");
    const rows = tabelaProdutos.getElementsByTagName("tr");

    buscarInput.addEventListener("input", function () {
        const searchString = this.value.toLowerCase();

        for (const row of rows) {
            const nome = row.querySelector(".nome").textContent.toLowerCase();

            if (nome.includes(searchString)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
});

function exportToPdf() {
    const tabelaProdutos = document.getElementById("myTable");
    const rows = tabelaProdutos.getElementsByTagName("tr");

    const doc = new window.jspdf.jsPDF();

    let y = 20;

    const tableData = [];

    for (const row of rows) {
        const cells = row.getElementsByTagName("td");
        let includeCell = true;
        const rowData = [];

        for (let i = 0; i < cells.length - 1; i++) {
            const cell = cells[i];
            const cellText = cell.textContent.trim();
            rowData.push(cellText);
        }

        if (includeCell) {
            tableData.push(rowData);
        }
    }

    const columnWidths = [60, 60, 60];

    doc.autoTable({
        startY: y,
        head: [["Número Produto", "Nome do Produto", "Unidade de Medida"]],
        body: tableData,
        columnStyles: {
            0: { cellWidth: columnWidths[0] },
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] }
        },
        didDrawPage: function (data) {
            doc.setPage(data.pageCount);
            y = data.cursor.y + 10;
        }
    });

    doc.save("produtos.pdf");
}