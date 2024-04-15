// dashboard.js

document.getElementById("searchForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const zipCode = document.getElementById("zipCode").value;

    // Perform search request
    const response = await fetch(`/search?zipCode=${zipCode}`);
    const data = await response.json();

    // Display search results
    displaySearchResults(data);
});

document.getElementById("locationButton").addEventListener("click", async function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const { latitude, longitude } = position.coords;

            // Perform search request using geolocation
            const response = await fetch(`/search?lat=${latitude}&lon=${longitude}`);
            const data = await response.json();

            // Display search results
            displaySearchResults(data);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";

    if (data.length > 0) {
        const ul = document.createElement("ul");
        data.forEach(result => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${result.name}</strong><br>
                            Party: ${result.party}<br>
                            Funding: ${result.funding}<br>
                            Votes: ${result.votes}`;
            ul.appendChild(li);
        });
        searchResultsDiv.appendChild(ul);
    } else {
        searchResultsDiv.textContent = "No results found.";
    }
}
