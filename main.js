// Case study filter. Without JS, every case study shows and the filter stays hidden.
(function () {
  var filter = document.getElementById("case-filter");
  var items = Array.prototype.slice.call(document.querySelectorAll("#case-list > li[data-domain]"));
  var status = document.getElementById("case-status");
  if (!filter || !items.length) return;

  var buttons = Array.prototype.slice.call(filter.querySelectorAll("button[data-filter]"));

  // Only keep a domain button if at least one case study uses that domain.
  var domains = {};
  items.forEach(function (li) { domains[li.getAttribute("data-domain")] = true; });
  buttons = buttons.filter(function (btn) {
    var d = btn.getAttribute("data-filter");
    if (d !== "all" && !domains[d]) { btn.remove(); return false; }
    return true;
  });

  // A filter with one domain adds nothing, so leave it hidden.
  if (Object.keys(domains).length < 2) return;

  function apply(domain) {
    var shown = 0;
    items.forEach(function (li) {
      var match = domain === "all" || li.getAttribute("data-domain") === domain;
      li.hidden = !match;
      if (match) shown++;
    });
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === domain));
    });
    if (status) {
      status.textContent = "Showing " + shown + " of " + items.length + " case studies";
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { apply(btn.getAttribute("data-filter")); });
  });

  filter.hidden = false;
})();
