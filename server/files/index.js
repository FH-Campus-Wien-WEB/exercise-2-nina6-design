window.onload = function () {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      console.log(movies);

      movies.forEach(function(movie) {

        const article = document.createElement("article");

        article.id = movie.imdbID;

        const title = document.createElement("h1");
        title.textContent = movie.Title;
        article.appendChild(title);

        const img = document.createElement("img");
        img.src = movie.Poster;
        img.alt = movie.Title;
        article.appendChild(img);

        const plot = document.createElement("p");
        plot.textContent = movie.Plot;
        article.appendChild(plot);

        const genresDiv = document.createElement("div");

        movie.Genres.forEach(function(genre) {
          const span = document.createElement("span");
          span.classList.add("genre");
          span.textContent = genre;
          genresDiv.appendChild(span);
        });

        article.appendChild(genresDiv);

        const info = document.createElement("p");
        info.textContent = "Released: " + movie.Released + " | Runtime: " + movie.Runtime + " min";
        article.appendChild(info);

        const actors = document.createElement("p");
        actors.textContent = "Actors: " + movie.Actors.join(", ");
        article.appendChild(actors);

        const directors = document.createElement("p");
        directors.textContent = "Directors: " + movie.Directors.join(", ");
        article.appendChild(directors);

        const writers = document.createElement("p");
        writers.textContent = "Writers: " + movie.Writers.join(", ");
        article.appendChild(writers);

        const ratings = document.createElement("p");
        ratings.textContent = "Metascore: " + movie.Metascore + " | IMDb: " + movie.imdbRating;
        article.appendChild(ratings);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        article.appendChild(editButton);

        bodyElement.appendChild(article);
      });

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
        xhr.status +
        " - " +
        xhr.statusText
      );
    }
  };

  xhr.open("GET", "/movies");
  xhr.send();
};