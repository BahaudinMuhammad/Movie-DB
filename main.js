const cariFilm = document.querySelector(".search-button");
cariFilm.addEventListener("click", function () {
  const inputFilm = document.querySelector(".search-keyword");

  fetch(
    `https://api.themoviedb.org/3/search/movie?query= + ${inputFilm.value} &api_key=974cd0ba5c9eb9e8c13ae86bfd5de30d`
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.results;
      let cards = "";
      data.forEach((f) => {
        cards += showFilm(f);
      });

      const filmContent = document.querySelector(".store-container");
      filmContent.innerHTML = cards;

      // ketika tombol diklik
      const detail = document.querySelectorAll(".modal-detail-button");
      detail.forEach((btn) => {
        btn.addEventListener("click", function () {
          const idFilm = this.dataset.id;
          fetch(
            `https://api.themoviedb.org/3/movie/${idFilm}?api_key=974cd0ba5c9eb9e8c13ae86bfd5de30d`
          )
            .then((response) => response.json())
            .then((f) => {
              const movieDetail = showDetailMovie(f);
              const showMovie = document.querySelector(".modal-body");
              showMovie.innerHTML = movieDetail;
            });
        });
      });
    });
});

const imgurl = "https://image.tmdb.org/t/p/w500/";

function showDetailMovie(f) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${imgurl}/${f.poster_path}" class="img-fluid" alt="" srcset="" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${f.title}</h4></li>
          <li class="list-group-item">
            <strong>Popularity : </strong>${f.popularity}
          </li>
          <li class="list-group-item">
            <strong>Description : </strong>${f.overview}
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}

function showFilm(f) {
  return `<div class="col-md-4 my-3">
  <div class="card">
    <img src="${imgurl}/${f.poster_path}" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">${f.original_title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${f.release_date}</h6>
      <p class="card-text">
        ${f.vote_average}
      </p>
      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#detailModal" data-id ="${f.id}">Detail</a>
    </div>
  </div>
</div>`;
}
