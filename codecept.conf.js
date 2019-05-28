exports.config = {
    output: './output',
    helpers: {
        REST: {
            endpoint: 'http://gateway.marvel.com',
            timeout: 50000,
            resetHeaders: true
        },
        AssertWrapper: {
            require: "codeceptjs-assert"
        }
    },
    include: {
        I: './steps_file.js',
        global: './data.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: [
            './step_definitions/authErrorCodeSteps.js',
            './step_definitions/comicEndPointSteps.js'
        ]
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        }
    },
    tests: './*_test.js',
    name: 'codeceptjs-apiTest'
}