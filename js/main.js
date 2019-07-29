// 資料格式
// {
//   id: 1,
//     title: "Jurassic World: Fallen Kingdom",
//       genres: [
//         1,
//         2,
//         15
//       ],
//         description: "Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
//           release_date: "2018-06-06",
//             image: "c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg"
// },



(function () {

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'

  // data空陣列：用來儲存下載的電影
  const data = []

  // 電影genres對照
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  // 串接API，下載response data，存至data空陣列中
  axios.get(INDEX_URL)
    .then(function (response) {
      console.log(response.data.results)
      data.push(...response.data.results)
      console.log(data)

      // 將data render至dataPanel中
      displayData(data)

    })
    .catch(function (error) {
      console.log(error)
    })


  const dataPanel = document.querySelector('#data-panel')
  const searchForm = document.querySelector('#search')
  const searchInput = document.querySelector('#search-input')
  const sidebar = document.querySelector('#sidebar')
  console.log(dataPanel)

  sidebar.addEventListener('click', function (event) {
    console.log(event.target.firstElementChild)
    console.log(typeof (event.target.firstElementChild.dataset.genresId))
    console.log(event.target.firstElementChild.dataset.genresId)
    let genresId = Number(event.target.firstElementChild.dataset.genresId)

    const results = data.filter(function (movie) {
      return movie.genres.includes(genresId)
    })
    console.log(results)
    displayData(results)
  })

  // 將匯入的的電影資料display至dataPanel
  function displayData(data) {
    let htmlContent = ''

    data.forEach(function (movie) {

      // 先收集該movie的genres，render至button，存至genresHTMLContent
      let genresHTMLContent = ''
      movie.genres.forEach(function (item) {
        genresHTMLContent += `
          <button
            type="button"
            class="btn btn-light my-1 mx-1 genresItem"
            data-toggle="tooltip"
            data-placement="top"
            title="Tooltip on top"
          >
            ${genres[item]}
          </button>      
        `
      })

      // 將genresHTMLContent整併至movie Card
      htmlContent += `
        <div class="card col-lg-2 col-md-3 col-sm-4 m-2 p-0">
          <img class="card-img-top" src="${POSTER_URL}${movie.image}" alt="Card image cap" />
          <div class="card-body py-1 px-1">
            <h5 class="card-title text-center">${movie.title}</h5>
            ${genresHTMLContent}
          </div>
        </div>  
      `
    })

    // 將htmlContent render至dataPanel
    dataPanel.innerHTML = `
      <div class="row">${htmlContent}
      </div>
    `
  }
}())

