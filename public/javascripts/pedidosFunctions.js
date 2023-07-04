function excluirPedido(id) {
  console.log(id);
  fetch(`/pedidos/${id}`, {
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
      alert(error)
      console.error(error);
    });
}

function editarPedido(id) {
  window.location.href = `/pedidos/editarPedido/${id}`;
}

window.addEventListener("load", function () {
  fetch('/pedidos', {
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
        throw new Error('Erro ao obter a lista de pedidoss');
      }
    })
    .then(data => {
      const pedidos = Object.values(data);
      if (Array.isArray(pedidos)) {
        const tabelaPedidos = document.getElementById('tabela-pedidos');

        pedidos[0].forEach(pedido => {
          console.log(pedido)
          const tr = document.createElement('tr');
          tr.classList.add('pedido');

          const codigoTd = document.createElement('td');
          codigoTd.textContent = pedido._id;

          const nomeTd = document.createElement('td');
          nomeTd.classList.add('usina');
          nomeTd.textContent = pedido.usina;

          const medidaTd = document.createElement('td');
          medidaTd.classList.add('produto');
          medidaTd.textContent = pedido.produto;

          const quantidadeTd = document.createElement('td');
          quantidadeTd.textContent = pedido.quantidade;

          const precoTd = document.createElement('td');
          precoTd.textContent = pedido.preco;

          const destinoTd = document.createElement('td');
          destinoTd.textContent = pedido.destino;

          const editarBtn = document.createElement('button');
          editarBtn.classList.add('btn-editar');
          editarBtn.textContent = 'editar';
          editarBtn.addEventListener('click', function () {
            editarPedido(pedido._id);
          });

          const excluirBtn = document.createElement('button');
          excluirBtn.classList.add('btn-excluir');
          excluirBtn.textContent = 'excluir';
          excluirBtn.addEventListener('click', function () {
            excluirPedido(pedido._id, pedido.nome);
          });
          const editar = document.createElement('td');
          const excluir = document.createElement('td');
          editar.appendChild(editarBtn)
          excluir.appendChild(excluirBtn)
          tr.appendChild(codigoTd);
          tr.appendChild(nomeTd);
          tr.appendChild(medidaTd);
          tr.appendChild(quantidadeTd);
          tr.appendChild(precoTd);
          tr.appendChild(destinoTd);
          tr.appendChild(editar);
          tr.appendChild(excluir);

          tabelaPedidos.appendChild(tr);
        })
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro ao obter a lista de pedidos:', error);
      localStorage.clear()
      window.location.href = "/logout"
      alert('Erro ao obter a lista de pedidos. Tente novamente mais tarde.');
    });
})

document.addEventListener("DOMContentLoaded", function () {
  const buscarInput = document.getElementById("buscar");
  const tabelaPedidos = document.getElementById("tabela-pedidos");
  const rows = tabelaPedidos.getElementsByTagName("tr");

  buscarInput.addEventListener("input", function () {
    const searchString = this.value.toLowerCase();

    for (const row of rows) {
      const usina = row.querySelector(".usina").textContent.toLowerCase();
      const produto = row.querySelector(".produto").textContent.toLowerCase();

      if (usina.includes(searchString) || produto.includes(searchString)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});

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
    head: [["Número Pedido", "Nome da Usina", "Nome do pedidos", "Quantidade", "Preço", "Destino"]],
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