let templateFile = await fetch(new URL("./template.html", import.meta.url));
let template = await templateFile.text();

let section1 = {};

section1.format = function (film__date, film__type, film__title, film__image) {
  let html = template;
  html = html.replaceAll("{{film__date}}", film__date);
  html = html.replaceAll("{{film__type}}", film__type);
  html = html.replaceAll("{{film__title}}", film__title);
  html = html.replaceAll("{{film__image}}", film__image || "");
  return html;
};

section1.render = films => `
  <div class="grid">
    ${films.map(film => {
      const imagePath = film.image ? `/server/images/${film.image}` : "";

      console.log(
        "Film:", film.title,
        "Image nom BD:", film.image,
        "Chemin généré:", imagePath
      );

      return section1.format(
        film.date,
        film.type,
        film.title,
        imagePath
      );
    }).join("")}
  </div>
`;

// section1.render = function (films) {
//   let html = "";
//   html += `<div class="grid">`;
//   films.forEach((film) => {
//     const film__image = film.image
//       ? `/server/images/${film.image}`
//       : "";
//     console.log("Film:", film.title, "Image nom BD:", film.image, "Chemin généré:", film__image);
//     html += section1.format(film.date, film.type, film.title, film__image);
//   });
//   html += `</div>`;
//   return html;
// }


export { section1 };
