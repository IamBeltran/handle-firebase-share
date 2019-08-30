/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const electron = require('electron');
const isDev = require('electron-is-dev');
const notifier = require('node-notifier');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const url = require('url');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const webcontext = path.join(__dirname, 'system', 'node-integration.js');
const authFirebase = require('./system/Firebase');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { app, BrowserWindow, ipcMain } = electron;
const { addUser, getUsers, getUserByUID, setUser, deleteUser } = authFirebase;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// SECTION: WORSPACE FOR DEVELOPMENT
if (isDev) {
  // Enable live reload for Electron too
  const electronPath = path.resolve(__dirname, 'node_modules/electron');

  require('electron-reload')(__dirname, {
    electron: require(electronPath),
  });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
}
// !SECTION

// SECTION: WORSPACE FOR PRODUCTION
// !SECTION

// » Keep a global reference of the window object, if you don't, the window will
// » be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let getUsersWindow;
let setUserWindow;
let addUserWindow;

// » html file for mainWindow
const mainUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/index.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for setUserWindow
const setUserUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/set-user.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for addUserWindow
const addUserUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/add-user.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for getUsersWindow
const getUsersUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/get-users.html'),
  protocol: 'file:',
  slashes: true,
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
function createWindow() {
  // SECTION: mainWindow
  // » Create mainWindow
  mainWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the mainWindow when it is loaded and ready to show
  mainWindow.loadURL(mainUrl);

  if (!isDev) {
    mainWindow.removeMenu();
  }

  if (isDev) {
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools();
    });
  }

  // » Show the mainWindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // » Hide the mainWindow when close window
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // !SECTION

  // SECTION: addUserWindow
  // » IPC Event show-window-add-user
  ipcMain.on('show-window-add-user', () => {
    if (!addUserWindow) {
      // » Create the addUserWindow
      addUserWindow = new BrowserWindow({
        width: 400,
        height: 650,
        titleBarStyle: 'hidden',
        show: false,
        icon: path.join(__dirname, 'assets/icons/64x64.png'),
        resizable: false,
        fullscreenable: false,
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: false,
          preload: webcontext,
        },
      });

      // » Show the addUserWindow when it is loaded and ready to show
      addUserWindow.loadURL(addUserUrl);

      if (!isDev) {
        addUserWindow.removeMenu();
      }

      // » Show the addUserWindow when it is loaded and ready to show
      addUserWindow.once('ready-to-show', () => {
        addUserWindow.show();
      });

      // » Hide the getUsersWindow when close window
      addUserWindow.on('close', () => {
        addUserWindow = null;
      });
    }
  });
  // !SECTION

  // SECTION: getUsersWindow
  // » IPC Event show-window-get-users
  ipcMain.on('show-window-get-users', () => {
    if (!getUsersWindow) {
      getUsersWindow = new BrowserWindow({
        width: 600,
        height: 650,
        titleBarStyle: 'hidden',
        show: false,
        icon: path.join(__dirname, 'assets/icons/64x64.png'),
        resizable: false,
        fullscreenable: false,
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: false,
          preload: webcontext,
        },
      });

      // » Show the getUsersWindow when it is loaded and ready to show
      getUsersWindow.loadURL(getUsersUrl);

      if (!isDev) {
        getUsersWindow.removeMenu();
      }

      // » Show the mainWindow when it is loaded and ready to show
      getUsersWindow.once('ready-to-show', () => {
        getUsersWindow.show();
      });

      // » Show the mainWindow when it is loaded and ready to show
      getUsersWindow.once('show', async () => {
        await getUsers()
          .then(usersResult => {
            getUsersWindow.webContents.send('get-users-send-success', {
              usersResult,
              operation: 'Se cargaron los usuarios',
            });
          })
          .catch(error => {
            getUsersWindow.webContents.send('get-users-send-error', error);
          });
      });

      // » Hide the getUsersWindow when close window
      getUsersWindow.on('close', () => {
        getUsersWindow = null;
      });
    }
  });
  // !SECTION

  // SECTION: setUserWindow
  // » IPC Event show-window-set-user
  ipcMain.on('show-window-set-user', (even, uid) => {
    if (!setUserWindow) {
      setUserWindow = new BrowserWindow({
        width: 400,
        height: 650,
        titleBarStyle: 'hidden',
        show: false,
        icon: path.join(__dirname, 'assets/icons/64x64.png'),
        resizable: false,
        fullscreenable: false,
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: false,
          preload: webcontext,
        },
      });
    }

    // » Show the getUsersWindow when it is loaded and ready to show
    setUserWindow.loadURL(setUserUrl);

    if (!isDev) {
      setUserWindow.removeMenu();
    }

    // » Show the mainWindow when it is loaded and ready to show
    setUserWindow.once('ready-to-show', () => {
      setUserWindow.show();
    });

    // » Show the mainWindow when it is loaded and ready to show
    setUserWindow.once('show', async () => {
      await getUserByUID(uid)
        .then(userRecord => {
          setUserWindow.webContents.send('set-user-send-success', {
            userRecord,
            operation: 'Se cargo información del usuario',
          });
        })
        .catch(error => {
          setUserWindow.webContents.send('set-user-send-error', error);
        });
    });

    // » Hide the getUsersWindow when close window
    setUserWindow.on('close', () => {
      setUserWindow = null;
    });
  });
  // !SECTION
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ APPLICATION'S EVENT LISTENERS                                                     │
//  └───────────────────────────────────────────────────────────────────────────────────┘
app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ IPC'S EVENT LISTENERS (Inter-Process Communication)                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
ipcMain.on('send-notification', (event, notification) => {
  notifier.notify({
    title: notification.title,
    message: notification.message,
  });
});

// » IPC Event add-user-send
ipcMain.on('add-user-send', async (event, userInfo) => {
  const { name: displayName, email, password } = userInfo;

  await addUser({
    displayName,
    email,
    password,
  })
    .then(async () => {
      event.reply('add-user-reply-success', 'Se agrego usuario');
      await getUsers()
        .then(usersResult => {
          getUsersWindow.webContents.send('get-users-send-success', {
            usersResult,
            operation: 'Se agrego usuario',
          });
        })
        .catch(error => {
          getUsersWindow.webContents.send('get-users-send-error', error);
        });
    })
    .catch(error => {
      event.reply('add-user-reply-error', error);
    });
});

// » IPC Event delete-user-send
ipcMain.on('delete-user-send', async (event, uid) => {
  await deleteUser(uid)
    .then(async () => {
      if (getUsersWindow) {
        await getUsers()
          .then(usersResult => {
            getUsersWindow.webContents.send('get-users-send-success', {
              usersResult,
              operation: 'Se elimino usuario',
            });
          })
          .catch(error => {
            getUsersWindow.webContents.send('get-users-send-error', error);
          });
      }
    })
    .catch(error => {
      event.reply('delete-user-reply-error', error);
    });
});

// » IPC Event set-user-send
ipcMain.on('set-user-send', async (event, userInfo) => {
  const { name: displayName, email, password, uid } = userInfo;

  await setUser(uid, {
    displayName,
    email,
    password,
  })
    .then(async () => {
      event.reply('set-user-reply-success', 'Se actualizo información de usuario');

      if (getUsersWindow) {
        await getUsers()
          .then(usersResult => {
            getUsersWindow.webContents.send('get-users-send-success', {
              usersResult,
              operation: 'Se actualizo información de usuario',
            });
          })
          .catch(error => {
            getUsersWindow.webContents.send('get-users-send-error', error);
          });
      }
    })
    .catch(error => {
      event.reply('set-user-reply-error', error);
    });
});

console.log(app.getPath('userData'));
