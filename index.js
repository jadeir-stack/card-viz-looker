window.addEventListener("message", (event) => {
  if (!event.data || !event.data.tables) return;

  const data = event.data;
  const rows = data.tables.DEFAULT;

  const container = document.getElementById("container");
  container.innerHTML = "";

  const qtd = data.style?.qtd_cards || 10;
  const ordenarPor = data.style?.ordenar_por || "total_anual";
  const ordem = data.style?.ordem || "desc";

  // ordenação
  rows.sort((a, b) => {
    const A = a[ordenarPor] || 0;
    const B = b[ordenarPor] || 0;
    return ordem === "asc" ? A - B : B - A;
  });

  const limited = rows.slice(0, qtd);

  limited.forEach(row => {
    const descricao = (row.descricao || "").split("|");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="modalidade">${row.modalidade}</div>
      <div class="produto">${row.produto}</div>

      <div class="label">TOTAL ANUAL</div>
      <div class="total">R$ ${row.total_anual}</div>

      <div class="mensal">
        <span>Mensal:</span>
        <strong>R$ ${row.total_mensal}</strong>
      </div>

      <ul class="lista">
        ${descricao.map(d => `<li>${d}</li>`).join("")}
      </ul>

      <button class="btn">Ver detalhes</button>
    `;

    container.appendChild(card);
  });
});
