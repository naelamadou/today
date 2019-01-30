
app.service('detailCours', function(){
    var cours = {};

    this.getCours = function(){
        return cours;
    }
    this.setCours = function(c){
        cours = c;
    }
})

app.
    controller('coursIndexCtrl', function($scope, $routeParams, $http, detailCours,$location){
        $scope.nomModule = $routeParams.nomModule;
        $scope.chapitres = [];
        $scope.chapitre = detailCours.getCours();
        //recuperation des donnees
        getChapitreByModule($scope.nomModule);
        $('select').formSelect();
        $('.modal').modal();
        $scope.nouveauChapitre = function(){
            if($scope.titreChap && $scope.ordreChap && $scope.niveauChap){
                if($scope.titreChap.trim() != '' && $scope.niveauChap == 'L1' ||
                $scope.niveauChap == 'L2' || $scope.niveauChap == 'L3' ||
                $scope.niveauChap == 'M1' || $scope.niveauChap == 'M2')
                $location.path('/module/'+$routeParams.nomModule+'/cours/nouveau-chapitre/'+$scope.titreChap+'/'+$scope.ordreChap+'/'+$scope.niveauChap);
            }
        }
       
//---------------------------------------------
        function getChapitreByModule(nomModule) {
            $http.post("requete_ajax/cours/getCoursByModule.php?nomModule="+nomModule)
                .success(function (data) {
                    $scope.chapitres = data;
                    detailCours.setCours(data);
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }
    })
    .controller('coursChapitreCtrl', function($scope, $routeParams,detailCours, $http){
        var {nomModule,chapitre} = $routeParams;
        if($routeParams.titre){
            $scope.chapitre = {titre:$routeParams.titre,niveau:$routeParams.niveau,ordre:$routeParams.ordre,nom:nomModule};
            editorInit('');
        }else{
            detailCours.getCours().forEach(chap => {
                if (chap.titre == chapitre) {
                    editorInit(chap.contenu);
                    $scope.chapitre = chap;
                }   
            });
        }
       
        //activer les select
        $('select').formSelect();
        //activer les bulles info
        $('.tooltipped').tooltip();
        $('.modal').modal();
       

        //-------------------------------------------------------------
        function editorInit(contenu) {
            var iframe = document.getElementById('iframeId');
            if(iframe){
                var editor = (iframe.contentWindow || iframe.contentDocument);
                if (editor.document)editor = editor.document;
                    editor.designMode = 'off';
                    //editor.body.style.backgroundColor = "lightblue";   
                    editor.body.innerHTML = contenu; 
                    //Activer le bouton enregistrer losque le document est modifié
                    $(document.getElementById('iframeId').contentWindow.document).keydown(function(){
                        if(editor.designMode=='on'){
                            $('#btnSave').removeClass( "disabled" );
                        }
                    });

                    //Engeristrer les modification      
                    $scope.enregistrer = function(){
                        var nouveauContenu = editor.body.innerHTML;//Le contenu modifié
                        if($routeParams.titre){
                            enregistrerNouveauChapitre(nomModule,$routeParams.titre,$routeParams.niveau,$routeParams.ordre,nouveauContenu);//Nouveau
                        }else{
                            enregistrerChapitre($scope.chapitre.idChapitre, nouveauContenu);//Update
                        }
                    }
                }
            
        }
//------------------------------------------------------
        function enregistrerChapitre(idChapitre, contenu) {
            if (confirm("Etes-vous sûre de vouloir enregistrer les modification ?")) {
                contenu=replaceAll("+","%2B",contenu);
                contenu=replaceAll("#","%23",contenu);
                var link = "requete_ajax/cours/saveCours.php?idChapitre="+idChapitre+"&contenu="+contenu;
                $http.post(link)
                    .success(function (data) {
                        if (data == 1)
                            alert('OK')
                        else
                            alert("Erreur lors de l'enregistrement!");
                    })
                    .error(function () {
                        alert("Erreur lors de la récupération des données en base!");
                    });
            }
        }

        function enregistrerNouveauChapitre(nomModule,titrechap,niveauChap,ordreChap,contenuChap) {
            if (confirm("Etes-vous sûre de vouloir enregistrer les modification ?")) {
                contenuChap=replaceAll("+","%2B",contenuChap);
                contenuChap=replaceAll("#","%23",contenuChap);
                var link = "requete_ajax/cours/saveNewCours.php?nomModule="+nomModule+"&contenu="+contenuChap+"&titre="+titrechap
                +"&ordre="+ordreChap+"&niveau="+niveauChap;
                $http.post(link)
                    .success(function (data) {
                        if (data == 1)
                            alert('OK')
                        else
                            alert("Erreur lors de l'enregistrement!");
                    })
                    .error(function () {
                        alert("Erreur lors de la récupération des données en base!");
                    });
            }
        }

        function replaceAll(recherche, remplacement, chaineAModifier){
            return chaineAModifier.split(recherche).join(remplacement);
        }


    })