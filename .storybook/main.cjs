module.exports = {
  "stories": ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@chakra-ui/storybook-addon"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  "refs": {
    '@chakra-ui/react': {
      "disable": false
    }
  },
  "features": {
    "storyStoreV7": true,
    "emotionAlias": false
  },
  docs: {
    autodocs: true
  }
};