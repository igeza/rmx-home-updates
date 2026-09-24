/* Home updates — prototype-only Mega Menu wiring.

   megamenu.js is a foundation file (check.mjs --fix re-copies it from the
   skill), so its item list can't be edited here. Instead, after the menu
   renders a category, this turns the screens this prototype has built into
   real links:
     Rental Info > General > Tenants    -> tenant-register.html
     Rental Info > General > Tenant Register is removed (Tenants opens the register)
     Rental Info > General > Prospects  -> prospect-register.html
     Rental Info > General > Homes      -> home-register.html  (new item, after Properties)
   Every other item keeps the menu's own "not built" behaviour.
   Listed in PROTOTYPE.md. Load after megamenu.js. */
(function () {
  'use strict';
  var LINKS = { 'Tenants': 'tenant-register.html', 'Prospects': 'prospect-register.html', 'Homes': 'home-register.html' };
  function link(el, label) {
    var a = document.createElement('a');
    a.className = 'megamenu__item';
    a.href = LINKS[label];
    a.textContent = label;
    el.replaceWith(a);
    return a;
  }
  function patch(content) {
    var items = [].slice.call(content.querySelectorAll('.megamenu__item'));
    items.forEach(function (el) {
      var t = el.textContent.trim();
      if (t === 'Tenant Register') { el.remove(); return; }
      if ((t === 'Prospects' || t === 'Tenants') && el.tagName !== 'A') link(el, t);
      if (t === 'Properties' && !content.querySelector('a.megamenu__item[href="home-register.html"]')) {
        var homes = document.createElement('div');
        el.after(homes);
        link(homes, 'Homes');
      }
    });
  }
  function watch() {
    var content = document.getElementById('megaMenuContent');
    if (!content) return setTimeout(watch, 50);
    new MutationObserver(function () { patch(content); }).observe(content, { childList: true });
    patch(content);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
