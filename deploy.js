/* eslint-disable */
const params = {
    host: '{{domain}}',
    root: '',
    password: '',
    user: null,
};


process.argv.forEach(function (arg, index, array) {
    const arrArg = arg.split('=');
    params[arrArg[0]] = arrArg[1];
});

console.warn(params);

const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const config = {
    user: params.user,
    password: params.password,
    host: params.host,
    port: 21,
    localRoot: `${__dirname}/`,
    remoteRoot: `/${params.root}`,
    include: ['index.html', 'renderer-bundle.js', 'css/**', 'fonts/**', 'img/**', 'icons/**'],
    exclude: ['node_modules/**'],
    deleteRoot: false,
};

ftpDeploy.on('uploading', function(data) {
    console.log(`Uploading: ${data.filename}`);
});

ftpDeploy.on('uploaded', function(data) {
    console.log(`Uploaded: ${data.filename} (Progress: ${data.transferredFileCount}/${data.totalFilesCount})`);
});

// use with promises
ftpDeploy.deploy(config)
    .then((res) => console.log('Deployment Finished'))
    .catch((err) => console.log(err));
