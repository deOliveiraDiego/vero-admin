# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application for "Protocolos de Recepção" (Reception Protocols) for Revista Vero - a magazine distribution system for condominiums. The application generates printable delivery protocols and provides summary dashboards for magazine distribution.

## Architecture

### Multi-Page Static Application
- **No build process**: Direct HTML/CSS/JS files served statically
- **4 main pages**: Landing page, 2 protocol generators, 1 dashboard
- **External APIs**: Two webhook endpoints for protocol and summary data
- **Print-optimized**: Specifically designed for A4 protocol generation

### File Structure
```
├── index.html              # Main navigation landing page
├── style.css               # Global styles, print-optimized
├── script.js               # Core protocol generation logic
├── predios.html            # Apartment building protocols
├── horizontais.html        # Horizontal condominium protocols
└── resumo/                 # Dashboard section
    ├── index.html          # Summary dashboard
    ├── index.css           # Bootstrap-enhanced styles
    └── index.js            # Dashboard-specific logic
```

### API Integration
- **Protocol API**: `https://n8n.deoliveiratech.com/webhook/vero/protocolos`
- **Dashboard API**: `https://deoliveiratech-n8n.easypanel.host/webhook/vero/resumo`
- **Data filtering**: By property type (`Prédio` vs `Horizontal`)
- **No authentication**: Webhook-based endpoints

## Development

### Commands
```bash
# Start local development server
python -m http.server 8000
# or
npx serve

# View in browser
open http://localhost:8000
```

### Testing Changes
- Open `index.html` in browser directly
- Use browser dev tools for debugging
- Test print functionality with Ctrl+P/Cmd+P
- Verify protocol generation on both property types

### Code Patterns

#### Protocol Generation
- Shared `script.js` handles both property types
- Type filtering via URL parameters or page context
- Print-specific CSS in `@media print` blocks
- Loading states with spinner overlays

#### Dashboard Architecture
- Bootstrap 5.3.0 for responsive design
- Separate CSS/JS files in `resumo/` directory
- Table-based data presentation
- Real-time totals calculation

### Key Constraints
- **No bundling**: All files must work directly in browser
- **Print optimization**: Protocols must fit A4 layout (3 blocks per page)
- **Portuguese content**: User-facing text in Portuguese
- **Static deployment**: No server-side processing required

### API Data Structure
Protocol endpoints return arrays with objects containing:
- `nome`: Condominium name
- `tipo`: Property type (`Prédio`/`Horizontal`)
- `quantidade`: Magazine count
- Other delivery-specific fields

Dashboard endpoint returns summary statistics and totals.