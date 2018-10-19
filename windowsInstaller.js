var electronInstaller = require('electron-winstaller');
const path = require('path')
// resultPromise = electronInstaller.createWindowsInstaller({
//     appDirectory: './out/合同管理系统-win32-ia32',
//     outputDirectory: './windows32',
//     authors: 'cyd',
//     exe: '合同管理系统.exe',
//     noMsi: true,
//     setupExe: 'ElectronContractSetup.exe',
//     setupIcon: path.join('assets', 'app-icon', 'win', 'app.ico'),
//     skipUpdateIcon: true,
//     name: "ElectronContract"
//   });

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './release/win-unpacked',
  outputDirectory: './windows32',
  authors: 'cyd',
  exe: 'angular-electron.exe',
  noMsi: true,
  setupExe: 'ElectronContractSetup.exe',
  setupIcon: path.join('assets', 'app-icon', 'win', 'app.ico'),
  skipUpdateIcon: true,
  name: "ElectronContract"
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));