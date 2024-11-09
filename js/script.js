const apiEndpoint = 'https://api.mcsrvstat.us/3/';

function fetchServerStatus(server) {
    return fetch(`${apiEndpoint}${server}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}

document.getElementById('get').addEventListener('click', async (event) => {
    event.preventDefault();
    document.getElementById('info').style.display = 'block';
    document.getElementById('loading').style.display = 'block';
    const ip = document.getElementById('ip').value.trim();
    if (!ip) {
        alert('Please enter a server IP.');
        return;
    }

    const serverStatus = await fetchServerStatus(ip);
    if (!serverStatus) {
        document.getElementById('status').innerHTML = 'Error fetching server status.';
        document.getElementById('ip').innerHTML = `IP: ${ip}`;
        document.getElementById('version').innerHTML = '';
        document.getElementById('players').innerHTML = '';
        document.getElementById('icon').src = 'images/default.png';
        return;
    }

    if (serverStatus.online) {
        document.
        document.getElementById('icon').src = serverStatus.icon || 'images/default.png';
        document.getElementById('status').innerHTML = 'Server is online';
        document.getElementById('ip').innerHTML = `IP: ${ip}`;
        document.getElementById('version').innerHTML = `Version: ${serverStatus.version || 'N/A'}`;
        document.getElementById('players').innerHTML = `Players: ${serverStatus.players.online}/${serverStatus.players.max}`;
    } else {
        document.getElementById('status').innerHTML = 'Server is offline';
        document.getElementById('ip').innerHTML = `IP: ${ip}`;
        document.getElementById('version').innerHTML = '';
        document.getElementById('players').innerHTML = '';
        document.getElementById('icon').src = 'images/default.png';
    }
    document.getElementById('loading').style.display = 'none';
});
