# Jest Setup commands

1. Install and init jest
```shell
# Jest JS dependencies
npm i -D jest babel-jest @babel/core @babel/preset-env
# Jest Vue Dependencies
npm i -D jest-environment-jsdom @vue/vue3-jest @vue/test-utils
npx jest --init
```
2. Add base config
```javascript
module.exports = {
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
```
