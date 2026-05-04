let HOST_URL = "..";

let DataProfile = {};

DataProfile.add = async function(formData) {
    let response = await fetch("../server/script.php?todo=addProfile", {
        method: "POST",
        body: formData
    });

    return response.json();
}

export { DataProfile };
