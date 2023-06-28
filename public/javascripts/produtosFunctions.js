
function excluirProduto(id, nome) {
    fetch(`/produtos/${id}/${nome}`, { method: "DELETE" })
        .then(() => {
            location.href = location.href;
        })
        .catch((error) => {
            console.error(error);
        });
}

function editarProduto(id) {
    console.log(id);
    window.location.href = `/produtos/editarProduto/${id}`;
}

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