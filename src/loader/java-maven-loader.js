const path = require("path");
const pomParser = require("pom-parser");

const { FileUtils } = require("../utils/file-utils");

class JavaMavenLoader {

    readFile(filePath) {

        return new Promise(function (resolve, reject) {

            pomParser.parse({ filePath }, function (error, result) {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result.pomObject);
            });
        });
    }

    async getCurrentVersion(file) {

        file = file || "./pom.xml";

        const filePath = path.join(FileUtils.getWorkspacePath(), file);

        var content = await this.readFile(filePath);

        if (!content.project.version) {
            throw new Error("`version` was not found at " + file);
        }

        return content.project.version;
    }
}

exports.JavaMavenLoader = JavaMavenLoader;
