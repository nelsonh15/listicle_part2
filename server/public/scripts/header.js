const header = document.querySelector('header');
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

// Left side with logo and title
const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';
const headerLogo = document.createElement('img');
headerLogo.src = '/logo.png';
const headerTitle = document.createElement('h1');
headerTitle.textContent = 'Top Players List';
headerLeft.appendChild(headerLogo);
headerLeft.appendChild(headerTitle);

// Right side with Home button and Search functionality
const headerRight = document.createElement('div');
headerRight.className = 'header-right';

// Home button
const headerButton = document.createElement('button');
headerButton.textContent = 'Home';
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/';
});
headerRight.appendChild(headerButton);

// Search bar
const searchForm = document.createElement('form');
searchForm.id = 'search-form';

// Search input
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search players...';
searchInput.id = 'search-input';
searchForm.appendChild(searchInput);

// Dropdown for search type
const searchSelect = document.createElement('select');
searchSelect.id = 'search-type';

const nameOption = document.createElement('option');
nameOption.value = 'name';
nameOption.textContent = 'Name';

const positionOption = document.createElement('option');
positionOption.value = 'position';
positionOption.textContent = 'Position';

const teamOption = document.createElement('option');
teamOption.value = 'team';
teamOption.textContent = 'Team';

searchSelect.appendChild(nameOption);
searchSelect.appendChild(positionOption);
searchSelect.appendChild(teamOption);
searchForm.appendChild(searchSelect);

// Submit button
const searchButton = document.createElement('button');
searchButton.type = 'submit';
searchButton.textContent = 'Submit';
searchForm.appendChild(searchButton);

headerRight.appendChild(searchForm);
headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);
header.appendChild(headerContainer);

// Event listener for the search form submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  const filterType = searchSelect.value;
  
  if (query) {
    // Call the backend to fetch filtered players
    const response = await fetch(`/players?filter=${filterType}&query=${query}`);
    const data = await response.json();
    
    // Clear the main content and render filtered players
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear previous content
    renderPlayers(data);  // Render filtered players
  }
});
