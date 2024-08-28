const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function podInstall() {
  if (process.platform !== 'darwin') {
    console.log('Skipping pod install on non-macOS platform');
    return;
  }

  const projectRoot = process.cwd();
  const iosRoot = path.join(projectRoot, 'example', 'ios');

  if (!fs.existsSync(iosRoot)) {
    console.log(`iOS project not found at ${iosRoot}`);
    return;
  }

  console.log('Installing pods...');
  try {
    execSync('pod install', { cwd: iosRoot, stdio: 'inherit' });
    console.log('Pods installed successfully');
  } catch (error) {
    console.error('Failed to install pods:', error.message);
    process.exit(1);
  }
}

module.exports = {
  name: 'pod-install',
  factory: () => ({
    hooks: {
      afterAllInstalled: podInstall,
    },
  }),
};
