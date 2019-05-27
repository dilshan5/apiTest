const {I} = inject();
var md5 = require("blueimp-md5"); // generate MD5 hash value
let response; //store API response
let qParams; // store query params for auth

Given('I am Server Side Application with {string} in QueryParams', (qParamsType) => {
    var milliseconds = (new Date).getTime(); //get epoch time
    var hashValue = md5(milliseconds + "abcd1234"); //convert to MD5

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
    response = await I.sendGetRequest(endPoint + qParams);
});

When('Response status code should be {string}', (code) => {
    I.assertEqual(code, response.status, "ERROR: Expected Status code is " + code + ". But got" + response.status);
});

Then('Response status message should be {string}', (codeText) => {
    I.assertEqual(codeText, response.statusText, "ERROR: Expected Error Message is '" + codeText + "'. But got '" + response.statusText + "'");
});
