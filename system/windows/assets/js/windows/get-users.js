/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ipcRenderer } = window.electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF FUNCTIONS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » FUNCTION TO SEND UID TO LISTENER FOR OPEN WINDOW SET USER
const doEditUser = uid => {
  ipcRenderer.send('show-window-set-user', uid);
};

// » FUNCTION TO DELETE USER
const doDeleteUser = uid => {
  ipcRenderer.send('delete-user-send', uid);
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ IPC'S RENDERER EVENT LISTENERS (INTER-PROCESS COMMUNICATION)                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » SUCCESS EVENT FOR GET USERS
ipcRenderer.on('get-users-send-success', (event, arg) => {
  const { usersResult, operation } = arg;
  const { users } = usersResult;

  M.toast({
    html: operation,
    displayLength: 3000,
    classes: 'green',
  });

  const userItems = users.reduce((html, user) => {
    html += `
    <tr>
      <td>${user.displayName}</td>
      <td>${user.email}</td>
      <td>
        <a class="btn-floating yellow" onclick="doEditUser('${user.uid}')">
          <i class="material-icons">create</i>
        </a>
      </td>
      <td>
        <a class="btn-floating red" onclick="doDeleteUser('${user.uid}')">
          <i class="material-icons">delete</i>
        </a>
      </td>
    </tr>
    `;

    return html;
  }, '');

  const listUsers = document.getElementById('tbody-users');

  listUsers.innerHTML = userItems;
});

// » ERROR EVENT FOR GET USERS
ipcRenderer.on('get-users-send-error', (event, error) => {
  M.toast({
    html: error,
    displayLength: 3000,
    classes: 'red',
  });
});

// » SUCCESS EVENT REPLY FOR DELETE USER
ipcRenderer.on('delete-user-reply-success', (event, error) => {
  M.toast({
    html: error,
    displayLength: 3000,
    classes: 'red',
  });
});
