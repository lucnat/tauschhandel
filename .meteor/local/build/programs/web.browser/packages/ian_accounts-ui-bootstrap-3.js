//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Session = Package.session.Session;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var i18n = Package['anti:i18n'].i18n;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var accountsUIBootstrap3, ptPT, ptBR, $modal;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/accounts_ui.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (!Accounts.ui){                                                                                                     // 1
	Accounts.ui = {};                                                                                                     // 2
}                                                                                                                      // 3
                                                                                                                       // 4
if (!Accounts.ui._options) {                                                                                           // 5
	Accounts.ui._options = {                                                                                              // 6
		extraSignupFields: [],                                                                                               // 7
		requestPermissions: {},                                                                                              // 8
		requestOfflineToken: {},                                                                                             // 9
		forceApprovalPrompt: {}                                                                                              // 10
	};                                                                                                                    // 11
}                                                                                                                      // 12
                                                                                                                       // 13
Accounts.ui.navigate = function (route, hash) {                                                                        // 14
	// if router is iron-router                                                                                           // 15
	if (window.Router && _.isFunction(Router.go)) {                                                                       // 16
		Router.go(route, hash);                                                                                              // 17
	}                                                                                                                     // 18
}                                                                                                                      // 19
                                                                                                                       // 20
Accounts.ui.config = function(options) {                                                                               // 21
	// validate options keys                                                                                              // 22
	var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'extraSignupFields', 'requestOfflineToken', 'forceApprovalPrompt'];
	_.each(_.keys(options), function(key) {                                                                               // 24
		if (!_.contains(VALID_KEYS, key)){                                                                                   // 25
			throw new Error("Accounts.ui.config: Invalid key: " + key);                                                         // 26
		}                                                                                                                    // 27
	});                                                                                                                   // 28
	                                                                                                                      // 29
	options.extraSignupFields = options.extraSignupFields || [];                                                          // 30
	// deal with `passwordSignupFields`                                                                                   // 31
	if (options.passwordSignupFields) {                                                                                   // 32
		if (_.contains([                                                                                                     // 33
			"USERNAME_AND_EMAIL_CONFIRM",                                                                                       // 34
			"USERNAME_AND_EMAIL",                                                                                               // 35
			"USERNAME_AND_OPTIONAL_EMAIL",                                                                                      // 36
			"USERNAME_ONLY",                                                                                                    // 37
			"EMAIL_ONLY"                                                                                                        // 38
		], options.passwordSignupFields)) {                                                                                  // 39
			if (Accounts.ui._options.passwordSignupFields){                                                                     // 40
				throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                            // 41
			} else {                                                                                                            // 42
				Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                          // 43
			}                                                                                                                   // 44
		} else {                                                                                                             // 45
			throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);  // 46
		}                                                                                                                    // 47
	}                                                                                                                     // 48
                                                                                                                       // 49
	// deal with `requestPermissions`                                                                                     // 50
	if (options.requestPermissions) {                                                                                     // 51
		_.each(options.requestPermissions, function(scope, service) {                                                        // 52
			if (Accounts.ui._options.requestPermissions[service]) {                                                             // 53
				throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);               // 54
			} else if (!(scope instanceof Array)) {                                                                             // 55
				throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                            // 56
			} else {                                                                                                            // 57
				Accounts.ui._options.requestPermissions[service] = scope;                                                          // 58
			}                                                                                                                   // 59
		});                                                                                                                  // 60
		if (typeof options.extraSignupFields !== 'object' || !options.extraSignupFields instanceof Array) {                  // 61
			throw new Error("Accounts.ui.config: `extraSignupFields` must be an array.");                                       // 62
		} else {                                                                                                             // 63
			if (options.extraSignupFields) {                                                                                    // 64
				_.each(options.extraSignupFields, function(field, index) {                                                         // 65
					if (!field.fieldName || !field.fieldLabel){                                                                       // 66
						throw new Error("Accounts.ui.config: `extraSignupFields` objects must have `fieldName` and `fieldLabel` attributes.");
					}                                                                                                                 // 68
					if (typeof field.visible === 'undefined'){                                                                        // 69
						field.visible = true;                                                                                            // 70
					}                                                                                                                 // 71
					Accounts.ui._options.extraSignupFields[index] = field;                                                            // 72
				});                                                                                                                // 73
			}                                                                                                                   // 74
		}                                                                                                                    // 75
	}                                                                                                                     // 76
                                                                                                                       // 77
	// deal with `requestOfflineToken`                                                                                    // 78
	if (options.requestOfflineToken) {                                                                                    // 79
		_.each(options.requestOfflineToken, function (value, service) {                                                      // 80
			if (service !== 'google'){                                                                                          // 81
				throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");       // 82
			}                                                                                                                   // 83
			if (Accounts.ui._options.requestOfflineToken[service]) {                                                            // 84
				throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);              // 85
			} else {                                                                                                            // 86
				Accounts.ui._options.requestOfflineToken[service] = value;                                                         // 87
			}                                                                                                                   // 88
		});                                                                                                                  // 89
	}                                                                                                                     // 90
                                                                                                                       // 91
	// deal with `forceApprovalPrompt`                                                                                    // 92
	if (options.forceApprovalPrompt) {                                                                                    // 93
		_.each(options.forceApprovalPrompt, function (value, service) {                                                      // 94
			if (service !== 'google'){                                                                                          // 95
				throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");       // 96
			}                                                                                                                   // 97
			if (Accounts.ui._options.forceApprovalPrompt[service]) {                                                            // 98
				throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);              // 99
			} else {                                                                                                            // 100
				Accounts.ui._options.forceApprovalPrompt[service] = value;                                                         // 101
			}                                                                                                                   // 102
		});                                                                                                                  // 103
	}                                                                                                                     // 104
};                                                                                                                     // 105
                                                                                                                       // 106
