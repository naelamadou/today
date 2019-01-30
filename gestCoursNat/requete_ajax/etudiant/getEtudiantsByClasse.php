<?php
      require_once '../../db/db.php';
      global $db;
  
    if (isset($_GET['codeClasse']) && isset($_GET['nomModule'])) {
        $sql = "SELECT * FROM etudiant,classe, evaluation
        WHERE classe.codeClasse= '{$_GET['codeClasse']}' 
        and evaluation.idEtudiant = etudiant.idEtu
        and evaluation.idModule = (SELECT idModule FROM module WHERE nom='{$_GET['nomModule']}')
        and etudiant.idClasse=classe.idClasse";
        $req = $db->query($sql);
        $results = [];
        $results = $req->fetchAll();
        echo $json = json_encode($results);
    }
       
?>
       
