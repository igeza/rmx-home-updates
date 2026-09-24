# Home updates

How Homes (manufactured housing) show up across Express: a Homes register, the
Tenant and Prospect detail pages, and linking a home during Move In. For the
Home updates project team and stakeholder reviews.

**Owner** Izabella Geza · **Started** 2026-09-23 · **Design system** RMX · **Built with** rmx-prototyping 4.1.0

**Live prototype:** https://igeza.github.io/rmx-home-updates/ (opens on Unit detail) · **Repo:** https://github.com/igeza/rmx-home-updates (public, GitHub Pages from `main` /, like the RMR portal prototype). Published 2026-09-24; push to `main` to update it.

## Demo flow

1. **Unit detail**: Lot 101 at Flagstone Manufactured Housing, Homeowner Status unassigned (Brand Lozenge, italic placeholder `<Unassigned Homeowner Status>`, Izabella 2026-09-24), with home SW010 on the lot (scoreboard item, Home tab).
2. **Mega Menu › Rental Info › General › Homes**: the Homes register.
3. **Mega Menu › Prospects**: the Prospect register. Click **Charlie Apegian** (Lease Published, Flagstone).
4. **Prospect details** › **Move In** (scoreboard split button or Reservation tile) opens the Move-in wizard for Lot 101 with home SW010 linked.
5. **Move In** in the wizard footer shows a loading state in the button (a white spinner, no text) for 1.5 seconds, then opens **Tenant detail**, which starts as just the header and Context Bar over the empty grey page for 0.8 seconds before the scoreboard, tabs and Actions rail fade in and the tiles rise in one after another, with no toast in either place (Izabella, 2026-09-24); `?moved-in=1` only marks Charlie as moved in, so the Tenant register lists him. The Overview Leases tile shows Property FLAG, Home SW010, Unit Lot 101, with lease 10/01/2026 – 09/30/2027.

Menu wiring (Tenants, Prospects, Homes) lives in `assets/home-nav.js`; the register filter selector in `assets/home-selector.js`. **Tenants** opens the Tenant register, and the menu's separate **Tenant Register** item is removed (Izabella, 2026-09-24).

## Screens

