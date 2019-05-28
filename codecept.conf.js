exports.config = {
    output: './output',
    helpers: {
        REST: {
            endpoint: 'http://gateway.marvel.com', // API base URL
            timeout: 50000,
            defaultHeaders: {
                'Connection': 'keep-alive',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate'
            },
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
    mocha: {
        reporterOptions: {
            reportDir: "output"
        }
    },
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: [
            './step_definitions/authErrorCodeSteps.js',
            './step_definitions/comicEndPointSteps.js',
            './step_definitions/characterEndPointSteps.js'
        ]
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        allure: {
            enabled: true
        }
    },
    tests: './*_test.js',
    name: 'codeceptjs-apiTest'
}