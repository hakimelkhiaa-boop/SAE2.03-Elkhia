<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");

function readMoviesController(){
    try {
        return getAllMovies();
    } catch (Exception $e) {
        return false;
    }
}

function readProfiles() {
    try {
        return getAllProfiles();
    } catch (Exception $e) {
        return false;
    }
}

function readMovieDetail() {
    if (!isset($_GET['id'])) {
        return ["error" => "ID manquant"];
    }

    $id = $_GET['id'];
    $film = getMovieDetail($id);

    if (!$film) {
        return ["error" => "Film introuvable"];
    }

    return $film;
}

function addMovieController() {

    // Champs attendus
    $fields = ["title","director","year","duration","description","category","image","trailer","age"];

    foreach ($fields as $f) {
        if (!isset($_POST[$f])) {
            return ["error" => "Champ manquant : $f"];
        }
    }

    // Récupération des données
    $title       = $_POST["title"];
    $director    = $_POST["director"];
    $year        = $_POST["year"];
    $length      = $_POST["duration"];
    $description = $_POST["description"];
    $categoryTxt = $_POST["category"];
    $image       = $_POST["image"];
    $trailer     = $_POST["trailer"];
    $min_age     = $_POST["age"];

    // Conversion catégorie texte → ID
    $categories = [
        "Action" => 1,
        "Comédie" => 2,
        "Drame" => 3,
        "Science-fiction" => 4,
        "Animation" => 5,
        "Thriller" => 6,
        "Horreur" => 7,
        "Aventure" => 8,
        "Fantaisie" => 9,
        "Documentaire" => 10
            ];

    if (!isset($categories[$categoryTxt])) {
        return ["error" => "Catégorie inconnue"];
    }

    $id_category = $categories[$categoryTxt];

    // Appel au modèle
    $ok = addMovie($title, $director, $year, $length, $description, $id_category, $image, $trailer, $min_age);

    if (!$ok) {
        return ["error" => "Erreur lors de l'insertion"];
    }

    return ["success" => "Film ajouté avec succès !"];
}


function addProfileController() {
    return addProfile(); // ou le nom de ta fonction modèle
}
