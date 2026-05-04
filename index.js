dscc.subscribeToData(draw, { transform: dscc.objectTransform });

function draw(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  let rows = data.tables.DEFAULT;

  const qtd = data.style.qtd_cards || 10;
  const ordenarPor = data.style.ordenar_por || "total_anual";
  const ordem = data.style.ordem || "desc";

  rows.sort((a, b) => {
    const A = a[ordenarPor]?.value || 0;
    const B = b[ordenarPor]?.value || 0;
    return ordem === "asc" ? A - B : B - A;
  });

  rows = rows.slice(0, qtd);

  rows.forEach(row => {
    const card = document.createElement("div");
    card.className = "card";

    const descricao = (row.descricao?.value || "").split("|");

    card.innerHTML = `
      <div class="modalidade">${row.modalidade.value}</div>
      <div class="produto">${row.produto.value}</div>

      <div class="label">TOTAL ANUAL</div>
      <div class="total">${row.total_anual.formattedValue}</div>

      <div class="mensal">
        <span>Mensal:</span>
        <strong>${row.total_mensal.formattedValue}</strong>
      </div>

      <ul class="lista">
        ${descricao.map(d => `<li>${d}</li>`).join("")}
      </ul>

      <button class="btn">Ver detalhes</button>
    `;

    container.appendChild(card);
  });
}