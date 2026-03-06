# Public Cloud Security Groups — Harness IDP Plugin

**Author:** Rohid Dev · [github.com/rohiddev](https://github.com/rohiddev)

> **POC / Testing Only — No commercial usage.**

A Harness IDP 2.0 custom plugin and scaffolder template for managing Infrastructure Security Groups across Public Cloud accounts. Developers can look up security groups, manage rules, and submit ServiceNow RITM tickets — all from a self-service portal.

---

## What's Included

| Path | Description |
|---|---|
| `plugin/` | React plugin (TypeScript) — Step 1 form + Security Groups view |
| `scaffold/template.yaml` | Harness IDP Scaffolder template — Step 1 wizard |
| `catalog-info.yaml` | Registers the plugin in the Harness IDP catalog |
| `preview.html` | Standalone interactive prototype — open in browser, no build needed |

---

## Preview (no build required)

Open `preview.html` in any browser to see the full interactive prototype:

```bash
open preview.html
```

---

## Functionality

### Page 1 — Infrastructure Security Group Step 1

| Field | Type |
|---|---|
| Application ID | Text input |
| Application Name | Text input |
| Account | Searchable dropdown (with validation) |
| Region | Searchable dropdown |
| Existing RITM? | Optional dropdown |

Click **CONTINUE** to proceed to the Security Groups view.

### Page 2 — Security Groups

- **Search** — filter groups by name in real time
- **Submit to ServiceNow** — creates a RITM ticket
- **Generate CSV** — export all or updates-only rules as CSV
- **Expand All / Collapse All** — bulk expand/collapse all groups
- **Per-group rules table** — Direction, Protocol, Port Range, Source, Description
- **Add New Rule** — inline form per group (Direction, Protocol, Port, Source, Description)
- **Delete Rule** — remove individual rules

---

## Deployment to Harness IDP

### Step 1 — Build the plugin

```bash
cd plugin
yarn install
yarn build
```

### Step 2 — Push dist/ to GitHub

```bash
cd ..
git add plugin/dist
git commit -m "build: compile plugin for Harness IDP"
git push origin main
```

### Step 3 — Register in Harness IDP Admin

1. Go to **IDP Admin → Plugins → Add Custom Plugin**
2. Fill in:
   - Package Name: `@internal/plugin-public-cloud-security-groups`
   - GitHub Connector: your GitHub connector
   - Repository: `rohiddev/harness-idp-public-cloud-security-groups`
   - Branch: `main`
   - Plugin Directory: `plugin`

### Step 4 — Add route via IDP Layout

In **IDP Admin → Layout → Routes**, add:

| Field | Value |
|---|---|
| Path | `/public-cloud-security-groups` |
| Plugin Package | `@internal/plugin-public-cloud-security-groups` |
| Exported Component | `PublicCloudSecurityGroupsPage` |

### Step 5 — Register Scaffolder template

In **IDP → Catalog → Register Component**, paste:

```
https://github.com/rohiddev/harness-idp-public-cloud-security-groups/blob/main/catalog-info.yaml
```

---

## Tech Stack

| Concern | Library |
|---|---|
| Plugin framework | Backstage (Harness IDP 2.0) |
| UI | Material UI v4 |
| Language | TypeScript |
| Styling | `makeStyles` (JSS) |
| State | React `useState` |
