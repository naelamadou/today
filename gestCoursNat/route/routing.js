
app.config(
    function ($routeProvider) {
        $routeProvider
            //---------------------------------------------------------------------------MODULE
            .when(
                '/home',
                {
                    controller: 'homeCtrl',
                    templateUrl: 'template/home/home.html'
                }
            )
            .when(
                '/module',
                {
                    controller: 'moduleIndexCtrl',
                    templateUrl: 'template/module/index.html'
                }
            )
            .when(
                '/modifier/:nomModule?',
                {
                    controller: 'moduleIndexCtrl',
                    templateUrl: 'template/module/editer.html'
                }
            )
            //---------------------------------------------------------------------------COURS
            .when(
                '/module/:nomModule/cours',
                {
                    controller: 'coursIndexCtrl',
                    templateUrl: 'template/cours/index.html'
                }
            )
            .when(
                '/module/:nomModule/cours/:chapitre',
                {
                    controller: 'coursChapitreCtrl',
                    templateUrl: 'template/cours/contenu.html'
                }
            )
            .when(
                '/module/:nomModule/cours/nouveau-chapitre/:titre/:ordre/:niveau',
                {
                    controller: 'coursChapitreCtrl',
                    templateUrl: 'template/cours/contenu.html'
                }
            )
            //---------------------------------------------------------------------------CLASSE
            .when(
                '/classe',
                {
                    controller: 'classeIndexCtrl',
                    templateUrl: 'template/classe/index.html'
                }
            )
            .when(
                '/classe/:codeClasse/listEtu',
                {
                    controller: 'classeCtrl',
                    templateUrl: 'template/etudiant/listeEtu.html'
                }
            )
            .when(
                '/classe/:codeClasse/listeEtu/:nomModule',
                {
                    controller: 'classeCtrl',
                    templateUrl: 'template/etudiant/listeEtuAvecNote.html'
                }
            )
            .when(
                '/classe/edit/:codeClasse',
                {
                    controller: 'classeIndexCtrl',
                    templateUrl: 'template/classe/edit.html'
                })
            //---------------------------------------------------------------------------ETUDIANT
            .when(
                '/etudiant',
                {
                    controller: 'etudiantIndexCtrl',
                    templateUrl: 'template/etudiant/index.html'
                }
            )

            .otherwise({ templateUrl: 'template/home/404.html' })
    }
);