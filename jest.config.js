export default {
    testMatch: ['**/specs/**/*.spec.*'],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    reporters: ['default', 'jest-allure', [
        "jest-html-reporters", {
            "publicPath": "./jest-html-report",
            "filename": "report.html",
            "openReport": true
        }
    ]],
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['jest-allure/dist/setup']
}
