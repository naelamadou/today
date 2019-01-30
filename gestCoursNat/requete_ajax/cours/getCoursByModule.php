<?php
    require_once '../../db/db.php';
    global $db;

    $param = [
        "nomModule"      => $_GET['nomModule']
    ];
    if (isset($_GET['nomModule'])) {
        $sql = '
        SELECT
               *
        FROM chapitre
        JOIN module
        ON chapitre.idModule=module.idModule
        WHERE module.nom = :nomModule
        ORDER BY chapitre.titre';
        #Récuperer les resultat de la requete
        $req = $db->prepare($sql);
        $req->execute($param);
        $results = [];
        while($row = $req->fetchObject()){
            $results[] = $row;
        }
        # JSON-encode : convertir le resultat en json
        echo $json_response = json_encode($results);
    }
    