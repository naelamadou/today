app
    .controller('etudiantCtrl', function ($scope, $http, $routeParams) {

        $scope.addEtudiant = false;

        $scope.ajoutEtudiant = function () {
            $scope.addEtudiant = !($scope.addEtudiant);
        };
        $scope.valider = function () {
            if (event.keyCode == 13) {
                insertEtudiant($scope.nomEtudiant, $scope.prenomEtudiant, $routeParams.codeClasse);
            }
        };
        function insertEtudiant(nom, prenom, codeClasse) {
            var lien = 'requetes_ajax/etudiant/insertEtudiant.php?nomEtudiant=' + nom + '&prenomEtudiant=' + prenom + '&codeClasse=' + codeClasse;
            console.log(lien)
            $http.post(lien)
                .success(function (data) {
                    alert(data)
                    if (data == 1) {
                        $scope.nomEtudiant = '';
                        $scope.prenomEtudiant = '';
                    }
                })
                .error(function () {
                    alert("Erreur lors de la recuperation des donnees au niveau de la base!");
                });
        }
        function transfertEtudiant(idEtu, newIdClasse) {
            $http.post('requetes_ajax/etudiant/updateEtudiant.php?idEtu=' + idEtu + '&newIdClasse=' + newIdClasse)
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
    });