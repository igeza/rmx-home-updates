/* Home updates — Actions rail (_Action Bar - Right Icons, navigation file 2234:21121) on Prospect details
   and the Move-in wizard, same behaviour as Tenant detail's inline copy: the double chevron expands and
   collapses it, a category icon expands it to that category's actions. Prototype only. */
(function () {
  'use strict';
  var $$ = function (q, r) { return [].slice.call((r || document).querySelectorAll(q)); };
  $$('[data-rmx-actionrail]').forEach(function (rail) {
    function open(key) {
      rail.setAttribute('data-expanded', '');
      $$('[data-rail-list]', rail).forEach(function (l) { l.hidden = l.dataset.railList !== key; });
      $$('[data-rmx-rail]', rail).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.rmxRail === key)); });
    }
    $$('[data-rmx-rail-toggle]', rail).forEach(function (b) {
      b.addEventListener('click', function () {
        if (rail.hasAttribute('data-expanded')) {
          rail.removeAttribute('data-expanded');
          $$('[data-rmx-rail]', rail).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        } else open('shortcuts');
      });
    });
    $$('[data-rmx-rail]', rail).forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.rmxRail); }); });
  });
})();
