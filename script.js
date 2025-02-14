document.addEventListener('DOMContentLoaded', function() {
    // ფუნქცია, რომელიც აბრუნებს ჟანრის შესაბამის ID-ს TMDb API-სთვის
    function getGenreId(genre) {
        const genres = {
            comedy: 35, romance: 10749, drama: 18, horror: 27, thriller: 53,
            animation: 16, musical: 10402, 'sci-fi': 878, historical: 36, 
            detective: 80, adventure: 12, biography: 99, mystery: 9648, 
            family: 10751, crime: 80
        };
        return genres[genre] || ''; // თუ ჟანრი არ მოიძებნა, დაბრუნდება ცარიელი მნიშვნელობა
    }

    // ფუნქცია, რომელიც TMDb API-დან იღებს ფილმების მონაცემებს მითითებული ჟანრის მიხედვით
    async function fetchMoviesFromTMDb(genre, totalPages = 5) {
        const apiKey = '907f7547ecffedee99f94f496b5c9b9b'; // TMDb API გასაღები
        const genreId = getGenreId(genre); // მითითებული ჟანრის ID-ის მიღება
        let movies = []; // ფილმების სია

        // 5 გვერდიდან მონაცემების მიღება
        for (let page = 1; page <= totalPages; page++) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=ka&page=${page}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                movies = movies.concat(data.results); // მიღებული მონაცემების შერწყმა
            } catch (error) {
                console.error('Error fetching data from TMDb:', error); // შეცდომის დაფიქსირება კონსოლში
            }
        }
        return movies; // საბოლოო ფილმების სია
    }

    // ძებნის ღილაკზე დაჭერისას ფილმების მიღება
    document.getElementById('search-button').addEventListener('click', async function() {
        const girlGenre = document.getElementById('girl-genre').value; // გოგონას არჩეული ჟანრი
        const boyGenre = document.getElementById('boy-genre').value; // ბიჭის არჩეული ჟანრი

        if (girlGenre === boyGenre) {
            // თუ ორივემ ერთი და იგივე ჟანრი აირჩია, ამ ჟანრის ფილმების ჩვენება
            const movies = await fetchMoviesFromTMDb(girlGenre);
            displayMovies(movies);
        } else {
            // თუ ჟანრები განსხვავებულია, ვპოულობთ საერთო ფილმებს
            const girlMovies = await fetchMoviesFromTMDb(girlGenre);
            const boyMovies = await fetchMoviesFromTMDb(boyGenre);
            const commonMovies = girlMovies.filter(girlMovie =>
                boyMovies.some(boyMovie => boyMovie.id === girlMovie.id)
            );
            displayMovies(commonMovies); // საერთო ფილმების ჩვენება
        }
    });

    // ფუნქცია, რომელიც აჩვენებს ფილმების სიას
    function displayMovies(movies) {
        const resultsDiv = document.getElementById('results'); // ელემენტი, სადაც ფილმები გამოჩნდება
        resultsDiv.innerHTML = ''; // წინასწარ გასუფთავება

        if (movies.length > 0) {
            // თუ არსებობს ფილმები, ვამატებთ მათ საიტზე
            movies.forEach(movie => {
                const movieName = movie.title || movie.name; // ფილმის სახელი
                const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'default_image.jpg'; // ფილმის პოსტერი
                const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`; // ფილმის ბმული TMDb-ზე

                resultsDiv.innerHTML += `
                    <div class="movie">
                        <h3><a href="${tmdbUrl}" target="_blank">${movieName}</a></h3> 
                        <a href="${tmdbUrl}" target="_blank">
                            <img src="${posterPath}" alt="${movieName} Poster" style="width: 200px;">
                        </a>
                    </div>
                `;
            });
        } else {
            // თუ ფილმები ვერ მოიძებნა, გამოდის შეტყობინება
            resultsDiv.innerHTML = 'სამწუხაროდ, არ არსებობს ფილმები ამ ჟანრებში.';
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            const confirmLogout = confirm("ნამდვილად გსურთ დატოვოთ გვერდი?");
            if (!confirmLogout) {
                event.preventDefault(); // ბლოკავს ნებისმიერ მოქმედებას
                console.log("User canceled logout. Staying on the page.");
            } else {
                window.location.href = "auth.html";
            }
        });
    }
});

