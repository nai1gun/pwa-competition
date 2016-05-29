// This file is intentionally without code.
// It's present so that service worker registration will work when serving from the 'app' directory.
// The version of service-worker.js that's present in the 'dist' directory is automatically
// generated by the 'generate-service-worker' gulp task, and contains code to precache resources.

(worker => {
    var dyno = {
        age: 0,
        hunger: 10,
        sleep: 10,
        joy: 10
    };

    console.log('Hello service worker');
    setInterval(function() {
        dyno.age++;
        if (dyno.age % 10 === 0) {
            console.log('Sending message ' + JSON.stringify(dyno));
            changeStatus();
            if (dyno.age % 60 === 0) {
                sendMessage('birthday');
            } else {
                sendMessage('status');
            }
        }
    }, 1000);

    function sendMessage(type) {
        worker.clients.matchAll().then(all => {
            console.log(all);
            all.map(client => client.postMessage({type: type, dyno: dyno}))
        });
    }

    function changeStatus() {
        if (dyno.hunger > 0) {
            dyno.hunger--;
        }
        if (dyno.sleep > 0) {
            dyno.sleep--;
        }
        if (dyno.joy > 0) {
            dyno.joy--;
        }
    }
})(self);