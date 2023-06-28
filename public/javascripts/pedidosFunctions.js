
function excluirPedido(id) {
  console.log(id);
  fetch(`/pedidos/${id}`, { method: "DELETE" })
    .then(() => {
      location.href = location.href;
    })
    .catch((error) => {
      console.error(error);
    });
}
function editarPedido(id) {
  console.log(id);
  window.location.href = `/pedidos/editarPedido/${id}`;
}

function exportToPdf() {
  const tabelaPedidos = document.getElementById("myTable");
  const rows = tabelaPedidos.getElementsByTagName("tr");

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

  const columnWidths = [30, 30, 30, 30, 30, 30];

  doc.autoTable({
    startY: y,
    head: [["Número Pedido", "Nome da Usina", "Nome do Produto", "Quantidade", "Preço", "Destino"]],
    body: tableData,
    columnStyles: {
      0: { cellWidth: columnWidths[0] },
      1: { cellWidth: columnWidths[1] },
      2: { cellWidth: columnWidths[2] },
      3: { cellWidth: columnWidths[3] },
      4: { cellWidth: columnWidths[4] },
      5: { cellWidth: columnWidths[5] }
    },
    didDrawPage: function (data) {
      doc.setPage(data.pageCount);
      y = data.cursor.y + 10;
    }
  });

  doc.save("pedidos.pdf");
}