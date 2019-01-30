<?php
    require_once '../../db/db.php';
    global $db;

    if(isset($_GET['codeClasse'])){

        $tab = [
            'codeClasse'        =>$_GET['codeClasse']
        ];
    
        $sql = "INSERT INTO classe(codeClasse) VALUES(:codeClasse)";
        $req = $db->prepare($sql);
        $req->execute($tab);
        echo $json_reponse = json_encode($req->rowCount());
    }

    