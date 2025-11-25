const urlBase = "https://n8n.deoliveiratech.com/webhook/vero/protocolos";
const spinner = document.getElementById("spinner");
const spinnerOverlay = document.getElementById("spinner-overlay");
const h1 = document.getElementById("h1");
const header = document.getElementById("header");

async function fetchData(tipo = "") {
  // Mostra o spinner e o overlay
  spinner.classList.add("show");
  spinner.classList.remove("hidden");
  if (spinnerOverlay) {
    spinnerOverlay.classList.add("show");
  }

  const url = tipo ? `${urlBase}?$tipo=${encodeURIComponent(tipo)}` : urlBase;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const response_data = await response.json();
    console.log('Dados recebidos da API:', response_data);

    // Aceita tanto array direto quanto { data: [...] }
    const data = Array.isArray(response_data) ? response_data : response_data.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Dados inválidos ou vazios recebidos do servidor');
    }

    createBlocks(data);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    // Exibe mensagem de erro visual
    const container = document.querySelector(".container");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.innerHTML = `<div class="alert alert-danger" style="max-width: 600px; margin: 2rem auto; padding: 1rem; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24; text-align: center;">Erro ao carregar dados. Tente novamente mais tarde.</div>`;
    container.appendChild(errorDiv);
  } finally {
    // Esconde o spinner e o overlay
    spinner.classList.remove("show");
    spinner.classList.add("hidden");
    spinnerOverlay.classList.remove("show");
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