let templateFile = await fetch('./component/MovieList/template.html');
let template = await templateFile.text();

let templateFileLi = await fetch('./component/MovieList/templateLi.html');
let templateLi = await templateFileLi.text();


let MovieList = {};

MovieList.format = function(film){
    let html= templateLi;
    html = html.replaceAll('{{nomFilm}}', film.name);
    html = html.replace("{{imageFilm}}", film.image);
    html = html.replaceAll('{{idFilm}}', film.id);
    return html;
}

MovieList.formatMany = function(data, titreCategorie){
    let html = template;

    let liste = "";
    for (const film of data) {
        liste += MovieList.format(film);
    }

    html = html.replace("{{listeItems}}", liste);
    html = html.replace("{{titreCategorie}}", titreCategorie);

    return html;
}



export {MovieList};