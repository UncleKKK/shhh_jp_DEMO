module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    outputDir: 'dist',
    assetsDir: "assets",
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: true,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.0.1:8000/',
        //         changeOrigin: true,
        //     },
        // },
    },
}