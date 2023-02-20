export default {
    testMatch: ['**/specs/**/*.spec.*'],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    reporters: ['default', "jest-junit",
        [
            "jest-allure", {
                "publicPath": "./allure-report"
            }
        ]],
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['jest-allure/dist/setup']
}
