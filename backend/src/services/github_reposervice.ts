import { GithubRepositoriesModel } from "../model/github_models";
import { GithubModelResponseItem } from "../model/github_modelresponse";
import { TypeOfOrder, TypeOfSortRepo } from "../types/enums";
import { Comparator } from "../types/record";
import { BaseApiService } from "./github_baseservice";


class GithubRepositoriesService extends BaseApiService<GithubRepositoriesModel, GithubModelResponseItem> {
    protected emptyResponse(): GithubRepositoriesModel {
        return new GithubRepositoriesModel(0, false, [], 0);
    }

    public async searchRepos(query: string): Promise<GithubRepositoriesModel> {
        if(!(await this.isQueryValid(query))) {
            return this.emptyResponse();
        }

        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=1000`);
        const data = await response.json();

        const items = Array.isArray(data.items) ? data.items : [];
    
        return new GithubRepositoriesModel(
            data.total_count,
            data.incomplete_results,
            items.map((item: any) => {
                return new GithubModelResponseItem(
                    this.setItemOrDefault(item.full_name),
                    this.setItemOrDefault(item.description),
                    this.setItemOrDefault(item.language),
                    this.setItemOrDefault(item.html_url),
                    this.setItemOrDefault(item.created_at),
                    this.setItemOrDefault(item.updated_at),
                    this.setItemOrDefault(item.owner.avatar_url),
                    this.setItemOrDefault(item.stargazers_count),
                    this.setItemOrDefault(item.forks),
                    this.setItemOrDefault(item.open_issues),
                );
            }),
            await this.countIssues(items)
        );
    }

    private async countIssues(items: any): Promise<number> {
        let count = 0;
        for (const item of items) {
            const total = item.open_issues;
            if(typeof total === 'number') {
                count += total;
            }
        }
        return count;
    } 
        

    public async SortBy(
        data:   GithubRepositoriesModel, 
        sort:   TypeOfSortRepo, 
        order:  TypeOfOrder
    ): Promise<GithubRepositoriesModel> {
        if (!data) {
            return this.emptyResponse();
        }

        const sorters: Record<TypeOfSortRepo, Comparator<GithubModelResponseItem>> = {
            [TypeOfSortRepo.Forks]: (a, b) => a.forks - b.forks,
            [TypeOfSortRepo.Stars]: (a, b) => a.stargazers_count - b.stargazers_count,
            [TypeOfSortRepo.Created]: (a, b) => new Date(a.created_at.raw).getTime() - new Date(b.created_at.raw).getTime(),
            [TypeOfSortRepo.Updated]: (a, b) => new Date(a.updated_at.raw).getTime() - new Date(b.updated_at.raw).getTime(),
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
            total_issues: await this.countIssues(sortedItems)
        };
    }

}

export {
    GithubRepositoriesService
}
