
function excluirProduto(id) {
    console.log(id);
    fetch(`/produtos/${id}`, { method: "DELETE" })
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

document.addEventListener("DOMContentLoaded", function() {
    const buscarInput = document.getElementById("buscar");
    const tabelaProdutos = document.getElementById("tabela-produtos");
    const rows = tabelaProdutos.getElementsByTagName("tr");
  
    buscarInput.addEventListener("input", function() {
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

function exportToPdf(){
        const tabelaProdutos = document.getElementById("tabela-produtos");
        const rows = tabelaProdutos.getElementsByTagName("tr");

        // Cria um novo documento PDF
        const doc = new window.jspdf.jsPDF();

        // Define a posição inicial do conteúdo no PDF
        let y = 20;

        // Cria um array para armazenar os dados das células
        const tableData = [];

        // Itera sobre cada linha da tabela
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

        // Define a largura das colunas
        const columnWidths = [60, 60, 60];

        // Gera a tabela no PDF
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
                // Adiciona a largura da tabela ao PDF
                doc.setPage(data.pageCount);
                y = data.cursor.y + 10;
            }
        });

        // Salva o PDF e faz o download
        doc.save("produtos.pdf");
}
  
