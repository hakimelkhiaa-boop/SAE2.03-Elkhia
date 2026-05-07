let templateFile = await fetch('./component/Hero/template.html');
let template = await templateFile.text();

let Hero = {};

Hero.format = function (idFilm) {
  let html = template;

  // passe par window.C car ça marchait pas
  html = html.replace("{{hShow}}", `window.C.handlerDetail(${idFilm})`);

  console.log("HTML HERO :", html); // pour vérifier dans la console

  return html;
}

export { Hero };
