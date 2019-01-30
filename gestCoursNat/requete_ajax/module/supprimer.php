<?php
require_once '../../db/db.php';
global $db;

if (isset($_GET['nomModule'])) {
    $nomModule = $_GET['nomModule'];
    
    if($db->exec("DELETE FROM module WHERE nom = '{$nomModule}'")>0){
        echo "1";
    }else{
        echo "0";
    }
}
