# Quantinox Cloud ERP — React Application

An intelligent, next-generation Cloud ERP platform built with **React 19**, **TypeScript**, and **Vite**, rewritten from the imported vanilla HTML/Fastify stack while preserving all domain capabilities, brand aesthetics, and business workflows.

---

## 🌟 Key Architecture & Capabilities

### 1. Unified Core Modules
- **Finance & Accounting**: Real-time multi-currency general ledger, automated bank reconciliation, AR/AP aging, GST/VAT auto-filing, 48-hour period close.
- **Supply Chain & Logistics**: Multi-warehouse visibility, demand sensing, automated carrier dispatch, barcode tracking.
- **Manufacturing & MES**: Shopfloor dispatch, finite MRP scheduling, BOM revisions, IoT telemetry.
- **Spend & Procurement**: 3-way match, dynamic vendor rating, RFP auctions.
- **Sales & Order-to-Cash**: Omnichannel CRM, CPQ configuration, credit limit controls.
- **Field Services & PSA**: SLA management, engineer GPS dispatch, milestone billing.
- **Enterprise Asset Management (EAM)**: Predictive IoT sensor vibration/temperature monitoring, MTBF/MTTR tracking.
- **Human Resources & Payroll**: Statutory compliance, automated payroll generation, shift scheduling.
- **Cloud Platform**: Multi-tenant database isolation, 99.99% uptime SLA, SOC2 Type II, ISO 27001.
- **Quanta AI Architecture**: Sovereign autonomous agents, zero LLM data leakage, BM25 retrieval.

### 2. Interactive Enterprise Tools
- **Quanta AI Assistant Drawer**:
  - Global accessibility via `Ctrl + I` / `Cmd + I` or floating bottom trigger.
  - Client-side BM25 search over official Quantinox knowledge base.
  - Voice recognition and speech synthesis.
  - Interactive smart cards for requesting live demos, scheduling engineer callbacks, opening Suite Finder, launching Value Calculator, starting guided tours, and contacting WhatsApp support.
- **AI Solution Advisor (`/ai-advisor`)**:
  - Dynamic 4-step wizard generating tailored implementation blueprints, phased roadmap, quick wins, and risk mitigations.
- **ROI & Value Calculator (`/value-calculator`)**:
  - Real-time modeling of annual bottom-line savings, FTE efficiency recovery, and days-to-close compression.
- **Product Tour (`/tour`)**:
  - 6-step guided walkthrough across Finance, Shopfloor, Supply Chain, and Autonomous Agents.
- **Command Palette Search**:
  - Instant keyboard shortcut `/` triggering search with fuzzy matching across all 40+ pages, modules, and docs.

### 3. Enterprise Portal & Operator Command Center
- **Customer Portal (`/account`)**:
  - License overview, SLA tier status, profile management, password security, and GDPR Art. 20 JSON data portability export.
- **Admin Command Center (`/admin`)**:
  - CRM leads inbox with intent scoring (Hot/Warm/Cold), status transitions (New, Contacted, Qualified, Lost), and CSV export.
  - Tenant deployment roster and Quanta AI chat feedback inspector.

### 4. Bilingual English & Hindi (हिन्दी)
- Seamless one-click language toggle across all navigation mega-menus, hero titles, module descriptions, and documentation checklists.

---

## 🚀 Running the Application

### Development Server
```bash
npm run dev
```
The application will start on `http://0.0.0.0:3000`.

### Production Build
```bash
npm run build
```
Type checks via `tsc -b` and bundles production assets into `dist/`.

---

## 🎨 Design System
Preserves 100% of the Quantinox design tokens:
- **Brand Navy**: `#0B1020`
- **Accent Solid**: `#2F54EB`
- **Surface**: `#F5F7FB`
- **Typography**: `Sora` (Display headings), `Inter` (Body copy), `Noto Sans Devanagari` (Hindi text).
- **Themes**: Native light and dark modes with system preference auto-detection.
