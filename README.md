# Vero Admin - Protocolos de Recepção

Sistema web para geração de protocolos de recepção da Revista Vero - um sistema de distribuição de revistas para condomínios. A aplicação gera protocolos de entrega imprimíveis e fornece dashboards com resumos da distribuição de revistas.

## Visão Geral do Projeto

Esta é uma aplicação web estática que permite:
- Gerar protocolos de entrega para diferentes tipos de condomínios
- Visualizar estatísticas e resumos de distribuição
- Imprimir protocolos formatados para A4
- Acessar dados via APIs externas

## Arquitetura

### Aplicação Estática Multi-Páginas
- **Sem processo de build**: Arquivos HTML/CSS/JS servidos diretamente
- **4 páginas principais**: Página inicial, 2 geradores de protocolo, 1 dashboard
- **APIs externas**: Dois endpoints webhook para dados de protocolo e resumo
- **Otimizado para impressão**: Especificamente projetado para geração de protocolos A4

### Estrutura de Arquivos
```
├── index.html              # Página inicial de navegação
├── style.css               # Estilos globais, otimizados para impressão
├── script.js               # Lógica principal de geração de protocolos
├── predios.html            # Protocolos para edifícios
├── horizontais.html        # Protocolos para condomínios horizontais
└── resumo/                 # Seção do dashboard
    ├── index.html          # Dashboard de resumo
    ├── index.css           # Estilos com Bootstrap
    └── index.js            # Lógica específica do dashboard
```

### Integração com APIs
- **API de Protocolos**: `https://n8n.deoliveiratech.com/webhook/vero/protocolos`
- **API do Dashboard**: `https://deoliveiratech-n8n.easypanel.host/webhook/vero/resumo`
- **Filtro de dados**: Por tipo de propriedade (`Prédio` vs `Horizontal`)
- **Sem autenticação**: Endpoints baseados em webhook

## Desenvolvimento

### Comandos
```bash
# Iniciar servidor de desenvolvimento local
python -m http.server 8000
# ou
npx serve

# Visualizar no navegador
open http://localhost:8000
```

### Testando Alterações
- Abrir `index.html` diretamente no navegador
- Usar ferramentas de desenvolvimento do navegador para debug
- Testar funcionalidade de impressão com Ctrl+P/Cmd+P
- Verificar geração de protocolo em ambos os tipos de propriedade

### Padrões de Código

#### Geração de Protocolos
- `script.js` compartilhado gerencia ambos os tipos de propriedade
- Filtro de tipo via parâmetros de URL ou contexto da página
- CSS específico para impressão em blocos `@media print`
- Estados de carregamento com overlays de spinner

#### Arquitetura do Dashboard
- Bootstrap 5.3.0 para design responsivo
- Arquivos CSS/JS separados no diretório `resumo/`
- Apresentação de dados baseada em tabelas
- Cálculo de totais em tempo real

### Restrições Importantes
- **Sem bundling**: Todos os arquivos devem funcionar diretamente no navegador
- **Otimização para impressão**: Protocolos devem caber no layout A4 (3 blocos por página)
- **Conteúdo em português**: Texto voltado ao usuário em português
- **Deploy estático**: Não requer processamento server-side

### Estrutura de Dados da API
Endpoints de protocolo retornam arrays com objetos contendo:
- `nome`: Nome do condomínio
- `tipo`: Tipo de propriedade (`Prédio`/`Horizontal`)
- `quantidade`: Contagem de revistas
- Outros campos específicos de entrega

Endpoint do dashboard retorna estatísticas de resumo e totais.