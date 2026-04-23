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
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL simple pour récupérer les films
    $sql = "SELECT id, name, year, image, id_category FROM Movie";
    // Prépare et exécute la requête
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    // Récupère les résultats
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}
