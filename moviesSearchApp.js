let section = document.querySelector("section");
      let h2 = document.querySelector("h2");
      let card = document.querySelectorAll(".card");

      document.querySelector("button").addEventListener("click", function () {
        let inputValue = document.getElementById("searchInput");
        let searchText = getApi(inputValue.value);
        inputValue.value = "";
        console.log(searchText);
      });

      async function getApi(movieName) {
        card.forEach((s) => {
          s.style.display = "none";
        });
        if (movieName !== "") {
          try {
            let apiKey = "2af7b824";
            let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
            let respons = await axios.get(url);

            // console.log(respons.data);
            if (respons.data.Response === "False") {
              movieBox.style.display = "none";
              section.innerHTML = `<h1>not founded !</h1>`;
              return; // yeh bhut imp hai ye func ko rokta hai
            }
            section.innerHTML = `<div class="card" style="">
                  <img src="${respons.data.Poster}" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h4 class="card-text">
                     ${respons.data.Title}
                    </h4>
                    <p style="letter-spacing: -1px; font-size:12px">${respons.data.Year} </p>
                  </div>
                </div>`;

            let card = document.querySelector(".card");
            card.classList.add("created");
            console.log(respons.data);
          } catch (error) {
            section.innerHTML = `<h1>something went wrong</h1>`;
            console.log("error");
          }
        } else {
          section.innerHTML = `<h1>please enter a movie name</h1>`;
        }
      }
      // for movies

      async function moviesOjb() {
        let allcards = document.querySelectorAll(".card");
        let arr = [
          "sultan",
          "dangal",
          "singh is king",
          "the martian",
          "phir hera pheri",
          "the nun",
        ];
        let apiKey = "2af7b824";
        // let url = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;
        // let respons = await axios.get(url);

        let movies = arr.map((item) => item);
        let urls = movies.map(
          (name) => `https://www.omdbapi.com/?t=${name}&apikey=${apiKey}`
        );

        let promises = urls.map((url) => axios.get(url));
        let result = await Promise.all(promises);

        let films = result.map((res) => {
          return {
            name: res.data.Title,
            poster: res.data.Poster,
            year: res.data.Year,
          };
        });
        // console.log(films[1].poster);
        // o[0].textContent = films[0].name;

        // let src = films[0].poster;
        // console.log(src);

        allcards.forEach((card, index) => {
          let img = card.querySelector("img");
          let h2 = card.querySelector("h5");
          let years = card.querySelector("p");

          if (films[index]) {
            img.setAttribute("src", films[index].poster);
            h2.textContent = films[index].name;
            years.textContent = films[index].year;
          }
        });
      }

      moviesOjb();