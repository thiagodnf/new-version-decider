const core = require("@actions/core");
import Octokit from "@octokit/rest";

import FileUtils from "./utils/file-utils";

// most @actions toolkit packages have async methods
async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty. Did you forget to run \"actions/checkout\" before running this Github Action?");
        }

        const repository = core.getInput("repository");

        if (!repository) {
            throw new Error("The 'repository' parameter should not be blank");
        }

        const [owner, repo] = repository.split("/");

        let releases = await Octokit.repos.listReleases({
            owner: owner,
            repo: repo,
        });

        releases = releases.data;

        core.info(releases);


        const ms = core.getInput("milliseconds");
        core.info(`Waiting ${ms} milliseconds ...`);

        core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
        // await wait(parseInt(ms));
        core.info((new Date()).toTimeString());

        core.setOutput("time", new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
