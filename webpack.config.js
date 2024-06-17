const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const { match } = require('assert');

const getBlocks = () => {
  dirPath = path.resolve(__dirname, 'src', 'data', 'blocks');
  
  const blocks = {};


   fs.readdirSync(dirPath).map(filename => {
    const curr =  fs.readFileSync(path.resolve(dirPath,  filename), 'utf-8');
    
    if (filename.match(/\.json$/i)) {
      blocks[filename.split('.')[0]] = JSON.parse(curr);
    }   
  }) ;
  
  return blocks;
}


module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '!!handlebars-loader!src/index.html',
      templateParameters: {
        blocks: getBlocks()
      }
		}),
	],
};
