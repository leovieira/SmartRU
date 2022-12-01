module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
    ],
  };
};
