const urlBase = "https://deoliveiratech-n8n.7ijcmv.easypanel.host/webhook/vero";
const spinner = document.getElementById("spinner");
const spinnerOverlay = document.getElementById("spinner-overlay");

// Função para criar um delay mínimo
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para buscar dados do banco
async function fetchData() {
    try {
        // Mostra o spinner e o overlay
        spinner.classList.add("show");
        spinner.classList.remove("hidden");
        spinnerOverlay.classList.add("show");
        
        // Faz a requisição E aguarda no mínimo 2 segundos
        const [data] = await Promise.all([
            fetch(`${urlBase}/resumo`).then(res => {
                if (!res.ok) {
                    throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            }),
            delay(1000) // 2 segundos mínimos
        ]);
        
        // Renderiza as tabelas
        renderTable('predios-table', data.predios);
        renderTable('horizontal-table', data.horizontal);
        updateTotals(data.predios, data.horizontal);
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        document.getElementById('predios-table').innerHTML = '<div class="alert alert-danger m-3">Erro ao carregar dados</div>';
        document.getElementById('horizontal-table').innerHTML = '<div class="alert alert-danger m-3">Erro ao carregar dados</div>';
    } finally {
        // Esconde o spinner e o overlay
        spinner.classList.remove("show");
        spinner.classList.add("hidden");
        spinnerOverlay.classList.remove("show");
    }
}

// Função para renderizar uma tabela
function renderTable(containerId, data) {
    const container = document.getElementById(containerId);
    
    let html = '<div class="list-group list-group-flush">';
    data.forEach(item => {
        html += `
            <div class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-8">${item.nome}</div>
                    <div class="col-4 count-column">${item.contagem}</div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Função para calcular e exibir totais
function updateTotals(predios, horizontal) {
    const totalPredios = predios.reduce((sum, item) => sum + item.contagem, 0);
    const totalHorizontal = horizontal.reduce((sum, item) => sum + item.contagem, 0);

    document.getElementById('total-predios').textContent = totalPredios;
    document.getElementById('total-horizontal').textContent = totalHorizontal;
}

// Carregar dados quando a página estiver pronta
document.addEventListener('DOMContentLoaded', fetchData);