Accounts.ui._passwordSignupFields = function() {                                                                       // 107
	return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                     // 108
};                                                                                                                     // 109
                                                                                                                       // 110
                                                                                                                       // 111
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/en.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("en", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Reset your password",                                                                                        // 3
		newPassword: "New password",                                                                                         // 4
		cancel: "Cancel",                                                                                                    // 5
		submit: "Set password"                                                                                               // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Choose a password",                                                                                          // 9
		newPassword: "New password",                                                                                         // 10
		cancel: "Close",                                                                                                     // 11
		submit: "Set password"                                                                                               // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email address verified",                                                                                  // 15
		dismiss: "Dismiss"                                                                                                   // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Dismiss",                                                                                                  // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Change password",                                                                                         // 22
		signOut: "Sign out"                                                                                                  // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Sign in",                                                                                                   // 26
		up: "Join"                                                                                                           // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "or"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Create",                                                                                                    // 33
		signIn: "Sign in",                                                                                                   // 34
		forgot: "Forgot password?",                                                                                          // 35
		createAcc: "Create account"                                                                                          // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Reset password",                                                                                             // 40
		invalidEmail: "Invalid email"                                                                                        // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Cancel"                                                                                                       // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Change password",                                                                                           // 47
		cancel: "Cancel"                                                                                                     // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Sign in with",                                                                                          // 51
		configure: "Configure",                                                                                              // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Sign out"                                                                                                  // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "No login services configured"                                                                      // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Username or Email",                                                                                // 61
		username: "Username",                                                                                                // 62
		email: "Email",                                                                                                      // 63
		password: "Password"                                                                                                 // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Username",                                                                                                // 67
		email: "Email",                                                                                                      // 68
		emailOpt: "Email (optional)",                                                                                        // 69
		password: "Password",                                                                                                // 70
		passwordAgain: "Password (again)"                                                                                    // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Current Password",                                                                                 // 74
		newPassword: "New Password",                                                                                         // 75
		newPasswordAgain: "New Password (again)"                                                                             // 76
	},                                                                                                                    // 77
	infoMessages : {                                                                                                      // 78
		emailSent: "Email sent",                                                                                             // 79
		passwordChanged: "Password changed"                                                                                  // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "User not found",                                                                                      // 83
		invalidEmail: "Invalid email",                                                                                       // 84
		incorrectPassword: "Incorrect password",                                                                             // 85
		usernameTooShort: "Username must be at least 3 characters long",                                                     // 86
		passwordTooShort: "Password must be at least 6 characters long",                                                     // 87
		passwordsDontMatch: "Passwords don't match",                                                                         // 88
		newPasswordSameAsOld: "New and old passwords must be different",                                                     // 89
		signupsForbidden: "Signups forbidden"                                                                                // 90
	}                                                                                                                     // 91
});                                                                                                                    // 92
                                                                                                                       // 93
                                                                                                                       // 94
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/es.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("es", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Restablece tu contraseña",                                                                                   // 3
		newPassword: "Nueva contraseña",                                                                                     // 4
		cancel: "Cancelar",                                                                                                  // 5
		submit: "Guardar"                                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Escribe una contraseña",                                                                                     // 9
		newPassword: "Nueva contraseña",                                                                                     // 10
		cancel: "Cerrar",                                                                                                    // 11
		submit: "Guardar contraseña"                                                                                         // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Correo electrónico verificado",                                                                           // 15
		dismiss: "Cerrar"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Cerrar",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Cambiar contraseña",                                                                                      // 22
		signOut: "Cerrar sesión"                                                                                             // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Iniciar sesión",                                                                                            // 26
		up: "registrarse"                                                                                                    // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "o"                                                                                                              // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crear",                                                                                                     // 33
		signIn: "Iniciar sesión",                                                                                            // 34
		forgot: "¿Ha olvidado su contraseña?",                                                                               // 35
		createAcc: "Registrarse"                                                                                             // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Correo electrónico",                                                                                         // 39
		reset: "Restablecer contraseña",                                                                                     // 40
		invalidEmail: "Correo electrónico inválido"                                                                          // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Cancelar"                                                                                                     // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Cambiar contraseña",                                                                                        // 47
		cancel: "Cancelar"                                                                                                   // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Inicia sesión con",                                                                                     // 51
		configure: "Configurar",                                                                                             // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Cerrar sesión"                                                                                             // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "No hay ningún servicio configurado"                                                                // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Usuario o correo electrónico",                                                                     // 61
		username: "Usuario",                                                                                                 // 62
		email: "Correo electrónico",                                                                                         // 63
		password: "Contraseña"                                                                                               // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Usuario",                                                                                                 // 67
		email: "Correo electrónico",                                                                                         // 68
		emailOpt: "Correo elect. (opcional)",                                                                                // 69
		password: "Contraseña",                                                                                              // 70
		passwordAgain: "Contraseña (otra vez)"                                                                               // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Contraseña Actual",                                                                                // 74
		newPassword: "Nueva Contraseña",                                                                                     // 75
		newPasswordAgain: "Nueva Contraseña (otra vez)"                                                                      // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "Email enviado",                                                                                               // 79
		passwordChanged: "Contraseña modificada"                                                                             // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "El usuario no existe",                                                                                // 83
		invalidEmail: "Correo electrónico inválido",                                                                         // 84
		incorrectPassword: "Contraseña incorrecta",                                                                          // 85
		usernameTooShort: "El nombre de usuario tiene que tener 3 caracteres como mínimo",                                   // 86
		passwordTooShort: "La contraseña tiene que tener 6 caracteres como mínimo",                                          // 87
		passwordsDontMatch: "Las contraseñas no son iguales",                                                                // 88
		newPasswordSameAsOld: "La contraseña nueva y la actual no pueden ser iguales"                                        // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ca.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ca", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Restablir la contrasenya",                                                                                   // 3
		newPassword: "Nova contrasenya",                                                                                     // 4
		cancel: "Cancel·lar",                                                                                                // 5
		submit: "Guardar"                                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Escriu una contrasenya",                                                                                     // 9
		newPassword: "Nova contrasenya",                                                                                     // 10
		cancel: "Tancar",                                                                                                    // 11
		submit: "Guardar contrasenya"                                                                                        // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Adreça electrònica verificada",                                                                           // 15
		dismiss: "Tancar"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Tancar",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Canviar contrasenya",                                                                                     // 22
		signOut: "Tancar sessió"                                                                                             // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Iniciar sessió",                                                                                            // 26
		up: "Registrar-se"                                                                                                   // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "o bé"                                                                                                           // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crear",                                                                                                     // 33
		signIn: "Iniciar sessió",                                                                                            // 34
		forgot: "Ha oblidat la contrasenya?",                                                                                // 35
		createAcc: "Registrar-se"                                                                                            // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Adreça electrònica",                                                                                         // 39
		reset: "Restablir contrasenya",                                                                                      // 40
		invalidEmail: "Adreça invàlida"                                                                                      // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Cancel·lar"                                                                                                   // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Canviar contrasenya",                                                                                       // 47
		cancel: "Cancel·lar"                                                                                                 // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Inicia sessió amb",                                                                                     // 51
		configure: "Configurar"                                                                                              // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Tancar sessió"                                                                                             // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "No hi ha cap servei configurat"                                                                    // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Usuari o correu electrònic",                                                                       // 61
		username: "Usuari",                                                                                                  // 62
		email: "Adreça electrònica",                                                                                         // 63
		password: "Contrasenya"                                                                                              // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Usuari",                                                                                                  // 67
		email: "Adreça electrònica",                                                                                         // 68
		emailOpt: "Adreça elect. (opcional)",                                                                                // 69
		password: "Contrasenya",                                                                                             // 70
		passwordAgain: "Contrasenya (un altre cop)"                                                                          // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Contrasenya Actual",                                                                               // 74
		newPassword: "Nova Contrasenya",                                                                                     // 75
		newPasswordAgain: "Nova Contrasenya (un altre cop)"                                                                  // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "Email enviat",                                                                                                // 79
		passwordChanged: "Contrasenya canviada"                                                                              // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "L'usuari no existeix",                                                                                // 83
		invalidEmail: "Adreça invàlida",                                                                                     // 84
		incorrectPassword: "Contrasenya incorrecta",                                                                         // 85
		usernameTooShort: "El nom d'usuari ha de tenir 3 caracters com a mínim",                                             // 86
		passwordTooShort: "La contrasenya ha de tenir 6 caracters como a mínim",                                             // 87
		passwordsDontMatch: "Les contrasenyes no són iguals",                                                                // 88
		newPasswordSameAsOld: "La contrasenya nova i l'actual no poden ser iguals"                                           // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/fr.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("fr", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Réinitialiser mon mot de passe",                                                                             // 3
		newPassword: "Nouveau mot de passe",                                                                                 // 4
		cancel: "Annuler",                                                                                                   // 5
		submit: "Définir le mot de passe"                                                                                    // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Choisir un mot de passe",                                                                                    // 9
		newPassword: "Nouveau mot de passe",                                                                                 // 10
		cancel: "Fermer",                                                                                                    // 11
		submit: "Définir le mot de passe"                                                                                    // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "L'adresse email a été vérifiée",                                                                          // 15
		dismiss: "Fermer"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Fermer",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Changer le mot de passe",                                                                                 // 22
		signOut: "Déconnexion"                                                                                               // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Connexion",                                                                                                 // 26
		up: "Inscription"                                                                                                    // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ou"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Créer",                                                                                                     // 33
		signIn: "Connexion",                                                                                                 // 34
		forgot: "Mot de passe oublié ?",                                                                                     // 35
		createAcc: "Inscription"                                                                                             // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Réinitialiser le mot de passe",                                                                              // 40
		invalidEmail: "L'adresse email est invalide"                                                                         // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Annuler"                                                                                                      // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Changer le mot de passe",                                                                                   // 47
		cancel: "Annuler"                                                                                                    // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Se connecter avec",                                                                                     // 51
		configure: "Configurer",                                                                                             // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Déconnexion"                                                                                               // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Aucun service d'authentification n'est configuré"                                                  // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Nom d'utilisateur ou email",                                                                       // 61
		username: "Nom d'utilisateur",                                                                                       // 62
		email: "Email",                                                                                                      // 63
		password: "Mot de passe"                                                                                             // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Nom d'utilisateur",                                                                                       // 67
		email: "Email",                                                                                                      // 68
		emailOpt: "Email (optionnel)",                                                                                       // 69
		password: "Mot de passe",                                                                                            // 70
		passwordAgain: "Mot de passe (confirmation)"                                                                         // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Mot de passe actuel",                                                                              // 74
		newPassword: "Nouveau mot de passe",                                                                                 // 75
		newPasswordAgain: "Nouveau mot de passe (confirmation)"                                                              // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "Email envoyé",                                                                                                // 79
		passwordChanged: "Mot de passe modifié"                                                                              // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "Utilisateur non trouvé",                                                                              // 83
		invalidEmail: "L'adresse email est invalide",                                                                        // 84
		incorrectPassword: "Mot de passe incorrect",                                                                         // 85
		usernameTooShort: "Le nom d'utilisateur doit comporter au moins 3 caractères",                                       // 86
		passwordTooShort: "Le mot de passe doit comporter au moins 6 caractères",                                            // 87
		passwordsDontMatch: "Les mots de passe ne sont pas identiques",                                                      // 88
		newPasswordSameAsOld: "Le nouveau et le vieux mot de passe doivent être différent"                                   // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/de.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("de", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Passwort zurücksetzen",                                                                                      // 3
		newPassword: "Neues Passwort",                                                                                       // 4
		cancel: "Abbrechen",                                                                                                 // 5
		submit: "Passwort ändern"                                                                                            // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Passwort wählen",                                                                                            // 9
		newPassword: "Neues Passwort",                                                                                       // 10
		cancel: "Schließen",                                                                                                 // 11
		submit: "Passwort ändern"                                                                                            // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email Adresse verifiziert",                                                                               // 15
		dismiss: "Schließen"                                                                                                 // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Schließen"                                                                                                 // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Passwort ändern",                                                                                         // 22
		signOut: "Abmelden"                                                                                                  // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Anmelden",                                                                                                  // 26
		up: "Registrieren"                                                                                                   // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "oder"                                                                                                           // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Erstellen",                                                                                                 // 33
		signIn: "Anmelden",                                                                                                  // 34
		forgot: "Passwort vergessen?",                                                                                       // 35
		createAcc: "Account erstellen"                                                                                       // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Passwort zurücksetzen",                                                                                      // 40
		invalidEmail: "Ungültige Email Adresse"                                                                              // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Abbrechen"                                                                                                    // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Passwort ändern",                                                                                           // 47
		cancel: "Abbrechen"                                                                                                  // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Anmelden mit",                                                                                          // 51
		configure: "Konfigurieren",                                                                                          // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Abmelden"                                                                                                  // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Keine Anmelde Services konfiguriert"                                                               // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Benutzername oder Email",                                                                          // 61
		username: "Benutzername",                                                                                            // 62
		email: "Email",                                                                                                      // 63
		password: "Passwort"                                                                                                 // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Benutzername",                                                                                            // 67
		email: "Email",                                                                                                      // 68
		emailOpt: "Email (freiwillig)",                                                                                      // 69
		password: "Passwort",                                                                                                // 70
		passwordAgain: "Passwort (wiederholen)"                                                                              // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Aktuelles Passwort",                                                                               // 74
		newPassword: "Neues Passwort",                                                                                       // 75
		newPasswordAgain: "Neues Passwort (wiederholen)"                                                                     // 76
	},                                                                                                                    // 77
	infoMessages : {                                                                                                      // 78
		sent: "Email gesendet",                                                                                              // 79
		passwordChanged: "Passwort geändert"                                                                                 // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "Benutzer nicht gefunden",                                                                             // 83
		invalidEmail: "Ungültige Email Adresse",                                                                             // 84
		incorrectPassword: "Falsches Passwort",                                                                              // 85
		usernameTooShort: "Der Benutzername muss mindestens 3 Buchstaben lang sein",                                         // 86
		passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein",                                                    // 87
		passwordsDontMatch: "Die Passwörter stimmen nicht überein",                                                          // 88
		newPasswordSameAsOld: "Neue und aktuelle Passwörter müssen unterschiedlich sein"                                     // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/it.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("it", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Reimposta la password",                                                                                      // 3
		newPassword: "Nuova password",                                                                                       // 4
		cancel: "Annulla",                                                                                                   // 5
		submit: "Imposta password"                                                                                           // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Scegli una password",                                                                                        // 9
		newPassword: "Nuova password",                                                                                       // 10
		cancel: "Chiudi",                                                                                                    // 11
		submit: "Imposta password"                                                                                           // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Indirizzo email verificato",                                                                              // 15
		dismiss: "Chiudi"                                                                                                    // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Chiudi",                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Cambia password",                                                                                         // 22
		signOut: "Esci"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Accedi",                                                                                                    // 26
		up: "Registrati"                                                                                                     // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "oppure"                                                                                                         // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Crea",                                                                                                      // 33
		signIn: "Accedi",                                                                                                    // 34
		forgot: "Password dimenticata?",                                                                                     // 35
		createAcc: "Crea un account"                                                                                         // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Reimposta la password",                                                                                      // 40
		invalidEmail: "Email non valida"                                                                                     // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Cancella"                                                                                                     // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Cambia password",                                                                                           // 47
		cancel: "Annulla"                                                                                                    // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Accedi con",                                                                                            // 51
		configure: "Configura",                                                                                              // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Esci"                                                                                                      // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Nessun servizio di accesso configurato"                                                            // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Username o Email",                                                                                 // 61
		username: "Username",                                                                                                // 62
		email: "Email",                                                                                                      // 63
		password: "Password"                                                                                                 // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Username",                                                                                                // 67
		email: "Email",                                                                                                      // 68
		emailOpt: "Email (opzionale)",                                                                                       // 69
		password: "Password",                                                                                                // 70
		passwordAgain: "Password (di nuovo)"                                                                                 // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Password corrente",                                                                                // 74
		newPassword: "Nuova password",                                                                                       // 75
		newPasswordAgain: "Nuova password (di nuovo)"                                                                        // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "Email inviata",                                                                                               // 79
		passwordChanged: "Password changed"                                                                                  // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "User not found",                                                                                      // 83
		invalidEmail: "Email non valida",                                                                                    // 84
		incorrectPassword: "Incorrect password",                                                                             // 85
		usernameTooShort: "La Username deve essere almeno di 3 caratteri",                                                   // 86
		passwordTooShort: "La Password deve essere almeno di 6 caratteri",                                                   // 87
		passwordsDontMatch: "Le password non corrispondono",                                                                 // 88
		newPasswordSameAsOld: "New and old passwords must be different"                                                      // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/pt-PT.i18n.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ptPT = {                                                                                                               // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Esqueci-me da palavra-passe",                                                                                // 3
		newPassword: "Nova palavra-passe",                                                                                   // 4
		cancel: "Cancelar",                                                                                                  // 5
		submit: "Alterar palavra-passe"                                                                                      // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Introduza a nova palavra-passe",                                                                             // 9
		newPassword: "Nova palavra-passe",                                                                                   // 10
		cancel: "Fechar",                                                                                                    // 11
		submit: "Alterar palavra-passe"                                                                                      // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "E-mail verificado!",                                                                                      // 15
		dismiss: "Ignorar"                                                                                                   // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Ignorar"                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Mudar palavra-passe",                                                                                     // 22
		signOut: "Sair"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Entrar",                                                                                                    // 26
		up: "Registar"                                                                                                       // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ou"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Criar",                                                                                                     // 33
		signIn: "Entrar",                                                                                                    // 34
		forgot: "Esqueci-me da palavra-passe",                                                                               // 35
		createAcc: "Registar"                                                                                                // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "E-mail",                                                                                                     // 39
		reset: "Alterar palavra-passe",                                                                                      // 40
		sent: "E-mail enviado",                                                                                              // 41
		invalidEmail: "E-mail inválido"                                                                                      // 42
	},                                                                                                                    // 43
	loginButtonsBackToLoginLink: {                                                                                        // 44
		back: "Cancelar"                                                                                                     // 45
	},                                                                                                                    // 46
	loginButtonsChangePassword: {                                                                                         // 47
		submit: "Mudar palavra-passe",                                                                                       // 48
		cancel: "Cancelar"                                                                                                   // 49
	},                                                                                                                    // 50
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 51
		signInWith: "Entrar com",                                                                                            // 52
		configure: "Configurar"                                                                                              // 53
	},                                                                                                                    // 54
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 55
		signOut: "Sair"                                                                                                      // 56
	},                                                                                                                    // 57
	loginButtonsLoggedOut: {                                                                                              // 58
		noLoginServices: "Nenhum servico de login configurado"                                                               // 59
	},                                                                                                                    // 60
	loginFields: {                                                                                                        // 61
		usernameOrEmail: "Utilizador ou E-mail",                                                                             // 62
		username: "Utilizador",                                                                                              // 63
		email: "E-mail",                                                                                                     // 64
		password: "Palavra-passe"                                                                                            // 65
	},                                                                                                                    // 66
	signupFields: {                                                                                                       // 67
		username: "Utilizador",                                                                                              // 68
		email: "E-mail",                                                                                                     // 69
		emailOpt: "E-mail (opcional)",                                                                                       // 70
		password: "Palavra-passe",                                                                                           // 71
		passwordAgain: "Palavra-passe (confirmacão)"                                                                         // 72
	},                                                                                                                    // 73
	changePasswordFields: {                                                                                               // 74
		currentPassword: "Palavra-passe atual",                                                                              // 75
		newPassword: "Nova palavra-passe",                                                                                   // 76
		newPasswordAgain: "Nova palavra-passe (confirmacao)"                                                                 // 77
	},                                                                                                                    // 78
	infoMessages: {                                                                                                       // 79
		sent: "E-mail enviado",                                                                                              // 80
		passwordChanged: "Palavra-passe alterada"                                                                            // 81
	},                                                                                                                    // 82
	errorMessages: {                                                                                                      // 83
		usernameTooShort: "Utilizador precisa de ter mais de 3 caracteres",                                                  // 84
		invalidEmail: "E-mail inválido",                                                                                     // 85
		passwordTooShort: "Palavra-passe precisa ter mais de 6 caracteres",                                                  // 86
		passwordsDontMatch: "As Palavras-passe estão diferentes",                                                            // 87
		userNotFound: "Utilizador não encontrado",                                                                           // 88
		incorrectPassword: "Palavra-passe incorreta",                                                                        // 89
		newPasswordSameAsOld: "A nova palavra-passe tem de ser diferente da antiga"                                          // 90
	}                                                                                                                     // 91
};                                                                                                                     // 92
                                                                                                                       // 93
                                                                                                                       // 94
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/pt-BR.i18n.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ptBR = {                                                                                                               // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Esqueceu sua senha?",                                                                                        // 3
		newPassword: "Nova senha",                                                                                           // 4
		cancel: "Cancelar",                                                                                                  // 5
		submit: "Alterar senha"                                                                                              // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Digite a nova senha",                                                                                        // 9
		newPassword: "Nova senha",                                                                                           // 10
		cancel: "Fechar",                                                                                                    // 11
		submit: "Alterar senha"                                                                                              // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "E-mail verificado!",                                                                                      // 15
		dismiss: "Ignorar"                                                                                                   // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Ignorar"                                                                                                   // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Mudar senha",                                                                                             // 22
		signOut: "Sair"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Entrar",                                                                                                    // 26
		up: "Cadastrar"                                                                                                      // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ou"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Criar",                                                                                                     // 33
		signIn: "Login",                                                                                                     // 34
		forgot: "Esqueceu sua senha?",                                                                                       // 35
		createAcc: "Cadastrar"                                                                                               // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "E-mail",                                                                                                     // 39
		reset: "Alterar senha",                                                                                              // 40
		invalidEmail: "E-mail inválido"                                                                                      // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Cancelar"                                                                                                     // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Mudar senha",                                                                                               // 47
		cancel: "Cancelar"                                                                                                   // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Logar com",                                                                                             // 51
		configure: "Configurar",                                                                                             // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Sair"                                                                                                      // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Nenhum servico de login configurado"                                                               // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Usuário ou E-mail",                                                                                // 61
		username: "Usuário",                                                                                                 // 62
		email: "E-mail",                                                                                                     // 63
		password: "Senha"                                                                                                    // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Usuário",                                                                                                 // 67
		email: "E-mail",                                                                                                     // 68
		emailOpt: "E-mail (opcional)",                                                                                       // 69
		password: "Senha",                                                                                                   // 70
		passwordAgain: "Senha (confirmacão)"                                                                                 // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Senha atual",                                                                                      // 74
		newPassword: "Nova Senha",                                                                                           // 75
		newPasswordAgain: "Nova Senha (confirmacao)"                                                                         // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "E-mail enviado",                                                                                              // 79
		passwordChanged: "Senha alterada"                                                                                    // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "Usuário não encontrado",                                                                              // 83
		invalidEmail: "E-mail inválido",                                                                                     // 84
		incorrectPassword: "Senha incorreta",                                                                                // 85
		usernameTooShort: "Usuário precisa ter mais de 3 caracteres",                                                        // 86
		passwordTooShort: "Senha precisa ter mais de 6 caracteres",                                                          // 87
		passwordsDontMatch: "Senhas estão diferentes",                                                                       // 88
		newPasswordSameAsOld: "A nova senha tem de ser diferente da antiga"                                                  // 89
	}                                                                                                                     // 90
};                                                                                                                     // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/pt.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map('pt', ptPT);                                                                                                  // 1
i18n.map('pt-PT', ptPT);                                                                                               // 2
i18n.map('pt-BR', ptBR);                                                                                               // 3
                                                                                                                       // 4
                                                                                                                       // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ru.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ru", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Сбросить пароль",                                                                                            // 3
		newPassword: "Новый пароль",                                                                                         // 4
		cancel: "Отмена",                                                                                                    // 5
		submit: "Сохранить пароль"                                                                                           // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Выбрать пароль",                                                                                             // 9
		newPassword: "Новый пароль",                                                                                         // 10
		cancel: "Отмена",                                                                                                    // 11
		submit: "Сохранить пароль"                                                                                           // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Email подтвержден",                                                                                       // 15
	    dismiss: "Закрыть"                                                                                                // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
	    dismiss: "Закрыть"                                                                                                // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Изменить пароль",                                                                                         // 22
		signOut: "Выйти"                                                                                                     // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Войти",                                                                                                     // 26
		up: "Зарегистрироваться"                                                                                             // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "или"                                                                                                            // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Создать",                                                                                                   // 33
		signIn: "Войти",                                                                                                     // 34
		forgot: "Забыли пароль?",                                                                                            // 35
		createAcc: "Создать аккаунт"                                                                                         // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Email",                                                                                                      // 39
		reset: "Сбросить пароль",                                                                                            // 40
		invalidEmail: "Некорректный email"                                                                                   // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Отмена"                                                                                                       // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Изменить пароль",                                                                                           // 47
		cancel: "Отмена"                                                                                                     // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Войти через",                                                                                           // 51
		configure: "Настроить вход через",                                                                                   // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Выйти"                                                                                                     // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Сервис для входа не настроен"                                                                      // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Имя пользователя или email",                                                                       // 61
		username: "Имя пользователя",                                                                                        // 62
		email: "Email",                                                                                                      // 63
		password: "Пароль"                                                                                                   // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Имя пользователя",                                                                                        // 67
		email: "Email",                                                                                                      // 68
		emailOpt: "Email (необязательный)",                                                                                  // 69
		password: "Пароль",                                                                                                  // 70
		passwordAgain: "Пароль (еще раз)"                                                                                    // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Текущий пароль",                                                                                   // 74
		newPassword: "Новый пароль",                                                                                         // 75
		newPasswordAgain: "Новый пароль (еще раз)"                                                                           // 76
	},                                                                                                                    // 77
	infoMessages : {                                                                                                      // 78
		sent: "Вам отправлено письмо",                                                                                       // 79
		passwordChanged: "Пароль изменён"                                                                                    // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "Пользователь не найден",                                                                              // 83
		invalidEmail: "Некорректный email",                                                                                  // 84
		incorrectPassword: "Неправильный пароль",                                                                            // 85
		usernameTooShort: "Имя пользователя должно быть длиной не менее 3-х символов",                                       // 86
		passwordTooShort: "Пароль должен быть длиной не менее 6-ти символов",                                                // 87
		passwordsDontMatch: "Пароли не совпадают",                                                                           // 88
		newPasswordSameAsOld: "Новый и старый пароли должны быть разными"                                                    // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/el.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("el", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "Ακύρωση κωδικού",                                                                                            // 3
		newPassword: "Νέος κωδικός",                                                                                         // 4
		cancel: "Ακύρωση",                                                                                                   // 5
		submit: "Ορισμός κωδικού"                                                                                            // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "Επιλέξτε κωδικό",                                                                                            // 9
		newPassword: "Νέος κωδικός",                                                                                         // 10
		cancel: "Ακύρωση",                                                                                                   // 11
		submit: "Ορισμός κωδικού"                                                                                            // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "Ο λογαριασμός ηλεκτρονικού ταχυδρομείου έχει επιβεβαιωθεί",                                               // 15
		dismiss: "Κλείσιμο"                                                                                                  // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "Κλείσιμο",                                                                                                 // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "Αλλαγή κωδικού",                                                                                          // 22
		signOut: "Αποσύνδεση"                                                                                                // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "Είσοδος",                                                                                                   // 26
		up: "Εγγραφή"                                                                                                        // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "ή"                                                                                                              // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "Δημιουργία",                                                                                                // 33
		signIn: "Είσοδος",                                                                                                   // 34
		forgot: "Ξεχάσατε τον κωδικό σας;",                                                                                  // 35
		createAcc: "Δημιουργία λογαριασμού"                                                                                  // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 39
		reset: "Ακύρωση κωδικού",                                                                                            // 40
		invalidEmail: "Μη έγκυρος λογαριασμός ηλεκτρονικού ταχυδρομείου (email)"                                             // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "Επιστροφή"                                                                                                    // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "Αλλαγή κωδικού",                                                                                            // 47
		cancel: "Ακύρωση"                                                                                                    // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "Είσοδος με",                                                                                            // 51
		configure: "Διαμόρφωση",                                                                                             // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "Αποσύνδεση"                                                                                                // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "Δεν έχουν διαμορφωθεί υπηρεσίες εισόδου"                                                           // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "Όνομα χρήστη ή Λογαριασμός Ηλεκτρονικού Ταχυδρομείου",                                             // 61
		username: "Όνομα χρήστη",                                                                                            // 62
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 63
		password: "Κωδικός"                                                                                                  // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "Όνομα χρήστη",                                                                                            // 67
		email: "Ηλεκτρονικό ταχυδρομείο (email)",                                                                            // 68
		emailOpt: "Ηλεκτρονικό ταχυδρομείο (προαιρετικό)",                                                                   // 69
		password: "Κωδικός",                                                                                                 // 70
		passwordAgain: "Κωδικός (ξανά)"                                                                                      // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "Ισχύων Κωδικός",                                                                                   // 74
		newPassword: "Νέος Κωδικός",                                                                                         // 75
		newPasswordAgain: "Νέος Κωδικός (ξανά)"                                                                              // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		emailSent: "Το email έχει αποσταλεί",                                                                                // 79
		passwordChanged: "Password changed"                                                                                  // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "User not found",                                                                                      // 83
		invalidEmail: "Μη έγκυρος λογαριασμός ηλεκτρονικού ταχυδρομείου (email)",                                            // 84
		incorrectPassword: "Incorrect password",                                                                             // 85
		usernameTooShort: "Το όνομα χρήστη πρέπει να είναι τουλάχιστον 3 χαρακτήρες",                                        // 86
		passwordTooShort: "Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες",                                              // 87
		passwordsDontMatch: "Οι κωδικοί δεν ταιριάζουν",                                                                     // 88
		newPasswordSameAsOld: "New and old passwords must be different"                                                      // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ko.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ko", {                                                                                                       // 1
	resetPasswordDialog: {                                                                                                // 2
		title: "비밀번호 초기화하기",                                                                                                 // 3
		newPassword: "새로운 비밀번호",                                                                                             // 4
		cancel: "취소",                                                                                                        // 5
		submit: "변경"                                                                                                         // 6
	},                                                                                                                    // 7
	enrollAccountDialog: {                                                                                                // 8
		title: "비밀번호를 입력해주세요",                                                                                               // 9
		newPassword: "새로운 비밀번호",                                                                                             // 10
		cancel: "닫기",                                                                                                        // 11
		submit: "변경"                                                                                                         // 12
	},                                                                                                                    // 13
	justVerifiedEmailDialog: {                                                                                            // 14
		verified: "이메일 주소가 인증되었습니다",                                                                                         // 15
		dismiss: "취소"                                                                                                        // 16
	},                                                                                                                    // 17
	loginButtonsMessagesDialog: {                                                                                         // 18
		dismiss: "취소",                                                                                                       // 19
	},                                                                                                                    // 20
	loginButtonsLoggedInDropdownActions: {                                                                                // 21
		password: "비밀번호 변경하기",                                                                                               // 22
		signOut: "로그아웃"                                                                                                      // 23
	},                                                                                                                    // 24
	loginButtonsLoggedOutDropdown: {                                                                                      // 25
		signIn: "로그인",                                                                                                       // 26
		up: "계정 만들기"                                                                                                         // 27
	},                                                                                                                    // 28
	loginButtonsLoggedOutPasswordServiceSeparator: {                                                                      // 29
		or: "또는"                                                                                                             // 30
	},                                                                                                                    // 31
	loginButtonsLoggedOutPasswordService: {                                                                               // 32
		create: "만들기",                                                                                                       // 33
		signIn: "로그인",                                                                                                       // 34
		forgot: "비밀번호를 잊어버리셨나요?",                                                                                            // 35
		createAcc: "계정 만들기"                                                                                                  // 36
	},                                                                                                                    // 37
	forgotPasswordForm: {                                                                                                 // 38
		email: "이메일 주소",                                                                                                     // 39
		reset: "비밀번호 초기화하기",                                                                                                 // 40
		invalidEmail: "올바르지 않은 이메일 주소입니다"                                                                                    // 41
	},                                                                                                                    // 42
	loginButtonsBackToLoginLink: {                                                                                        // 43
		back: "취소"                                                                                                           // 44
	},                                                                                                                    // 45
	loginButtonsChangePassword: {                                                                                         // 46
		submit: "비밀번호 변경하기",                                                                                                 // 47
		cancel: "취소"                                                                                                         // 48
	},                                                                                                                    // 49
	loginButtonsLoggedOutSingleLoginButton: {                                                                             // 50
		signInWith: "다음으로 로그인하기:",                                                                                           // 51
		configure: "설정",                                                                                                     // 52
	},                                                                                                                    // 53
	loginButtonsLoggedInSingleLogoutButton: {                                                                             // 54
		signOut: "로그아웃"                                                                                                      // 55
	},                                                                                                                    // 56
	loginButtonsLoggedOut: {                                                                                              // 57
		noLoginServices: "사용 가능한 로그인 서비스가 없습니다"                                                                              // 58
	},                                                                                                                    // 59
	loginFields: {                                                                                                        // 60
		usernameOrEmail: "사용자이름 또는 이메일 주소",                                                                                  // 61
		username: "사용자이름",                                                                                                   // 62
		email: "이메일 주소",                                                                                                     // 63
		password: "비밀번호"                                                                                                     // 64
	},                                                                                                                    // 65
	signupFields: {                                                                                                       // 66
		username: "사용자이름",                                                                                                   // 67
		email: "이메일 주소",                                                                                                     // 68
		emailOpt: "이메일 주소 (선택)",                                                                                             // 69
		password: "비밀번호",                                                                                                    // 70
		passwordAgain: "비밀번호 (확인)"                                                                                           // 71
	},                                                                                                                    // 72
	changePasswordFields: {                                                                                               // 73
		currentPassword: "현재 비밀번호",                                                                                          // 74
		newPassword: "새로운 비밀번호",                                                                                             // 75
		newPasswordAgain: "새로운 비밀번호 (확인)"                                                                                    // 76
	},                                                                                                                    // 77
	infoMessages: {                                                                                                       // 78
		sent: "이메일이 보내졌습니다",                                                                                                 // 79
		passwordChanged: "Password changed"                                                                                  // 80
	},                                                                                                                    // 81
	errorMessages: {                                                                                                      // 82
		userNotFound: "User not found",                                                                                      // 83
		invalidEmail: "잘못된 이메일 주소",                                                                                          // 84
		incorrectPassword: "Incorrect password",                                                                             // 85
		usernameTooShort: "사용자이름은 최소 3글자 이상이어야 합니다",                                                                         // 86
		passwordTooShort: "비밀번호는 최소 6글자 이상이어야 합니다",                                                                          // 87
		passwordsDontMatch: "비밀번호가 맞지 않습니다",                                                                                 // 88
		newPasswordSameAsOld: "New and old passwords must be different"                                                      // 89
	}                                                                                                                     // 90
});                                                                                                                    // 91
                                                                                                                       // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n/ar.i18n.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.map("ar", {                                                                                                       // 1
  resetPasswordDialog: {                                                                                               // 2
    title: "استرجع كلمة المرور",                                                                                       // 3
    newPassword: "كلمة المرور الجديدة",                                                                                // 4
    cancel: "إلغ",                                                                                                     // 5
    submit: "تم"                                                                                                       // 6
  },                                                                                                                   // 7
  enrollAccountDialog: {                                                                                               // 8
    title: "اختر كلمة سر",                                                                                             // 9
    newPassword: "كلمة السر",                                                                                          // 10
    cancel: "أغلق",                                                                                                    // 11
    submit: "تم"                                                                                                       // 12
  },                                                                                                                   // 13
  justVerifiedEmailDialog: {                                                                                           // 14
    verified: "تم تأكيد البريد",                                                                                       // 15
    dismiss:  "حسنًا"                                                                                                  // 16
  },                                                                                                                   // 17
  loginButtonsMessagesDialog: {                                                                                        // 18
    dismiss: "حسنًا"                                                                                                   // 19
  },                                                                                                                   // 20
  loginButtonsLoggedInDropdownActions: {                                                                               // 21
    password: "غير كلمة السر",                                                                                         // 22
    signOut: "تسجيل الخروج"                                                                                            // 23
  },                                                                                                                   // 24
  loginButtonsLoggedOutDropdown: {                                                                                     // 25
    signIn: "دخول",                                                                                                    // 26
    up: "إنشاء حساب"                                                                                                   // 27
  },                                                                                                                   // 28
  loginButtonsLoggedOutPasswordServiceSeparator: {                                                                     // 29
    or: "أو"                                                                                                           // 30
  },                                                                                                                   // 31
  loginButtonsLoggedOutPasswordService: {                                                                              // 32
    create: "أنشئ",                                                                                                    // 33
    signIn: "دخول",                                                                                                    // 34
    forgot: "نسيت كلمة السر؟",                                                                                         // 35
    createAcc: "أنشئ حسابا"                                                                                            // 36
  },                                                                                                                   // 37
  forgotPasswordForm: {                                                                                                // 38
    email: "البريد",                                                                                                   // 39
    reset: "إعادة تعين كلمة السر",                                                                                     // 40
    invalidEmail: "البريد خاطئ"                                                                                        // 41
  },                                                                                                                   // 42
  loginButtonsBackToLoginLink: {                                                                                       // 43
    back: "إلغ"                                                                                                        // 44
  },                                                                                                                   // 45
  loginButtonsChangePassword: {                                                                                        // 46
    submit: "غير كلمة السر",                                                                                           // 47
    cancel: "إلغ"                                                                                                      // 48
  },                                                                                                                   // 49
  loginButtonsLoggedOutSingleLoginButton: {                                                                            // 50
    signInWith: "سجل الدخول عبر",                                                                                      // 51
    configure: "تعيين"                                                                                                 // 52
  },                                                                                                                   // 53
  loginButtonsLoggedInSingleLogoutButton: {                                                                            // 54
    signOut: "اخرج"                                                                                                    // 55
  },                                                                                                                   // 56
  loginButtonsLoggedOut: {                                                                                             // 57
    noLoginServices: "لا يوجد خدمة دخول مفعله"                                                                         // 58
  },                                                                                                                   // 59
  loginFields: {                                                                                                       // 60
    usernameOrEmail: "اسم المستخدم او عنوان البريد",                                                                   // 61
    username: "اسم المستخدم",                                                                                          // 62
    email: "البريد",                                                                                                   // 63
    password: "كلمة السر"                                                                                              // 64
  },                                                                                                                   // 65
  signupFields: {                                                                                                      // 66
    username: "اسم المستخدم",                                                                                          // 67
    email: "البريد",                                                                                                   // 68
    emailOpt: "-اختياري- البريد",                                                                                      // 69
    password: "كلمة السر",                                                                                             // 70
    passwordAgain: "أعد كتابة كلمة السر"                                                                               // 71
  },                                                                                                                   // 72
  changePasswordFields: {                                                                                              // 73
    currentPassword: "كلمة السر الحالية",                                                                              // 74
    newPassword: "كلمة السر الجديدة",                                                                                  // 75
    newPasswordAgain: "أعد كتابة كلمة السر الجديدة"                                                                    // 76
  },                                                                                                                   // 77
  infoMessages : {                                                                                                     // 78
    emailSent: "تم الارسال",                                                                                           // 79
    passwordChanged: "تمت إعادة تعيين كلمة السر"                                                                       // 80
  },                                                                                                                   // 81
  errorMessages: {                                                                                                     // 82
    userNotFound: "المستخدم غير موجود",                                                                                // 83
    invalidEmail: "بريد خاطئ",                                                                                         // 84
    incorrectPassword: "كلمة السر خطأ",                                                                                // 85
    usernameTooShort: "اسم المستخدم لابد ان يكون علي الاقل ٣ حروف",                                                    // 86
    passwordTooShort: "كلمة السر لابد ان تكون علي الاقل ٦ احرف",                                                       // 87
    passwordsDontMatch: "كلمة السر غير متطابقة",                                                                       // 88
    newPasswordSameAsOld: "لابد من اختيار كلمة سر مختلفة عن السابقة",                                                  // 89
    signupsForbidden: "التسجيل مغلق"                                                                                   // 90
  }                                                                                                                    // 91
});                                                                                                                    // 92
                                                                                                                       // 93
                                                                                                                       // 94
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/i18n.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
i18n.setDefaultLanguage('en')                                                                                          // 1
                                                                                                                       // 2
