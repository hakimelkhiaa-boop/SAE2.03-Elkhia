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


let DataProfile = {};

DataProfile.add = async function(formData) {
    let response = await fetch("../server/script.php?todo=addProfile", {
        method: "POST",
        body: formData
    });

    return response.json();
}

export { DataProfile };
