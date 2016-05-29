dynoApp.factory('DynoService', function($rootScope) {
    var dyno = {};
    

    navigator.serviceWorker.addEventListener('message', function handler(event) {
        if (event.data !== null && typeof event.data === 'object' && event.data.dyno) {
            var d = event.data.dyno;
            if (event.data.type === 'birthday') {
              console.log('Happy birthday dyno!');
            }
            $rootScope.$apply(function() {
                dyno = d;
            });
            console.log(event.data.dyno);
        } else {
            console.error('Wrong service worker message', event);
        }
    });

  return {
    getDyno: function() {
        console.log('getDyno ' + JSON.stringify(dyno));
        return dyno;
    }
  };
});
