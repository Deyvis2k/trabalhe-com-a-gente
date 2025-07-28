import { Request, Response } from 'express';
import { GithubRepositoriesService } from '../services/github_reposervice'; 
import { GithubIssuesService} from '../services/github_issueservice'; 
import { TypeOfSortRepo, TypeOfSortIssue, TypeOfOrder } from '../types/enums';

export class GithubController {
  private githubRepoService: GithubRepositoriesService;
  private githubIssueService: GithubIssuesService;

  constructor() {
    this.githubRepoService = new GithubRepositoriesService();
    this.githubIssueService = new GithubIssuesService();
  }

  async searchRepos(req: Request, res: Response, query: string, sort?: TypeOfSortRepo, order?: TypeOfOrder) {
    try {
      let response = await this.githubRepoService.searchRepos(query);

      if (sort && order) {
        response = await this.githubRepoService.SortBy(query, response, sort, order);
      }

      res.json(response);
    } catch (error) {
      console.error('Error in searchRepos:', error);
      res.status(500).json({ error: 'Failed to fetch repositories' });
    }
  }

  async searchIssues(req: Request, res: Response, query: string, repoName: string, sort?: TypeOfSortIssue, order?: TypeOfOrder) {
    try {
      let response = await this.githubIssueService.searchIssues(query, repoName);

      if (sort && order) {
        response = await this.githubIssueService.SortBy(response, sort, order);
      }

      res.json(response);
    } catch (error) {
      console.error('Error in searchIssues:', error);
      res.status(500).json({ error: 'Failed to fetch issues' });
    }
  }
}
