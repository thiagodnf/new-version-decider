const { Octokit } = require("@octokit/rest");

const core = require("@actions/core");

class GitHubApiUtils {

    static async isValidRepository(str) {

        if (!str) {
            throw new Error("Repository should not be null or underfined");
        }

        return /(.+)\/(.+)/gm.test(str);
    }

    static async getRepository() {

        const repository = process.env["GITHUB_REPOSITORY"];

        if (!GitHubApiUtils.isValidRepository(repository)) {
            throw new Error(`${repository} is invalid`);
        }

        const [owner, repo] = repository.split("/");

        let headers = {
            accept: "application/vnd.github.v3+json",
            authorization: `token ${process.env["GITHUB_TOKEN"]}`
        };

        return { owner, repo, headers };
    }

    static async getLatestRelease() {

        const octokit = new Octokit();

        const repoInfo = await GitHubApiUtils.getRepository();

        let releases = await octokit.rest.repos.listReleases(repoInfo);

        releases = releases.data;

        let { id, latestRelease } = "";

        if (releases.length) {
            id = String(releases[0].id);
            latestRelease = releases[0].name;
        }

        return { id, latestRelease };
    }
}

exports.GitHubApiUtils = GitHubApiUtils;