accountsUIBootstrap3 = {                                                                                               // 3
	setLanguage: function (lang) {                                                                                        // 4
		return i18n.setLanguage(lang)                                                                                        // 5
	},                                                                                                                    // 6
	getLanguage: function () {                                                                                            // 7
		return i18n.getLanguage()                                                                                            // 8
	},                                                                                                                    // 9
	map: function (lang, obj) {                                                                                           // 10
		return i18n.map(lang, obj)                                                                                           // 11
	}                                                                                                                     // 12
}                                                                                                                      // 13
                                                                                                                       // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtons");                                                                                 // 2
Template["_loginButtons"] = new Template("Template._loginButtons", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", Blaze.Unless(function() {                                                                         // 8
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 9
    }, function() {                                                                                                    // 10
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n		" ];                     // 11
    }), "\n	" ];                                                                                                       // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n	" ];                        // 14
  });                                                                                                                  // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
Template.__checkName("_loginButtonsLoggedIn");                                                                         // 18
Template["_loginButtonsLoggedIn"] = new Template("Template._loginButtonsLoggedIn", (function() {                       // 19
  var view = this;                                                                                                     // 20
  return Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown"));                                      // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
Template.__checkName("_loginButtonsLoggedOut");                                                                        // 24
Template["_loginButtonsLoggedOut"] = new Template("Template._loginButtonsLoggedOut", (function() {                     // 25
  var view = this;                                                                                                     // 26
  return Blaze.If(function() {                                                                                         // 27
    return Spacebars.call(view.lookup("services"));                                                                    // 28
  }, function() {                                                                                                      // 29
    return [ " \n		", Blaze.If(function() {                                                                            // 30
      return Spacebars.call(view.lookup("configurationLoaded"));                                                       // 31
    }, function() {                                                                                                    // 32
      return [ "\n			", Blaze.If(function() {                                                                          // 33
        return Spacebars.call(view.lookup("dropdown"));                                                                // 34
      }, function() {                                                                                                  // 35
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n			" ];       // 36
      }, function() {                                                                                                  // 37
        return [ "\n				", Spacebars.With(function() {                                                                 // 38
          return Spacebars.call(view.lookup("singleService"));                                                         // 39
        }, function() {                                                                                                // 40
          return [ " \n					", Blaze.Unless(function() {                                                               // 41
            return Spacebars.call(view.lookup("logginIn"));                                                            // 42
          }, function() {                                                                                              // 43
            return [ "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n					" ];
          }), "\n				" ];                                                                                              // 45
        }), "\n			" ];                                                                                                 // 46
      }), "\n		" ];                                                                                                    // 47
    }), "\n	" ];                                                                                                       // 48
  }, function() {                                                                                                      // 49
    return [ "\n		", HTML.DIV({                                                                                        // 50
      "class": "no-services"                                                                                           // 51
    }, Blaze.View(function() {                                                                                         // 52
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOut.noLoginServices");                         // 53
    })), "\n	" ];                                                                                                      // 54
  });                                                                                                                  // 55
}));                                                                                                                   // 56
                                                                                                                       // 57
Template.__checkName("_loginButtonsMessages");                                                                         // 58
Template["_loginButtonsMessages"] = new Template("Template._loginButtonsMessages", (function() {                       // 59
  var view = this;                                                                                                     // 60
  return [ Blaze.If(function() {                                                                                       // 61
    return Spacebars.call(view.lookup("errorMessage"));                                                                // 62
  }, function() {                                                                                                      // 63
    return [ "\n		", HTML.DIV({                                                                                        // 64
      "class": "alert alert-danger"                                                                                    // 65
    }, Blaze.View(function() {                                                                                         // 66
      return Spacebars.mustache(view.lookup("errorMessage"));                                                          // 67
    })), "\n	" ];                                                                                                      // 68
  }), "\n	", Blaze.If(function() {                                                                                     // 69
    return Spacebars.call(view.lookup("infoMessage"));                                                                 // 70
  }, function() {                                                                                                      // 71
    return [ "\n		", HTML.DIV({                                                                                        // 72
      "class": "alert alert-success no-margin"                                                                         // 73
    }, Blaze.View(function() {                                                                                         // 74
      return Spacebars.mustache(view.lookup("infoMessage"));                                                           // 75
    })), "\n	" ];                                                                                                      // 76
  }) ];                                                                                                                // 77
}));                                                                                                                   // 78
                                                                                                                       // 79
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_single.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedOutSingleLoginButton");                                                       // 2
Template["_loginButtonsLoggedOutSingleLoginButton"] = new Template("Template._loginButtonsLoggedOutSingleLoginButton", (function() {
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "navbar-form"                                                                                             // 6
  }, "\n		", Blaze.If(function() {                                                                                     // 7
    return Spacebars.call(view.lookup("configured"));                                                                  // 8
  }, function() {                                                                                                      // 9
    return [ "\n			", HTML.BUTTON({                                                                                    // 10
      "class": function() {                                                                                            // 11
        return [ "login-button btn btn-block btn-", Spacebars.mustache(view.lookup("capitalizedName")) ];              // 12
      }                                                                                                                // 13
    }, Blaze.View(function() {                                                                                         // 14
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutSingleLoginButton.signInWith");             // 15
    }), " ", Blaze.View(function() {                                                                                   // 16
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 17
    })), "\n		" ];                                                                                                     // 18
  }, function() {                                                                                                      // 19
    return [ "\n			", HTML.BUTTON({                                                                                    // 20
      "class": "login-button btn btn-block configure-button btn-danger"                                                // 21
    }, Blaze.View(function() {                                                                                         // 22
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutSingleLoginButton.configure");              // 23
    }), " ", Blaze.View(function() {                                                                                   // 24
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 25
    })), "\n		" ];                                                                                                     // 26
  }), "\n	");                                                                                                          // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_dropdown.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedInDropdown");                                                                 // 2
Template["_loginButtonsLoggedInDropdown"] = new Template("Template._loginButtonsLoggedInDropdown", (function() {       // 3
  var view = this;                                                                                                     // 4
  return HTML.LI({                                                                                                     // 5
    id: "login-dropdown-list",                                                                                         // 6
    "class": "dropdown"                                                                                                // 7
  }, "\n		", HTML.A({                                                                                                  // 8
    "class": "dropdown-toggle"                                                                                         // 9
  }, "\n			", Blaze.View(function() {                                                                                  // 10
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 11
  }), "\n			", Spacebars.With(function() {                                                                             // 12
    return Spacebars.call(view.lookup("user_profile_picture"));                                                        // 13
  }, function() {                                                                                                      // 14
    return [ "\n				", HTML.IMG({                                                                                      // 15
      src: function() {                                                                                                // 16
        return Spacebars.mustache(view.lookup("."));                                                                   // 17
      },                                                                                                               // 18
      width: "30px",                                                                                                   // 19
      "class": "img-circular",                                                                                         // 20
      alt: "#"                                                                                                         // 21
    }), "\n			" ];                                                                                                     // 22
  }), "\n			", HTML.Raw('<b class="caret"></b>'), "\n		"), "\n		", HTML.DIV({                                          // 23
    "class": "dropdown-menu"                                                                                           // 24
  }, "\n			", Blaze.If(function() {                                                                                    // 25
    return Spacebars.call(view.lookup("inMessageOnlyFlow"));                                                           // 26
  }, function() {                                                                                                      // 27
    return [ "\n				", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			" ];                     // 28
  }, function() {                                                                                                      // 29
    return [ "\n				", Blaze.If(function() {                                                                           // 30
      return Spacebars.call(view.lookup("inChangePasswordFlow"));                                                      // 31
    }, function() {                                                                                                    // 32
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n				" ];           // 33
    }, function() {                                                                                                    // 34
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n				" ];  // 35
    }), "\n			" ];                                                                                                     // 36
  }), "\n		"), "\n	");                                                                                                 // 37
}));                                                                                                                   // 38
                                                                                                                       // 39
Template.__checkName("_loginButtonsLoggedInDropdownActions");                                                          // 40
Template["_loginButtonsLoggedInDropdownActions"] = new Template("Template._loginButtonsLoggedInDropdownActions", (function() {
  var view = this;                                                                                                     // 42
  return [ Blaze.If(function() {                                                                                       // 43
    return Spacebars.call(view.lookup("additionalLoggedInDropdownActions"));                                           // 44
  }, function() {                                                                                                      // 45
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsAdditionalLoggedInDropdownActions")), "\n	" ];
  }), "\n\n	", Blaze.If(function() {                                                                                   // 47
    return Spacebars.call(view.lookup("allowChangingPassword"));                                                       // 48
  }, function() {                                                                                                      // 49
    return [ "\n		", HTML.BUTTON({                                                                                     // 50
      "class": "btn btn-default btn-block",                                                                            // 51
      id: "login-buttons-open-change-password"                                                                         // 52
    }, Blaze.View(function() {                                                                                         // 53
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedInDropdownActions.password");                  // 54
    })), "\n	" ];                                                                                                      // 55
  }), "\n\n	", HTML.BUTTON({                                                                                           // 56
    "class": "btn btn-block btn-primary",                                                                              // 57
    id: "login-buttons-logout"                                                                                         // 58
  }, Blaze.View(function() {                                                                                           // 59
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedInDropdownActions.signOut");                     // 60
  })) ];                                                                                                               // 61
}));                                                                                                                   // 62
                                                                                                                       // 63
Template.__checkName("_loginButtonsLoggedOutDropdown");                                                                // 64
Template["_loginButtonsLoggedOutDropdown"] = new Template("Template._loginButtonsLoggedOutDropdown", (function() {     // 65
  var view = this;                                                                                                     // 66
  return HTML.LI({                                                                                                     // 67
    id: "login-dropdown-list",                                                                                         // 68
    "class": "dropdown"                                                                                                // 69
  }, "\n		", HTML.A({                                                                                                  // 70
    "class": "dropdown-toggle"                                                                                         // 71
  }, Blaze.View(function() {                                                                                           // 72
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutDropdown.signIn");                            // 73
  }), Blaze.Unless(function() {                                                                                        // 74
    return Spacebars.call(view.lookup("forbidClientAccountCreation"));                                                 // 75
  }, function() {                                                                                                      // 76
    return [ " / ", Blaze.View(function() {                                                                            // 77
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutDropdown.up");                              // 78
    }) ];                                                                                                              // 79
  }), " ", HTML.Raw('<b class="caret"></b>')), "\n		", HTML.DIV({                                                      // 80
    "class": "dropdown-menu"                                                                                           // 81
  }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n		"), "\n	");            // 82
}));                                                                                                                   // 83
                                                                                                                       // 84
Template.__checkName("_loginButtonsLoggedOutAllServices");                                                             // 85
Template["_loginButtonsLoggedOutAllServices"] = new Template("Template._loginButtonsLoggedOutAllServices", (function() {
  var view = this;                                                                                                     // 87
  return Blaze.Each(function() {                                                                                       // 88
    return Spacebars.call(view.lookup("services"));                                                                    // 89
  }, function() {                                                                                                      // 90
    return [ "\n	", Blaze.Unless(function() {                                                                          // 91
      return Spacebars.call(view.lookup("hasPasswordService"));                                                        // 92
    }, function() {                                                                                                    // 93
      return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	" ];                       // 94
    }), "\n		", Blaze.If(function() {                                                                                  // 95
      return Spacebars.call(view.lookup("isPasswordService"));                                                         // 96
    }, function() {                                                                                                    // 97
      return [ "\n			", Blaze.If(function() {                                                                          // 98
        return Spacebars.call(view.lookup("hasOtherServices"));                                                        // 99
      }, function() {                                                                                                  // 100
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n			" ];
      }), "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n		" ];          // 102
    }, function() {                                                                                                    // 103
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n		" ];   // 104
    }), "\n	" ];                                                                                                       // 105
  });                                                                                                                  // 106
}));                                                                                                                   // 107
                                                                                                                       // 108
Template.__checkName("_loginButtonsLoggedOutPasswordServiceSeparator");                                                // 109
Template["_loginButtonsLoggedOutPasswordServiceSeparator"] = new Template("Template._loginButtonsLoggedOutPasswordServiceSeparator", (function() {
  var view = this;                                                                                                     // 111
  return HTML.DIV({                                                                                                    // 112
    "class": "or"                                                                                                      // 113
  }, HTML.Raw('\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n		'), HTML.SPAN({
    "class": "or-text"                                                                                                 // 115
  }, Blaze.View(function() {                                                                                           // 116
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordServiceSeparator.or");                // 117
  })), HTML.Raw('\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n	'));    // 118
}));                                                                                                                   // 119
                                                                                                                       // 120
Template.__checkName("_loginButtonsLoggedOutPasswordService");                                                         // 121
Template["_loginButtonsLoggedOutPasswordService"] = new Template("Template._loginButtonsLoggedOutPasswordService", (function() {
  var view = this;                                                                                                     // 123
  return Blaze.If(function() {                                                                                         // 124
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));                                                        // 125
  }, function() {                                                                                                      // 126
    return [ "\n		", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n	" ];                           // 127
  }, function() {                                                                                                      // 128
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n		", Blaze.Each(function() {  // 129
      return Spacebars.call(view.lookup("fields"));                                                                    // 130
    }, function() {                                                                                                    // 131
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n		" ];                    // 132
    }), "\n		", HTML.BUTTON({                                                                                          // 133
      "class": "btn btn-primary col-xs-12 col-sm-12",                                                                  // 134
      id: "login-buttons-password",                                                                                    // 135
      type: "button"                                                                                                   // 136
    }, "\n			", Blaze.If(function() {                                                                                  // 137
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 138
    }, function() {                                                                                                    // 139
      return [ "\n				", Blaze.View(function() {                                                                       // 140
        return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.create");                 // 141
      }), "\n			" ];                                                                                                   // 142
    }, function() {                                                                                                    // 143
      return [ "\n				", Blaze.View(function() {                                                                       // 144
        return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.signIn");                 // 145
      }), "\n			" ];                                                                                                   // 146
    }), "\n		"), "\n		", Blaze.If(function() {                                                                         // 147
      return Spacebars.call(view.lookup("inLoginFlow"));                                                               // 148
    }, function() {                                                                                                    // 149
      return [ "\n			", HTML.DIV({                                                                                     // 150
        id: "login-other-options"                                                                                      // 151
      }, "\n			", Blaze.If(function() {                                                                                // 152
        return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                  // 153
      }, function() {                                                                                                  // 154
        return [ "\n				", HTML.A({                                                                                    // 155
          id: "forgot-password-link",                                                                                  // 156
          "class": "pull-left"                                                                                         // 157
        }, Blaze.View(function() {                                                                                     // 158
          return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.forgot");               // 159
        })), "\n			" ];                                                                                                // 160
      }), "\n			", Blaze.If(function() {                                                                               // 161
        return Spacebars.call(view.lookup("showCreateAccountLink"));                                                   // 162
      }, function() {                                                                                                  // 163
        return [ "\n				", HTML.A({                                                                                    // 164
          id: "signup-link",                                                                                           // 165
          "class": "pull-right"                                                                                        // 166
        }, Blaze.View(function() {                                                                                     // 167
          return Spacebars.mustache(view.lookup("i18n"), "loginButtonsLoggedOutPasswordService.createAcc");            // 168
        })), "\n			" ];                                                                                                // 169
      }), "\n			"), "\n		" ];                                                                                          // 170
    }), "\n		", Blaze.If(function() {                                                                                  // 171
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 172
    }, function() {                                                                                                    // 173
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n		" ];              // 174
    }), "\n	" ];                                                                                                       // 175
  });                                                                                                                  // 176
}));                                                                                                                   // 177
                                                                                                                       // 178
Template.__checkName("_forgotPasswordForm");                                                                           // 179
Template["_forgotPasswordForm"] = new Template("Template._forgotPasswordForm", (function() {                           // 180
  var view = this;                                                                                                     // 181
  return HTML.DIV({                                                                                                    // 182
    "class": "login-form"                                                                                              // 183
  }, "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n		", HTML.DIV({                       // 184
    id: "forgot-password-email-label-and-input"                                                                        // 185
  }, " \n			", HTML.INPUT({                                                                                            // 186
    id: "forgot-password-email",                                                                                       // 187
    type: "email",                                                                                                     // 188
    placeholder: function() {                                                                                          // 189
      return Spacebars.mustache(view.lookup("i18n"), "forgotPasswordForm.email");                                      // 190
    },                                                                                                                 // 191
    "class": "form-control"                                                                                            // 192
  }), "\n		"), "\n		", HTML.BUTTON({                                                                                   // 193
    "class": "btn btn-primary login-button-form-submit col-xs-12 col-sm-12",                                           // 194
    id: "login-buttons-forgot-password"                                                                                // 195
  }, Blaze.View(function() {                                                                                           // 196
    return Spacebars.mustache(view.lookup("i18n"), "forgotPasswordForm.reset");                                        // 197
  })), "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n	");                         // 198
}));                                                                                                                   // 199
                                                                                                                       // 200
Template.__checkName("_loginButtonsBackToLoginLink");                                                                  // 201
Template["_loginButtonsBackToLoginLink"] = new Template("Template._loginButtonsBackToLoginLink", (function() {         // 202
  var view = this;                                                                                                     // 203
  return HTML.BUTTON({                                                                                                 // 204
    id: "back-to-login-link",                                                                                          // 205
    "class": "btn btn-default col-xs-12 col-sm-12"                                                                     // 206
  }, Blaze.View(function() {                                                                                           // 207
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsBackToLoginLink.back");                                // 208
  }));                                                                                                                 // 209
}));                                                                                                                   // 210
                                                                                                                       // 211
Template.__checkName("_loginButtonsFormField");                                                                        // 212
Template["_loginButtonsFormField"] = new Template("Template._loginButtonsFormField", (function() {                     // 213
  var view = this;                                                                                                     // 214
  return Blaze.If(function() {                                                                                         // 215
    return Spacebars.call(view.lookup("visible"));                                                                     // 216
  }, function() {                                                                                                      // 217
    return [ "\n		", HTML.Comment(" TODO: Implement more input types "), "\n		", Blaze.If(function() {                 // 218
      return Spacebars.dataMustache(view.lookup("equals"), view.lookup("inputType"), "checkbox");                      // 219
    }, function() {                                                                                                    // 220
      return [ "\n			", HTML.DIV({                                                                                     // 221
        "class": "checkbox"                                                                                            // 222
      }, "\n				", HTML.LABEL(HTML.INPUT({                                                                             // 223
        type: "checkbox",                                                                                              // 224
        id: function() {                                                                                               // 225
          return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                           // 226
        },                                                                                                             // 227
        name: function() {                                                                                             // 228
          return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                           // 229
        },                                                                                                             // 230
        value: "true"                                                                                                  // 231
      }), "\n				", Blaze.View(function() {                                                                            // 232
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("fieldLabel")));                                       // 233
      })), "\n			"), "\n		" ];                                                                                         // 234
    }, function() {                                                                                                    // 235
      return [ "\n		", HTML.INPUT({                                                                                    // 236
        id: function() {                                                                                               // 237
          return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                           // 238
        },                                                                                                             // 239
        type: function() {                                                                                             // 240
          return Spacebars.mustache(view.lookup("inputType"));                                                         // 241
        },                                                                                                             // 242
        placeholder: function() {                                                                                      // 243
          return Spacebars.mustache(view.lookup("fieldLabel"));                                                        // 244
        },                                                                                                             // 245
        "class": "form-control"                                                                                        // 246
      }), "\n		" ];                                                                                                    // 247
    }), "\n	" ];                                                                                                       // 248
  });                                                                                                                  // 249
}));                                                                                                                   // 250
                                                                                                                       // 251
Template.__checkName("_loginButtonsChangePassword");                                                                   // 252
Template["_loginButtonsChangePassword"] = new Template("Template._loginButtonsChangePassword", (function() {           // 253
  var view = this;                                                                                                     // 254
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	", Blaze.Each(function() {             // 255
    return Spacebars.call(view.lookup("fields"));                                                                      // 256
  }, function() {                                                                                                      // 257
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n	" ];                        // 258
  }), "\n	", HTML.BUTTON({                                                                                             // 259
    "class": "btn btn-block btn-primary",                                                                              // 260
    id: "login-buttons-do-change-password"                                                                             // 261
  }, Blaze.View(function() {                                                                                           // 262
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsChangePassword.submit");                               // 263
  })), "\n	", HTML.BUTTON({                                                                                            // 264
    "class": "btn btn-block btn-default",                                                                              // 265
    id: "login-buttons-cancel-change-password"                                                                         // 266
  }, Blaze.View(function() {                                                                                           // 267
    return Spacebars.mustache(view.lookup("i18n"), "loginButtonsChangePassword.cancel");                               // 268
  })) ];                                                                                                               // 269
}));                                                                                                                   // 270
                                                                                                                       // 271
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/template.login_buttons_dialogs.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n	", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n	", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n	", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), "\n\n	\n	", Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
Template.__checkName("_resetPasswordDialog");                                                                          // 8
Template["_resetPasswordDialog"] = new Template("Template._resetPasswordDialog", (function() {                         // 9
  var view = this;                                                                                                     // 10
  return Blaze.If(function() {                                                                                         // 11
    return Spacebars.call(view.lookup("inResetPasswordFlow"));                                                         // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", HTML.DIV({                                                                                        // 14
      "class": "modal",                                                                                                // 15
      id: "login-buttons-reset-password-modal"                                                                         // 16
    }, "\n			", HTML.DIV({                                                                                             // 17
      "class": "modal-dialog"                                                                                          // 18
    }, "\n				", HTML.DIV({                                                                                            // 19
      "class": "modal-content"                                                                                         // 20
    }, "\n					", HTML.DIV({                                                                                           // 21
      "class": "modal-header"                                                                                          // 22
    }, "\n						", HTML.BUTTON({                                                                                       // 23
      type: "button",                                                                                                  // 24
      "class": "close",                                                                                                // 25
      "data-dismiss": "modal",                                                                                         // 26
      "aria-hidden": "true"                                                                                            // 27
    }, HTML.CharRef({                                                                                                  // 28
      html: "&times;",                                                                                                 // 29
      str: "×"                                                                                                         // 30
    })), "\n						", HTML.H4({                                                                                         // 31
      "class": "modal-title"                                                                                           // 32
    }, Blaze.View(function() {                                                                                         // 33
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.title");                                     // 34
    })), "\n					"), "\n					", HTML.DIV({                                                                             // 35
      "class": "modal-body"                                                                                            // 36
    }, "\n						", HTML.INPUT({                                                                                        // 37
      id: "reset-password-new-password",                                                                               // 38
      "class": "form-control",                                                                                         // 39
      type: "password",                                                                                                // 40
      placeholder: function() {                                                                                        // 41
        return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.newPassword");                             // 42
      }                                                                                                                // 43
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 44
      "class": "modal-footer"                                                                                          // 45
    }, "\n						", HTML.A({                                                                                            // 46
      "class": "btn btn-default",                                                                                      // 47
      id: "login-buttons-cancel-reset-password"                                                                        // 48
    }, Blaze.View(function() {                                                                                         // 49
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.cancel");                                    // 50
    })), "\n						", HTML.BUTTON({                                                                                     // 51
      "class": "btn btn-primary",                                                                                      // 52
      id: "login-buttons-reset-password-button"                                                                        // 53
    }, "\n							", Blaze.View(function() {                                                                            // 54
      return Spacebars.mustache(view.lookup("i18n"), "resetPasswordDialog.submit");                                    // 55
    }), "\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 57
}));                                                                                                                   // 58
                                                                                                                       // 59
Template.__checkName("_enrollAccountDialog");                                                                          // 60
Template["_enrollAccountDialog"] = new Template("Template._enrollAccountDialog", (function() {                         // 61
  var view = this;                                                                                                     // 62
  return Blaze.If(function() {                                                                                         // 63
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));                                                         // 64
  }, function() {                                                                                                      // 65
    return [ "\n		", HTML.DIV({                                                                                        // 66
      "class": "modal",                                                                                                // 67
      id: "login-buttons-enroll-account-modal"                                                                         // 68
    }, "\n			", HTML.DIV({                                                                                             // 69
      "class": "modal-dialog"                                                                                          // 70
    }, "\n				", HTML.DIV({                                                                                            // 71
      "class": "modal-content"                                                                                         // 72
    }, "\n					", HTML.DIV({                                                                                           // 73
      "class": "modal-header"                                                                                          // 74
    }, "\n						", HTML.BUTTON({                                                                                       // 75
      type: "button",                                                                                                  // 76
      "class": "close",                                                                                                // 77
      "data-dismiss": "modal",                                                                                         // 78
      "aria-hidden": "true"                                                                                            // 79
    }, HTML.CharRef({                                                                                                  // 80
      html: "&times;",                                                                                                 // 81
      str: "×"                                                                                                         // 82
    })), "\n						", HTML.H4({                                                                                         // 83
      "class": "modal-title"                                                                                           // 84
    }, Blaze.View(function() {                                                                                         // 85
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.title");                                     // 86
    })), "\n					"), "\n					", HTML.DIV({                                                                             // 87
      "class": "modal-body"                                                                                            // 88
    }, "\n						", HTML.INPUT({                                                                                        // 89
      id: "enroll-account-password",                                                                                   // 90
      "class": "form-control",                                                                                         // 91
      type: "password",                                                                                                // 92
      placeholder: function() {                                                                                        // 93
        return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.newPassword");                             // 94
      }                                                                                                                // 95
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 96
      "class": "modal-footer"                                                                                          // 97
    }, "\n						", HTML.A({                                                                                            // 98
      "class": "btn btn-default",                                                                                      // 99
      id: "login-buttons-cancel-enroll-account-button"                                                                 // 100
    }, Blaze.View(function() {                                                                                         // 101
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.cancel");                                    // 102
    })), "\n						", HTML.BUTTON({                                                                                     // 103
      "class": "btn btn-primary",                                                                                      // 104
      id: "login-buttons-enroll-account-button"                                                                        // 105
    }, "\n							", Blaze.View(function() {                                                                            // 106
      return Spacebars.mustache(view.lookup("i18n"), "enrollAccountDialog.submit");                                    // 107
    }), "\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 109
}));                                                                                                                   // 110
                                                                                                                       // 111
Template.__checkName("_justVerifiedEmailDialog");                                                                      // 112
Template["_justVerifiedEmailDialog"] = new Template("Template._justVerifiedEmailDialog", (function() {                 // 113
  var view = this;                                                                                                     // 114
  return Blaze.If(function() {                                                                                         // 115
    return Spacebars.call(view.lookup("visible"));                                                                     // 116
  }, function() {                                                                                                      // 117
    return [ "\n		", HTML.DIV({                                                                                        // 118
      "class": "modal",                                                                                                // 119
      id: "login-buttons-email-address-verified-modal"                                                                 // 120
    }, "\n			", HTML.DIV({                                                                                             // 121
      "class": "modal-dialog"                                                                                          // 122
    }, "\n				", HTML.DIV({                                                                                            // 123
      "class": "modal-content"                                                                                         // 124
    }, "\n					", HTML.DIV({                                                                                           // 125
      "class": "modal-body"                                                                                            // 126
    }, "\n						", HTML.H4(HTML.B(Blaze.View(function() {                                                              // 127
      return Spacebars.mustache(view.lookup("i18n"), "justVerifiedEmailDialog.verified");                              // 128
    }))), "\n					"), "\n					", HTML.DIV({                                                                            // 129
      "class": "modal-footer"                                                                                          // 130
    }, "\n						", HTML.BUTTON({                                                                                       // 131
      "class": "btn btn-info login-button",                                                                            // 132
      id: "just-verified-dismiss-button",                                                                              // 133
      "data-dismiss": "modal"                                                                                          // 134
    }, Blaze.View(function() {                                                                                         // 135
      return Spacebars.mustache(view.lookup("i18n"), "justVerifiedEmailDialog.dismiss");                               // 136
    })), "\n					"), "\n				"), "\n			"), "\n		"), "\n	" ];                                                            // 137
  });                                                                                                                  // 138
}));                                                                                                                   // 139
                                                                                                                       // 140
Template.__checkName("_configureLoginServiceDialog");                                                                  // 141
Template["_configureLoginServiceDialog"] = new Template("Template._configureLoginServiceDialog", (function() {         // 142
  var view = this;                                                                                                     // 143
  return Blaze.If(function() {                                                                                         // 144
    return Spacebars.call(view.lookup("visible"));                                                                     // 145
  }, function() {                                                                                                      // 146
    return [ "\n	", HTML.DIV({                                                                                         // 147
      "class": "modal",                                                                                                // 148
      id: "configure-login-service-dialog-modal"                                                                       // 149
    }, "\n			", HTML.DIV({                                                                                             // 150
      "class": "modal-dialog"                                                                                          // 151
    }, "\n					", HTML.DIV({                                                                                           // 152
      "class": "modal-content"                                                                                         // 153
    }, "\n							", HTML.DIV({                                                                                         // 154
      "class": "modal-header"                                                                                          // 155
    }, "\n									", HTML.H4({                                                                                        // 156
      "class": "modal-title"                                                                                           // 157
    }, "Configure Service"), "\n							"), "\n							", HTML.DIV({                                                     // 158
      "class": "modal-body"                                                                                            // 159
    }, "\n									", HTML.DIV({                                                                                       // 160
      id: "configure-login-service-dialog",                                                                            // 161
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 162
    }, "\n											", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n											", HTML.P("\n											Now, copy over some details.\n											"), "\n											", HTML.P("\n											", HTML.TABLE("\n													", HTML.COLGROUP("\n															", HTML.COL({
      span: "1",                                                                                                       // 164
      "class": "configuration_labels"                                                                                  // 165
    }), "\n															", HTML.COL({                                                                                // 166
      span: "1",                                                                                                       // 167
      "class": "configuration_inputs"                                                                                  // 168
    }), "\n													"), "\n													", Blaze.Each(function() {                                                 // 169
      return Spacebars.call(view.lookup("configurationFields"));                                                       // 170
    }, function() {                                                                                                    // 171
      return [ "\n													", HTML.TR("\n															", HTML.TD("\n																	", HTML.LABEL({             // 172
        "for": function() {                                                                                            // 173
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 174
        }                                                                                                              // 175
      }, Blaze.View(function() {                                                                                       // 176
        return Spacebars.mustache(view.lookup("label"));                                                               // 177
      })), "\n															"), "\n															", HTML.TD("\n																	", HTML.INPUT({                      // 178
        id: function() {                                                                                               // 179
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 180
        },                                                                                                             // 181
        type: "text"                                                                                                   // 182
      }), "\n															"), "\n													"), "\n													" ];                                               // 183
    }), "\n											"), "\n											"), "\n									"), "\n							"), "\n							", HTML.DIV({                      // 184
      "class": "modal-footer new-section"                                                                              // 185
    }, "\n									", HTML.DIV({                                                                                       // 186
      "class": "login-button btn btn-danger configure-login-service-dismiss-button"                                    // 187
    }, "\n											I'll do this later\n									"), "\n									", HTML.DIV({                                        // 188
      "class": function() {                                                                                            // 189
        return [ "login-button login-button-configure btn btn-success ", Blaze.If(function() {                         // 190
          return Spacebars.call(view.lookup("saveDisabled"));                                                          // 191
        }, function() {                                                                                                // 192
          return "login-button-disabled";                                                                              // 193
        }) ];                                                                                                          // 194
      },                                                                                                               // 195
      id: "configure-login-service-dialog-save-configuration"                                                          // 196
    }, "\n											Save Configuration\n									"), "\n							"), "\n					"), "\n			"), "\n	"), "\n	" ];             // 197
  });                                                                                                                  // 198
}));                                                                                                                   // 199
                                                                                                                       // 200
Template.__checkName("_loginButtonsMessagesDialog");                                                                   // 201
Template["_loginButtonsMessagesDialog"] = new Template("Template._loginButtonsMessagesDialog", (function() {           // 202
  var view = this;                                                                                                     // 203
  return Blaze.If(function() {                                                                                         // 204
    return Spacebars.call(view.lookup("visible"));                                                                     // 205
  }, function() {                                                                                                      // 206
    return [ "\n		", HTML.DIV({                                                                                        // 207
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 208
      id: "login-buttons-message-dialog"                                                                               // 209
    }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			", HTML.DIV({                   // 210
      "class": "login-button",                                                                                         // 211
      id: "messages-dialog-dismiss-button"                                                                             // 212
    }, Blaze.View(function() {                                                                                         // 213
      return Spacebars.mustache(view.lookup("i18n"), "loginButtonsMessagesDialog.dismiss");                            // 214
    })), "\n		"), "\n	" ];                                                                                             // 215
  });                                                                                                                  // 216
}));                                                                                                                   // 217
                                                                                                                       // 218
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_session.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
	var VALID_KEYS = [                                                                                                    // 2
		'dropdownVisible',                                                                                                   // 3
                                                                                                                       // 4
		// XXX consider replacing these with one key that has an enum for values.                                            // 5
		'inSignupFlow',                                                                                                      // 6
		'inForgotPasswordFlow',                                                                                              // 7
		'inChangePasswordFlow',                                                                                              // 8
		'inMessageOnlyFlow',                                                                                                 // 9
                                                                                                                       // 10
		'errorMessage',                                                                                                      // 11
		'infoMessage',                                                                                                       // 12
                                                                                                                       // 13
		// dialogs with messages (info and error)                                                                            // 14
		'resetPasswordToken',                                                                                                // 15
		'enrollAccountToken',                                                                                                // 16
		'justVerifiedEmail',                                                                                                 // 17
                                                                                                                       // 18
		'configureLoginServiceDialogVisible',                                                                                // 19
		'configureLoginServiceDialogServiceName',                                                                            // 20
		'configureLoginServiceDialogSaveDisabled'                                                                            // 21
	];                                                                                                                    // 22
                                                                                                                       // 23
	var validateKey = function (key) {                                                                                    // 24
		if (!_.contains(VALID_KEYS, key)){                                                                                   // 25
			throw new Error("Invalid key in loginButtonsSession: " + key);                                                      // 26
		}                                                                                                                    // 27
	};                                                                                                                    // 28
                                                                                                                       // 29
	var KEY_PREFIX = "Meteor.loginButtons.";                                                                              // 30
                                                                                                                       // 31
	// XXX we should have a better pattern for code private to a package like this one                                    // 32
	Accounts._loginButtonsSession = {                                                                                     // 33
		set: function(key, value) {                                                                                          // 34
			validateKey(key);                                                                                                   // 35
			if (_.contains(['errorMessage', 'infoMessage'], key)){                                                              // 36
				throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");  // 37
			}                                                                                                                   // 38
                                                                                                                       // 39
			this._set(key, value);                                                                                              // 40
		},                                                                                                                   // 41
                                                                                                                       // 42
		_set: function(key, value) {                                                                                         // 43
			Session.set(KEY_PREFIX + key, value);                                                                               // 44
		},                                                                                                                   // 45
                                                                                                                       // 46
		get: function(key) {                                                                                                 // 47
			validateKey(key);                                                                                                   // 48
			return Session.get(KEY_PREFIX + key);                                                                               // 49
		},                                                                                                                   // 50
                                                                                                                       // 51
		closeDropdown: function () {                                                                                         // 52
			this.set('inSignupFlow', false);                                                                                    // 53
			this.set('inForgotPasswordFlow', false);                                                                            // 54
			this.set('inChangePasswordFlow', false);                                                                            // 55
			this.set('inMessageOnlyFlow', false);                                                                               // 56
			this.set('dropdownVisible', false);                                                                                 // 57
			this.resetMessages();                                                                                               // 58
		},                                                                                                                   // 59
                                                                                                                       // 60
		infoMessage: function(message) {                                                                                     // 61
			this._set("errorMessage", null);                                                                                    // 62
			this._set("infoMessage", message);                                                                                  // 63
			this.ensureMessageVisible();                                                                                        // 64
		},                                                                                                                   // 65
                                                                                                                       // 66
		errorMessage: function(message) {                                                                                    // 67
			this._set("errorMessage", message);                                                                                 // 68
			this._set("infoMessage", null);                                                                                     // 69
			this.ensureMessageVisible();                                                                                        // 70
		},                                                                                                                   // 71
                                                                                                                       // 72
		// is there a visible dialog that shows messages (info and error)                                                    // 73
		isMessageDialogVisible: function () {                                                                                // 74
			return this.get('resetPasswordToken') ||                                                                            // 75
				this.get('enrollAccountToken') ||                                                                                  // 76
				this.get('justVerifiedEmail');                                                                                     // 77
		},                                                                                                                   // 78
                                                                                                                       // 79
		// ensure that somethings displaying a message (info or error) is                                                    // 80
		// visible.  if a dialog with messages is open, do nothing;                                                          // 81
		// otherwise open the dropdown.                                                                                      // 82
		//                                                                                                                   // 83
		// notably this doesn't matter when only displaying a single login                                                   // 84
		// button since then we have an explicit message dialog                                                              // 85
		// (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                   // 86
		// this case.                                                                                                        // 87
		ensureMessageVisible: function () {                                                                                  // 88
			if (!this.isMessageDialogVisible()){                                                                                // 89
				this.set("dropdownVisible", true);                                                                                 // 90
			}                                                                                                                   // 91
		},                                                                                                                   // 92
                                                                                                                       // 93
		resetMessages: function () {                                                                                         // 94
			this._set("errorMessage", null);                                                                                    // 95
			this._set("infoMessage", null);                                                                                     // 96
		},                                                                                                                   // 97
                                                                                                                       // 98
		configureService: function (name) {                                                                                  // 99
			this.set('configureLoginServiceDialogVisible', true);                                                               // 100
			this.set('configureLoginServiceDialogServiceName', name);                                                           // 101
			this.set('configureLoginServiceDialogSaveDisabled', true);                                                          // 102
			setTimeout(function(){                                                                                              // 103
				$('#configure-login-service-dialog-modal').modal();                                                                // 104
			}, 500)                                                                                                             // 105
		}                                                                                                                    // 106
	};                                                                                                                    // 107
}) ();                                                                                                                 // 108
                                                                                                                       // 109
                                                                                                                       // 110
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	if (!Accounts._loginButtons){                                                                                         // 2
		Accounts._loginButtons = {};                                                                                         // 3
	}                                                                                                                     // 4
                                                                                                                       // 5
	// for convenience                                                                                                    // 6
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 7
                                                                                                                       // 8
	UI.registerHelper("loginButtons", function() {                                                                        // 9
		return Template._loginButtons;                                                                                       // 10
	});                                                                                                                   // 11
                                                                                                                       // 12
	// shared between dropdown and single mode                                                                            // 13
	Template._loginButtons.events({                                                                                       // 14
		'click #login-buttons-logout': function() {                                                                          // 15
			Meteor.logout(function(error) {                                                                                     // 16
				loginButtonsSession.closeDropdown();                                                                               // 17
				if (typeof accountsUIBootstrap3.logoutCallback === 'function') {                                                   // 18
					accountsUIBootstrap3.logoutCallback(error);                                                                       // 19
				}                                                                                                                  // 20
			});                                                                                                                 // 21
		}                                                                                                                    // 22
	});                                                                                                                   // 23
                                                                                                                       // 24
	//                                                                                                                    // 25
	// loginButtonLoggedOut template                                                                                      // 26
	//                                                                                                                    // 27
	Template._loginButtonsLoggedOut.helpers({                                                                             // 28
		dropdown: function() {                                                                                               // 29
			return Accounts._loginButtons.dropdown();                                                                           // 30
		},                                                                                                                   // 31
		services: function() {                                                                                               // 32
			return Accounts._loginButtons.getLoginServices();                                                                   // 33
		},                                                                                                                   // 34
		singleService: function() {                                                                                          // 35
			var services = Accounts._loginButtons.getLoginServices();                                                           // 36
			if (services.length !== 1){                                                                                         // 37
				throw new Error(                                                                                                   // 38
					"Shouldn't be rendering this template with more than one configured service");                                    // 39
			}                                                                                                                   // 40
			return services[0];                                                                                                 // 41
		},                                                                                                                   // 42
		configurationLoaded: function() {                                                                                    // 43
			return Accounts.loginServicesConfigured();                                                                          // 44
		}                                                                                                                    // 45
	});                                                                                                                   // 46
                                                                                                                       // 47
                                                                                                                       // 48
                                                                                                                       // 49
	//                                                                                                                    // 50
	// loginButtonsLoggedIn template                                                                                      // 51
	//                                                                                                                    // 52
                                                                                                                       // 53
	// decide whether we should show a dropdown rather than a row of                                                      // 54
	// buttons                                                                                                            // 55
	Template._loginButtonsLoggedIn.helpers({                                                                              // 56
		dropdown: function() {                                                                                               // 57
			return Accounts._loginButtons.dropdown();                                                                           // 58
		},                                                                                                                   // 59
		displayName: function() {                                                                                            // 60
			return Accounts._loginButtons.displayName();                                                                        // 61
		}                                                                                                                    // 62
	})                                                                                                                    // 63
                                                                                                                       // 64
                                                                                                                       // 65
                                                                                                                       // 66
	//                                                                                                                    // 67
	// loginButtonsMessage template                                                                                       // 68
	//                                                                                                                    // 69
                                                                                                                       // 70
	Template._loginButtonsMessages.helpers({                                                                              // 71
		errorMessage: function() {                                                                                           // 72
			return loginButtonsSession.get('errorMessage');                                                                     // 73
		},                                                                                                                   // 74
		infoMessage: function() {                                                                                            // 75
			return loginButtonsSession.get('infoMessage');                                                                      // 76
		}                                                                                                                    // 77
	});                                                                                                                   // 78
                                                                                                                       // 79
                                                                                                                       // 80
                                                                                                                       // 81
	//                                                                                                                    // 82
	// helpers                                                                                                            // 83
	//                                                                                                                    // 84
                                                                                                                       // 85
	Accounts._loginButtons.displayName = function() {                                                                     // 86
		var user = Meteor.user();                                                                                            // 87
		if (!user){                                                                                                          // 88
			return '';                                                                                                          // 89
		}                                                                                                                    // 90
                                                                                                                       // 91
		if (user.profile && user.profile.name){                                                                              // 92
			return user.profile.name;                                                                                           // 93
		}                                                                                                                    // 94
		if (user.username){                                                                                                  // 95
			return user.username;                                                                                               // 96
		}                                                                                                                    // 97
		if (user.emails && user.emails[0] && user.emails[0].address){                                                        // 98
			return user.emails[0].address;                                                                                      // 99
		}                                                                                                                    // 100
                                                                                                                       // 101
		return '';                                                                                                           // 102
	};                                                                                                                    // 103
                                                                                                                       // 104
	Accounts._loginButtons.getLoginServices = function() {                                                                // 105
		// First look for OAuth services.                                                                                    // 106
		var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                       // 107
                                                                                                                       // 108
		// Be equally kind to all login services. This also preserves                                                        // 109
		// backwards-compatibility. (But maybe order should be                                                               // 110
		// configurable?)                                                                                                    // 111
		services.sort();                                                                                                     // 112
                                                                                                                       // 113
		// Add password, if it's there; it must come last.                                                                   // 114
		if (this.hasPasswordService()){                                                                                      // 115
			services.push('password');                                                                                          // 116
		}                                                                                                                    // 117
                                                                                                                       // 118
		return _.map(services, function(name) {                                                                              // 119
			return {                                                                                                            // 120
				name: name                                                                                                         // 121
			};                                                                                                                  // 122
		});                                                                                                                  // 123
	};                                                                                                                    // 124
                                                                                                                       // 125
	Accounts._loginButtons.hasPasswordService = function() {                                                              // 126
		return !!Package['accounts-password'];                                                                               // 127
	};                                                                                                                    // 128
                                                                                                                       // 129
	Accounts._loginButtons.dropdown = function() {                                                                        // 130
		return this.hasPasswordService() || Accounts._loginButtons.getLoginServices().length > 1;                            // 131
	};                                                                                                                    // 132
                                                                                                                       // 133
	// XXX improve these. should this be in accounts-password instead?                                                    // 134
	//                                                                                                                    // 135
	// XXX these will become configurable, and will be validated on                                                       // 136
	// the server as well.                                                                                                // 137
	Accounts._loginButtons.validateUsername = function(username) {                                                        // 138
		if (username.length >= 3) {                                                                                          // 139
			return true;                                                                                                        // 140
		} else {                                                                                                             // 141
			loginButtonsSession.errorMessage(i18n('errorMessages.usernameTooShort'));                                           // 142
			return false;                                                                                                       // 143
		}                                                                                                                    // 144
	};                                                                                                                    // 145
	Accounts._loginButtons.validateEmail = function(email) {                                                              // 146
		if (Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === ''){                          // 147
			return true;                                                                                                        // 148
		}                                                                                                                    // 149
                                                                                                                       // 150
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                                                                                       // 152
		if (re.test(email)) {                                                                                                // 153
			return true;                                                                                                        // 154
		} else {                                                                                                             // 155
			loginButtonsSession.errorMessage(i18n('errorMessages.invalidEmail'));                                               // 156
			return false;                                                                                                       // 157
		}                                                                                                                    // 158
	};                                                                                                                    // 159
	Accounts._loginButtons.validatePassword = function(password) {                                                        // 160
		if (password.length >= 6) {                                                                                          // 161
			return true;                                                                                                        // 162
		} else {                                                                                                             // 163
			loginButtonsSession.errorMessage(i18n('errorMessages.passwordTooShort'));                                           // 164
			return false;                                                                                                       // 165
		}                                                                                                                    // 166
	};                                                                                                                    // 167
                                                                                                                       // 168
	Accounts._loginButtons.rendered = function() {                                                                        // 169
		debugger;                                                                                                            // 170
	};                                                                                                                    // 171
                                                                                                                       // 172
})();                                                                                                                  // 173
                                                                                                                       // 174
                                                                                                                       // 175
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_single.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
	Template._loginButtonsLoggedOutSingleLoginButton.events({                                                             // 5
		'click .login-button': function() {                                                                                  // 6
			var serviceName = this.name;                                                                                        // 7
			loginButtonsSession.resetMessages();                                                                                // 8
			var callback = function(err) {                                                                                      // 9
				if (!err) {                                                                                                        // 10
					loginButtonsSession.closeDropdown();                                                                              // 11
				} else if (err instanceof Accounts.LoginCancelledError) {                                                          // 12
					// do nothing                                                                                                     // 13
				} else if (err instanceof Accounts.ConfigError) {                                                                  // 14
					loginButtonsSession.configureService(serviceName);                                                                // 15
				} else {                                                                                                           // 16
					loginButtonsSession.errorMessage(err.reason || "Unknown error");                                                  // 17
				}                                                                                                                  // 18
			};                                                                                                                  // 19
                                                                                                                       // 20
			var loginWithService = Meteor["loginWith" + capitalize(serviceName)];                                               // 21
                                                                                                                       // 22
			var options = {}; // use default scope unless specified                                                             // 23
			if (Accounts.ui._options.requestPermissions[serviceName]){                                                          // 24
				options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                                 // 25
			}                                                                                                                   // 26
                                                                                                                       // 27
			loginWithService(options, callback);                                                                                // 28
		}                                                                                                                    // 29
	});                                                                                                                   // 30
                                                                                                                       // 31
	Template._loginButtonsLoggedOutSingleLoginButton.helpers({                                                            // 32
		configured: function() {                                                                                             // 33
			return !!Accounts.loginServiceConfiguration.findOne({                                                               // 34
				service: this.name                                                                                                 // 35
			});                                                                                                                 // 36
		},                                                                                                                   // 37
		capitalizedName: function() {                                                                                        // 38
			if (this.name === 'github'){                                                                                        // 39
			// XXX we should allow service packages to set their capitalized name                                               // 40
				return 'GitHub';                                                                                                   // 41
			} else {                                                                                                            // 42
				return capitalize(this.name);                                                                                      // 43
			}                                                                                                                   // 44
		}                                                                                                                    // 45
	});                                                                                                                   // 46
                                                                                                                       // 47
                                                                                                                       // 48
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 49
	var capitalize = function(str) {                                                                                      // 50
		str = (str == null) ? '' : String(str);                                                                              // 51
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 52
	};                                                                                                                    // 53
})();                                                                                                                  // 54
                                                                                                                       // 55
                                                                                                                       // 56
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_dropdown.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
                                                                                                                       // 2
	// for convenience                                                                                                    // 3
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 4
                                                                                                                       // 5
	// events shared between loginButtonsLoggedOutDropdown and                                                            // 6
	// loginButtonsLoggedInDropdown                                                                                       // 7
	Template._loginButtons.events({                                                                                       // 8
		'click input': function(event) {                                                                                     // 9
			event.stopPropagation();                                                                                            // 10
		},                                                                                                                   // 11
		'click #login-name-link, click #login-sign-in-link': function(event) {                                               // 12
			event.stopPropagation();                                                                                            // 13
			loginButtonsSession.set('dropdownVisible', true);                                                                   // 14
			Meteor.flush();                                                                                                     // 15
		},                                                                                                                   // 16
		'click .login-close': function() {                                                                                   // 17
			loginButtonsSession.closeDropdown();                                                                                // 18
		},                                                                                                                   // 19
		'click .dropdown-toggle': function(event) {                                                                          // 20
			event.stopPropagation();                                                                                            // 21
			Template._loginButtons.toggleDropdown();                                                                            // 22
		}                                                                                                                    // 23
	});                                                                                                                   // 24
                                                                                                                       // 25
	Template._loginButtons.toggleDropdown = function() {                                                                  // 26
		toggleDropdown();                                                                                                    // 27
		focusInput();                                                                                                        // 28
	};                                                                                                                    // 29
                                                                                                                       // 30
	//                                                                                                                    // 31
	// loginButtonsLoggedInDropdown template and related                                                                  // 32
	//                                                                                                                    // 33
                                                                                                                       // 34
	Template._loginButtonsLoggedInDropdown.events({                                                                       // 35
		'click #login-buttons-open-change-password': function(event) {                                                       // 36
			event.stopPropagation();                                                                                            // 37
			loginButtonsSession.resetMessages();                                                                                // 38
			loginButtonsSession.set('inChangePasswordFlow', true);                                                              // 39
			Meteor.flush();                                                                                                     // 40
		}                                                                                                                    // 41
	});                                                                                                                   // 42
                                                                                                                       // 43
	Template._loginButtonsLoggedInDropdown.helpers({                                                                      // 44
		displayName: function() {                                                                                            // 45
			return Accounts._loginButtons.displayName();                                                                        // 46
		},                                                                                                                   // 47
                                                                                                                       // 48
		inChangePasswordFlow: function() {                                                                                   // 49
			return loginButtonsSession.get('inChangePasswordFlow');                                                             // 50
		},                                                                                                                   // 51
                                                                                                                       // 52
		inMessageOnlyFlow: function() {                                                                                      // 53
			return loginButtonsSession.get('inMessageOnlyFlow');                                                                // 54
		},                                                                                                                   // 55
                                                                                                                       // 56
		dropdownVisible: function() {                                                                                        // 57
			return loginButtonsSession.get('dropdownVisible');                                                                  // 58
		}                                                                                                                    // 59
	});                                                                                                                   // 60
                                                                                                                       // 61
                                                                                                                       // 62
	Template._loginButtonsLoggedInDropdownActions.helpers({                                                               // 63
		allowChangingPassword: function() {                                                                                  // 64
			// it would be more correct to check whether the user has a password set,                                           // 65
			// but in order to do that we'd have to send more data down to the client,                                          // 66
			// and it'd be preferable not to send down the entire service.password document.                                    // 67
			//                                                                                                                  // 68
			// instead we use the heuristic: if the user has a username or email set.                                           // 69
			var user = Meteor.user();                                                                                           // 70
			return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                  // 71
		},                                                                                                                   // 72
		additionalLoggedInDropdownActions: function() {                                                                      // 73
			return Template._loginButtonsAdditionalLoggedInDropdownActions !== undefined;                                       // 74
		}                                                                                                                    // 75
	});                                                                                                                   // 76
                                                                                                                       // 77
                                                                                                                       // 78
	//                                                                                                                    // 79
	// loginButtonsLoggedOutDropdown template and related                                                                 // 80
	//                                                                                                                    // 81
                                                                                                                       // 82
	Template._loginButtonsLoggedOutDropdown.events({                                                                      // 83
		'click #login-buttons-password': function(event) {                                                                   // 84
			event.stopPropagation();                                                                                            // 85
			loginOrSignup();                                                                                                    // 86
		},                                                                                                                   // 87
                                                                                                                       // 88
		'keypress #forgot-password-email': function(event) {                                                                 // 89
			event.stopPropagation();                                                                                            // 90
			if (event.keyCode === 13){                                                                                          // 91
				forgotPassword();                                                                                                  // 92
			}                                                                                                                   // 93
		},                                                                                                                   // 94
                                                                                                                       // 95
		'click #login-buttons-forgot-password': function(event) {                                                            // 96
			event.stopPropagation();                                                                                            // 97
			forgotPassword();                                                                                                   // 98
		},                                                                                                                   // 99
                                                                                                                       // 100
		'click #signup-link': function(event) {                                                                              // 101
			event.stopPropagation();                                                                                            // 102
			loginButtonsSession.resetMessages();                                                                                // 103
                                                                                                                       // 104
			// store values of fields before swtiching to the signup form                                                       // 105
			var username = trimmedElementValueById('login-username');                                                           // 106
			var email = trimmedElementValueById('login-email');                                                                 // 107
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 108
			// notably not trimmed. a password could (?) start or end with a space                                              // 109
			var password = elementValueById('login-password');                                                                  // 110
                                                                                                                       // 111
			loginButtonsSession.set('inSignupFlow', true);                                                                      // 112
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 113
                                                                                                                       // 114
			// force the ui to update so that we have the approprate fields to fill in                                          // 115
			Meteor.flush();                                                                                                     // 116
                                                                                                                       // 117
			// update new fields with appropriate defaults                                                                      // 118
			if (username !== null){                                                                                             // 119
				document.getElementById('login-username').value = username;                                                        // 120
			} else if (email !== null){                                                                                         // 121
				document.getElementById('login-email').value = email;                                                              // 122
			} else if (usernameOrEmail !== null){                                                                               // 123
				if (usernameOrEmail.indexOf('@') === -1){                                                                          // 124
					document.getElementById('login-username').value = usernameOrEmail;                                                // 125
				} else {                                                                                                           // 126
					document.getElementById('login-email').value = usernameOrEmail;                                                   // 127
				}                                                                                                                  // 128
			}                                                                                                                   // 129
		},                                                                                                                   // 130
		'click #forgot-password-link': function(event) {                                                                     // 131
			event.stopPropagation();                                                                                            // 132
			loginButtonsSession.resetMessages();                                                                                // 133
                                                                                                                       // 134
			// store values of fields before swtiching to the signup form                                                       // 135
			var email = trimmedElementValueById('login-email');                                                                 // 136
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 137
                                                                                                                       // 138
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 139
			loginButtonsSession.set('inForgotPasswordFlow', true);                                                              // 140
                                                                                                                       // 141
			// force the ui to update so that we have the approprate fields to fill in                                          // 142
			Meteor.flush();                                                                                                     // 143
			//toggleDropdown();                                                                                                 // 144
                                                                                                                       // 145
			// update new fields with appropriate defaults                                                                      // 146
			if (email !== null){                                                                                                // 147
				document.getElementById('forgot-password-email').value = email;                                                    // 148
			} else if (usernameOrEmail !== null){                                                                               // 149
				if (usernameOrEmail.indexOf('@') !== -1){                                                                          // 150
					document.getElementById('forgot-password-email').value = usernameOrEmail;                                         // 151
				}                                                                                                                  // 152
			}                                                                                                                   // 153
		},                                                                                                                   // 154
		'click #back-to-login-link': function(event) {                                                                       // 155
			event.stopPropagation();                                                                                            // 156
			loginButtonsSession.resetMessages();                                                                                // 157
                                                                                                                       // 158
			var username = trimmedElementValueById('login-username');                                                           // 159
			var email = trimmedElementValueById('login-email') || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?
                                                                                                                       // 161
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 162
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 163
                                                                                                                       // 164
			// force the ui to update so that we have the approprate fields to fill in                                          // 165
			Meteor.flush();                                                                                                     // 166
                                                                                                                       // 167
			if (document.getElementById('login-username')){                                                                     // 168
				document.getElementById('login-username').value = username;                                                        // 169
			}                                                                                                                   // 170
			if (document.getElementById('login-email')){                                                                        // 171
				document.getElementById('login-email').value = email;                                                              // 172
			}                                                                                                                   // 173
			// "login-password" is preserved thanks to the preserve-inputs package                                              // 174
			if (document.getElementById('login-username-or-email')){                                                            // 175
				document.getElementById('login-username-or-email').value = email || username;                                      // 176
			}                                                                                                                   // 177
		},                                                                                                                   // 178
		'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13){                                                                                          // 180
				loginOrSignup();                                                                                                   // 181
			}                                                                                                                   // 182
		}                                                                                                                    // 183
	});                                                                                                                   // 184
                                                                                                                       // 185
                                                                                                                       // 186
	Template._loginButtonsLoggedOutDropdown.helpers({                                                                     // 187
		// additional classes that can be helpful in styling the dropdown                                                    // 188
		additionalClasses: function() {                                                                                      // 189
			if (!Accounts.password) {                                                                                           // 190
				return false;                                                                                                      // 191
			} else {                                                                                                            // 192
				if (loginButtonsSession.get('inSignupFlow')) {                                                                     // 193
					return 'login-form-create-account';                                                                               // 194
				} else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                      // 195
					return 'login-form-forgot-password';                                                                              // 196
				} else {                                                                                                           // 197
					return 'login-form-sign-in';                                                                                      // 198
				}                                                                                                                  // 199
			}                                                                                                                   // 200
		},                                                                                                                   // 201
                                                                                                                       // 202
		dropdownVisible: function() {                                                                                        // 203
			return loginButtonsSession.get('dropdownVisible');                                                                  // 204
		},                                                                                                                   // 205
                                                                                                                       // 206
		hasPasswordService: function() {                                                                                     // 207
			return Accounts._loginButtons.hasPasswordService();                                                                 // 208
		},                                                                                                                   // 209
                                                                                                                       // 210
		forbidClientAccountCreation: function() {                                                                            // 211
			return Accounts._options.forbidClientAccountCreation;                                                               // 212
		}                                                                                                                    // 213
	});                                                                                                                   // 214
                                                                                                                       // 215
	Template._loginButtonsLoggedOutAllServices.helpers({                                                                  // 216
		services: function() {                                                                                               // 217
			return Accounts._loginButtons.getLoginServices();                                                                   // 218
		},                                                                                                                   // 219
                                                                                                                       // 220
		isPasswordService: function() {                                                                                      // 221
			return this.name === 'password';                                                                                    // 222
		},                                                                                                                   // 223
                                                                                                                       // 224
		hasOtherServices: function() {                                                                                       // 225
			return Accounts._loginButtons.getLoginServices().length > 1;                                                        // 226
		},                                                                                                                   // 227
                                                                                                                       // 228
		hasPasswordService: function() {                                                                                     // 229
			return Accounts._loginButtons.hasPasswordService();                                                                 // 230
		}                                                                                                                    // 231
	});                                                                                                                   // 232
                                                                                                                       // 233
                                                                                                                       // 234
	Template._loginButtonsLoggedOutPasswordService.helpers({                                                              // 235
		fields: function() {                                                                                                 // 236
			var loginFields = [{                                                                                                // 237
				fieldName: 'username-or-email',                                                                                    // 238
				fieldLabel: i18n('loginFields.usernameOrEmail'),                                                                   // 239
				visible: function() {                                                                                              // 240
					return _.contains(                                                                                                // 241
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                             // 242
						Accounts.ui._passwordSignupFields());                                                                            // 243
				}                                                                                                                  // 244
			}, {                                                                                                                // 245
				fieldName: 'username',                                                                                             // 246
				fieldLabel: i18n('loginFields.username'),                                                                          // 247
				visible: function() {                                                                                              // 248
					return Accounts.ui._passwordSignupFields() === "USERNAME_ONLY";                                                   // 249
				}                                                                                                                  // 250
			}, {                                                                                                                // 251
				fieldName: 'email',                                                                                                // 252
				fieldLabel: i18n('loginFields.email'),                                                                             // 253
				inputType: 'email',                                                                                                // 254
				visible: function() {                                                                                              // 255
					return Accounts.ui._passwordSignupFields() === "EMAIL_ONLY";                                                      // 256
				}                                                                                                                  // 257
			}, {                                                                                                                // 258
				fieldName: 'password',                                                                                             // 259
				fieldLabel: i18n('loginFields.password'),                                                                          // 260
				inputType: 'password',                                                                                             // 261
				visible: function() {                                                                                              // 262
					return true;                                                                                                      // 263
				}                                                                                                                  // 264
			}];                                                                                                                 // 265
                                                                                                                       // 266
			var signupFields = [{                                                                                               // 267
				fieldName: 'username',                                                                                             // 268
				fieldLabel: i18n('signupFields.username'),                                                                         // 269
				visible: function() {                                                                                              // 270
					return _.contains(                                                                                                // 271
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],            // 272
						Accounts.ui._passwordSignupFields());                                                                            // 273
				}                                                                                                                  // 274
			}, {                                                                                                                // 275
				fieldName: 'email',                                                                                                // 276
				fieldLabel: i18n('signupFields.email'),                                                                            // 277
				inputType: 'email',                                                                                                // 278
				visible: function() {                                                                                              // 279
					return _.contains(                                                                                                // 280
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                              // 281
						Accounts.ui._passwordSignupFields());                                                                            // 282
				}                                                                                                                  // 283
			}, {                                                                                                                // 284
				fieldName: 'email',                                                                                                // 285
				fieldLabel: i18n('signupFields.emailOpt'),                                                                         // 286
				inputType: 'email',                                                                                                // 287
				visible: function() {                                                                                              // 288
					return Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                     // 289
				}                                                                                                                  // 290
			}, {                                                                                                                // 291
				fieldName: 'password',                                                                                             // 292
				fieldLabel: i18n('signupFields.password'),                                                                         // 293
				inputType: 'password',                                                                                             // 294
				visible: function() {                                                                                              // 295
					return true;                                                                                                      // 296
				}                                                                                                                  // 297
			}, {                                                                                                                // 298
				fieldName: 'password-again',                                                                                       // 299
				fieldLabel: i18n('signupFields.passwordAgain'),                                                                    // 300
				inputType: 'password',                                                                                             // 301
				visible: function() {                                                                                              // 302
					// No need to make users double-enter their password if                                                           // 303
					// they'll necessarily have an email set, since they can use                                                      // 304
					// the "forgot password" flow.                                                                                    // 305
					return _.contains(                                                                                                // 306
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                  // 307
						Accounts.ui._passwordSignupFields());                                                                            // 308
				}                                                                                                                  // 309
			}];                                                                                                                 // 310
                                                                                                                       // 311
			signupFields = signupFields.concat(Accounts.ui._options.extraSignupFields);                                         // 312
                                                                                                                       // 313
			return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                        // 314
		},                                                                                                                   // 315
                                                                                                                       // 316
		inForgotPasswordFlow: function() {                                                                                   // 317
			return loginButtonsSession.get('inForgotPasswordFlow');                                                             // 318
		},                                                                                                                   // 319
                                                                                                                       // 320
		inLoginFlow: function() {                                                                                            // 321
			return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');                // 322
		},                                                                                                                   // 323
                                                                                                                       // 324
		inSignupFlow: function() {                                                                                           // 325
			return loginButtonsSession.get('inSignupFlow');                                                                     // 326
		},                                                                                                                   // 327
                                                                                                                       // 328
		showForgotPasswordLink: function() {                                                                                 // 329
			return _.contains(                                                                                                  // 330
				["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                 // 331
				Accounts.ui._passwordSignupFields());                                                                              // 332
		},                                                                                                                   // 333
                                                                                                                       // 334
		showCreateAccountLink: function() {                                                                                  // 335
			return !Accounts._options.forbidClientAccountCreation;                                                              // 336
		}                                                                                                                    // 337
	});                                                                                                                   // 338
                                                                                                                       // 339
	Template._loginButtonsFormField.helpers({                                                                             // 340
		equals: function(a, b) {                                                                                             // 341
			return (a === b);                                                                                                   // 342
		},                                                                                                                   // 343
		inputType: function() {                                                                                              // 344
			return this.inputType || "text";                                                                                    // 345
		}                                                                                                                    // 346
	});                                                                                                                   // 347
                                                                                                                       // 348
	//                                                                                                                    // 349
	// loginButtonsChangePassword template                                                                                // 350
	//                                                                                                                    // 351
	Template._loginButtonsChangePassword.events({                                                                         // 352
		'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function(event) {          // 353
			if (event.keyCode === 13){                                                                                          // 354
				changePassword();                                                                                                  // 355
			}                                                                                                                   // 356
		},                                                                                                                   // 357
		'click #login-buttons-do-change-password': function(event) {                                                         // 358
			event.stopPropagation();                                                                                            // 359
			changePassword();                                                                                                   // 360
		},                                                                                                                   // 361
		'click #login-buttons-cancel-change-password': function(event) {                                                     // 362
			event.stopPropagation();                                                                                            // 363
			loginButtonsSession.resetMessages();                                                                                // 364
			Accounts._loginButtonsSession.set('inChangePasswordFlow', false);                                                   // 365
			Meteor.flush();                                                                                                     // 366
		}                                                                                                                    // 367
	});                                                                                                                   // 368
                                                                                                                       // 369
	Template._loginButtonsChangePassword.helpers({                                                                        // 370
		fields: function() {                                                                                                 // 371
			return [{                                                                                                           // 372
				fieldName: 'old-password',                                                                                         // 373
				fieldLabel: i18n('changePasswordFields.currentPassword'),                                                          // 374
				inputType: 'password',                                                                                             // 375
				visible: function() {                                                                                              // 376
					return true;                                                                                                      // 377
				}                                                                                                                  // 378
			}, {                                                                                                                // 379
				fieldName: 'password',                                                                                             // 380
				fieldLabel: i18n('changePasswordFields.newPassword'),                                                              // 381
				inputType: 'password',                                                                                             // 382
				visible: function() {                                                                                              // 383
					return true;                                                                                                      // 384
				}                                                                                                                  // 385
			}, {                                                                                                                // 386
				fieldName: 'password-again',                                                                                       // 387
				fieldLabel: i18n('changePasswordFields.newPasswordAgain'),                                                         // 388
				inputType: 'password',                                                                                             // 389
				visible: function() {                                                                                              // 390
					// No need to make users double-enter their password if                                                           // 391
					// they'll necessarily have an email set, since they can use                                                      // 392
					// the "forgot password" flow.                                                                                    // 393
					return _.contains(                                                                                                // 394
						["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                                // 395
						Accounts.ui._passwordSignupFields());                                                                            // 396
				}                                                                                                                  // 397
			}];                                                                                                                 // 398
		}                                                                                                                    // 399
	});                                                                                                                   // 400
                                                                                                                       // 401
	//                                                                                                                    // 402
	// helpers                                                                                                            // 403
	//                                                                                                                    // 404
                                                                                                                       // 405
	var elementValueById = function(id) {                                                                                 // 406
		var element = document.getElementById(id);                                                                           // 407
		if (!element){                                                                                                       // 408
			return null;                                                                                                        // 409
		} else {                                                                                                             // 410
			return element.value;                                                                                               // 411
		}                                                                                                                    // 412
	};                                                                                                                    // 413
                                                                                                                       // 414
	var trimmedElementValueById = function(id) {                                                                          // 415
		var element = document.getElementById(id);                                                                           // 416
		if (!element){                                                                                                       // 417
			return null;                                                                                                        // 418
		} else {                                                                                                             // 419
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;                                                            // 420
		}                                                                                                                    // 421
	};                                                                                                                    // 422
                                                                                                                       // 423
	var loginOrSignup = function() {                                                                                      // 424
		if (loginButtonsSession.get('inSignupFlow')){                                                                        // 425
			signup();                                                                                                           // 426
		} else {                                                                                                             // 427
			login();                                                                                                            // 428
		}                                                                                                                    // 429
	};                                                                                                                    // 430
                                                                                                                       // 431
	var login = function() {                                                                                              // 432
		loginButtonsSession.resetMessages();                                                                                 // 433
                                                                                                                       // 434
		var username = trimmedElementValueById('login-username');                                                            // 435
		var email = trimmedElementValueById('login-email');                                                                  // 436
		var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                            // 437
		// notably not trimmed. a password could (?) start or end with a space                                               // 438
		var password = elementValueById('login-password');                                                                   // 439
                                                                                                                       // 440
		var loginSelector;                                                                                                   // 441
		if (username !== null) {                                                                                             // 442
			if (!Accounts._loginButtons.validateUsername(username)){                                                            // 443
				return;                                                                                                            // 444
			} else {                                                                                                            // 445
				loginSelector = {                                                                                                  // 446
					username: username                                                                                                // 447
				};                                                                                                                 // 448
			}                                                                                                                   // 449
		} else if (email !== null) {                                                                                         // 450
			if (!Accounts._loginButtons.validateEmail(email)){                                                                  // 451
				return;                                                                                                            // 452
			} else {                                                                                                            // 453
				loginSelector = {                                                                                                  // 454
					email: email                                                                                                      // 455
				};                                                                                                                 // 456
			}                                                                                                                   // 457
		} else if (usernameOrEmail !== null) {                                                                               // 458
			// XXX not sure how we should validate this. but this seems good enough (for now),                                  // 459
			// since an email must have at least 3 characters anyways                                                           // 460
			if (!Accounts._loginButtons.validateUsername(usernameOrEmail)){                                                     // 461
				return;                                                                                                            // 462
			} else {                                                                                                            // 463
				loginSelector = usernameOrEmail;                                                                                   // 464
			}                                                                                                                   // 465
		} else {                                                                                                             // 466
			throw new Error("Unexpected -- no element to use as a login user selector");                                        // 467
		}                                                                                                                    // 468
                                                                                                                       // 469
		Meteor.loginWithPassword(loginSelector, password, function(error, result) {                                          // 470
			if (error) {                                                                                                        // 471
				if (error.reason == 'User not found'){                                                                             // 472
					loginButtonsSession.errorMessage(i18n('errorMessages.userNotFound'))                                              // 473
				} else if (error.reason == 'Incorrect password'){                                                                  // 474
					loginButtonsSession.errorMessage(i18n('errorMessages.incorrectPassword'))                                         // 475
				} else {                                                                                                           // 476
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 477
				}                                                                                                                  // 478
			} else {                                                                                                            // 479
				loginButtonsSession.closeDropdown();                                                                               // 480
			}                                                                                                                   // 481
		});                                                                                                                  // 482
	};                                                                                                                    // 483
                                                                                                                       // 484
	var toggleDropdown = function() {                                                                                     // 485
		$("#login-dropdown-list").toggleClass("open");                                                                       // 486
	}                                                                                                                     // 487
                                                                                                                       // 488
	var focusInput = function() {                                                                                         // 489
		setTimeout(function() {                                                                                              // 490
			$("#login-dropdown-list input").first().focus();                                                                    // 491
		}, 0);                                                                                                               // 492
	};                                                                                                                    // 493
                                                                                                                       // 494
	var signup = function() {                                                                                             // 495
		loginButtonsSession.resetMessages();                                                                                 // 496
                                                                                                                       // 497
		// to be passed to Accounts.createUser                                                                               // 498
		var options = {};                                                                                                    // 499
		if(typeof accountsUIBootstrap3.setCustomSignupOptions === 'function') {                                              // 500
			options = accountsUIBootstrap3.setCustomSignupOptions();                                                            // 501
			if (!(options instanceof Object)){ options = {}; }                                                                  // 502
		}                                                                                                                    // 503
                                                                                                                       // 504
		var username = trimmedElementValueById('login-username');                                                            // 505
		if (username !== null) {                                                                                             // 506
			if (!Accounts._loginButtons.validateUsername(username)){                                                            // 507
				return;                                                                                                            // 508
			} else {                                                                                                            // 509
				options.username = username;                                                                                       // 510
			}                                                                                                                   // 511
		}                                                                                                                    // 512
                                                                                                                       // 513
		var email = trimmedElementValueById('login-email');                                                                  // 514
		if (email !== null) {                                                                                                // 515
			if (!Accounts._loginButtons.validateEmail(email)){                                                                  // 516
				return;                                                                                                            // 517
			} else {                                                                                                            // 518
				options.email = email;                                                                                             // 519
			}                                                                                                                   // 520
		}                                                                                                                    // 521
                                                                                                                       // 522
		// notably not trimmed. a password could (?) start or end with a space                                               // 523
		var password = elementValueById('login-password');                                                                   // 524
		if (!Accounts._loginButtons.validatePassword(password)){                                                             // 525
			return;                                                                                                             // 526
		} else {                                                                                                             // 527
			options.password = password;                                                                                        // 528
		}                                                                                                                    // 529
                                                                                                                       // 530
		if (!matchPasswordAgainIfPresent()){                                                                                 // 531
			return;                                                                                                             // 532
		}                                                                                                                    // 533
                                                                                                                       // 534
		// prepare the profile object                                                                                        // 535
		// it could have already been set through setCustomSignupOptions                                                     // 536
		if (!(options.profile instanceof Object)){                                                                           // 537
			options.profile = {};                                                                                               // 538
		}                                                                                                                    // 539
                                                                                                                       // 540
		// define a proxy function to allow extraSignupFields set error messages                                             // 541
		var errorFn = function(errorMessage) {                                                                               // 542
			Accounts._loginButtonsSession.errorMessage(errorMessage);                                                           // 543
		};                                                                                                                   // 544
                                                                                                                       // 545
		var invalidExtraSignupFields = false;                                                                                // 546
                                                                                                                       // 547
		// parse extraSignupFields to populate account's profile data                                                        // 548
		_.each(Accounts.ui._options.extraSignupFields, function(field, index) {                                              // 549
			var value = elementValueById('login-' + field.fieldName);                                                           // 550
			if (typeof field.validate === 'function') {                                                                         // 551
				if (field.validate(value, errorFn)) {                                                                              // 552
					if (typeof field.saveToProfile !== 'undefined' && !field.saveToProfile){                                          // 553
						options[field.fieldName] = value;                                                                                // 554
					} else {                                                                                                          // 555
						options.profile[field.fieldName] = value;                                                                        // 556
					}                                                                                                                 // 557
				} else {                                                                                                           // 558
					invalidExtraSignupFields = true;                                                                                  // 559
				}                                                                                                                  // 560
			} else {                                                                                                            // 561
				options.profile[field.fieldName] = value;                                                                          // 562
			}                                                                                                                   // 563
		});                                                                                                                  // 564
                                                                                                                       // 565
		if (invalidExtraSignupFields){                                                                                       // 566
			return;                                                                                                             // 567
		}                                                                                                                    // 568
                                                                                                                       // 569
		Accounts.createUser(options, function(error) {                                                                       // 570
			if (error) {                                                                                                        // 571
				if (error.reason == 'Signups forbidden'){                                                                          // 572
					loginButtonsSession.errorMessage(i18n('errorMessages.signupsForbidden'))                                          // 573
				} else {                                                                                                           // 574
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 575
				}                                                                                                                  // 576
			} else {                                                                                                            // 577
				loginButtonsSession.closeDropdown();                                                                               // 578
			}                                                                                                                   // 579
		});                                                                                                                  // 580
	};                                                                                                                    // 581
                                                                                                                       // 582
	var forgotPassword = function() {                                                                                     // 583
		loginButtonsSession.resetMessages();                                                                                 // 584
                                                                                                                       // 585
		var email = trimmedElementValueById("forgot-password-email");                                                        // 586
		if (email.indexOf('@') !== -1) {                                                                                     // 587
			Accounts.forgotPassword({                                                                                           // 588
				email: email                                                                                                       // 589
			}, function(error) {                                                                                                // 590
				if (error) {                                                                                                       // 591
					if (error.reason == 'User not found'){                                                                            // 592
						loginButtonsSession.errorMessage(i18n('errorMessages.userNotFound'))                                             // 593
					} else {                                                                                                          // 594
						loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 595
					}                                                                                                                 // 596
				} else {                                                                                                           // 597
					loginButtonsSession.infoMessage(i18n('infoMessages.emailSent'));                                                  // 598
				}                                                                                                                  // 599
			});                                                                                                                 // 600
		} else {                                                                                                             // 601
			loginButtonsSession.errorMessage(i18n('forgotPasswordForm.invalidEmail'));                                          // 602
		}                                                                                                                    // 603
	};                                                                                                                    // 604
	var changePassword = function() {                                                                                     // 605
		loginButtonsSession.resetMessages();                                                                                 // 606
		// notably not trimmed. a password could (?) start or end with a space                                               // 607
		var oldPassword = elementValueById('login-old-password');                                                            // 608
		// notably not trimmed. a password could (?) start or end with a space                                               // 609
		var password = elementValueById('login-password');                                                                   // 610
		                                                                                                                     // 611
		if (password == oldPassword) {                                                                                       // 612
			loginButtonsSession.errorMessage(i18n('errorMessages.newPasswordSameAsOld'));                                       // 613
			return;                                                                                                             // 614
		}                                                                                                                    // 615
                                                                                                                       // 616
		if (!Accounts._loginButtons.validatePassword(password)){                                                             // 617
			return;                                                                                                             // 618
		}                                                                                                                    // 619
                                                                                                                       // 620
		if (!matchPasswordAgainIfPresent()){                                                                                 // 621
			return;                                                                                                             // 622
		}                                                                                                                    // 623
                                                                                                                       // 624
		Accounts.changePassword(oldPassword, password, function(error) {                                                     // 625
			if (error) {                                                                                                        // 626
				if (error.reason == 'Incorrect password'){                                                                         // 627
					loginButtonsSession.errorMessage(i18n('errorMessages.incorrectPassword'))                                         // 628
				} else {                                                                                                           // 629
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 630
				}                                                                                                                  // 631
			} else {                                                                                                            // 632
				loginButtonsSession.infoMessage(i18n('infoMessages.passwordChanged'));                                             // 633
                                                                                                                       // 634
				// wait 3 seconds, then expire the msg                                                                             // 635
				Meteor.setTimeout(function() {                                                                                     // 636
					loginButtonsSession.resetMessages();                                                                              // 637
				}, 3000);                                                                                                          // 638
			}                                                                                                                   // 639
		});                                                                                                                  // 640
	};                                                                                                                    // 641
                                                                                                                       // 642
	var matchPasswordAgainIfPresent = function() {                                                                        // 643
		// notably not trimmed. a password could (?) start or end with a space                                               // 644
		var passwordAgain = elementValueById('login-password-again');                                                        // 645
		if (passwordAgain !== null) {                                                                                        // 646
			// notably not trimmed. a password could (?) start or end with a space                                              // 647
			var password = elementValueById('login-password');                                                                  // 648
			if (password !== passwordAgain) {                                                                                   // 649
				loginButtonsSession.errorMessage(i18n('errorMessages.passwordsDontMatch'));                                        // 650
				return false;                                                                                                      // 651
			}                                                                                                                   // 652
		}                                                                                                                    // 653
		return true;                                                                                                         // 654
	};                                                                                                                    // 655
})();                                                                                                                  // 656
                                                                                                                       // 657
                                                                                                                       // 658
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ian:accounts-ui-bootstrap-3/login_buttons_dialogs.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
                                                                                                                       // 5
	//                                                                                                                    // 6
	// populate the session so that the appropriate dialogs are                                                           // 7
	// displayed by reading variables set by accounts-urls, which parses                                                  // 8
	// special URLs. since accounts-ui depends on accounts-urls, we are                                                   // 9
	// guaranteed to have these set at this point.                                                                        // 10
	//                                                                                                                    // 11
                                                                                                                       // 12
	if (Accounts._resetPasswordToken) {                                                                                   // 13
		loginButtonsSession.set('resetPasswordToken', Accounts._resetPasswordToken);                                         // 14
	}                                                                                                                     // 15
                                                                                                                       // 16
	if (Accounts._enrollAccountToken) {                                                                                   // 17
		loginButtonsSession.set('enrollAccountToken', Accounts._enrollAccountToken);                                         // 18
	}                                                                                                                     // 19
                                                                                                                       // 20
	// Needs to be in Meteor.startup because of a package loading order                                                   // 21
	// issue. We can't be sure that accounts-password is loaded earlier                                                   // 22
	// than accounts-ui so Accounts.verifyEmail might not be defined.                                                     // 23
	Meteor.startup(function() {                                                                                           // 24
		if (Accounts._verifyEmailToken) {                                                                                    // 25
			Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {                                                  // 26
				Accounts._enableAutoLogin();                                                                                       // 27
				if (!error){                                                                                                       // 28
					loginButtonsSession.set('justVerifiedEmail', true);                                                               // 29
				}                                                                                                                  // 30
				// XXX show something if there was an error.                                                                       // 31
			});                                                                                                                 // 32
		}                                                                                                                    // 33
	});                                                                                                                   // 34
                                                                                                                       // 35
	//                                                                                                                    // 36
	// resetPasswordDialog template                                                                                       // 37
	//                                                                                                                    // 38
                                                                                                                       // 39
	Template._resetPasswordDialog.events({                                                                                // 40
		'click #login-buttons-reset-password-button': function(event) {                                                      // 41
			event.stopPropagation();                                                                                            // 42
			resetPassword();                                                                                                    // 43
		},                                                                                                                   // 44
		'keypress #reset-password-new-password': function(event) {                                                           // 45
			if (event.keyCode === 13){                                                                                          // 46
				resetPassword();                                                                                                   // 47
			}                                                                                                                   // 48
		},                                                                                                                   // 49
		'click #login-buttons-cancel-reset-password': function(event) {                                                      // 50
			event.stopPropagation();                                                                                            // 51
			loginButtonsSession.set('resetPasswordToken', null);                                                                // 52
			Accounts._enableAutoLogin();                                                                                        // 53
			$('#login-buttons-reset-password-modal').modal("hide");                                                             // 54
		}                                                                                                                    // 55
	});                                                                                                                   // 56
                                                                                                                       // 57
	var resetPassword = function() {                                                                                      // 58
		loginButtonsSession.resetMessages();                                                                                 // 59
		var newPassword = document.getElementById('reset-password-new-password').value;                                      // 60
		if (!Accounts._loginButtons.validatePassword(newPassword)){                                                          // 61
			return;                                                                                                             // 62
		}                                                                                                                    // 63
                                                                                                                       // 64
		Accounts.resetPassword(                                                                                              // 65
			loginButtonsSession.get('resetPasswordToken'), newPassword,                                                         // 66
			function(error) {                                                                                                   // 67
				if (error) {                                                                                                       // 68
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 69
				} else {                                                                                                           // 70
					loginButtonsSession.set('resetPasswordToken', null);                                                              // 71
					Accounts._enableAutoLogin();                                                                                      // 72
					$('#login-buttons-reset-password-modal').modal("hide");                                                           // 73
				}                                                                                                                  // 74
			});                                                                                                                 // 75
	};                                                                                                                    // 76
                                                                                                                       // 77
	Template._resetPasswordDialog.helpers({                                                                               // 78
		inResetPasswordFlow: function() {                                                                                    // 79
			return loginButtonsSession.get('resetPasswordToken');                                                               // 80
		}                                                                                                                    // 81
	});                                                                                                                   // 82
                                                                                                                       // 83
	Template._resetPasswordDialog.rendered = function() {                                                                 // 84
		var $modal = $(this.find('#login-buttons-reset-password-modal'));                                                    // 85
		$modal.modal();                                                                                                      // 86
	};                                                                                                                    // 87
                                                                                                                       // 88
	//                                                                                                                    // 89
	// enrollAccountDialog template                                                                                       // 90
	//                                                                                                                    // 91
                                                                                                                       // 92
	Template._enrollAccountDialog.events({                                                                                // 93
		'click #login-buttons-enroll-account-button': function() {                                                           // 94
			enrollAccount();                                                                                                    // 95
		},                                                                                                                   // 96
		'keypress #enroll-account-password': function(event) {                                                               // 97
			if (event.keyCode === 13){                                                                                          // 98
				enrollAccount();                                                                                                   // 99
			}                                                                                                                   // 100
		},                                                                                                                   // 101
		'click #login-buttons-cancel-enroll-account-button': function() {                                                    // 102
			loginButtonsSession.set('enrollAccountToken', null);                                                                // 103
			Accounts._enableAutoLogin();                                                                                        // 104
			$modal.modal("hide");                                                                                               // 105
		}                                                                                                                    // 106
	});                                                                                                                   // 107
                                                                                                                       // 108
	var enrollAccount = function() {                                                                                      // 109
		loginButtonsSession.resetMessages();                                                                                 // 110
		var password = document.getElementById('enroll-account-password').value;                                             // 111
		if (!Accounts._loginButtons.validatePassword(password)){                                                             // 112
			return;                                                                                                             // 113
		}                                                                                                                    // 114
                                                                                                                       // 115
		Accounts.resetPassword(                                                                                              // 116
			loginButtonsSession.get('enrollAccountToken'), password,                                                            // 117
			function(error) {                                                                                                   // 118
				if (error) {                                                                                                       // 119
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 120
				} else {                                                                                                           // 121
					loginButtonsSession.set('enrollAccountToken', null);                                                              // 122
					Accounts._enableAutoLogin();                                                                                      // 123
					$modal.modal("hide");                                                                                             // 124
				}                                                                                                                  // 125
			});                                                                                                                 // 126
	};                                                                                                                    // 127
                                                                                                                       // 128
	Template._enrollAccountDialog.helpers({                                                                               // 129
		inEnrollAccountFlow: function() {                                                                                    // 130
			return loginButtonsSession.get('enrollAccountToken');                                                               // 131
		}                                                                                                                    // 132
	});                                                                                                                   // 133
                                                                                                                       // 134
	Template._enrollAccountDialog.rendered = function() {                                                                 // 135
		$modal = $(this.find('#login-buttons-enroll-account-modal'));                                                        // 136
		$modal.modal();                                                                                                      // 137
	};                                                                                                                    // 138
                                                                                                                       // 139
	//                                                                                                                    // 140
	// justVerifiedEmailDialog template                                                                                   // 141
	//                                                                                                                    // 142
                                                                                                                       // 143
	Template._justVerifiedEmailDialog.events({                                                                            // 144
		'click #just-verified-dismiss-button': function() {                                                                  // 145
			loginButtonsSession.set('justVerifiedEmail', false);                                                                // 146
		}                                                                                                                    // 147
	});                                                                                                                   // 148
                                                                                                                       // 149
	Template._justVerifiedEmailDialog.helpers({                                                                           // 150
		visible: function() {                                                                                                // 151
			if (loginButtonsSession.get('justVerifiedEmail')) {                                                                 // 152
				setTimeout(function() {                                                                                            // 153
					$('#login-buttons-email-address-verified-modal').modal()                                                          // 154
				}, 500)                                                                                                            // 155
			}                                                                                                                   // 156
			return loginButtonsSession.get('justVerifiedEmail');                                                                // 157
		}                                                                                                                    // 158
	});                                                                                                                   // 159
                                                                                                                       // 160
                                                                                                                       // 161
	//                                                                                                                    // 162
	// loginButtonsMessagesDialog template                                                                                // 163
	//                                                                                                                    // 164
                                                                                                                       // 165
	// Template._loginButtonsMessagesDialog.rendered = function() {                                                       // 166
	//   var $modal = $(this.find('#configure-login-service-dialog-modal'));                                              // 167
	//   $modal.modal();                                                                                                  // 168
	// }                                                                                                                  // 169
                                                                                                                       // 170
	Template._loginButtonsMessagesDialog.events({                                                                         // 171
		'click #messages-dialog-dismiss-button': function() {                                                                // 172
			loginButtonsSession.resetMessages();                                                                                // 173
		}                                                                                                                    // 174
	});                                                                                                                   // 175
                                                                                                                       // 176
	Template._loginButtonsMessagesDialog.helpers({                                                                        // 177
		visible: function() {                                                                                                // 178
			var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                 // 179
			return !Accounts._loginButtons.dropdown() && hasMessage;                                                            // 180
		}                                                                                                                    // 181
	});                                                                                                                   // 182
                                                                                                                       // 183
                                                                                                                       // 184
	//                                                                                                                    // 185
	// configureLoginServiceDialog template                                                                               // 186
	//                                                                                                                    // 187
                                                                                                                       // 188
	Template._configureLoginServiceDialog.events({                                                                        // 189
		'click .configure-login-service-dismiss-button': function(event) {                                                   // 190
			event.stopPropagation();                                                                                            // 191
			loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                               // 192
			$('#configure-login-service-dialog-modal').modal('hide');                                                           // 193
		},                                                                                                                   // 194
		'click #configure-login-service-dialog-save-configuration': function() {                                             // 195
			if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                                // 196
				!loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                             // 197
				// Prepare the configuration document for this login service                                                       // 198
				var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                               // 199
				var configuration = {                                                                                              // 200
					service: serviceName                                                                                              // 201
				};                                                                                                                 // 202
				_.each(configurationFields(), function(field) {                                                                    // 203
					configuration[field.property] = document.getElementById(                                                          // 204
						'configure-login-service-dialog-' + field.property).value                                                        // 205
						.replace(/^\s*|\s*$/g, ""); // trim;                                                                             // 206
				});                                                                                                                // 207
                                                                                                                       // 208
				// Configure this login service                                                                                    // 209
				Meteor.call("configureLoginService", configuration, function(error, result) {                                      // 210
					if (error){                                                                                                       // 211
						Meteor._debug("Error configuring login service " + serviceName, error);                                          // 212
					} else {                                                                                                          // 213
						loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                            // 214
					}                                                                                                                 // 215
					$('#configure-login-service-dialog-modal').modal('hide');                                                         // 216
				});                                                                                                                // 217
			}                                                                                                                   // 218
		},                                                                                                                   // 219
		// IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                          // 220
		// well. (Keeping the 'input' event means that this also fires when you use                                          // 221
		// the mouse to change the contents of the field, eg 'Cut' menu item.)                                               // 222
		'input, keyup input': function(event) {                                                                              // 223
			// if the event fired on one of the configuration input fields,                                                     // 224
			// check whether we should enable the 'save configuration' button                                                   // 225
			if (event.target.id.indexOf('configure-login-service-dialog') === 0){                                               // 226
				updateSaveDisabled();                                                                                              // 227
			}                                                                                                                   // 228
		}                                                                                                                    // 229
	});                                                                                                                   // 230
                                                                                                                       // 231
	// check whether the 'save configuration' button should be enabled.                                                   // 232
	// this is a really strange way to implement this and a Forms                                                         // 233
	// Abstraction would make all of this reactive, and simpler.                                                          // 234
	var updateSaveDisabled = function() {                                                                                 // 235
		var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                   // 236
			return document.getElementById(                                                                                     // 237
				'configure-login-service-dialog-' + field.property).value === '';                                                  // 238
		});                                                                                                                  // 239
                                                                                                                       // 240
		loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                   // 241
	};                                                                                                                    // 242
                                                                                                                       // 243
	// Returns the appropriate template for this login service.  This                                                     // 244
	// template should be defined in the service's package                                                                // 245
	var configureLoginServiceDialogTemplateForService = function() {                                                      // 246
		var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                                 // 247
		return Template['configureLoginServiceDialogFor' + capitalize(serviceName)];                                         // 248
	};                                                                                                                    // 249
                                                                                                                       // 250
	var configurationFields = function() {                                                                                // 251
		var template = configureLoginServiceDialogTemplateForService();                                                      // 252
		return template.fields();                                                                                            // 253
	};                                                                                                                    // 254
                                                                                                                       // 255
	Template._configureLoginServiceDialog.helpers({                                                                       // 256
		configurationFields: function() {                                                                                    // 257
			return configurationFields();                                                                                       // 258
		},                                                                                                                   // 259
                                                                                                                       // 260
		visible: function() {                                                                                                // 261
			return loginButtonsSession.get('configureLoginServiceDialogVisible');                                               // 262
		},                                                                                                                   // 263
                                                                                                                       // 264
		configurationSteps: function() {                                                                                     // 265
			// renders the appropriate template                                                                                 // 266
			return configureLoginServiceDialogTemplateForService();                                                             // 267
		},                                                                                                                   // 268
                                                                                                                       // 269
		saveDisabled: function() {                                                                                           // 270
			return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                          // 271
		}                                                                                                                    // 272
	});                                                                                                                   // 273
                                                                                                                       // 274
                                                                                                                       // 275
	;                                                                                                                     // 276
                                                                                                                       // 277
                                                                                                                       // 278
                                                                                                                       // 279
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 280
	var capitalize = function(str) {                                                                                      // 281
		str = str == null ? '' : String(str);                                                                                // 282
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 283
	};                                                                                                                    // 284
                                                                                                                       // 285
})();                                                                                                                  // 286
                                                                                                                       // 287
                                                                                                                       // 288
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ian:accounts-ui-bootstrap-3'] = {
  accountsUIBootstrap3: accountsUIBootstrap3
};

})();
