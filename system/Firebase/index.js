/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-global-assign */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'xxxxxx',
  });
}

const auth = admin.auth();

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

/**
 * @name          getErrorMessage
 * @description   Function that returs a string with the error of operation
 * @param         {{ code: string, message: string }} error - The error of operation
 * @returns       {string} operation error message
 */
const getErrorMessage = error => {
  const { code } = error;
  let message;

  switch (code) {
    case 'auth/claims-too-large':
      message =
        'La carga útil del reclamo que se entregó a setCustomUserClaims() supera el tamaño máximo de 1,000 bytes.';
      break;
    case 'auth/id-token-expired':
      message = 'El token de ID de Firebase que se proporcionó venció.';
      break;
    case 'auth/id-token-revoked':
      message = 'Se revocó el token de ID de Firebase.';
      break;
    case 'auth/invalid-argument':
      message =
        'Se proporcionó un argumento no válido para un método de autenticación. El mensaje de error debería incluir información adicional.';
      break;
    case 'auth/invalid-claims':
      message =
        'Los atributos personalizados del reclamo que se entregaron a setCustomUserClaims() no son válidos.';
      break;
    case 'auth/invalid-continue-uri':
      message = 'La URL de continuación debe ser una string de URL válida.';
      break;
    case 'auth/invalid-creation-time':
      message = 'La hora de creación debe ser una string de fecha en formato UTC válida.';
      break;
    case 'auth/invalid-disabled-field':
      message =
        'El valor que se proporcionó para la propiedad del usuario disabled no es válido. Debe ser un booleano.';
      break;
    case 'auth/invalid-display-name':
      message =
        'El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una string que no esté vacía.';
      break;
    case 'auth/invalid-dynamic-link-domain':
      message =
        'El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual.';
      break;
    case 'auth/invalid-email-verified':
      message =
        'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido. Debe ser un booleano.';
      break;
    case 'auth/invalid-email':
      message =
        'El valor que se proporcionó para la propiedad de usuario email no es válido. Debe ser una dirección de correo electrónico de string.';
      break;
    case 'auth/invalid-hash-algorithm':
      message =
        'El algoritmo de hash debe coincidir con las strings de la lista de algoritmos compatibles.';
      break;
    case 'auth/invalid-hash-block-size':
      message = 'El tamaño del conjunto de hash debe ser un número válido.';
      break;
    case 'auth/invalid-hash-derived-key-length':
      message = 'La longitud de la clave derivada de hash debe ser un número válido.';
      break;
    case 'auth/invalid-hash-key':
      message = 'La clave de hash debe ser un búfer de bytes válido.';
      break;
    case 'auth/invalid-hash-memory-cost':
      message = 'El costo de la memoria de hash debe ser un número válido.';
      break;
    case 'auth/invalid-hash-parallelization':
      message = 'La paralelización de hash debe ser un número válido.';
      break;
    case 'auth/invalid-hash-rounds':
      message = 'Las rondas de hash deben ser un número válido.';
      break;
    case 'auth/invalid-hash-salt-separator':
      message =
        'El campo del separador de sal del algoritmo de hash debe ser un búfer de bytes válido.';
      break;
    case 'auth/invalid-id-token':
      message = 'El token de ID que se proporcionó no es un token de ID de Firebase válido.';
      break;
    case 'auth/invalid-last-sign-in-time':
      message = 'La hora del último acceso debe ser una string de fecha en formato UTC válida.';
      break;
    case 'auth/invalid-page-token':
      message =
        'El token de página siguiente que se entregó en listUsers() no es válido. Debe ser una string válida que no esté vacía.';
      break;
    case 'auth/invalid-password':
      message =
        'El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres.';
      break;
    case 'auth/invalid-password-hash':
      message = 'El hash de contraseñas debe ser un búfer de bytes válidos.';
      break;
    case 'auth/invalid-password-salt':
      message = 'La contraseña con sal debe ser un búfer de bytes válidos.';
      break;
    case 'auth/invalid-phone-number':
      message =
        'El valor que se proporcionó para phoneNumber no es válido. Debe ser una string de identificador que no esté vacía y que cumpla con el estándar E.164.';
      break;
    case 'auth/invalid-photo-url':
      message =
        'El valor que se proporcionó para la propiedad de usuario photoURL no es válido. Debe ser una URL de string.';
      break;
    case 'auth/invalid-provider-data':
      message = 'providerData debe ser una serie de objetos UserInfo.';
      break;
    case 'auth/invalid-provider-id':
      message = 'providerId debe ser una string del identificador del proveedor compatible válida.';
      break;
    case 'auth/invalid-session-cookie-duration':
      message =
        'La duración de las cookies de la sesión debe ser un número válido en milisegundos que vaya entre los 5 minutos y las 2 semanas.';
      break;
    case 'auth/invalid-uid':
      message =
        'El uid proporcionado debe ser una string no vacía con un máximo de 128 caracteres.';
      break;
    case 'auth/invalid-user-import':
      message = 'El registro de usuarios para importar no es válido.';
      break;
    case 'auth/maximum-user-count-exceeded':
      message = 'Se excedió el número máximo de usuarios permitidos para importar.';
      break;
    case 'auth/missing-android-pkg-name':
      message =
        'Se debe proporcionar un nombre de paquete de Android si es necesario instalar la app para Android.';
      break;
    case 'auth/missing-continue-uri':
      message = 'Se debe proporcionar una URL de continuación válida en la solicitud.';
      break;
    case 'auth/missing-hash-algorithm':
      message =
        'Es necesario proporcionar el algoritmo de hash y sus parámetros para importar usuarios con hash de contraseñas.';
      break;
    case 'auth/missing-ios-bundle-id':
      message = 'La solicitud debe contener un ID del paquete de iOS.';
      break;
    case 'auth/missing-uid':
      message = 'Se requiere un identificador uid para la operación actual.';
      break;
    case 'auth/reserved-claims':
      message =
        'Uno o más de los reclamos personalizados de usuarios que se entregaron a setCustomUserClaims() están reservados. Por ejemplo, no deben usarse reclamos específicos de OIDC (p. ej., sub, iat, iss, exp, aud o auth_time) como claves para reclamos personalizados.';
      break;
    case 'auth/session-cookie-expired':
      message = 'La cookie proporcionada de la sesión de Firebase venció.';
      break;
    case 'auth/session-cookie-revoked':
      message = 'Se revocaron las cookies de la sesión de Firebase.';
      break;
    case 'auth/uid-already-exists':
      message =
        'Otro usuario ya utiliza el uid proporcionado. Cada usuario debe tener un uid único.';
      break;
    case 'auth/unauthorized-continue-uri':
      message =
        'El dominio de la URL de continuación no está en la lista blanca. Inclúyelo a la lista en Firebase console.';
      break;
    case 'auth/email-already-exists':
      message =
        'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.';
      break;
    case 'auth/user-not-found':
      message =
        'No existe ningún registro de usuario que corresponda al identificador proporcionado.';
      break;
    case 'auth/operation-not-allowed':
      message =
        'El proveedor de acceso proporcionado está inhabilitado para tu proyecto de Firebase. Habilítalo en la sección Método de acceso de Firebase console.';
      break;
    case 'auth/invalid-credential':
      message =
        'La credencial que se usa en la autenticación de los SDK de Admin no se puede emplear para realizar la acción deseada. Algunos métodos de autenticación como createCustomToken() y verifyIdToken() requieren que los SDK se inicialicen con una credencial de certificado en lugar de un token de actualización o una credencial predeterminada de la aplicación. Consulta Inicializar el SDK para ver documentación sobre cómo autenticar el SDK de Admin con una credencial de certificado.';
      break;
    case 'auth/phone-number-already-exists':
      message =
        'Otro usuario ya está utilizando el phoneNumber proporcionado. Cada usuario debe tener un phoneNumber único.';
      break;
    case 'auth/project-not-found':
      message =
        'No se encontró ningún proyecto de Firebase para la credencial que se usó para inicializar los SDK de administrador. Consulta Cómo agregar Firebase a tu app para ver la documentación sobre cómo generar una credencial para tu proyecto y usarla para autenticar los SDK de Admin.';
      break;
    case 'auth/insufficient-permission':
      message =
        'La credencial que se usó para inicializar el SDK de Admin no tiene permisos suficientes para acceder al recurso de autenticación solicitado. Consulta Cómo agregar Firebase a tu app para ver la documentación sobre cómo generar una credencial con permisos apropiados y usarla para autenticar los SDK de Admin.';
      break;
    case 'auth/internal-error':
      message =
        'El servidor de autenticación encontró un error inesperado al tratar de procesar la solicitud. El mensaje de error debe contener la respuesta del servidor de autenticación que contiene información adicional. Si el error persiste, informa el problema a nuestro canal de asistencia de informe de errores. ';
      break;
    default:
      message = 'Algo salió mal en la autentificación, vuelva a intentar';
      break;
  }

  return message;
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

/**
 * @name          addUser
 * @description   Creates a new user for firebase projects
 * @param         {{displayName: string, email:string, password: string}} { displayName, email, password }
 * @returns       {Promise.<string>} If resolve return UserRecord, if not return error message
 */
const addUser = ({ displayName, email, password }) => {
  return new Promise(async (resolve, reject) => {
    return auth
      .createUser({
        displayName,
        email,
        password,
        emailVerified: true,
      })
      .then(userRecord => {
        return resolve(userRecord);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

/**
 * @name          getUsers
 * @description   Function that returs users of firebase project
 * @param         {number} maxResults - The page size, 1000 if undefined. This is also the maximum allowed limit.
 * @param         {string} nextPageToken - The next page token. If not specified, returns users starting without any offset.
 * @returns       {Promise.<string>} If resolve return UserRecord, if not return error message
 */
const getUsers = (maxResults = 1000, nextPageToken) => {
  return new Promise(async (resolve, reject) => {
    return auth
      .listUsers(maxResults, nextPageToken)
      .then(listUsersResult => {
        return resolve(listUsersResult);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

/**
 * @name          getUserByUID
 * @description   Function that returs users of firebase project
 * @param         {string} uid - User Unique Id
 * @returns       {Promise.<string>} If resolve return UserRecord, if not return error message
 */
const getUserByUID = uid => {
  return new Promise(async (resolve, reject) => {
    return auth
      .getUser(uid)
      .then(userRecord => {
        return resolve(userRecord);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

/**
 * @name          getUserByEmail
 * @description   Function that returs users of firebase project
 * @param         {string} email - Email Unique Id
 * @returns       {Promise.<string>} If resolve return UserRecord, if not return error message
 */
const getUserByEmail = email => {
  return new Promise(async (resolve, reject) => {
    return auth
      .getUserByEmail(email)
      .then(userRecord => {
        return resolve(userRecord);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

/**
 * @name          setUser
 * @description   Function that returs users of firebase project
 * @param         {string} uid - User Unique Id
 * @param         {{displayName: string, email:string, password: string}} { displayName, email, password }
 * @returns       {Promise.<string>} If resolve return UserRecord, if not return error message
 */
const setUser = (uid, { displayName, email, password }) => {
  return new Promise(async (resolve, reject) => {
    return auth
      .updateUser(uid, {
        email,
        password,
        displayName,
      })
      .then(userRecord => {
        return resolve(userRecord);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

/**
 * @name          deleteUser
 * @description   Function that returs users of firebase project
 * @param         {string} uid - User Unique Id
 * @returns       {Promise.<string>} If resolve return true, if not return error message
 */
const deleteUser = uid => {
  return new Promise(async (resolve, reject) => {
    return auth
      .deleteUser(uid)
      .then(() => {
        return resolve(true);
      })
      .catch(error => {
        const message = getErrorMessage(error);

        return reject(message);
      });
  });
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const authFirebase = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// » Main modules
authFirebase.addUser = addUser;
authFirebase.getUsers = getUsers;
authFirebase.getUserByUID = getUserByUID;
authFirebase.getUserByEmail = getUserByEmail;
authFirebase.setUser = setUser;
authFirebase.deleteUser = deleteUser;