| Screen | What it shows |
|---|---|
| [`screens/unit-detail.html`](screens/unit-detail.html) | **Start here.** Lot 101 at Riverview Apartments, from RMX Pages node 1952:151098 (the mock's "1B" became Lot 101, a manufactured-home lot). The scoreboard adds **SW010**, the home on the lot, which opens the **Home** layout tab (`#home`). Charlie Apegian (scoreboard, Occupancy) links to Tenant detail, and Tenant detail's Leases tile links back via Unit Lot 101. The mock's placeholder "Header/Text" tiles are filled with lot data. Images keeps one section, **Unit Image 1**, with a single photo of the lot (Izabella, 2026-09-24). Photo: "Mobile home with garage" by Wikideas1 on Wikimedia Commons, CC0 (no attribution required); full size in `assets/lot-101.jpg`, embedded at 480px in the screen because `bundle.mjs` doesn't carry images into a published page. |
| [`screens/tenant-detail.html`](screens/tenant-detail.html) | Charlie Apegian, current tenant, Riverview Apartments Lot 101. Rebuilt 2026-09-23 from *Tenant Account Navigation – Convert Overlays to Tabs* (Figma `nju4pxa9Tg7GvCw8Hr95Qq`, V1 / All Tenant Tabs): tabs Overview, General, Leases, Contacts (Detail / List), History / Notes, Transactions, Payments, Recurring Charges, Service Issues, UDFs; the two custom-layout tabs were removed (2026-09-23). Left: collapsible Tenant Search List. Right: collapsible Actions rail. Open `tenant-detail.html#<tab>` (e.g. `#leases`) to land on a tab. |
| [`screens/tenant-register.html`](screens/tenant-register.html) | Tenants register, 18 tenants, added 2026-09-24. Started from the Prospect register (RMX Pages node 2052:38553); no Figma frame, so the columns (Name, Property, Unit, Status, Phone, Lease End, Balance) and filters (Status, Property) are assumed. Names come from Tenant detail's tenant list. Only Charlie Apegian's row opens a record (Tenant detail). **Charlie is listed only after the move in** (Izabella, 2026-09-24): completing Move In in the wizard opens Tenant detail with `?moved-in=1`, which sets a `sessionStorage` flag; until then his row is removed and the register shows 17 of 311. A new browser tab starts the demo over. |
| [`screens/home-register.html`](screens/home-register.html) | Homes register, 9 homes. Pattern from RMX Pages node 4131:96370 (Utilities register); columns from the earlier Claude Code Home Register draft. |
| [`screens/prospect-register.html`](screens/prospect-register.html) | Prospects register, from RMX Pages node 2052:38553. Only Charlie Apegian's row opens a record. |
| [`screens/prospect-details.html`](screens/prospect-details.html) | Charlie Apegian, Lease Published at Flagstone Manufactured Housing, reserved Lot 101 from 10/01/2026. From RMX Pages node 3784:54067. |
| [`screens/move-in-wizard.html`](screens/move-in-wizard.html) | Move In Add Wizard open over Charlie's Prospect details, linking existing home SW010 on Lot 101. Move In completes the move in and opens Tenant detail. From RMX Pages node 4671:32805. |

`index.html` opens straight into **Unit detail**, where the demo starts; it no longer lists the screens (Izabella, 2026-09-24). Every other screen is reached from the demo flow and the Mega Menu, or directly by its file in `screens/`.

## How it was built

Every screen was built from the Figma frames through the Figma MCP: component
names, bound variables, padding, gaps and named text styles. The screenshots
were used only for visual comparison, never measured. Every icon was exported
from the real glyph in those frames into `assets/icons-local.svg`. None were drawn.

- `assets/home.css` holds recipes that `rmx.css` doesn't cover yet (see below).
  It is not a foundation file, so `check --fix` leaves it alone.
- Each screen carries an inline copy of `assets/icons-local.svg` between
  `RMX_ICONS_LOCAL` markers. If you add a glyph to that file, re-copy it into
  the screens.
- The move-in wizard screen repeats the Prospect details markup underneath the
  overlay. If you change Prospect details, change it there too.

## Working on it

```
node <skill>/scripts/check.mjs .          # stamp + audit, before sharing
node <skill>/scripts/bundle.mjs .         # self-contained copies for publishing
```

## Not real yet

What this prototype fakes or skips, so nobody reads it as decided:

- Tenant detail: the tab and tile arrangement follows the navigation mock. Home appears only in the Overview **Leases** tile, as a `Home: SW010` field (Izabella, 2026-09-23). Since 2026-09-24 that tile's fields sit in one 4-column grid read left to right: Property, Unit, Home, Lease Start / Lease End, Lease Sign, Move In, Move Out / Expected MO, Notice, Lease Terms (2 columns on a phone). The Home tab, the scoreboard home item and the home lease in the Leases tab were removed. The Security Deposit Status and Resident Payout Status callouts were removed (2026-09-23).
- **Tenant detail: the left tenant list is hidden for now** (Izabella, 2026-09-23), along with its expand arrow. It's still in the page; remove `data-nav-hidden` from `.rmx-tenantshell` to bring it back (it then starts collapsed).
- **Prospect details (and the Move-in wizard behind it) use the Actions rail** instead of the navy Action Bar, matching Tenant detail (Izabella, 2026-09-24). Shortcuts: Add Note, Move In (opens the wizard), Run Screening, <New Email> Send Email. The other categories hold sample prospect actions (Leasing has Add Rent Quote, Add Reservation, Move In, Publish Signable Documents); all but Move In are stubs. Behaviour in `assets/home-actionrail.js`. Unit detail still has the navy Action Bar.
- Tenant detail side menus: the tenant list filters as you type and collapses to the arrow beside the Scoreboard; switching tenants is a stub. The Actions rail follows the navigation file's Customize Action Bar frame (2234:21121) and Izabella's screenshot: category icons on the left (Shortcuts, Overview, Leasing, Financial, Communication, Reports, Settings), then a divider and the category's actions. The Shortcuts and Communication items come from the frame; the other categories' items are sample Express actions. Every link is a stub. The collapsed rail replaces the navy Action Bar from the first mock. The Home tab tiles came from a non-RMX screenshot and were rebuilt as standard RMX Tiles; the screenshot's coloured top bars were not carried over. Its home summary strip is an RMX Callout with Move Home and Add Note actions (stubs).
- **The app bar and Context Bar are sticky** on every screen (Izabella, 2026-09-24); the tenant list and Actions rail stick just below them. Register pages already fit the window and scroll inside the register.
- Nothing saves. Dropdowns, checkboxes, radios, toggles, tabs and the interest slider work; field values are static.
- **Move In** (the Prospect scoreboard split button and the Reservation tile) opens the wizard. The wizard's step list scrolls the canvas. Move In opens Tenant detail (no toast in the wizard); Cancel returns to Prospect details.
- Tenant register: search filters rows and headers sort. The Status and Property filters work (see Register filters below). Only Charlie's row opens a record (and gets the pointer); the other rows, Add Tenant, Bulk Actions, kabob and the column chooser are stubs.
- Homes register: search filters rows and headers sort. **Status is a row of status filter cards above the register** (On Site, For Sale, Inventory, In Transit), not a dropdown (Izabella, 2026-09-24). Each card shows a live count of the rows that pass search and Property; clicking a card filters to it (status-coloured border and a close icon), and clicking it again or its close icon clears it. With no card selected, every status shows (the default). An All card was tried and removed (Izabella, 2026-09-24). One status at a time, as in the Meter Readings approval workflow. The Property filter works (see Register filters below). Row click, Add Home, kabob and the column chooser are stubs.
- Prospect details (and the wizard's copy) **History / Notes** shows two rows, from Izabella's reference (2026-09-24): 09/10/26 Prospect Applications, *Prospect application status: Submitted by Charlie Apegian (capegian@lcs.com) on 09/10/26 at 2:14 PM*, and 08/28/26 System, *Account created*. The reference named another person; the prototype uses Charlie, with dates that fit Tenant detail's history (web lead 08/28/26, quote 09/12/26). Long notes truncate with an ellipsis instead of scrolling. The History / Rent Quotes row keeps its earlier 304px height (`.rmx-tilerow--history`).
- Charlie Apegian's colour block in the Prospect and Tenant registers is `Border/border-scoreboard` (#425a70), the same slate as the bar on his Prospect details and Tenant detail Scoreboards (Izabella, 2026-09-24).
- **Register filters** (Izabella, 2026-09-24): Status (Tenants, Prospects) and Property (Homes, Tenants) use the RMX **Property/User Selector** (Pop Ups & Overlays, node 293:7049, Style=Dropdown) instead of a single-select Dropdown Menu, whose selected row is solid blue. Checkbox list with select-all, search, a count and **clear**; the trigger reads All selected / one name / N selected / None selected. Ticking filters the rows, together with the register search. The Property selector's Group field is a stub and Inactive Properties only toggles. Behaviour in `assets/home-selector.js`. The Property list is built from the register's own Property column (A–Z), so it only offers properties that have rows (Homes: Cedar Grove, Flagstone MH; Tenants: Flagstone Manufactured Housing, Riverview Apartments), not the 65 in the reference. The Search field has no dropdown arrow. Lot 101 in the Homes register (the one real link in the Unit column) has no underline until hover, like the other lots.
- Every other affordance is marked `data-rmx-todo`. Since skill 4.2.0, clicking one does nothing (no toast); this list is where unbuilt features are recorded.
- **Move-in wizard: the Home tile is hidden for now** (Izabella, 2026-09-24): the linked home SW010, the Create lease / RV / Link existing home options and the home fields. It's still in the page; remove `hidden` from the section marked `data-home-hidden` to bring it back. Tenant detail still shows Home SW010 in the Leases tile.
- Move-in wizard, Lease tiles: **Property and Items are type-to-search fields** (Izabella, 2026-09-24): search icon, the property name, no chevron. Clicking it opens a panel reading *Start typing to search...*; typing lists matching properties (Buckeye Hall, Cedar Grove, Clearcreek Condominiums, Flagstone Manufactured Housing, Riverview Apartments, Tri-County Mall), or *No matching properties*. Picking one fills the field; leaving without picking restores the last one. Items works the same way, listing each lot with the home on it (Izabella, 2026-09-24): Lot 101, SW010 (the default); Lot #122, SW018; Lot #141 (no home), as in the Homes register. Typing a lot or a home number finds it (*No matching items*), and starts empty in an added Lease tile. Built from Input Field (leading icon on, chevron off) and a Dropdown Menu panel.
- Move-in wizard, Lease tile: **+ Add Lease** in the tile header adds another Lease tile (Lease 2, Lease 3, …) below the last one (Izabella, 2026-09-24). The new tile keeps the Property; Items, dates and Lease Term start empty. Its dropdowns and Leased Items menu work; nothing saves, added tiles can't be removed (reload to reset), and the wizard's step list still has one Lease step. The Unit field is labelled **Items**. The unit-picker icon button is **hidden for now** (Izabella, 2026-09-24; remove `hidden` from the button marked `data-unitpicker-hidden` to bring it back), followed by a **+ Leased Items** Primary button with a chevron that opens a menu of Home, Asset and ORI (each a stub). It was briefly a split button; Izabella went back to a regular button (2026-09-24). The tile's form column is widened (2:1 against Lease Documents) so the three fit.
- Data is sample data. Charlie Apegian is the demo prospect-turned-tenant: Prospect details, the Move-in wizard and Tenant detail all show him at Flagstone Manufactured Housing, Lot 101, home SW010. Unit detail shows Lot 101 *before* the move in (vacant; previous tenant Jerry Vechio). On Tenant detail, the Overview Leases, Transactions and History tiles and the lease dates reflect the 10/01/2026 move in. The deeper tabs (History / Notes, Transactions, Service Issues, Payments) still carry older sample rows. Kobe Bayer is now just a row in the Prospect register.
- **Mega Menu:** Rental Info → General → **Tenants** opens the Tenant register (the **Tenant Register** item is removed), **Prospects** opens the Prospect register, and a new **Homes** item after Properties opens the Homes register. `megamenu.js` is a foundation file that `check --fix` re-copies, so this wiring lives in `assets/home-nav.js`, loaded after it on every screen. Every other menu item is still a stub.
- The mocks had placeholder strings ("Label", "Header", "Text"). These were replaced with realistic content, e.g. Service Issues Open / Closed, Rent Quotes Current / All, and the Interested Properties columns.

## Waiting on the design system

- **Home icon.** RMX Iconography has no Home glyph. `#home-marker` in `assets/icons-local.svg` is a stand-in built from Izabella's reference sketch, marked `data-provisional`, so the audit reports it as an error on every run. It's used on Unit detail: in brand blue in the scoreboard (SW010) and in the Home tab's summary Callout. Next step: have it drawn properly and added to RMX Iconography via Emma, then harvest it into that one symbol and remove `data-provisional`.

- **Move In loading state** (Move-in wizard footer, Izabella 2026-09-24): the library Button has no loading state, so the button takes its Disabled state, hides its label (keeping its width) and the ring from the RMX **Loading Spinner** (RMX Components, Specialized, node 9426:1561) turns in the middle, white (CSS filter over the library's orange gradient) at the 20px icon size, for 1.5 seconds; the house logo is left out at that size. The ring was exported 2026-09-24 to `assets/loading-spinner-ring.svg` (the logo to `assets/loading-spinner-logo.svg`, unused for now) and is inlined in the screen. Figma's export carries an empty mask that hides the ring, so the inline copy drops the two mask references; gradient and geometry are untouched. The spin (once a second) is a prototype choice; the library gives no motion. A full-screen spinner was tried and replaced. Worth raising with Emma: a Button loading state.

## Deliberate deviations

| Rule | Where | Why we kept it |
|---|---|---|
| `tab-underline-colour` — active tab must be blue | Tenant detail, layout tab row | Designer decision (Izabella, 2026-09-23): follow the RMX Pages mock, which overrides the Tabs stroke to `Border/border-attention` (orange). The library component default is blue. Addresses tabs stay blue, as in the mock. |
| Tile header underline is `border-secondary` blue | Tenant detail: Transactions, Miscellaneous | Same decision: the mock overrides these two to `Border/border-success` (green). |
| Truncated register cells keep the normal cursor, not `cursor: help` | All registers (`assets/home.css` overrides `responsive.css`) | Designer decision (Izabella, 2026-09-24): the mouse never turns into a question mark. The full value still shows as a tooltip on hover. Only a row that opens a record (Charlie Apegian) shows the pointer. Charlie's name is plain text like every other name; the whole row is the click target (Izabella, 2026-09-24). |
| Status filter cards are not an RMX library component | Homes register | Designer decision (Izabella, 2026-09-24): the pattern comes from *Meter Exception Reasons – Approval Workflow 1.0* (Figma `mUHxMSEt4VN4UN9CKMVriD`, Approval Status Filters, node 3964:45882). Measured from that file: 62px cards, 16px gap, 4px colour bar, Paragraph/S/Regular label, Heading/S/SemiBold count, dropshadow-xs, 20px close. The file's selected blue is a raw `#195ca4`; the prototype uses the RMX status tokens that match each status's Lozenge instead: On Site green (success), For Sale red (error), Inventory blue (brand), In Transit orange (caution) (Izabella, 2026-09-24). Raise with Emma if it should join the library. |
| Register row hover tint; no blue text in rows | Homes, Tenant and Prospect registers (`.rmx-register--quiet`) | Designer decision (Izabella, 2026-09-24). RMX registers have no row hover (Emma, 2026-09-10); here each row tints to `Component/register-row-hover` (#ebf1f5) under the cursor. Home and Unit cells are plain navy instead of link blue (Lot 101 still opens Unit detail), and the row kabob stays `icon-primary` blue (Izabella, 2026-09-24). Status lozenges and the first-column colour blocks keep their colours. Worth raising with Emma if it should apply to all registers. |
| Button side padding follows the library, not `rmx.css` | Every screen (`assets/home.css`) | Izabella, 2026-09-24: icon buttons looked over-padded. The library Button (node 373:2710) has 8px padding, gap 0, and 8px side padding on the label, so an icon sits 8px from the edge and 8px from the label, and a text-only button still gets 16px sides. The foundation `rmx.css` pads every button 16px with a 4px gap. Worth raising with Emma so `rmx.css` matches the library. |
| Grayscale font smoothing on the app bar and Context Bar | Every screen (`assets/home.css`) | Izabella, 2026-09-24: the Context Bar title (Heading/S/Regular, 18px/400, per the library) read as semibold, because macOS browsers thicken white-on-dark text by default. Nothing in the Context Bar is bold on any screen; the pager count is Label/M/Regular. |
| `control-height` warnings on `.rmx-actiontext` | All detail screens | Tile-header Action text buttons are 16–20px tall in the library (`_Button Group Style=Action Text`), not 36px controls. |
| `contrast` warning, `#008dd5` link text | Tenant detail, Leases tile | `Text/text-link` is the system link colour; not ours to change. |
| Pager count uses Label/M/Regular | Context Bar pagination | The library text is unstyled 14px Medium, which is not a named style. It was SemiBold (nearest named style); Izabella asked for it not bold (2026-09-24), so it's Label/M/Regular. |
| Tile header underlines follow the navigation mock (orange, green, navy `border-quaternary`) | Tenant detail tabs | Same designer decision as the layout tabs: follow the mock's overrides. |
| Home Callout carries buttons | Unit detail, Home tab | Designer decision (2026-09-23). It now uses the standard blue Callout border and icon (Izabella, 2026-09-24; it was maroon `Light/Accent/Pink/600`). The Callout carries Move Home (Primary) and Add Note (Secondary) buttons, which the Callout component doesn't have. Worth raising with Emma. |
| Add Wizard has no outer border | Move-in wizard | Designer decision (2026-09-23): no light or grey frame around the wizard. The library's `Main Add Wizard` draws 1px `border-primary` on its top, left and right edges. |

## Worth raising with the design system (for Emma)

Found while building. None of these change a rule locally; they're listed here so Emma can decide.

- **Tokens missing from `tokens.css`**, harvested from the mocks: `border-scoreboard` #425a70, `border-notice` #f79b4d, `border-success` #a8d48f, `component-lozenge-notice` #feedd2, `component-register-row-striped` #f5f8fa, `secondary-button-hover` #ebf1f5, Light Alpha/Blue/70-600, `icon-primary`, `Spacing/5xl` (56).
- **`rmx.css` values that differ from the library instances:** the Scoreboard colour bar is `border-scoreboard`, not `container-secondary-dark`; Callout Type=Warning uses `border-notice`, not `border-attention`.
- **`proto.css`** styles the selected dropdown option at weight 500, which isn't a text style. It's overridden to Label/M/SemiBold in `home.css`.
- **Recipes `rmx.css` doesn't have** and `home.css` now supplies: Context Bar search, pager and filter button; Scoreboard items; Split CTA date fields; Text Box; Toggle Switch Small; Toggle Slider; Continuous Slider; Add Wizard with ramps; Attachments; Tile totals; Add Photo.
- **Components newer than the skill's inventory**, used on Tenant detail and harvested from the navigation file: Tenant Search List, `_Action Bar - Right Icons` (Collapsed/Expanded), `_Menu Category Icons`, `_Action List`, Tenant Tabs, Sidebar List / Sidebar List Item. The audit tags them with the nearest inventory names (Sidebar List, Action Bar, Tabs).
- The navigation mock still contains deprecated parts (`⛔️ Lozenge`, `⛔️ Context Bar Section`, the `Paragraph/Medium/Regular` style, custom register tables). They were rebuilt with the current RMX equivalents.
- **Embedded registers in Tiles are striped in the mocks** (`Cell Striped=True` on alternate rows), so History and Transactions use `data-rmx-striped`.
