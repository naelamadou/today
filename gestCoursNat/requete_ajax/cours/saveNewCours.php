<?php
    require_once '../../db/db.php';
    global $db;

    if(isset($_GET['nomModule']) && isset($_GET['contenu'])  && isset($_GET['ordre'])  && isset($_GET['niveau'])  && isset($_GET['titre'])){

        $params1 = [
            'nom' => $_GET['nomModule']
        ];
            $sql1 = "SELECT idModule FROM module WHERE nom=:nom";
            $req = $db->prepare($sql1);
            $req->execute($params1);

        if ($req->rowCount()==1) {
            $idModule = $req->fetch()['idModule'];
            $tab = [
                'idModule'        =>$idModule,
                'contenu'           =>$_GET['contenu'],
                'titre'           =>$_GET['titre'],
                'ordre'           =>$_GET['ordre'],
                'niveau'           =>$_GET['niveau'],
            ];
        
            $sql = "INSERT INTO chapitre(titre,niveau,ordre,contenu,idModule) VALUES(:titre,:niveau,:ordre,:contenu,:idModule)";
            $req = $db->prepare($sql);
            $req->execute($tab);
            echo $json_reponse = json_encode($req->rowCount());
        }
       
    }

    