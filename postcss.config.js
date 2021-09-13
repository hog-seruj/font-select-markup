module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-mixins': {},
    'postcss-custom-media': {},
    'postcss-nested': {},
    'postcss-extend': {},
    'postcss-preset-env': {
      browsers: [
        '>0.5%',
      ],
      cascade: true,
    },
    'postcss-property-lookup': {},
    'postcss-discard-empty': {},
    'cssnano': env === 'production' ? {} : false,
  },
});
