const core = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const { FileUtils } = require("./utils/file-utils");

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

        let { id, currentRelease, nextRelease } = "";

        if (releases.length) {
            id = String(releases[0].id);
            currentRelease = releases[0].name;
            nextRelease = "0.0.2";
        } else {
            nextRelease = "0.0.1";
        }


        core.info(id);
        core.info(currentRelease);
        core.info(nextRelease);

        core.setOutput("id", id);
        core.setOutput("currentRelease", currentRelease);
        core.setOutput("nextRelease", nextRelease);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
