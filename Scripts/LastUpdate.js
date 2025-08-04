
fetch('https://api.github.com/repos/FoxiooOfficial/foxiooofficial.github.io/commits?per_page=1')
    .then(response => response.json())
    .then(data => {
        const commitDate = new Date(data[0].commit.author.date);
        const formattedDate = commitDate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('last-update').innerHTML = 
        `Last update of the website:<br>
        <strong>${formattedDate}</strong>
        <br><br>
        <i style="color: gray">(Information from GitHub)</i>`;
    })
    .catch(error => {
        document.getElementById('last-update').innerHTML = 'Error loading update date.';
        console.error('GitHub API error:', error);
    });
