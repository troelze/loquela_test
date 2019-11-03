var db = require(__dirname + '/db/queries');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getAvatarUrl(userId) {
    var imageId = (userId % 5) + 1;
    return '/images/' + imageId + '.png';
}

//Helper function to check if username already exists in database
//Returns user information (as object) if login success
//Returns false if login credentials are invalid
function loginCheck(content, username, password) {
  var i;
  for(i=0; i < content.length; i++) {
    if(content[i].username === username && content[i].password_hash === password) {
      return content[i];
    }
  }
  return false;
}

//Helper function to check if username already exists in database
function usernameCheck(content, username) {
  var i;
  for(i=0; i < content.length; i++) {
    if(content[i].username === username) {
      return false;
    }
  }
  return true;
}

//Checks if request does not have an associated user
function notLoggedIn(req) {
  return (!req.session.user);
}

// Because this helper is querying the database and returning a promise, it needs to be called like:
// `helpers.getUserLanguage(userId).then(function(language) { // do stuff with language }`
function getUserLanguage(userId) {
    return new Promise(function(resolve, reject) {
        db.getUserProfileByUserId(userId).then(function(userProfileInfo) {
            if (userProfileInfo) {
                resolve(userProfileInfo[0].language);
            } else {
                resolve('Unknown');
            }
        });
    });
}

function languageToCode(language) {
    languageDict = {
        'afrikaans': 'af-ZA',
        'amharic': 'am-ET',
        'armenian': 'hy-AM',
        'azerbaijani': 'az-AZ',
        'indonesian': 'id-ID',
        'malay': 'ms-MY',
        'bengali': 'bn-IN',
        'catalan': 'ca-ES',
        'czech': 'cs-CZ',
        'danish': 'da-DK',
        'german': 'de-DE',
        'english': 'en-US',
        'spanish': 'es-MX',
        'basque': 'eu-ES',
        'filipino': 'fil-PH',
        'french': 'fr-FR',
        'galician': 'gl-ES',
        'georgian': 'ka-GE',
        'gujarati': 'gu-IN',
        'croatian': 'hr-HR',
        'zulu': 'zu-ZA',
        'icelandic': 'is-IS',
        'italian': 'it-IT',
        'javanese': 'jv-ID',
        'kannada': 'kn-IN',
        'khmer': 'km-KH',
        'lao': 'lo-LA',
        'latvian': 'lv-LV',
        'lithuanian': 'lt-LT',
        'hungarian': 'hu-HU',
        'malayalam': 'ml-IN',
        'marathi': 'mr-IN',
        'dutch': 'nl-NL',
        'nepali': 'ne-NP',
        'norwegian': 'nb-NO',
        'polish': 'pl-PL',
        'portuguese': 'pt-PT',
        'romanian': 'ro-RO',
        'sinhala': 'si-LK',
        'slovak': 'sk-SK',
        'slovenian': 'sl-SI',
        'sundanese': 'su-ID',
        'swahili': 'sw-TZ',
        'finnish': 'fi-FI',
        'swedish': 'sv-SE',
        'tamil': 'ta-IN',
        'telugu': 'te-IN',
        'vietnamese': 'vi-VN',
        'turkish': 'tr-TR',
        'urdu': 'ur-PK',
        'greek': 'el-GR',
        'bulgarian': 'bg-BG',
        'russian': 'ru-RU',
        'serbian': 'sr-RS',
        'ukrainian': 'uk-UA',
        'hebrew': 'he-IL',
        'arabic': 'ar-IQ',
        'persian': 'fa-IR',
        'hindi': 'hi-IN',
        'thai': 'th-TH',
        'korean': 'ko-KR',
        'cantonese': 'yue-Hant-HK',
        'japanese': 'ja-JP',
        'chinese,': 'zh'
    };

    return languageDict[language];
}

module.exports = {
    capitalizeFirstLetter: capitalizeFirstLetter,
    getAvatarUrl: getAvatarUrl,
    loginCheck: loginCheck,
    usernameCheck: usernameCheck,
    notLoggedIn: notLoggedIn,
    languageToCode: languageToCode,
    getUserLanguage: getUserLanguage
};
