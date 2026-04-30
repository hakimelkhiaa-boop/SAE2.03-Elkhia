let templateFile = await fetch('./component/MovieForm/template.html');
let template = await templateFile.text();

let MovieForm = {};
 /**
  *
  * @returns {string} 
  */
MovieForm.format = function (handler) {
  let html = template;
  html = html.replace("{{handler}}", handler);
  return html;
};

export{ MovieForm };