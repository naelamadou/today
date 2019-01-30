<?php
    require_once '../../db/db.php';
    global $db;


    if(isset($_GET['nomClasse']) && isset($_GET['newNomClasse'])){

       $param = [
           'nomClasse' => $_GET['nomClasse'],
           'newNomClasse' => $_GET['newNomClasse']
        ];
        $sql = " SELECT * FROM classe WHERE codeClasse = '{$_GET['newNomClasse']}' ";
        $req = $db->query($sql);
        $results = $req->fetch();
        if($req->rowCount() == 0)
        {
            $sql = " UPDATE classe SET codeClasse =:newNomClasse WHERE codeClasse=:nomClasse ";
            $req = $db->prepare($sql);                                                                                                                                                                              
            $req->execute($param);
            echo $json_reponse = json_encode($req->rowCount()); 
        }else{
            echo "exist";
        }
       
    }
