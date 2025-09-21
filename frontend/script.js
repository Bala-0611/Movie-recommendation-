document.addEventListener('DOMContentLoaded', () => {
    const genreInput = document.getElementById('genreInput');
    const recommendButton = document.getElementById('recommendButton');
    const movieList = document.getElementById('movieList');
    const errorMessage = document.getElementById('errorMessage');

    const backendUrl = 'http://localhost:3000'; // Ensure this matches your backend's port

    recommendButton.addEventListener('click', fetchRecommendations);
    genreInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            fetchRecommendations();
        }
    });

    async function fetchRecommendations() {
        const genre = genreInput.value.trim();
        movieList.innerHTML = ''; // Clear previous recommendations
        errorMessage.textContent = ''; // Clear previous error messages

        if (!genre) {
            errorMessage.textContent = 'Please enter a genre.';
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/recommend?genre=${encodeURIComponent(genre)}`);
            const data = await response.json();

            if (!response.ok) {
                // Handle API errors (e.g., 400 bad request, 404 not found)
                errorMessage.textContent = data.message || `Error: ${response.statusText}`;
                return;
            }

            if (data.length === 0) {
                movieList.innerHTML = '<li class="no-results">No movies found for this genre.</li>';
                return;
            }

            data.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.classList.add('movie-item');
                // Updated to include the year
                listItem.innerHTML = `
                    <span>${movie.title} (${movie.year})</span>
                    <span>Rating: ${movie.rating}</span>
                `;
                movieList.appendChild(listItem);
            });

        } catch (error) {
            console.error('Error fetching movie recommendations:', error);
            errorMessage.textContent = 'Failed to connect to the server or an unexpected error occurred.';
        }
    }
});