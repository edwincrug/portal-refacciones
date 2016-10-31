'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          rfc: this.user.rfc,
          password: this.user.password
        })
        .then(() => {
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

          this.$state.go('user.cotizacion');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('refacciones')
  .controller('LoginController', LoginController);
