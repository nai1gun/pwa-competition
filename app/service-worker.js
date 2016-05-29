// This file is intentionally without code.
// It's present so that service worker registration will work when serving from the 'app' directory.
// The version of service-worker.js that's present in the 'dist' directory is automatically
// generated by the 'generate-service-worker' gulp task, and contains code to precache resources.

(worker => {

    worker.addEventListener('push', function(event) {
        console.log('Push message received', event);
        console.log(event.data);
        var url = 'https://chromogochi.firebaseio.com/nailgun/lastNotification.json';
        event.waitUntil(fetch(url).then(function(response) {
            if (response.status !== 200) { 
                console.log('Looks like there was a problem. Status Code: ' + response.status);  
                throw new Error();  
            }

            return response.json().then(function(data) {  
                if (data.error) {  
                    console.log('The API returned an error.', data.error);  
                    throw new Error();  
                }
                console.log(data);
                var title = data.title;  
                var message = data.message;  
                var icon = data.icon;  

                return worker.registration.showNotification(title, {  
                    body: message,  
                    icon: icon,  
                    data: {
                        url: data.url
                    }  
                });
            });
        }));
    });

    var dyno = {
        age: 0,
        hunger: 10,
        sleep: 10,
        joy: 10
    };

    console.log('Hello service worker');
    /*setInterval(function() {
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
    }, 1000);*/

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