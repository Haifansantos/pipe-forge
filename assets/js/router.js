// Tiny client-side router: swaps page templates into #app.
window.Router = (function () {
  var app = document.getElementById('app');
  var links = document.querySelectorAll('.ni');

  function go(id) {
    if (!window.Pages[id]) id = 'ingest';
    app.innerHTML = window.Pages[id];
    app.firstElementChild.classList.add('on');
    links.forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('href') === '#' + id);
    });
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
    window.scrollTo(0, 0);
  }

  function init() {
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        go(a.getAttribute('href').slice(1));
      });
    });
    go((location.hash || '#ingest').slice(1));
  }

  return { init: init, go: go };
})();
