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
