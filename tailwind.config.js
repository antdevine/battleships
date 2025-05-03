export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
      extend: {
        gridTemplateColumns: {
          11: 'repeat(11, minmax(0, 1fr))', // Adds `grid-cols-11`
        },
      },
    },
    plugins: [],
  };