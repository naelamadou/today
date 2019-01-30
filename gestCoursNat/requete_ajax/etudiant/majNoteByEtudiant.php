<?php
    require_once '../../db/db.php';
    global $db;

    if (isset($_GET['idEtudiant']) && 
        isset($_GET['dev1']) &&
        isset($_GET['dev2']) &&
        isset($_GET['exam1']) &&
        isset($_GET['exam2'])&&
        isset($_GET['nomModule'])) {
        
        
       
            $params = [
                'idEtudiant'    => $_GET['idEtudiant'],
                'dev1'          => $_GET['dev1'],
                'dev2'          => $_GET['dev2'],
                'exam1'         => $_GET['exam1'],
                'exam2'         => $_GET['exam2'],
                'bonusDev1'         => $_GET['bonusDev1'],
                'bonusDev2'         => $_GET['bonusDev2'],
                'bonusExam1'         => $_GET['bonusExam1'],
                'bonusExam2'         => $_GET['bonusExam2'],
                'nomModule'         => $_GET['nomModule'],
            ];
            $sql = "
                    UPDATE evaluation SET dev1 = :dev1, dev2 = :dev2, exam1 = :exam1, 
                    exam2 = :exam2, bonusDev1 = :bonusDev1, bonusDev2 = :bonusDev2,
                    bonusExam1 = :bonusExam1, bonusExam2 = :bonusExam2 
                    WHERE idEtudiant = :idEtudiant
                    AND evaluation.idModule=(select idModule FROM module WHERE nom =:nomModule LIMIT 1)

                ";
            $req = $db->prepare($sql);
            $req->execute($params);
            echo $json_reponse = json_encode($req->rowCount());
        
    }
?>