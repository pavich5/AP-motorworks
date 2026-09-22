# AP MOTORWORKS

An independent Porsche 911 concept experience by Antonio Pavic. Built with React 19, TypeScript, Vite, React Router, and Motion. Entirely frontend; no accounts, database, secret keys, or paid APIs.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run check   # pricing, sharing, persistence validation, all asset paths
npm run build   # strict TypeScript and optimized production build
npm run preview
```

## Experience

- Cinematic showroom with a three-image gallery, model filters, and editorial sections.
- Individual pages for Carrera, Carrera GTS, and GT3.
- Side-by-side model comparison with a differences-only view.
- Carrera GTS configurator: six paints, two wheel designs, three exterior views, two interiors, and four optional equipment selections.
- Actual Porsche renders for all 36 paint / wheel / angle combinations and both interiors.
- Responsive mobile layout with a sticky vehicle preview and price bar, swipe / keyboard view switching, reduced-motion support, accessible native controls, and keyboard dismissible dialogs.
- Draft recovery, named saved configurations, editing, and removal through device-local browser storage.
- Shareable configuration URLs and downloadable high-resolution PNG build cards.
- Optional feature-detected WebMCP tools: get_911_configuration and configure_911.

## Structure

```text
src/
  App.tsx                   Route definitions and app providers
  components/
    layout/                 Header, footer, route layout
    shared/                 Confirmation dialog, toast, reveal animation
  pages/                    Home composition and not-found page
  features/
    showroom/               Hero, model collection/cards, editorial sections
    models/                 Model detail page
    comparison/             Comparison page and specification table
    garage/                 Garage page, saved-build card, empty state
    configurator/
      ConfiguratorPage.tsx  Composes the configurator UI
      components/           Vehicle viewer, navigation, panel, price bar
      steps/                Exterior, wheels, interior, options, summary
      hooks/                Configuration workflow, shared links, WebMCP
      constants.ts          Named steps and available camera angles
      types.ts              Typed step identifiers and component contracts
  domain/                   Catalog, models, build types, pricing, validation, sharing
  state/                    Build context/provider and browser storage adapter
  hooks/                    Shared export and route-scroll behavior
  lib/                      PNG build-card generation
  styles/                   Ordered foundations, feature styles, responsive rules
```

Components handle rendering and user events. Feature hooks coordinate workflow; pure domain functions handle configuration rules without React or browser storage. The build provider owns the draft, garage, and notifications. Storage keeps the original keys so existing saved builds remain compatible.

To add an equipment option, edit `domain/catalog.ts`. To change a configuration step, edit its component in `features/configurator/steps`. Shared dialogs and build-card exporting are reused by the configurator and garage. The configurator remains lazy-loaded.

`styles/index.css` is the stylesheet entry point. Its imports preserve the original cascade: foundations, shared controls, feature layouts, breakpoint overrides, then final refinements. Breakpoint files are named by their target viewport; reduced-motion rules have their own file. Optimized local imagery remains in `public/images`.

## Product boundaries

All prices are explicitly illustrative EUR concept estimates, not official Porsche pricing or an offer to sell. The configurator focuses on the Carrera GTS; the Carrera and GT3 have model detail and comparison views. Optional equipment affects the estimate and saved summary; exterior imagery represents paint and wheel choices. Shared links carry configurations, not garage data or user identity. Saved data is scoped to the browser and origin and does not sync between devices.

## Imagery and references

Car photography and product renders are © Porsche AG, obtained from official Porsche model pages and the publicly accessible Porsche configurator. This project is an independent design study and is not affiliated with or endorsed by Porsche AG. No open commercial license for the imagery is asserted. Source URLs are retained in `asset-sources.json`.

- https://www.porsche.com/international/models/911/carrera-models/911-carrera/
- https://www.porsche.com/international/models/911/carrera-models/911-carrera-gts/
- https://www.porsche.com/international/models/911/911-gt3-models/911-gt3/
- https://configurator.porsche.com/en-US/mode/model/992142

## Validation

`npm run check` compiles the pure TypeScript modules into a temporary directory and verifies pricing, invalid inputs, shared-link round trips and sanitization, legacy storage keys, malformed/unavailable storage recovery, saved-build limits, and all 45 image paths. `npm run build` checks the full application with strict TypeScript and creates the production bundle.

Browser smoke checks cover showroom filtering, configuration steps and pricing, saving and reload persistence, build-card export, dialogs, comparison filtering, and responsive layout.

Static hosting must fall back to `index.html` for client-side routes. The Sites deployment uses the manifest in `.openai/hosting.json` and the `dist` output.
