const { I } = inject();
var md5   = require("blueimp-md5"); // generate MD5 hash value


Given('I am Server Side Application', () => {
  var milliseconds = (new Date).getTime(); //get epoch time
  var hashValue = md5(milliseconds+"abcd1234");
});
