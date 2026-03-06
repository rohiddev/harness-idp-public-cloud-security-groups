# Public Cloud Security Groups — Harness IDP 2.0 Plugin

**Author:** Rohid Dev · [github.com/rohiddev](https://github.com/rohiddev)

> **POC / Testing Only — No commercial usage.**

A Harness IDP 2.0 custom React plugin and Self-Service Workflow for managing Infrastructure Security Groups across Public Cloud accounts. Developers can look up security groups, manage inbound/outbound rules, and submit ServiceNow RITM tickets — all from a self-service portal.

---

## Preview (no build required)

Open `preview.html` in any browser to see the full interactive prototype:

```bash
open preview.html
```

---

## What's Included

| Path | Description |
|---|---|
| `plugin/` | React plugin (TypeScript) — Step 1 form + Security Groups view |
| `scaffold/workflow.yaml` | Harness IDP 2.0 Self-Service Workflow — Step 1 wizard |
| `catalog-info.yaml` | Registers the plugin in the Harness IDP catalog |
| `preview.html` | Standalone interactive prototype — open in browser, no build needed |

---

## Harness IDP 2.0 Compliance

This repo has been updated for Harness IDP 2.0:

| File | Change |
|---|---|
| `scaffold/workflow.yaml` | Renamed from `template.yaml`. Uses `apiVersion: harness.io/v1` and `kind: Workflow` |
| `catalog-info.yaml` | Uses `harness.io/v1`, added `identifier`, `orgIdentifier`, `projectIdentifier` |

> **API sunset:** Backstage-native APIs are deprecated as of October 2025. All catalog and workflow APIs now go through Harness Platform APIs.

---

## Functionality

### Page 1 — Infrastructure Security Group Step 1

| Field | Type | Notes |
|---|---|---|
| Application ID | Text input | e.g. `SYSID-06534` |
| Application Name | Text input | e.g. `OpenShift (PaaS) - AWS` |
| Account | Dropdown | Required — shows validation on empty submit |
| Region | Dropdown | AWS region |
| Existing RITM? | Dropdown | Optional — defaults to `None` |

Click **CONTINUE** to load the Security Groups view.

### Page 2 — Security Groups

| Feature | Description |
|---|---|
| **Search** | Filter groups by name in real time |
| **Submit to ServiceNow** | Creates a RITM ticket for the rule changes |
| **Generate CSV — All** | Export all security group rules as CSV |
| **Generate CSV — Updates Only** | Export only groups with pending updates |
| **Expand All / Collapse All** | Bulk toggle all groups |
| **Rules table** | Direction, Protocol, Port Range, Source/Destination, Description |
| **Add New Rule** | Inline form per group — saved to state immediately |
| **Delete Rule** | Remove individual rules |

---

## Deployment to Harness IDP

### Step 1 — Build the plugin

```bash
cd plugin
yarn install
yarn build
yarn pack
# Produces: internal-plugin-public-cloud-security-groups.tgz
```

### Step 2 — Upload to Harness IDP (Custom Plugin)

> Custom plugins are in **BETA** — requires `IDP_ENABLE_CUSTOM_PLUGINS` feature flag enabled.
> Not available in EU region clusters.

1. Go to **IDP Admin → Plugins → Custom Plugins → New Custom Plugin**
2. Select **Upload Zip** and upload the `.tgz` file from `yarn pack`
3. Fill in:

   | Field | Value |
   |---|---|
   | Plugin Name | `Public Cloud Security Groups` |
   | Package Name | `@internal/plugin-public-cloud-security-groups` |
   | Category | Infrastructure |
   | Plugin applies to | Service |

4. Click **Save** → **Enable**
5. Wait **~30 minutes** for the IDP image to rebuild

### Step 3 — Add route via IDP Layout

In **IDP Admin → Layout → Routes**, add:

| Field | Value |
|---|---|
| Path | `/public-cloud-security-groups` |
| Plugin Package | `@internal/plugin-public-cloud-security-groups` |
| Exported Component | `PublicCloudSecurityGroupsPage` |

Add a sidebar item in **IDP Admin → Layout → Sidebar**:

| Field | Value |
|---|---|
| Label | `Security Groups` |
| Icon | `security` |
| Path | `/public-cloud-security-groups` |

### Step 4 — Register the workflow

In **IDP → Catalog → Register Existing Component**, paste:

```
https://github.com/rohiddev/harness-idp-public-cloud-security-groups/blob/main/catalog-info.yaml
```

---

## Making Changes

For any code change (new field, new account, UI tweak):

```bash
# 1. Edit plugin/src/
cd plugin
yarn build    # recompile
yarn pack     # create new .tgz

# 2. Re-upload .tgz in IDP Admin → Plugins → Custom Plugins
# 3. Trigger rebuild → wait ~30 min → hard-refresh IDP
```

For **data-only changes** (new account, new region) — edit `plugin/src/data/services.ts`, rebuild, and re-upload.

---

## Project Structure

```
harness-idp-public-cloud-security-groups/
├── plugin/
│   ├── package.json                          # @internal/plugin-public-cloud-security-groups
│   └── src/
│       ├── plugin.ts                         # Backstage plugin registration
│       ├── routes.ts                         # Route reference
│       ├── index.ts                          # Exports PublicCloudSecurityGroupsPage
│       ├── data/
│       │   └── services.ts                   # Mock data: accounts, regions, security groups
│       └── components/pages/
│           └── InfraSecurityGroupPage.tsx    # Step 1 form + Security Groups view
├── scaffold/
│   └── workflow.yaml                         # Harness IDP 2.0 Workflow (Step 1 wizard)
├── catalog-info.yaml                         # IDP 2.0 catalog registration
├── preview.html                              # Standalone prototype
└── .gitignore
```

---

## Tech Stack

| Concern | Library |
|---|---|
| Plugin framework | Backstage (Harness IDP 2.0) |
| UI components | Material UI v4 |
| Language | TypeScript |
| Styling | `makeStyles` (JSS) |
| State | React `useState` |
| Workflow format | `harness.io/v1` — `kind: Workflow` |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Custom plugin option not visible | Feature flag not enabled | Ask Harness support to enable `IDP_ENABLE_CUSTOM_PLUGINS` |
| Plugin not found after rebuild | Package name mismatch | Confirm `package.json` `name` is exactly `@internal/plugin-public-cloud-security-groups` |
| Blank page at route | Route not registered or wrong component name | Re-check Layout → Routes — component must be `PublicCloudSecurityGroupsPage` |
| Rebuild takes >30 min | Build stuck | Refresh status; if still running after 45 min contact Harness support |
| EU cluster — feature unavailable | Custom plugins not in EU | Feature is not available in EU region clusters |

---

## Related Repositories

| Repository | Description |
|------------|-------------|
| `harnessidp-createrepo` | IDP workflow — GitHub repo + Okta groups + GitHub Teams provisioner |
| `harness-idp-self-service-portal` | Main self-service portal plugin |
