
const url = "https://n8n.deoliveiratech.com/webhook/vero/protocolos";

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    console.log("Dados recebidos:", data);

    createBlocks(data);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function createBlocks(data) {
  const container = document.querySelector(".container");

  data.forEach((item) => {
    const block = document.createElement("div");
    block.className = "block";

    const title = document.createElement("h2");
    title.textContent = "Protocolo de Recepção";
    block.appendChild(title);

    const logo = document.createElement("img");

    logo.alt = "Logo Vero";
    logo.src = 'logo_vero.png'
    block.appendChild(logo);

    const table = document.createElement("table");

    const rows = [
      { label: "De:", value: "Revista Vero" },
      { label: "Para:", value: "Sr. Síndico ou Porteiro" },
      { label: "Condomínio:", value: item.condominio },
      { label: "Quantidade de revistas:", value: item.count },
      { label: "Data e hora:", value: "" },
      { label: "Assinatura:", value: "" },
    ];

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const tdLabel = document.createElement("td");
      const tdValue = document.createElement("td");

      tdLabel.textContent = row.label;
      tdLabel.style.fontWeight = "bold";
      tdValue.textContent = row.value;

      tr.appendChild(tdLabel);
      tr.appendChild(tdValue);
      table.appendChild(tr);
    });

    block.appendChild(table);

    container.appendChild(block);
  });
}

fetchData();
