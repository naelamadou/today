
app
    .controller('classeIndexCtrl', function ($scope, $http, $routeParams,$location) {
        $scope.message = "ANAL | classes";
        $scope.afficherAjoutClasse = false;
        $scope.filtre = "";
        $scope.errorFormat = "grey-text";
        $scope.nomC = $routeParams.codeClasse;
        //Recuperer les classes de la bases
        getAllClasses();
        //activer les select
        $('select').formSelect();

        $scope.getClasseByNiveau = function () {
            //alert("niveau")
        }

        $scope.niveauSelected = function (niveau) {
            $scope.filtre = niveau;
        }
        $scope.valider = function () {
            if (event.keyCode == 13 && $scope.codeClasse.length > 5) {//si la touche appuyée est Entrée
                var clss = $scope.codeClasse.substring(0, 3);
                if (clss == "L1-" || clss == "L2-" || clss == "L3-" || clss == "M1-" || clss == "M2-") {
                    ajouterClasse($scope.codeClasse);
                    $scope.errorFormat = "grey-text";
                } else {
                    $scope.errorFormat = "flow-text red-text";
                }
            }
        }
        $scope.ajouterClasse = function () {
            $scope.afficherAjoutClasse = !$scope.afficherAjoutClasse;
        }
        //-----------------------------------------------------------------NDACKE
        $('.dropdown-trigger').dropdown();
        $scope.modifier = function () {
            if (event.keyCode == 13 && $scope.newNomClasse.length > 5) {//si la touche appuyée est Entrée
                var clss = $scope.newNomClasse.substring(0, 3);
                if (clss == "L1-" || clss == "L2-" || clss == "L3-" || clss == "M1-" || clss == "M2-") {
                    $scope.errorFormat = "grey-text";
                    editClasse($routeParams.codeClasse, $scope.newNomClasse);
                    $location.path("/classe");
                    getAllClasses();
                } else {
                    $scope.errorFormat = "flow-text red-text";
                }
            }
            
        }

        $scope.deleteClasse = function (nomClasse) {
            if (confirm('voulez-vous supprimer la classe "' + nomClasse + '" ?')) {
                $http.post('requete_ajax/classe/deleteClasse.php?nomClasse=' + nomClasse)
                    .success(function (data) {
                        if (data == 0) {
                            alert("impossible de supprimer cette classe, réessayer");
                        } else {
                            getAllClasses();
                        }
                    })
                    .error(function () {
                        alert("Erreur lors de la recupération des données!");
                    });
            }
        }

        function editClasse(nomC, newNomClasse) {

            if (confirm('voulez-vous modifier "' + nomC + '"?')) {
                $http.post('requete_ajax/classe/editClasse.php?nomClasse=' + nomC + '&newNomClasse=' + newNomClasse)
                    .success(function (data) {
                        if (data == 'exist') {
                            alert(newNomClasse + ' existe déjà !!!');
                        } else {
                            if (data == 1) {
                                getAllClasses();
                                $scope.newNomClasse = "";
                            } else {
                                alert("Erreur, Réessayer");
                            }
                        }
                    })
                    .error(function () {
                        alert("Erreur lors de la recupération des données!");
                    })
            }
        }
        //---------------------------------------------------------FONCTIONS
        function ajouterClasse(codeClasse) {
            $http.post("requete_ajax/classe/ajouterClasse.php?codeClasse=" + codeClasse).success(function (data) {
                getAllClasses();
                $scope.codeClasse = "";
                $scope.afficherAjoutClasse = false;
            });
        }

    

        function getAllClasses() {
            $http.post('requete_ajax/classe/getClasses.php?all=all')
                .success(function (data) {
                    $scope.classes = data;
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }
    })


    // laye & aicha
    .controller('classeCtrl', function ($scope, $http, $routeParams, $location, $anchorScroll) {
        $scope.codeClasse = $routeParams.codeClasse;
        $scope.nomModule = $routeParams.nomModule;
        $scope.affichTout = false;
        $scope.evaluations = ['DEVOIR','EXAMEN'];///////////////////////////
        $scope.semestres = ['SEMESTRE 1','SEMESTRE 2'];///////////////////////////
        $scope.etudiants = [];
        $scope.idBonus = ""
        $scope.ajout = true;
        var moduleChecked = [];
        allModules();
        getEtudiants($routeParams.codeClasse);
        getAllEtudiants($routeParams.codeClasse);
         //activer les bulles info
         $('.tooltipped').tooltip();

        /////////////////////////////
        allModulesByClasse();
        //getEvaluationByModule($scope.nomModule,$scope.codeClasse);
        //////////////////////
        getAutreModlesByClasse($routeParams.codeClasse);


        $scope.ajouterModule = function(nomModule,check){
            if(check){
                moduleChecked.push(nomModule)
            }else{
                moduleChecked.splice( moduleChecked.indexOf(nomModule), 1 );
            }
        }
        $scope.ajoutClasseModule = function(){
            ajouterClasse_Module(moduleChecked);
        }

        function ajouterClasse_Module(tabModules) {
            var link = "requete_ajax/module/ajoutClasse_module.php?codeClasse="+$routeParams.codeClasse+"&nomModule="+tabModules;
            $http.post(link)
                .success(function (data) {
                    //alert(data)
                    allModulesByClasse($routeParams.codeClasse)
                    //$location.path('/classe/'+$routeParams.codeClasse+'/listEtu')
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
            
        }



        ////modif
        //Liste des modules
        function allModules() {
            $http.post("requete_ajax/module/getModule.php?all=all")
                .success(function (data) {
                    $scope.modules = data;
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }

        function getAutreModlesByClasse(codeClasse) {
            $http.post("requete_ajax/module/getAutresModuleByClasse.php?codeClasse="+codeClasse)
                .success(function (data) {
                    $scope.autreModlesByClasse = data;
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }

        function allModulesByClasse() {
            $http.post("requete_ajax/module/getModuleByClasse.php?codeClasse="+$routeParams.codeClasse)
                .success(function (data) {
                    $scope.modulesByClasse = data;
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }


///FIN MODIF



        $scope.setIdBonus = function(idEtu){
            $scope.idBonus = idEtu;
        }

        $scope.enregistrerModif = function(etudiant){
            insertEtudiant(etudiant)
        }
        $scope.editEtudiant = function(etu){
            $scope.ajout = false;
            $scope.modifCss='disabled'
            etu.genre = etu.genre=='F'?true:undefined
            $scope.etudiant = etu;
            $scope.addEtudiant = true;
            $location.hash('editEtudiant');
            $anchorScroll();
        }

        $scope.bonus = function(idEtu,point,eval,sem){
            eval = eval=='DEVOIR'?'dev':'exam';
            sem = sem=='SEMESTRE 1'?1:2;
            var bns = idEtu+'_'+eval+sem;
            var pointInitial = parseFloat($("#"+bns).text());
            var pointActu = parseFloat(point)
            var total = pointActu+pointInitial;
            var couleur = total<0?"red":"green";
            $("#"+bns).text(total).addClass(couleur);
            $("#aly").val=10;
        }
        $scope.manus = function(idEtu,point,eval,sem){
            eval = eval=='DEVOIR'?'dev':'exam';
            sem = sem=='SEMESTRE 1'?1:2;
            var bns = idEtu+'_'+eval+sem;
            var pointInitial = parseFloat($("#"+bns).text());
            var pointActu = parseFloat(point);
            $("#"+bns).removeClass("green")
            var couleur = (pointActu+pointInitial)<0?"red":"green";
            $("#"+bns).text(pointActu+pointInitial).addClass(couleur)
        }

        $scope.saveNote = function(etu,note,idEtudiant){
            etu.bonusDev1 = parseFloat($("#"+idEtudiant+"_dev1").text());
            etu.bonusDev2 = parseFloat($("#"+idEtudiant+"_dev2").text());
            etu.bonusExam1 = parseFloat($("#"+idEtudiant+"_exam1").text());
            etu.bonusExam2 = parseFloat($("#"+idEtudiant+"_exam2").text());
            console.log(etu);
            majNote(etu,note,idEtudiant);
        }

        $scope.allEtudiants = [];

        $scope.noteChanged = function(id){
            $("#tr_"+id).removeClass('light-green lighten-4').addClass('red')
        }

        function majNote(etu,note, idEtudiant) {
                var dev1 = etu.dev1;
                var dev2 = etu.dev2;
                var exam1 = etu.exam1;
                var exam2 = etu.exam2;
            if(note){
                var dev1 = note.dev1?note.dev1:etu.dev1;
                var dev2 = note.dev2?note.dev2:etu.dev2;
                var exam1 = note.exam1?note.exam1:etu.exam1;
                var exam2 = note.exam2?note.exam2:etu.exam2;
            }
            var link = 'requete_ajax/etudiant/majNoteByEtudiant.php?idEtudiant=' + idEtudiant + 
            '&dev1='+dev1+'&dev2='+dev2+'&exam1='+exam1+'&exam2='+exam2+'&bonusDev1='+etu.bonusDev1+
            '&bonusDev2='+etu.bonusDev2+'&bonusExam1='+etu.bonusExam1+'&bonusExam2='+etu.bonusExam2+'&nomModule='+$routeParams.nomModule
            console.log(link)
            $http.post(link)
                .success(function (data) {
                    if(data==1)
                        $("#tr_"+etu.idEtu).removeClass('red').addClass('light-green lighten-4')
                    else
                        alert("Erreur lors de la mise à jours!");
                })
                .error(function () {
                    alert("Erreur lors de la recupération des données");
                });
            return false;
        }


        

        function getEtudiants(codeClasse) {
            $http.post('requete_ajax/etudiant/getEtudiantsByClasse.php?codeClasse=' + codeClasse+'&nomModule='+$routeParams.nomModule)
                .success(function (data) {
                    $scope.etudiants = data;
                })
                .error(function () {
                    alert("Erreur lors de la recupération des données");
                });
            return false;
        }


        //liste des etudiants
        function getAllEtudiants(codeClasse) {
            $http.post('requete_ajax/etudiant/getAllEtudiant.php?codeClasse=' + codeClasse)
                .success(function (data) {
                    $scope.allEtudiants = data;
                })
                .error(function () {
                    alert("Erreur lors de la recupération des données");
                });
        }

        //----------------------------------------------LAYE

        $scope.idEtu = 0;

        $scope.getIdEtu = function(idEtu){
            $scope.idEtu = idEtu;
        }

        $scope.addEtudiant = false;
        $('.modal').modal();

        $('select').formSelect();
        
        $scope.classeSauf = listClasseSauf($routeParams.codeClasse);
        $scope.classeSauf = [];
        $scope.transfert = function(){
            transfertEtudiant($scope.idEtu,$scope.newClasse);
            getEtudiants($routeParams.codeClasse);            
            $location.path('/classe/'+$routeParams.codeClasse+'/listEtu');
        }

        $scope.ajoutEtudiant = function () {
            $scope.ajout = true;
            $scope.addEtudiant = !($scope.addEtudiant);
        };
        $scope.valider = function () {
            if($scope.etudiant && $scope.etudiant.hasOwnProperty('nom') && $scope.etudiant.hasOwnProperty('prenom')
                && $scope.etudiant.nom.trim() != '' && $scope.etudiant.prenom.trim() != ''){
                    insertEtudiant($scope.etudiant);
                $scope.champOblig = false;
                }else{
                    $scope.champOblig = true;
                }
        };

        $scope.saisieNom = function(){
            $scope.etudiant.nom = $scope.etudiant.nom.toUpperCase()
        }

        $scope.saisiePrenom = function(){
            var texte = $scope.etudiant.prenom;
            if($scope.etudiant.prenom.length==1)
            $scope.etudiant.prenom = $scope.etudiant.prenom.toUpperCase();
            else{
                var t = "";
                for(j=0 ; j < texte.length ;j++) {
                    if(j == 0) t+= texte.substr(j,1).toUpperCase();
                    else t += texte.substr(j,1).toLowerCase();
                }
                $scope.etudiant.prenom = t; 
            }
                
            }

        function insertEtudiant(etudiant) {
            var idEtu = etudiant.idEtu?etudiant.idEtu:0;
            var nom = etudiant.nom;
            var prenom = etudiant.prenom;
            var telephone = etudiant.telephone;
            var email = etudiant.email;
            var genre = etudiant.genre?'F':'M';
            var link = 'requete_ajax/etudiant/insertEtudiant.php?idEtu='+idEtu+'&nom=' + nom + '&prenom=' + prenom + 
            '&codeClasse=' + $routeParams.codeClasse+'&genre='+genre+'&telephone='+telephone+'&email='+email
            console.log(link);
            $http.post(link)
                .success(function (data) {
                    if (data == 1) {
                        $scope.etudiant = {};
                        getEtudiants($routeParams.codeClasse);
                        $location.path('/classe/'+$routeParams.codeClasse+'/listEtu');
                        if(idEtu!=0){
                            $scope.addEtudiant = !($scope.addEtudiant);
                        }
                    }else{
                        alert('Impossible d\'ajouter un etudiant. Réessayez!');
                    }
                })
                .error(function () {
                    alert("Erreur lors de la recuperation des donnees au niveau de la base!");
                });
        }

        
        function listClasseSauf(codeClasse){
            $http.post('requete_ajax/classe/getClassesSauf.php?codeClasse=' + codeClasse)
                .success(function (data) {
                    // console.log(data);
                    //  alert(data);
                    $scope.classeSauf = data;
                })
                .error(function () {
                    alert("Erreur lors de la recupération des données");
                });
        }
        function transfertEtudiant(idEtu, newIdClasse) {
           
            $http.post('requete_ajax/etudiant/updateEtudiant.php?idEtu=' + idEtu + '&newIdClasse=' + newIdClasse)
                .success(function (data) {
                    if (data == 1) {
                        $scope.nomEtudiant = '';
                        $scope.prenomEtudiant = '';
                    }
                })
                .error(function () {
                    alert("Erreur lors de la recuperation des donnees au niveau de la base!");
                });
        }
    })