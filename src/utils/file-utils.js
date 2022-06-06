// import fs from "fs";
const fs  = require("fs");
// const path  = require("path");

class FileUtils {

    static isWorkspaceEmpty() {

        return FileUtils.isEmpty(FileUtils.getWorkspacePath());
    }

    static getWorkspacePath() {

        return process.env["GITHUB_WORKSPACE"];
    }

    static exists(fileOrPath) {

        return fs.existsSync(fileOrPath);
    }

    static isEmpty(path) {

        if (!FileUtils.exists(path)) {
            throw new Error(`${path} does not exist`);
        }

        return fs.readdirSync(path).length === 0;
    }
}

exports.FileUtils = FileUtils;
