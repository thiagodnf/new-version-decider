const { FileUtils } = require("../utils/file-utils");

class NodeJSLoader {

    getCurrentVersion(file) {

        file = file || "package.json";

        const content = FileUtils.getContent(file);

        const json = JSON.parse(content);

        if (!json.version) {
            throw new Error("`version` was not found at " + file);
        }

        return json.version;
    }
}

exports.NodeJSLoader = NodeJSLoader;
