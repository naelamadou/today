<?php
   
   include_once '../../db/db.php';
    if (isset($_GET['codeClasse'])) {
        $cl =  $_GET['codeClasse'];
        $sql = "SELECT * FROM etudiant,classe where etudiant.idClasse = classe.idClasse and classe.codeClasse='$cl'";
        $req = $db->query($sql);
        $results = [];
        $results = $req->fetchAll();
        echo $json = json_encode($results);
    }
    