const url = "https://n8n.deoliveiratech.com/webhook/vero/protocolos";
const generateButton = document.getElementById("gerarProtocolos");
const spinner = document.getElementById("spinner");
const h1 = document.getElementById("h1");
const header = document.getElementById("header");
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Dados inválidos ou vazios recebidos do servidor');
    }

    createBlocks(data);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  } finally {
    spinner.classList.remove("show");
    spinner.classList.add("hidden");
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
    logo.src = "logo_vero.png";
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
    
      if (row.label === "Condomínio:") {
        tdValue.style.fontWeight = "bold";
      }
    
      tr.appendChild(tdLabel);
      tr.appendChild(tdValue);
      table.appendChild(tr);
    });

    block.appendChild(table);

    container.appendChild(block);
  });
}
generateButton.addEventListener("click", () => {
  spinner.classList.add("show");
  header.classList.add("hidden");
  fetchData();
});
