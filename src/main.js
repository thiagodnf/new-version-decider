const core = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { FileUtils } = require("./utils/file-utils");

const { NodeJSLoader } = require("./loader/nodejs-loader");
const { JavaMavenLoader } = require("./loader/java-maven-loader");

// most @actions toolkit packages have async methods
async function run() {

    const octokit = new Octokit();

    const loaders = {
        "nodejs": new NodeJSLoader(),
        "java-maven": new JavaMavenLoader()
    };

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        let repository = core.getInput("repository");
        let loader = core.getInput("loader");
        let configurationFile = core.getInput("configurationFile");

        if (!repository) {
            throw new Error("The 'repository' parameter should not be blank");
        }

        if (!loader) {
            throw new Error("The 'loader' parameter should not be blank");
        }

        if (!loaders[loader]) {
            throw new Error("The 'loader' parameter is not valid");
        }

        loader = loaders[loader];

        const [owner, repo] = repository.split("/");

        let releases = await octokit.rest.repos.listReleases({
            owner: owner,
            repo: repo,
        });

        releases = releases.data;

        let { id, currentRelease } = "";

        const nextRelease = await loader.getCurrentVersion(configurationFile);

        if (releases.length) {
            id = String(releases[0].id);
            currentRelease = releases[0].name;
        }

        core.setOutput("id", id);
        core.setOutput("currentRelease", currentRelease);
        core.setOutput("nextRelease", nextRelease);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
