// get value from search
document.getElementById("btn-cari").addEventListener("click", (e) => {
  e.preventDefault();
  let searchKeyword = document.getElementById("input-cari").value;
  // fetch data from movie api
  getMovies(searchKeyword);
});

function getMovies(searchKeyword) {
  let response = fetch(
    "http://www.omdbapi.com/?apikey=7cad8fe4&s=" + searchKeyword
  )
    .then((response) => response.json())
    .then((data) => {
      let movies = data.Search;
      let movie_list = "";
      movies.forEach((element) => {
        movie_list += ` <div class="col-md-4 col-sm-6 col-6 col-lg-3">
               <div class="card mb-3">
                 <img  src="${element.Poster}" style= "width:auto; height:auto;
                 object-fit:cover;" />
                 <div class="card-body">
                   <h5 class="card-title">${element.Title}</h5>
                   <p class="card-text text-muted">${element.Year}</p>
                   <button data-id = "${element.imdbID}" type="button" class="button-detail btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">Lihat detail</button>
                 </div>
               </div>
             </div>`;
      });

      document.getElementById("movie-list").innerHTML = movie_list;

      let element = document.getElementsByClassName("button-detail");
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener("click", (e) => {
          let id = e.target.dataset.id;
          fetch("http://www.omdbapi.com/?apikey=7cad8fe4&i=" + id)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              let movie = data;
              let movie_detail = `
                <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-fluid">
                  </div>
                  <div class="col-md-8">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${movie.Title}</h4></li>
                      <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                      <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                      <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
                      <li class="list-group-item"><strong>Plot : </strong><br>${movie.Plot}</li>
                    </ul>
                  </div>
                </div>
              </div>
                `;
              document.getElementById("detail-body").innerHTML = movie_detail;
            });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getPopularMovie() {
  movieId = ["tt11909878", "tt1655389", "tt12593682", "tt9114286"];
  movieId.forEach((id) => {
    fetch("http://www.omdbapi.com/?apikey=7cad8fe4&i=" + id)
      .then((response) => response.json())
      .then((data) => {
        let movie = data;
        let movie_list = `
        <div class="col-md-4 col-sm-6 col-6 col-lg-3">
          <div class="card mb-3">
            <img  src="${movie.Poster}" style= "width:auto; height:auto;
            object-fit:cover;" />
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text text-muted">${movie.Year}</p>
            </div>
          </div>
        </div>`;
        document.getElementById("movie-list").innerHTML += movie_list;
      });
  });
}

getPopularMovie();
