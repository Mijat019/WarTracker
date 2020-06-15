const path = require("path");

module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: "http://localhost:4200",
    },
    outputDir: path.resolve(__dirname, "../backend/dist/public"),
};
