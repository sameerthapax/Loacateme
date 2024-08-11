const serverUrl = 'https://loacateme.onrender.com'; // Replace with your live server's URL

// Handle "Get Location and Insert" button click
document.getElementById('get-location').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        fetch(`${serverUrl}/insert-location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude, longitude, accuracy })
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('response').textContent = data;
            })
            .catch(error => {
                document.getElementById('response').textContent = 'Error: ' + error.message;
            });
    }, (error) => {
        document.getElementById('response').textContent = 'Error getting location: ' + error.message;
    });
});

// Handle "Ghost Mode" button click
document.getElementById('ghost-mode').addEventListener('click', () => {
    fetch(`${serverUrl}/ghost-mode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('response').textContent = data;
        })
        .catch(error => {
            document.getElementById('response').textContent = 'Error: ' + error.message;
        });
});

// Handle "View All Locations" button click
document.getElementById('view-all').addEventListener('click', () => {
    fetch(`${serverUrl}/view-all`,{
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('response').textContent = 'Error: ' + error.message;
        });
});