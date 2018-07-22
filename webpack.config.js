var path = require("path");
var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var PATHS = {
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    bundles: path.resolve(__dirname, 'lib'),
}

module.exports = (env) => {
    return config = {
        // These are the entry point of our library. We tell webpack to use
        // the name we assign later, when creating the bundle. We also use
        // the name to filter the second entry point for applying code
        // minification via UglifyJS
        entry: {
            'redux-scaffolding': [PATHS.entryPoint],
            'redux-scaffolding.min': [PATHS.entryPoint]
        },
        // The output defines how and where we want the bundles. The special
        // value `[name]` in `filename` tell Webpack to use the name we defined above.
        output: {
            path: PATHS.bundles,
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            library: 'ReduxScaffolding',
        },
        // Add resolve for `tsx` and `ts` files, otherwise Webpack would
        // only look for common JavaScript file extension (.js)
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                'react': path.resolve(__dirname, './node_modules/react'),
                'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
                'reflect-metadata': path.resolve(__dirname, './node_modules/reflect-metadata'),
                'react-redux': path.resolve(__dirname, './node_modules/react-redux'),
                'redux': path.resolve(__dirname, './node_modules/redux'),
            } 
        },
        // Activate source maps for the bundles in order to preserve the original
        // source when the user debugs the application
        devtool: 'source-map',
        optimization: {
            minimizer: [
                // Apply minification only on the second bundle by
                // using a RegEx on the name, which must end with `.min.js`
                // NB: Remember to activate sourceMaps in UglifyJsPlugin
                // since they are disabled by default!
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    include: /\.min\.js$/,
                })
            ]
        },
        plugins: [
            //new BundleAnalyzerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /(node_modules|bower_components|typings)/,
                    use: [{
                        loader: 'awesome-typescript-loader'
                    }]
                }
            ]
        },
        externals: {
            // Don't bundle react or react-dom      
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "React",
                root: "React"
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "ReactDOM",
                root: "ReactDOM"
            },
            "react-redux": {
                commonjs: "react-redux",
                commonjs2: "react-redux",
                amd: "ReactRedux",
                root: "ReactRedux"
            },
            "redux": {
                commonjs: "redux",
                commonjs2: "redux",
                amd: "Redux",
                root: "Redux"
            },
            "reflect-metadata": {
                commonjs: "reflect-metadata",
                commonjs2: "reflect-metadata",
                amd: "ReflectMetadata",
                root: "ReflectMetadata"
            }
        } 
    }
}