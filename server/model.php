<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "elkhia1");
define("DBLOGIN", "elkhia1");
define("DBPWD", "elkhia1");

function getAllMovies(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, year, image, id_category FROM Movie";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function getAllProfiles() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, image, age FROM Users";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function addMovie($name, $director, $year, $length, $description, $id_category, $image, $trailer, $min_age){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "INSERT INTO Movie (name, director, year, length, description, id_category, image, trailer, min_age)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $cnx->prepare($sql);
        return $stmt->execute([$name, $director, $year, $length, $description, $id_category, $image, $trailer, $min_age]);
    } catch (Exception $e) {
        return false;
    }
}


function getMovieDetail($id) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT * FROM Movie WHERE id = ?";
    $stmt = $cnx->prepare($sql);
    $stmt->execute([$id]);

    return $stmt->fetch(PDO::FETCH_OBJ);
}

function addProfile($name, $image, $age) {
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

        // Vérification des champs obligatoires
        if (!isset($_POST['name']) || !isset($_POST['age'])) {
            return ["error" => "Champs manquants"];
        }

        $name = $_POST['name'];
        $image = $_POST['avatar'] ?? null; //input dans le form = avatar
        $age = $_POST['age'];

        $sql = "INSERT INTO Users (name, image, age) VALUES (?, ?, ?)";
        $stmt = $cnx->prepare($sql);
        return $stmt->execute([$name, $image, $age]);
    } catch (Exception $e) {
        return ["error" => "Erreur SQL : " . $e->getMessage()];
    }
}
