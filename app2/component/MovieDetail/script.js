let templateFile = await fetch('./component/MovieDetail/template.html');
let template = await templateFile.text();

const categories = {
    1: "Action",
    2: "Comédie",
    3: "Drame",
    4: "Science-fiction",
    5: "Animation",
    6: "thriller",
    7: "Horreur",
    8: "Aventure",
    9: "Fantaisie",
    10: "Documentaire"
};


let MovieDetail = {};

MovieDetail.format = function(film){
    let html = template;

    html = html.replaceAll('{{name}}', film.name);
    html = html.replaceAll('{{year}}', film.year);
    html = html.replaceAll('{{director}}', film.director);
    html = html.replaceAll('{{length}}', film.length);
    html = html.replaceAll('{{min_age}}', film.min_age);
    html = html.replaceAll('{{description}}', film.description);
    html = html.replaceAll('{{image}}', film.image);
    html = html.replaceAll('{{trailer}}', film.trailer);
    html = html.replaceAll('{{id_category}}', categories[film.id_category] || "Inconnu");

    return html;
}

export {MovieDetail};
