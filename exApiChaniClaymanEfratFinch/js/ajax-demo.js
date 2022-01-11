console.log('ajax-demo');
document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    const LukeSkywalker = 'https://swapi.dev/api/people/?search=Luke Skywalker';
    getAPI(LukeSkywalker, showResponseOnPage);
    const urlfilm = 'https://swapi.dev/api/films';
    getAPI(urlfilm, showFilms);
    const urlPlayer='https://swapi.dev/api/people/?search=Darth Vader';
    getAPI(urlPlayer,player);
}


function showResponseOnPage(response) {
    let people = response.results;
    let peopleList = document.getElementById('people-list');
    let li = document.createElement('li');
    li.innerHTML = `${people[0].eye_color} ${people[0].height}`;
            peopleList.append(li);

}

function getAPI(url, callback) {
    const request = new XMLHttpRequest();
    request.responseType = 'json'; 
    request.addEventListener('readystatechange', () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (typeof callback === 'function') {
                callback(request.response);
            }
        }

    });
    request.open('GET', url);
    request.send();
}

function showFilms(response) {
    let film = response.results;
    let filmList = document.getElementById('film-list');
    film.forEach(element => {
        let li = document.createElement('li');
        if (element.director === "George Lucas") {
            li.innerHTML = `${element.title}`;
            filmList.append(li);
        }

    });
}
let i=0;

function player(response) {
    let pley = response.results;
    pley[0].films.forEach(element => {
          getAPI(element,showName);
    });
}
function showName(response)
{
    let name=response;
    let filmList = document.getElementById('player-list');
    let li = document.createElement('li');
    li.innerHTML = `${name.title}`;
    filmList.append(li);
}