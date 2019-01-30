<?php
    require_once '../../db/db.php';
    global $db;

    if (isset($_GET['idEtu']) && isset($_GET['newIdClasse'])) {
       
        
       
            $params = [
                'idEtu' => $_GET['idEtu'],
                'newIdClasse' => $_GET['newIdClasse']
            ];
            $sql = "
                    UPDATE etudiant SET idClasse = :newIdClasse WHERE idEtu = :idEtu
                ";
            $req = $db->prepare($sql);
            $req->execute($params);
            echo $json_reponse = json_encode($req->rowCount());
        
    }
?>