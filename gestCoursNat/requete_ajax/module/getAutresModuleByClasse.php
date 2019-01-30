<?php
    require_once '../../db/db.php';
    global $db;
    if (isset($_GET['codeClasse'])) {
        $params1 = [
            'codeClasse' => $_GET['codeClasse']
        ];

            $sql1 = "SELECT idClasse FROM classe WHERE codeClasse=:codeClasse";
            $req = $db->prepare($sql1);
            $req->execute($params1);
            if($req->rowCount()==1){
                
            $idClasse = $req->fetch()['idClasse'];

            $req = $db->query("
                SELECT *
                FROM module
                WHERE idModule not in (SELECT idModule FROM classe_module WHERE idClasse='{$idClasse}')
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
}