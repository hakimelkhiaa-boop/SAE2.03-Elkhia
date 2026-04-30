let HOST_URL = "..";

let dataMovie = {};

dataMovie.requestMovies = async function(){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
    return await answer.json();
}

dataMovie.addMovie = async function(formData){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addmovie", {
        method: "POST",
        body: formData
    });
    return await answer.json();
}

export { dataMovie };
