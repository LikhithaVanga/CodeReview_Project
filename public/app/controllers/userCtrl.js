var regData ={
    email:'',
    username:'',
    password:''
};
angular.module('userController', ['userServices'])

.controller('regCtrl',function($http, $location, $timeout, User){
    var app = this;

    this.regUser = function(regData) {
        app.loading = true;
        app.errorMsg=false;
        app.successFlag = false;
        app.errorFlag = false;
        User.create(app.regData).then(function(data){

            if(data.data.success)
            {
                app.loading = false;
                app.successFlag = true;
                app.successMsg = data.data.message+"...Redirecting";
                $timeout(function(){
                    $location.path('/login');
                    app.regData.email='';
                    app.regData.username='';
                    app.regData.password='';
                },2000);
            }
            else
            {
                app.errorFlag = true;
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }

    app.regData =regData;

});
