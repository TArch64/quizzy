module.exports = {
    clearMocks: true,
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'json', 'vue'],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest'
    },
};
