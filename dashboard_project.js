// Pull HTML portions that will be dealt with
const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");
const dataDisplay = document.getElementById("data-display");

// Asynch function to fetch (users)
async function fetchUsers() {
  // Output the state that the loading is currently in
  dataDisplay.innerHTML = '<p class="loading-text">⏳ Loading data from API...</p>';

  try {
    // Pull data from the public API
    const response = await fetch('http://localhost:3000/api/items');
    
    // Error if the response status is not Ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON data
    const users = await response.json();

    // Deal with potential empyty data
    if (users.length === 0) {
      dataDisplay.innerHTML = '<p class="placeholder-text">No results found.</p>';
      return;
    }

    // Clear loading text prior to incorporating new data
    dataDisplay.innerHTML = '';

    // Loop through fetched users + make corresponding HTML cards
    users.forEach(user => {
      // Each new user results in new div
      const userCard = document.createElement("div");
      userCard.className = "user-card"; // CSS styling
      
      // Input user data into the card
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>📧 Email:</strong> ${user.email}</p>
        <p><strong>🏙️ City:</strong> ${user.address.city}</p>
        <p><strong>🏢 Company:</strong> ${user.company.name}</p>
      `;
      
      // Append the card to the dashboard grid
      dataDisplay.appendChild(userCard);
    });

  } catch (error) {
    // Handle errors in approproate manner
    console.error("Error fetching users:", error);
    dataDisplay.innerHTML = `
      <div class="error-text">
        ⚠️ Unable to load user data. Please try again later.<br>
        <small>Error Details: ${error.message}</small>
      </div>
    `;
  }
}

// Clear the data function
function clearData() {
  dataDisplay.innerHTML = '<p class="placeholder-text">Data cleared. Click "Load Users" to fetch again.</p>';
}

// Apply event listeners to the buttons
loadBtn.addEventListener("click", fetchUsers);
clearBtn.addEventListener("click", clearData);