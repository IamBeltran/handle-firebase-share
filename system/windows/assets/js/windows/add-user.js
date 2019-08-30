/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ipcRenderer } = window.electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF FUNCTIONS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » FUNCTION TO GET VALUES OF HTML ELEMENTS OF THE ADD USER
// » AND SEND THE VALUES TO THE MAIN ELECTRON MODULE
// » FOR ADD USER
const doAddUser = async () => {
  const name = document.getElementById('displayName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const hasName = name !== '';
  const hasEmail = email !== '';
  const hasPassword = password !== '';

  if (!hasName && !hasEmail && !hasPassword) {
    M.toast({
      html: 'No se ingreso ningun dato',
      displayLength: 3000,
      classes: 'red',
    });
  }

  // SECTION: MISSING TWO VALUES
  if (!hasName && !hasEmail && hasPassword) {
    M.toast({
      html: 'Falta nombre, email y ',
      displayLength: 3000,
      classes: 'red',
    });
  }

  if (!hasName && hasEmail && !hasPassword) {
    M.toast({
      html: 'Falta nombre y password',
      displayLength: 3000,
      classes: 'red',
    });
  }

  if (hasName && !hasEmail && !hasPassword) {
    M.toast({
      html: 'Falta email y password',
      displayLength: 3000,
      classes: 'red',
    });
  }
  // !SECTION

  // SECTION: MISSING ONE VALUE
  if (!hasName && hasEmail && hasPassword) {
    M.toast({
      html: 'Falto el nombre',
      displayLength: 3000,
      classes: 'red',
    });
  }

  if (hasName && !hasEmail && hasPassword) {
    M.toast({
      html: 'Falto el email',
      displayLength: 3000,
      classes: 'red',
    });
  }

  if (hasName && hasEmail && !hasPassword) {
    M.toast({
      html: 'Falto el password',
      displayLength: 3000,
      classes: 'red',
    });
  } // !SECTION

  if (hasName && hasEmail && hasPassword) {
    ipcRenderer.send('add-user-send', {
      name,
      email,
      password,
    });
  }
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ IPC'S RENDERER EVENT LISTENERS (INTER-PROCESS COMMUNICATION)                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » SUCCESS EVENT REPLY FOR ADD USER
ipcRenderer.on('add-user-reply-success', (event, success) => {
  M.toast({
    html: success,
    displayLength: 3000,
    classes: 'green',
  });
  document.getElementById('displayName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
});

// » ERROR EVENT REPLY FOR ADD USER
ipcRenderer.on('add-user-reply-error', (event, error) => {
  M.toast({
    html: error,
    displayLength: 3000,
    classes: 'red',
  });
  document.getElementById('displayName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
});
