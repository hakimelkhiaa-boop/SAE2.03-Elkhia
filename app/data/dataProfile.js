let HOST_URL = "..";

let DataProfile = {};

DataProfile.read = async function () {
    let response = await fetch("../server/script.php?todo=readProfiles");
    return response.json();
};

export { DataProfile };
