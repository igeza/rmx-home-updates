/* Home updates — Property/User Selector (RMX Components, Pop Ups & Overlays,
   node 293:7049, Style=Dropdown) used as a register filter. Prototype only;
   not a foundation file, so check --fix leaves it alone.

   <div data-rmx-selector data-table="#homes" data-col="5">
     <div class="rmx-field__box" data-rmx-selector-trigger>…<span data-rmx-selector-value></span></div>
     <div class="rmx-selector" hidden>
       header: select-all [data-rmx-selector-all] + search input
       list:   .rmx-check[data-value] (data-static, so app.js leaves them alone);
               data-options="column" rebuilds it from the column's values
       footer: [data-rmx-selector-count] selected + [data-rmx-selector-clear]
     </div>
   </div>

   Checked options filter the table's rows by the text in column data-col,
   together with the register's own search box (data-rmx-filter). Load after
   app.js so this recompute runs after its search handler.               */
(function () {
  'use strict';
  var $$ = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };

  function setCheck(c, on) { c.dataset.checked = String(on); c.setAttribute('aria-checked', String(on)); }

  /* Status filter cards ([data-rmx-statusfilters], from the Meter Readings
     approval workflow): one card per status in column data-col. Clicking a
     card filters to that status; clicking it again, or its close icon, clears
     it, and with none selected every status shows. Each count is the rows that pass every OTHER filter, so the cards
     stay live as search and the selectors change. */
  function apply(tableSel) {
    var table = document.querySelector('table' + tableSel);
    if (!table) return;
    var search = document.querySelector('[data-rmx-filter="' + tableSel + '"]');
    var q = search ? search.value.trim().toLowerCase() : '';
    var sels = $$('[data-rmx-selector][data-table="' + tableSel + '"]');
    var cards = document.querySelector('[data-rmx-statusfilters][data-table="' + tableSel + '"]');
    var picked = cards && cards.querySelector('.rmx-statusfilter[aria-pressed="true"]');
    var counts = {};
    var shown = 0;
    $$('tbody tr', table).forEach(function (r) {
      var hit = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
      sels.forEach(function (s) {
        var cell = r.cells[+s.dataset.col];
        var on = $$('.rmx-selector__list .rmx-check[data-checked="true"]', s).map(function (c) { return c.dataset.value; });
        if (hit && cell && on.indexOf(cell.textContent.trim()) === -1) hit = false;
      });
      if (cards) {
        var status = r.cells[+cards.dataset.col] ? r.cells[+cards.dataset.col].textContent.trim() : '';
        if (hit) counts[status] = (counts[status] || 0) + 1;
        if (picked && status !== picked.dataset.value) hit = false;
      }
      r.hidden = !hit;
      if (hit) shown++;
    });
    if (cards) $$('.rmx-statusfilter', cards).forEach(function (c) {
      c.querySelector('[data-rmx-statusfilter-count]').textContent = counts[c.dataset.value] || 0;
    });
    if (window.RMX && table.hasAttribute('data-rmx-striped')) RMX.restripe(table.tBodies[0]);
    $$('[data-rmx-count="' + tableSel + '"]').forEach(function (c) { c.textContent = shown; });
  }

  function wireCards(cards) {
    cards.addEventListener('click', function (e) {
      var card = e.target.closest('.rmx-statusfilter');
      if (!card) return;
      /* No card selected = every status shows. */
      var on = card.getAttribute('aria-pressed') !== 'true';
      $$('.rmx-statusfilter', cards).forEach(function (c) { c.setAttribute('aria-pressed', String(c === card && on)); });
      apply(cards.dataset.table);
    });
    var search = document.querySelector('[data-rmx-filter="' + cards.dataset.table + '"]');
    if (search && !document.querySelector('[data-rmx-selector][data-table="' + cards.dataset.table + '"]'))
      search.addEventListener('input', function () { apply(cards.dataset.table); });
    apply(cards.dataset.table);
  }

  function sync(s) {
    var opts = $$('.rmx-selector__list .rmx-check', s);
    var on = opts.filter(function (c) { return c.dataset.checked === 'true'; });
    var label = on.length === opts.length ? 'All selected'
      : on.length === 0 ? 'None selected'
      : on.length === 1 ? on[0].textContent.trim()
      : on.length + ' selected';
    s.querySelector('[data-rmx-selector-value]').textContent = label;
    s.querySelector('[data-rmx-selector-count]').textContent = on.length;
    setCheck(s.querySelector('[data-rmx-selector-all]'), on.length === opts.length);
    apply(s.dataset.table);
  }

  /* data-options="column": the list is built from the distinct values in the
     register's own column (A–Z), so it always reflects the rows. */
  function fromColumn(s) {
    var table = document.querySelector('table' + s.dataset.table);
    var list = s.querySelector('.rmx-selector__list');
    var tpl = list.querySelector('.rmx-check');
    if (!table || !tpl) return;
    var vals = [];
    $$('tbody tr', table).forEach(function (r) {
      var c = r.cells[+s.dataset.col], v = c && c.textContent.trim();
      if (v && vals.indexOf(v) === -1) vals.push(v);
    });
    vals.sort(function (a, b) { return a.localeCompare(b); });
    list.innerHTML = '';
    vals.forEach(function (v) {
      var c = tpl.cloneNode(true);
      c.dataset.value = v;
      c.lastChild.nodeValue = v;
      setCheck(c, true);
      list.appendChild(c);
    });
  }

  function wire(s) {
    if (s.dataset.options === 'column') fromColumn(s);
    var trigger = s.querySelector('[data-rmx-selector-trigger]');
    var panel = s.querySelector('.rmx-selector');
    var find = panel.querySelector('.rmx-selector__search input');
    var open = function (yes) {
      panel.hidden = !yes;
      s.dataset.open = String(yes);
      trigger.setAttribute('aria-expanded', String(yes));
      if (yes && find) find.focus();
    };
    trigger.addEventListener('click', function () { open(panel.hidden); });
    trigger.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(panel.hidden); } });
    document.addEventListener('click', function (e) { if (!s.contains(e.target)) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });

    panel.addEventListener('click', function (e) {
      var all = e.target.closest('[data-rmx-selector-all]');
      if (all) {
        var yes = all.dataset.checked !== 'true';
        $$('.rmx-selector__list .rmx-check', s).forEach(function (c) { setCheck(c, yes); });
        return sync(s);
      }
      if (e.target.closest('[data-rmx-selector-clear]')) {
        $$('.rmx-selector__list .rmx-check', s).forEach(function (c) { setCheck(c, false); });
        return sync(s);
      }
      var opt = e.target.closest('.rmx-selector__list .rmx-check');
      if (opt) { setCheck(opt, opt.dataset.checked !== 'true'); sync(s); }
    });

    if (find) find.addEventListener('input', function () {
      var q = find.value.trim().toLowerCase();
      $$('.rmx-selector__list .rmx-check', s).forEach(function (c) {
        c.hidden = !!q && c.textContent.toLowerCase().indexOf(q) === -1;
      });
    });

    var search = document.querySelector('[data-rmx-filter="' + s.dataset.table + '"]');
    if (search) search.addEventListener('input', function () { apply(s.dataset.table); });
    sync(s);
  }

  function init() { $$('[data-rmx-selector]').forEach(wire); $$('[data-rmx-statusfilters]').forEach(wireCards); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
