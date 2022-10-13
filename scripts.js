// get value from search
document.getElementById("btn-cari").addEventListener("click", (e) => {
  e.preventDefault();
  let searchKeyword = document.getElementById("input-cari").value;
  // fetch data from movie api
  getMovies(searchKeyword);
});

function getMovies(searchKeyword) {
  if (searchKeyword == "") {
    getPopularMovie();
  } else {
    let response = fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=0a03a21e889f7f720b11bba9f7532337&query=" +
        searchKeyword
    )
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results;

        let movie_list = "";
        movies.forEach((element) => {
          movie_list += ` <div class="col-md-4 col-sm-6 col-6 col-lg-3">
                 <div class="card mb-3">
                   <img  src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${element.poster_path}" />
                   <div class="card-body">
                     <h5 class="card-title">${element.title}</h5>
                     <p class="card-text text-muted"><span>${element.release_date}</span> </p>
                     <p class="card-text text-muted fw-bold"><span>${element.vote_average}</span> </p>
                   
                     <button data-id = "${element.id}" type="button" class="button-detail btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">See detail</button>
                  
                   </div>
                 </div>
               </div>`;
        });

        document.getElementById("movie-list").innerHTML = movie_list;

        let element = document.getElementsByClassName("button-detail");
        for (let i = 0; i < element.length; i++) {
          element[i].addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=0a03a21e889f7f720b11bba9f7532337`
            )
              .then((response) => response.json())
              .then((data) => {
                let movie = data;
                let movie_detail = `
                  <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                        movie.poster_path
                      }" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                      <ul class="list-group">
                        <li class="list-group-item"><h4>${movie.title}</h4></li>
                        <li class="list-group-item"><strong>Genre : </strong>${movie.genres
                          .map((genre) => genre.name)
                          .join(", ")}</li>
                        <li class="list-group-item"><strong>Language : </strong>${
                          movie.original_language
                        }</li>
                        <li class="list-group-item"><strong>Duration : </strong>${(
                          movie.runtime / 60
                        ).toFixed(2)} hours</li>
                        <li class="list-group-item"><strong>Overview : </strong><br>${
                          movie.overview
                        }</li>
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
}

function getPopularMovie() {
  let response = fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=0a03a21e889f7f720b11bba9f7532337&sort_by=popularity.desc"
  )
    .then((response) => response.json())
    .then((data) => {
      let movies = data.results;

      let movie_list = "";
      movies.forEach((element) => {
        movie_list += ` <div class="col-md-4 col-sm-6 col-6 col-lg-3">
               <div class="card mb-3">
                 <img  src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${element.poster_path}" />
                 <div class="card-body">
                   <h5 class="card-title">${element.title}</h5>
                   <p class="card-text text-muted"><span>${element.release_date}</span> </p>
                   <p class="card-text text-muted fw-bold"><span>${element.vote_average}</span> </p>
                 
                   <button data-id = "${element.id}" type="button" class="button-detail btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">See detail</button>
                
                 </div>
               </div>
             </div>`;
      });

      document.getElementById("movie-list").innerHTML = movie_list;

      let element = document.getElementsByClassName("button-detail");
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener("click", (e) => {
          let id = e.target.dataset.id;
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=0a03a21e889f7f720b11bba9f7532337`
          )
            .then((response) => response.json())
            .then((data) => {
              let movie = data;
              let movie_detail = `
                <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                      movie.poster_path
                    }" class="img-fluid">
                  </div>
                  <div class="col-md-8">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${movie.title}</h4></li>
                      <li class="list-group-item"><strong>Genre : </strong>${movie.genres
                        .map((genre) => genre.name)
                        .join(", ")}</li>
                      <li class="list-group-item"><strong>Language : </strong>${
                        movie.original_language
                      }</li>
                      <li class="list-group-item"><strong>Duration : </strong>${(
                        movie.runtime / 60
                      ).toFixed(2)} hours</li>
                      <li class="list-group-item"><strong>Overview : </strong><br>${
                        movie.overview
                      }</li>
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

getPopularMovie();
