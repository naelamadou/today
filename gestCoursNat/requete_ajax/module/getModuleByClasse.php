<?php
    require_once '../../db/db.php';
    global $db;
    if (isset($_GET['codeClasse'])) {
        $req = $db->query("
            SELECT * 
            FROM module, classe_module, classe
            WHERE classe.codeClasse= '{$_GET['codeClasse']}'
            AND classe.idClasse = classe_module.idClasse
            AND module.idModule = classe_module.idModule
            ORDER BY nom
        ");
        #Récuperer les resultat de la requete
        $results = [];
        while($rows = $req->fetchObject()){
            $results[] = $rows;
        }

        # JSON-encode : convertir le resultat en json
        echo $json_response = json_encode($results);
    }