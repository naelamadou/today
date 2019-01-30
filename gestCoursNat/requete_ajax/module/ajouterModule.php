<?php
    require_once '../../db/db.php';
    global $db;

    if(isset($_GET['nomModule'])){

        $tab = [
            'nomModule'        =>mysql_real_escape_string($_GET['nomModule'])
        ];
    
        $sql = "INSERT INTO module(nom) VALUES(:nomModule)";
        $req = $db->prepare($sql);
        $req->execute($tab);
        echo $json_reponse = json_encode($req->rowCount());
    }

    