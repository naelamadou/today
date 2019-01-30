<?php
require_once '../../db/db.php';
global $db;

if (isset($_GET['nouveauNom']) && isset($_GET['ancienNom'])) {
    $tab = [
        'ancienNom'         =>  $_GET['ancienNom'],
        'nouveauNom'        =>  $_GET['nouveauNom']
    ];
    
    $sql = "UPDATE module SET nom = :nouveauNom WHERE nom = :ancienNom";
    $req = $db->prepare($sql);
    $req->execute($tab);

    echo $req->rowCount();
}
