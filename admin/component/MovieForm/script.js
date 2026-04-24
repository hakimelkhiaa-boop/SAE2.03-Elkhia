let templateFile = await fetch(new URL("./template.html", import.meta.url));
let template = await templateFile.text();

let MovieForm = {};

MovieForm.render = function () {
  return template;
};

MovieForm.init = function (onSuccess, onError) {
  const form = document.getElementById("movie-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collecte des données du formulaire
    const data = {
      title: document.getElementById("title").value,
      director: document.getElementById("director").value,
      year: parseInt(document.getElementById("year").value),
      duration: parseInt(document.getElementById("duration").value),
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      image: document.getElementById("image").value,
      trailer: document.getElementById("trailer").value,
      age: parseInt(document.getElementById("age").value) || 0,
    };

    // Validation côté client
    if (!data.title || !data.director || !data.year || !data.duration || !data.category) {
      onError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("director", data.director);
      formData.append("year", data.year);
      formData.append("duration", data.duration);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", data.image);
      formData.append("trailer", data.trailer);
      formData.append("age", data.age);

      const response = await fetch("../../../server/script.php?todo=addMovie", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.message);
        form.reset();
      } else {
        onError(result.message || "Erreur lors de l'ajout du film.");
      }
    } catch (error) {
      onError("Erreur de connexion au serveur.");
    }
  });
};

export { MovieForm };