const renderPlayer = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/players');
    const data = await response.json();

    const playerContent = document.getElementById('player-content');
    const player = data.find(player => player.id === requestedID);

    if (player) {
        // Clear previous content if needed
        playerContent.innerHTML = '';

        // Create a container for the player details
        const playerContainer = document.createElement('div');
        playerContainer.className = 'player-container';

        // Create the image element
        const image = document.createElement('img');
        image.src = player.image;
        image.className = 'player-image';  // We'll style this in CSS

        // Create the details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'details-container';

        // Player Name
        const name = document.createElement('h1');
        name.textContent = player.name;
        name.className = 'player-name';  // Style in CSS

        // Player Team
        const team = document.createElement('p');
        team.textContent = 'Team: ' + player.team;

        // Player Position
        const position = document.createElement('p');
        position.textContent = 'Position: ' + player.position;

        // Player Description
        const description = document.createElement('p');
        description.textContent = 'Description: ' + player.description;

        // Append name, team, position, and description to details container
        detailsContainer.appendChild(name);
        detailsContainer.appendChild(team);
        detailsContainer.appendChild(position);
        detailsContainer.appendChild(description);

        // Append the image and details container to player container
        playerContainer.appendChild(image);
        playerContainer.appendChild(detailsContainer);

        // Append the playerContainer to playerContent
        playerContent.appendChild(playerContainer);

        // Update the page title
        document.title = `NBA Top Players List: ${player.name}`;
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Players Available 😞';
        playerContent.appendChild(message);
    }
};

renderPlayer();
