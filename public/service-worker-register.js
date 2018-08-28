(function(window, undefined) {

  var serviceWorkerFilePath = `${window.location.origin}/scripts/service-worker.js`;

  function registerServiceWorker(event) {
		navigator.serviceWorker.register(serviceWorkerFilePath, { scope: '/' }).then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			console.log('ServiceWorker registration failed: ', err);
		});
  }


  function init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', registerServiceWorker, false);
    }
  }

  init();

})(window);
