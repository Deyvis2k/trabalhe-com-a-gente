import { GithubIssueModel } from "../model/github_models";
import { GitHubIssueItem } from "../model/github_modelissue";
import { TypeOfOrder, TypeOfSortIssue } from "../types/enums";
import { Comparator } from "../types/record";
import { BaseApiService } from "./github_baseservice";

export class GithubIssuesService extends BaseApiService<GithubIssueModel, GitHubIssueItem> {
    protected emptyResponse(): GithubIssueModel {
        return new GithubIssueModel(0, false, []);
    }

    public async searchIssues(query: string, repoName?: string): Promise<GithubIssueModel> {
        if(repoName) {
            if(!(await this.isQueryValid(repoName))) {
                return this.emptyResponse();
            }
        }

        if(!(await this.isQueryValid(query))) {
            return this.emptyResponse();
        }

        let response = null;
        if (!repoName) {
            response = await fetch(`https://api.github.com/search/issues?q=${query}+type:issue&per_page=100`);
        } else {
            response = await fetch(`https://api.github.com/search/issues?q=${query}+repo:${repoName}+type:issue&per_page=100`);
        }

        const data = await response.json();

        const items = Array.isArray(data.items) ? data.items : [];

        return new GithubIssueModel(
            data.total_count || 0,
            data.incomplete_results || false,
            items.map((item: any) => {
                return new GitHubIssueItem(
                    this.setItemOrDefault(item.url),
                    this.setItemOrDefault(item.repository_url),
                    this.setItemOrDefault({
                        login: this.setItemOrDefault(item.user.login),
                        avatar_url: this.setItemOrDefault(item.user.avatar_url),
                        id: this.setItemOrDefault(item.user.id),
                    }),
                    this.setItemOrDefault(item.created_at),
                    this.setItemOrDefault(item.updated_at),
                    this.setItemOrDefault(item.closed_at),
                    this.setItemOrDefault(item.score),
                    this.setItemOrDefault(item.title),
                    this.setItemOrDefault(item.body),
                );
            })
        );

    }

    public async SortBy(
        data:   GithubIssueModel, 
        sort:   TypeOfSortIssue, 
        order:  TypeOfOrder
    ): Promise<GithubIssueModel> {
        if (!data) {
            return this.emptyResponse();
        }

        const sorters: Record<TypeOfSortIssue, Comparator<GitHubIssueItem>> = {
            [TypeOfSortIssue.Created]: (a, b) => new Date(a.created_at.raw).getTime() - new Date(b.created_at.raw).getTime(),
            [TypeOfSortIssue.Updated]: (a, b) => new Date(a.updated_at.raw).getTime() - new Date(b.updated_at.raw).getTime(),
            [TypeOfSortIssue.Score]: (a, b) => a.score - b.score
        };

        const compareFn = sorters[sort];

        if (!compareFn) {
            return this.emptyResponse();
        }

        const sortedItems = this.sortItems(data.items, compareFn, order);

        return {
            total_count: data.total_count,
            incomplete_results: data.incomplete_results,
            items: sortedItems,
        };
    }
    
}
