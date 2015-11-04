
App.info({
  id: 'com.naterop.dorfbazaar',
  version: '0.9',
  name: 'DorfBazaar',
  description: 'lorem ipsum',
  author: 'Luca Naterop',
  email: 'luca@naterop.net',
  website: 'http://46.101.207.204'
});


App.icons({
  
  'iphone':     'icons/ios/Icon.png',
  'iphone_2x':  'icons/ios/Icon-60@2x.png',
  'ipad':       'icons/ios/Icon-76.png',
  'ipad_2x':    'icons/ios/Icon-76@2x.png',

  'android_ldpi': 'icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'icons/android/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'icons/android/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'icons/android/drawable-xhdpi/ic_launcher.png'
});

/*
App.accessRule('http://imgur.com/*');
App.accessRule('http://i.imgur.com/*');
App.accessRule('https://api.imgur.com/*');
App.accessRule('http://www.femto.it/wp-content/*');
*/
App.accessRule('*');

