const { NodeJSLoader } = require("./loader/nodejs-loader");
const { JavaMavenLoader } = require("./loader/java-maven-loader");

class LoaderUtils {

    static async getCurrentVersion(loader, configurationFile) {

        const loaders = {
            "nodejs": new NodeJSLoader(),
            "java-maven": new JavaMavenLoader()
        };

        if (!loader) {
            throw new Error("The 'loader' parameter should not be blank");
        }

        if (!loaders[loader]) {
            throw new Error("The 'loader' parameter is not valid");
        }

        loader = loaders[loader];

        return loader.getCurrentVersion(configurationFile);
    }
}

exports.LoaderUtils = LoaderUtils;
