const {I, global} = inject();

/*
    This step verify the response payload in high level
* */
Then('the response payload should be:', (table) => {
    for (const id in table.rows) {
        if (id < 1) {
            continue; // skip a header of a table
        }
        // go by row cells
        const cells = table.rows[id].cells;

        // take values
        const responseKey = cells[0].value;
        const objectType = cells[1].value;

        /* object or primitive type is returned and verify it with payload.
           refer https://developer.marvel.com/docs
        */
        switch (responseKey) {
            case 'code':
                I.assertEqual(typeof global.response.data.data.code, objectType, "Expected object was " + objectType);
                break;
            case 'status':
                I.assertEqual(typeof global.response.data.data.status, objectType, "Expected object was " + objectType);
                break;
            case 'copyright':
                I.assertEqual(typeof global.response.data.data.copyright, objectType, "Expected object was " + objectType);
                break;
            case 'attributionText':
                I.assertEqual(typeof global.response.data.data.attributionText, objectType, "Expected object was " + objectType);
                break;
            case 'attributionHTML':
                I.assertEqual(typeof global.response.data.data.attributionHTML, objectType, "Expected object was " + objectType);
                break;
            case 'data':
                I.assertEqual(typeof global.response.data.data.data, objectType, "Expected object was " + objectType);
                break;
            case 'etag':
                I.assertEqual(typeof global.response.data.data.etag, objectType, "Expected object was " + objectType);
                break;
            default:
                I.say("In valid Payload Argument", 'blue');
        }
    }
});

