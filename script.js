window.onload = function () {
  getHeros(1)
}

const animaHeroList = "animate";
const target2 = document.querySelectorAll("[data-anime2]");
const animaNextBar = "animate2";
const timeStamp = "1596202386";
const apiKey = "f5bfe7572c594f0b8b85882ebb0b265f";
const md5 = "aa8f034ce6b51e4783fd153258d384eb";
const pages = 10;
const total = 100;
const url = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=${total}`;



//Resolvi fazer a responsividade por media query css. 
// function responsive() {
//   var w = window.innerWidth;
//   let removeElements = document.getElementsByClassName("remove_on_mobile")
//   if (w < 800) {
//     for (let index = 0; index < removeElements.length; index++) {
//       removeElements[index].setAttribute("hidden", true)
//     }
//   } else {
//     for (let index = 0; index < removeElements.length; index++) {
//       removeElements[index].removeAttribute("hidden")
//     }
//   }
// }

function getHeros(currentPage) {
  fetch(url).then((response) => {
    return response.json()
  }).then((jasonParsed) => {
    let itemsPerPage = jasonParsed.data.results.length / pages;
    let offset = itemsPerPage * currentPage - itemsPerPage;
    document.getElementById("list").innerHTML = "";

    for (let i = offset; i < itemsPerPage * currentPage; i++) {
      const element = jasonParsed.data.results[i];

      // cria a div do heroi
      let heroBox = document.createElement("ul")
      heroBox.setAttribute("id", element.id)
      heroBox.setAttribute("class", "item")
      heroBox.setAttribute("onclick", "getInfo(" + element.id + ")")
      heroBox.setAttribute("name", element.name)
      heroBox.setAttribute("img", element.thumbnail.path + ".jpg")

      let imageBox = document.createElement("li")
      imageBox.setAttribute("class", "imagesize")
      // cria a imagem do heroi
      let img = document.createElement("img")
      img.setAttribute("src", element.thumbnail.path + ".jpg")
      img.setAttribute("class", "img-thumb")
      // adiciona os elementos aos elementos pais
      imageBox.append(img)
      heroBox.append(imageBox)

      // cria elemento de nome
      let nameBox = document.createElement("li")
      nameBox.setAttribute("class", "name_box")
      let h5 = document.createElement("h5")
      h5.setAttribute("class", "titleHero")
      h5.innerHTML = element.name
      // adiciona os elementos aos elementos pais
      nameBox.append(h5)
      heroBox.append(nameBox)

      // cria elemento de series
      let seriesBox = document.createElement("li")
      seriesBox.setAttribute("class", "remove_on_mobile series_list")
      for (let j = 0; j < element.series.items.length; j++) {
        let serie = element.series.items[j];

        if (j < 3) {
          let p = document.createElement("p")
          p.append(document.createTextNode(serie.name))
          seriesBox.append(p)
        } else if (j == 3) {
          let p = document.createElement("p")
          p.append(document.createTextNode("Mais " + (element.series.items.length - 2)))
          seriesBox.append(p)
        }

        heroBox.setAttribute("serie_" + j, serie.name)
      }
      heroBox.append(seriesBox)

      // adiciona o heroBox na lista
      document.getElementById("list").append(heroBox)
    }

    document.getElementById("search").onclick = function () {
      let clickValor = document.getElementById("heroSearches").value
      searchHero(clickValor, jasonParsed)

    }
  })
}

//faz busca pelo personagem e gera popUp
function searchHero(hero, jasonParsed) {
  let found = false;
  for (let i = 0; i < jasonParsed.data.results.length; i++) {
    const element = jasonParsed.data.results[i];
    if (element.name === hero) {
      console.log(element)
      found = true;
      getInfoBusca(element)
      openPopUp()
      break;
    }
  }
  if (!found) {
    document.getElementById("heroSearches").style.border = "1px solid #e27676";
    alert("Ops, acho que esse Heroi não existe!")
  } else {
    document.getElementById("heroSearches").style.border = "none";
  }
}


function openPopUp() {
  document.getElementById("popup").removeAttribute("hidden");
}
function createPopUp() {
}

function closePopUp() {
  document.getElementById("popup").setAttribute("hidden", true);
}

//Busca Hero 
function getInfoBusca(hero) {
  let heroPopUpBox = document.createElement("div")

  let heroPopUpImg = document.createElement("img")
  if (hero.thumbnail.path != "") {
    heroPopUpImg.setAttribute("src", hero.thumbnail.path + ".jpg")
  } else {
    heroPopUpImg.setAttribute("src", "assets/no-image.jpg")
  }
  heroPopUpImg.setAttribute("class", "img_big")

  heroPopUpBox.append(heroPopUpImg)

  let namePopUpBox = document.createElement("h4")
  namePopUpBox.setAttribute("class", "dark_text")
  namePopUpBox.innerHTML = hero.name
  namePopUpBox.append("h4")
  heroPopUpBox.append(namePopUpBox)

  let seriesPopUpBox = document.getElementById("series")
  seriesPopUpBox.innerHTML = ""
  seriesPopUpBox.setAttribute("class", "dark_text")
  document.getElementById("name").innerHTML = hero.name
  document.getElementById("info_img").setAttribute("src", hero.thumbnail.path + ".jpg")

  for (let i = 0; i < hero.series.items.length; i++) {
    if (i > 4) {
      let p = document.createElement("p")
      p.append(document.createTextNode(hero.series.items[i].name))
      p.setAttribute("class", "dark_text")
      seriesPopUpBox.append(p)
    }
  }
}

//Clica hero
function getInfo(id) {
  let hero = document.getElementById(id)
  let heroPopUpBox = document.createElement("div")

  let heroPopUpImg = document.createElement("img")
  if (hero.thumbnail === undefined) {
    heroPopUpImg.setAttribute("src", hero.thumbnail + ".jpg")
  } else {
    heroPopUpImg.setAttribute("src", "assets/no-image.jpg")
  }
  heroPopUpImg.setAttribute("class", "img_big")

  heroPopUpBox.append(heroPopUpImg)

  let namePopUpBox = document.createElement("h4")
  namePopUpBox.setAttribute("class", "dark_text")
  namePopUpBox.innerHTML = hero.name
  namePopUpBox.append("h4")
  heroPopUpBox.append(namePopUpBox)

  let seriesPopUpBox = document.getElementById("series")
  seriesPopUpBox.innerHTML = ""
  seriesPopUpBox.setAttribute("class", "dark_text")
  document.getElementById("name").innerHTML = hero.attributes.name.value
  document.getElementById("info_img").setAttribute("src", hero.attributes.img.value)

  for (let i = 0; i < hero.attributes.length; i++) {
    if (i > 4) {
      let p = document.createElement("p")
      p.append(document.createTextNode(hero.attributes[i].value))
      p.setAttribute("class", "dark_text")
      seriesPopUpBox.append(p)
    }
  }
  openPopUp()
}
