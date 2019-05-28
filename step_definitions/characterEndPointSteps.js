const {I, global} = inject();

Then('the response body should include:', async (table) => {
    for (const id in table.rows) {
        if (id < 1) {
            continue; // skip a header of a table
        }
        // go by row cells
        const cells = table.rows[id].cells;

        // take values
        const responseKey = cells[0].value;
        const responseValue = cells[1].value;

        //object or primitive type is returned and verify it with payload.
        switch (responseKey) {
            case 'character Name':
                I.assertEqual(global.response.data.data.results[0].name, responseValue, "Expected value was " + responseValue);
                break;
            case 'Last Modified ':
                I.assertEqual(1, global.response.data.data.results[0].modified > "Jan 01 2014", "Last modification was earlier than Jan 2014");
                break;
            case 'Image URL':
                let imageURL = global.response.data.data.results[0].thumbnail.path;
                let imageResponse = await I.sendGetRequest(imageURL);
                I.assertEqual(200, imageResponse.status, "Invalid Image URL.");
                break;
            default:
                I.say("In valid response body", 'blue');
        }
    }
});
