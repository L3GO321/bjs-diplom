'use strict';

const User = new UserForm();

User.loginFormCallback = data => {
    const callback = response => {
        console.log('Login data', response);

        if (response.success) {
            location.reload();
        } else {
            User.setLoginErrorMessage(response.error);
        }
    }

   ApiConnector.login(data, response => callback(response));
}

User.registerFormCallback = data => {
    const callback = response => {
        console.log('Register data', response);

        if (response.success) {
            location.reload();
        } else {
            User.setRegisterErrorMessage(response.error);
        }
    }

   ApiConnector.register(data, response => callback(response));
}