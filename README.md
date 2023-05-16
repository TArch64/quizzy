# Jest Setup commands

1. Install and init jest
```shell
npm i -D jest jest-environment-jsdom @swc/core @swc/jest
npx jest --init
```
2. Add base config

```javascript
module.exports = {
    clearMocks: true,
    testEnvironment: "jsdom",

    transform: {
        '^.+\\.js$': '@swc/jest',
    },
};
```
