module.exports = {
    clearMocks: true,
    testEnvironment: "jsdom",

    transform: {
        '^.+\\.js$': '@swc/jest',
    },
};
