<?php
    require_once '../../db/db.php';
    global $db;
    if (isset($_GET['all'])) {
        $req = $db->query("
            SELECT *
            FROM classe
            ORDER BY codeClasse
        ");
        #Récuperer les resultat de la requete
        $results = [];
        while($rows = $req->fetchObject()){
            $results[] = $rows;
        }

        # JSON-encode : convertir le resultat en json
        echo $json_response = json_encode($results);
    }