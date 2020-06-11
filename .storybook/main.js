const path = require('path');

module.exports = {
  stories: ['../components/**/*.stories.js','../utils/Icons/index.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    const customConfig = { ...config };
    customConfig.resolve.modules = [
      ...config.resolve.modules,
      path.resolve('./'),
    ];
    return customConfig;
  },
};
