const {I, global} = inject();
var md5 = require("blueimp-md5"); // lib for MD5 hash value
let qParams; // store query params for auth

Given('I am Server Side Application with {string} in QueryParams', (qParamsType) => {
    var milliseconds = (new Date).getTime(); //get epoch time
    console.log("privateKey: "+global.privateKey);
    console.log("publicKey: "+global.publicKey);
    var hashValue = md5(milliseconds + global.privateKey + global.publicKey); //generate to hash value

    //set the header values for validation
    switch (qParamsType) {
        case 'Valid':
            qParams = "?ts=" + milliseconds + "&apikey=1234&hash=" + hashValue;
            break;
        case 'No API Key':
            qParams = "?ts=" + milliseconds + "&hash=" + hashValue;
            break;
        case 'No Hash':
            qParams = "?ts=" + milliseconds + "&apikey=1234";
            break;
        case 'No Timestamp':
            qParams = "?apikey=1234&hash=" + hashValue;
            break;
        case 'Invalid Hash':
            qParams = "?ts=" + milliseconds + "&apikey=1234&hash=wretrsd";
            break;
        case 'Invalid Referer':
            qParams = "?ts=" + milliseconds + "&apikey=1234&hash=" + hashValue;
            break;
        default:
            I.say("In valid Query Params", 'blue');
    }
});

When('I send a GET request to {string}', async (endPoint) => {
    global.response = "" ; //set response to null
    global.response = await I.sendGetRequest(endPoint + qParams);
});

When('Response status code should be {string}', (code) => {
    I.assertEqual(code, global.response.status, "ERROR: Expected Status code is " + code + ". But got" + global.response.status);
});

Then('Response status message should be {string}', (codeText) => {
    I.assertEqual(codeText, global.response.statusText, "ERROR: Expected Error Message is '" + codeText + "'. But got '" + global.response.statusText + "'");
});
