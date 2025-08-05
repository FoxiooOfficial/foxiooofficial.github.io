fetch('https://api.github.com/repos/FoxiooOfficial/foxiooofficial.github.io/commits?per_page=1')
    .then(response => response.json())
    .then(data => {
        const commitDate = new Date(data[0].commit.author.date);

        const formattedCommitDate = commitDate.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Warsaw',
            hour12: false
        });

        document.getElementById('last-update').innerHTML = `
            Last update of the website:<br>
            <strong>${formattedCommitDate}</strong>
            <br>
            <i style="color: gray; font-size: 12px;">(Information from GitHub)</i>
            <br><br>
            Current time:<br>
            <strong id="live-clock"></strong>
        `;

        function updateClock() {
            const nowInPoland = new Date().toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Europe/Warsaw',
                hour12: false
            });
            document.getElementById('live-clock').textContent = nowInPoland;
        }

        updateClock();
        setInterval(updateClock, 1000);
    })
    .catch(error => {
        document.getElementById('last-update').innerHTML = 'Error loading update date.';
        console.error('GitHub API error:', error);
    });
