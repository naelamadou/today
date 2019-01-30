<?php
    require_once '../../db/db.php';
    global $db;

    if(isset($_GET['nomModule']) && isset($_GET['codeClasse'])){
        $table = explode(',',$_GET['nomModule']);
        $params1 = [
            'codeClasse' => $_GET['codeClasse']
        ];

            $sql1 = "SELECT idClasse FROM classe WHERE codeClasse=:codeClasse";
            $req = $db->prepare($sql1);
            $req->execute($params1);
            if($req->rowCount()==1){
            $idClasse = $req->fetch()['idClasse'];
            
            $i = count($table);
            foreach ($table as $r) {  
                $sql = "
                INSERT INTO classe_module(idModule, idClasse) values(".$r.",".$idClasse.")";
                $req1= $db->exec($sql);
                $i--;
            } 
            echo $json_reponse = json_encode($i+1);
    }
    }

    