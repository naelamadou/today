<?php
    require_once '../../db/db.php';
    global $db;

    if(isset($_GET['idChapitre']) && isset($_GET['contenu'])){

        $tab = [
            'idChapitre'        =>$_GET['idChapitre'],
            'contenu'           =>$_GET['contenu']
        ];
    
        $sql = "UPDATE chapitre SET contenu =:contenu WHERE idChapitre=:idChapitre";
        $req = $db->prepare($sql);
        $req->execute($tab);
        echo $json_reponse = json_encode($req->rowCount());
    }

    