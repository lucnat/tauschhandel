Accounts.ui.config({
    requestPermissions: {},
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignupFields: [{
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false
    }],
});