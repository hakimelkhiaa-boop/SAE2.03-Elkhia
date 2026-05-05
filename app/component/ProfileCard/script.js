let file = await fetch('./component/ProfileCard/template.html');
let template = await file.text();

let ProfileCard = {};

ProfileCard.format = function (profile) {
    return template
        .replace("{{id}}", profile.id)
        .replace("{{image}}", profile.image || "default.png")
        .replace("{{name}}", profile.name);
};

export { ProfileCard };
