(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);


(function(db) {
    console.log('Setting duplicate email input handler for form');
    var emailInput = $('[data-coffee-order="email"]');

    // for some reason .setCustomValidity works on jQuery version
    // but .validity ... properties does not work with jQuery version
    var emailInputNojQuery = document.querySelector('[data-coffee-order="email"]');

    var cb = function(serverResponse) {
        var message = '';
        if (serverResponse === null) {
            emailInput.setCustomValidity(message);
        } else {
            message = emailInput.val() + ' already has an order!';
            emailInput.setCustomValidity(message);
        } // end if/else

        // console.log(emailInput.validity); // undefined? why?

        console.log(emailInputNojQuery.validationMessage);
        console.log(emailInputNojQuery.validity);
        console.log(emailInputNojQuery.validity.customError);
    } // end cb(serverResponse)

    emailInput.on('input', function(event) {
        var email = event.target.value;
        if (/.+@me\.com$/.test(email)) {
            db.get(email, cb);
        } // end if
    });
});
