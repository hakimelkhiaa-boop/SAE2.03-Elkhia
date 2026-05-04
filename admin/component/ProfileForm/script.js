let templateFile = await fetch('./component/ProfileForm/template.html');
let template = await templateFile.text();

let ProfileForm = {};

ProfileForm.format = function(handlerName) {
    return template.replace("{{handler}}", handlerName);
}

export { ProfileForm };
