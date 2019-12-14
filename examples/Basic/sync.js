const exec = require('child_process').exec;

function callback(err) {
  if (err) {
    console.error(`exec error: ${err}`);
  }
}

exec('mkdir -p node_modules/react-native-custom-actionsheet', callback);
exec(
  'cp ../../package.json node_modules/react-native-custom-actionsheet',
  callback,
);
exec('cp -r ../../lib node_modules/react-native-custom-actionsheet', callback);
