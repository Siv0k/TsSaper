const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'scripts', 'script.ts'),
    output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'script.js',
    }
}