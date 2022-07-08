const core = require("@actions/core");

const { GitHubApiUtils } = require("./utils/githubapi-utils");
const { FileUtils } = require("./utils/file-utils");
const { LoaderUtils } = require("./utils/loader-utils");

// most @actions toolkit packages have async methods
async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        let loader = core.getInput("loader");
        let configurationFile = core.getInput("configurationFile");

        const { id, latestRelease } = await GitHubApiUtils.getLatestRelease();
        const currentVersion = await LoaderUtils.getCurrentVersion(loader, configurationFile);

        core.info("id: " + id);
        core.info("latestRelease: " + latestRelease);
        core.info("currentVersion: " + currentVersion);
        core.info("newVersion: " + (latestRelease !== currentVersion));

        core.setOutput("id", id);
        core.setOutput("latestRelease", latestRelease);
        core.setOutput("currentVersion", currentVersion);
        core.setOutput("newVersion", latestRelease !== currentVersion);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
