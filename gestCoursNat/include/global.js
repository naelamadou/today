include('assets/js/angular.js');
include('assets/js/angular-route.js');
include('assets/js/jquery.js');
include('assets/js/materialize.js');

include('assets/js/editor.js');



//app
include('app/app.js');

//route
include('route/routing.js');

//controller
include('controller/homeController.js');
include('controller/moduleController.js');
include('controller/coursController.js');
include('controller/classeController.js');
include('controller/etudiantController.js');









function include(fileName){
document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}