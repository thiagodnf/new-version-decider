const core = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { FileUtils } = require("./utils/file-utils");

// import FileUtils from "./utils/file-utils";
// const FileUtils

// most @actions toolkit packages have async methods
async function run() {

    const octokit = new Octokit();

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        const repository = core.getInput("repository");

        if (!repository) {
            throw new Error("The 'repository' parameter should not be blank");
        }

        const [owner, repo] = repository.split("/");

        let releases = await octokit.rest.repos.listReleases({
            owner: owner,
            repo: repo,
        });

        releases = releases.data;

        if (releases.length) {
            core.setOutput("id", String(releases[0].id));
            core.setOutput("release", releases[0].tag_name);
        }

        throw new Error("No valid releases. Did you manually created a release on GitHub?");

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
