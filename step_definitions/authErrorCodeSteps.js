const {I, global} = inject();
var md5 = require("blueimp-md5"); // lib for MD5 hash value
let qParams; // store query params for auth

Given('I am Server Side Application with {string} QueryParams', (qParamsType) => {
    var milliseconds = (new Date).getTime(); //get epoch time
    var hashValue = md5(milliseconds + global.privateKey + global.publicKey); //generate hash value

    /*  Set the header values for validation
        The format should be as follows,
        http://{domain}{path}?ts={timestamp}&apikey={your_public_key}&hash={hash}
    */
    switch (qParamsType) {
        case 'Valid':
            qParams = "?ts=" + milliseconds + "&apikey=" + global.publicKey + "&hash=" + hashValue;
            break;
        case 'No API Key':
            qParams = "?ts=" + milliseconds + "&hash=" + hashValue;
            break;
        case 'No Hash':
            qParams = "?ts=" + milliseconds + "&apikey=" + global.publicKey;
            break;
        case 'No Timestamp':
            qParams = "?apikey=" + global.publicKey + "&hash=" + hashValue;
            break;
        case 'Invalid Hash':
            qParams = "?ts=" + milliseconds + "&apikey=" + global.publicKey + "&hash=invalid";
            break;
        case 'Invalid Referer':
            qParams = "?ts=" + milliseconds + "&apikey=invalid&hash=" + hashValue;
            break;
        default:
            I.say("In valid Query Params", 'blue');
    }
});

When('Response status code should be {string}', (code) => {
    I.assertEqual(code, global.response.status, "ERROR: Expected Status code is " + code + ". But got" + global.response.status);
});

Then('Response status message should be {string}', (codeText) => {
    I.assertEqual(codeText, global.response.statusText, "ERROR: Expected Error Message is '" + codeText + "'. But got '" + global.response.statusText + "'");
});

When('I send a {string} request to {string}', async (httpMethod, endPoint) => {
    global.response = ""; //set response to null

    switch (httpMethod) {
        case 'GET':
            global.response = await I.sendGetRequest(endPoint + qParams);
            break;
        case 'POST':
            // create a post and save its Id
            let postId = await I.sendPostRequest(endPoint + qParams, {});
            break;
        default:
            I.say("In valid HTTP method", 'blue');
    }
});
