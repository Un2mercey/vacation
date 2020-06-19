const path = require('path');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const DESTINATION = path.resolve( __dirname, '.tmp' );
const usersFileJson = './static/users.json';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, ".tmp"),
        compress: true,
        port: 7001,
        setup(app) {
            app.post('/getUsers.api', bodyParser.json(), (getUsersApiRequest, getUsersApiResponse) => {
                jsonfile.readFile(usersFileJson)
                    .then((data) => {
                        getUsersApiResponse.send(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
            app.post('/writeNewUser.api',  bodyParser.json(), (writeNewUserRequest, writeNewUserResponse) => {
                jsonfile.writeFile(usersFileJson, writeNewUserRequest.body, { spaces: 2, EOL: '\r\n' })
                    .then((response) => {
                        writeNewUserResponse.send({
                            message: 'Writing file succsess!'
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }
    },

    output: {
        path: DESTINATION,
        filename: 'js/index.js'
    },
});
