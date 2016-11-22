'use strict';

class LoginController {
    constructor(Auth, $state) {
        this.user = {};
        this.errors = {};
        this.submitted = false;

        this.Auth = Auth;
        this.$state = $state;

        this.currentUser = {};
    }

    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                    rfc: this.user.rfc,
                    password: this.user.password
                })
                .then(() => {
                    
                    this.currentUser = this.Auth.getCurrentUser();
                    
                        // Logged in, redirect to home
                        /*remueve las opciones de historico*/
                    localStorage.removeItem('histEmpresa')
                    localStorage.removeItem('histSucursal')

                    /*remueve las opciones de pedidos*/
                    localStorage.removeItem('pedEmpresa')
                    localStorage.removeItem('pedSucursal')
                        /*remueve las opciones de cotizaciones*/
                    localStorage.removeItem('cotEmpresa')
                    localStorage.removeItem('cotSucursal')

                    if (this.currentUser.role == 'user')
                        this.$state.go('user.cotizacion');
                    else
                        this.$state.go('user.aprobacion');

                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }
}

angular.module('refacciones')
    .controller('LoginController', LoginController);
