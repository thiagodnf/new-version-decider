const core = require("@actions/core");

const { NodeJSLoader } = require("./loader/nodejs-loader");
const { JavaMavenLoader } = require("./loader/java-maven-loader");

const { GitHubApiUtils } = require("./utils/githubapi-utils");
const { FileUtils } = require("./utils/file-utils");

// most @actions toolkit packages have async methods
async function run() {

    const loaders = {
        "nodejs": new NodeJSLoader(),
        "java-maven": new JavaMavenLoader()
    };

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        let loader = core.getInput("loader");
        let configurationFile = core.getInput("configurationFile");

        if (!loader) {
            throw new Error("The 'loader' parameter should not be blank");
        }

        if (!loaders[loader]) {
            throw new Error("The 'loader' parameter is not valid");
        }

        loader = loaders[loader];

        let { id, currentRelease } = await GitHubApiUtils.getLatestRelease();

        const nextRelease = await loader.getCurrentVersion(configurationFile);

        core.setOutput("id", id);
        core.setOutput("currentRelease", currentRelease);
        core.setOutput("nextRelease", nextRelease);
        core.setOutput("shouldGenerateANewVersion", currentRelease !== nextRelease);

        core.info("shouldGenerateANewVersion: "+(currentRelease !== nextRelease));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
