<?php
    require_once '../../db/db.php';
    global $db;


    if(isset($_GET['nomClasse'])){

       $param = [
           'nomClasse' => $_GET['nomClasse']
        ];
       
            $sql = " DELETE FROM classe WHERE codeClasse = :nomClasse ";
            $req = $db->prepare($sql);                                                                                                                                                                              
            $req->execute($param);
            echo $json_reponse = json_encode($req->rowCount()); 
       
    }
