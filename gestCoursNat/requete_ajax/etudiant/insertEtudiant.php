<?php
    require_once '../../db/db.php';
    global $db;
    $idClasse = '';

    if (isset($_GET['idEtu']) && isset($_GET['nom']) && isset($_GET['prenom']) && isset($_GET['codeClasse'])
        && isset($_GET['genre'])  && isset($_GET['telephone'])  && isset($_GET['email'])){
        
        $params1 = [
            'codeClasse' => $_GET['codeClasse']
        ];
        $insert = 1;

        if($_GET['idEtu'] == 0){
            $sql1 = "SELECT idClasse FROM classe WHERE codeClasse=:codeClasse";
            $req = $db->prepare($sql1);
            $req->execute($params1);
            if($req->rowCount()==1){
                
                $idClasse = $req->fetch()['idClasse'];
                $params = [
                    'nom' => $_GET['nom'],
                    'prenom' => $_GET['prenom'],
                    'genre' => $_GET['genre'],
                    'telephone' => $_GET['telephone'],
                    'email' => $_GET['email'],
                    'idClasse' => $idClasse
                ];
                $sql = "
                INSERT INTO etudiant(nom,prenom,genre,telephone,email,idClasse) VALUES(:nom,:prenom,:genre,:telephone,:email,:idClasse)
            ";

            }
        }else{
            $insert = 0;
            $params = [
                'nom' => $_GET['nom'],
                'prenom' => $_GET['prenom'],
                'genre' => $_GET['genre'],
                'telephone' => $_GET['telephone'],
                'email' => $_GET['email'],
                'idEtu' => $_GET['idEtu']
            ];
            $sql = "
            UPDATE etudiant SET nom=:nom,prenom=:prenom,genre=:genre,telephone=:telephone,email=:email WHERE idEtu =:idEtu
        ";
        }
                
            $req = $db->prepare($sql);
            $req->execute($params);
            if($req->rowCount()>0 && $insert==1){
                $idEtu = $db->lastInsertId();
                $sql1 = "SELECT * FROM classe_module where classe_module.idClasse = ".$idClasse;
               // echo $sql1;
                $req1 = $db->query($sql1);
             $results = [];
        $results = $req1->fetchAll();
        $i = $req1->rowCount();
        foreach ($results as $r) {  
            $sql = "
            INSERT INTO evaluation(idEtudiant, idModule) values(".$idEtu.",".$r['idModule'].")";
           // echo $sql;
            $req1= $db->exec($sql);
            $i--;
        } 
           
                echo $json_reponse = json_encode($i+1);
            }else{
                echo $json_reponse = json_encode($req->rowCount());
            }
        }else{
        echo "Impossible !!!";
    }
?>