
app
    .controller('moduleIndexCtrl', function ($scope, $http, $routeParams, $location) {
        $scope.message = 'Module';
        $scope.modules = [];
        $scope.addModule = false;
        $scope.nomModule = $routeParams.nomModule;
        allModules();

        $scope.modifierNom = function () {
            if (event.keyCode == 13 && $scope.nomModule.length > 2) {//si la touche appuyée est Entrée
                if ($scope.nouveauNom != $scope.nomModule) {
                    modifierNom($scope.nouveauNom, $scope.nomModule);
                }
            }
        }
        $scope.ajoutModule = function () {
            $scope.addModule = !$scope.addModule;
        }
        $scope.valider = function () {
            if (event.keyCode == 13 && $scope.nomModule.length > 2) {//si la touche appuyée est Entrée
                ajouterModule($scope.nomModule);
            }
        }
        $scope.supprimerModule = function (nomModule) {
            if (confirm("Etes-vous sûre de vouloir supprimer le module '" + nomModule + "' ?")) {
                $http.post("requete_ajax/module/supprimer.php?nomModule=" + nomModule)
                    .success(function (data) {
                        if (data == 1)
                            allModules();
                        else
                            alert("Erreur lors de la suppréssion");
                    })
                    .error(function () {
                        alert("Erreur lors de la récupération des données en base!");
                    });
            }
        }

        function modifierNom(nouveauNom, ancienNom) {
            if (confirm("Etes-vous sûre de vouloir remplacer '" + ancienNom + "' par '" + nouveauNom + "' ?")) {
                $http.post("requete_ajax/module/modifierNom.php?nouveauNom=" + nouveauNom + "&ancienNom=" + ancienNom)
                    .success(function (data) {
                        if (data == 1)
                            $location.path('/module');
                        else
                            alert("Erreur lors de la modfication");
                    })
                    .error(function () {
                        alert("Erreur lors de la récupération des données en base!");
                    });
            }
        }

        function allModules() {
            $http.post("requete_ajax/module/getModule.php?all=all")
                .success(function (data) {
                    $scope.modules = data;
                })
                .error(function () {
                    alert("Erreur lors de la récupération des données en base!");
                });
        }

        function ajouterModule(module) {
            $http.post("requete_ajax/module/ajouterModule.php?nomModule=" + module).success(function (data) {
                allModules();
                $scope.nomModule = "";
                $scope.addModule = false;
            });
        }
    })
    ;