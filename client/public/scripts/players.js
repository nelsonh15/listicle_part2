const renderPlayers = (data) => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear previous content

    if (data.length > 0) {
        data.map(player => {
            const card = document.createElement('div');
            card.classList.add('card');

            const topContainer = document.createElement('div');
            topContainer.classList.add('top-container');
            topContainer.style.backgroundImage = `url(${player.image})`;

            const bottomContainer = document.createElement('div');
            bottomContainer.classList.add('bottom-container');

            const name = document.createElement('h3');
            name.textContent = player.name;
            bottomContainer.appendChild(name);

            const position = document.createElement('p');
            position.textContent = player.position;
            bottomContainer.appendChild(position);

            const team = document.createElement('p');
            team.textContent = player.team;
            bottomContainer.appendChild(team);

            const description = document.createElement('p');
            description.textContent = player.description;
            bottomContainer.appendChild(description);

            const link = document.createElement('a');
            link.textContent = 'Read More >';
            link.setAttribute('role', 'button');
            link.href = `/players/${player.id}`;
            bottomContainer.appendChild(link);

            card.appendChild(topContainer);
            card.appendChild(bottomContainer);

            mainContent.appendChild(card);
        });
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Players Found.';
        mainContent.appendChild(message);
    }
};
// Fetch and render all players initially when the page loads
const loadAllPlayers = async () => {
    try {
        const response = await fetch('/players'); // Fetch all players
        const data = await response.json();
        renderPlayers(data); // Render all players on page load
    } catch (error) {
        console.error('Error loading players:', error);
    }
};

// Event listener for search functionality
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    const filterType = searchSelect.value;

    if (query) {
        try {
            // Call the backend to fetch filtered players
            const response = await fetch(`/players?filter=${filterType}&query=${query}`);
            const data = await response.json();

            // Clear the main content and render filtered players
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = ''; // Clear previous content
            renderPlayers(data);  // Render filtered players
        } catch (error) {
            console.error('Error fetching filtered players:', error);
        }
    }
});

// Load all players initially
loadAllPlayers();
renderPlayers();