<?php
    require_once '../../db/db.php';
    global $db;
    if (isset($_GET['codeClasse'])) {
        $cl = $_GET['codeClasse'];
        $sql = "
        SELECT * 
        FROM classe where codeClasse <> '$cl' ORDER BY codeClasse";
      
        $req = $db->query($sql);
        #Récuperer les resultat de la requete
        $results = [];
        while($rows = $req->fetchObject()){
            $results[] = $rows;
        }

        # JSON-encode : convertir le resultat en json
        echo $json_response = json_encode($results);
    }