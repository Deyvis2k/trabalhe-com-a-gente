import { GithubModelResponseItem } from "./github_modelresponse"
import { GithubBaseModel } from "../types/interface"; 
import { GitHubIssueItem } from "./github_modelissue";

class GithubRepositoriesModel extends GithubBaseModel<GithubModelResponseItem> {
    public total_issues: number = 0
    public constructor(total_count: number, incomplete_results: boolean, items: GithubModelResponseItem[], total_issues: number) {
        super(total_count, incomplete_results, items);
        this.total_issues = total_issues
    }
}


class GithubIssueModel extends GithubBaseModel<GitHubIssueItem> {
    public constructor(total_count: number, incomplete_results: boolean, items: GitHubIssueItem[]) {
        super(total_count, incomplete_results, items);
    }
}

export {
    GithubRepositoriesModel,
    GithubIssueModel
}
