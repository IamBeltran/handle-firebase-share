//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { ipcRenderer } = window.electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ TARGET EVENT LISTENERS                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// » EVENT LISTENER FOR BUTTON
// » WITH ID BTN-ADD-USER
document.getElementById('btn-add-user').addEventListener('click', () => {
  ipcRenderer.send('show-window-add-user');
});

// » EVENT LISTENER FOR BUTTON
// » WITH ID BTN-GET-USERS
document.getElementById('btn-get-users').addEventListener('click', () => {
  ipcRenderer.send('show-window-get-users');
});
