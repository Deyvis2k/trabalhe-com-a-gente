import { Router, Request, Response } from 'express';
import { GithubController } from '../controllers/github_controller';
import { TypeOfSortRepo, TypeOfOrder, TypeOfSortIssue } from '../types/enums';

const router = Router();
const githubController = new GithubController();

router.get('/search/repos', (req: Request, res: Response) => {
  const query = req.query.q as string;
  const sort = req.query.sort as string | undefined;
  const order = req.query.order as string | undefined;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  if (sort && !Object.values(TypeOfSortRepo).includes(sort as TypeOfSortRepo)) {
    return res.status(400).json({ error: `Invalid sort parameter. Must be one of: ${Object.values(TypeOfSortRepo).join(', ')}` });
  }

  if (order && !Object.values(TypeOfOrder).includes(order as TypeOfOrder)) {
    return res.status(400).json({ error: `Invalid order parameter. Must be one of: ${Object.values(TypeOfOrder).join(', ')}` });
  }

  console.log(`${req.method} ${req.url} with q=${query}, sort=${sort || 'none'}, order=${order || 'none'}`);
  githubController.searchRepos(req, res, query, sort as TypeOfSortRepo, order as TypeOfOrder);
});

router.get('/search/issues', (req: Request, res: Response) => {
  const query = req.query.q as string;
  const repoName = req.query.repo as string;
  const sort = req.query.sort as string | undefined;
  const order = req.query.order as string | undefined;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' are required" });
  }

  if (sort && !Object.values(TypeOfSortIssue).includes(sort as TypeOfSortIssue)) {
    return res.status(400).json({ error: `Invalid sort parameter. Must be one of: ${Object.values(TypeOfSortIssue).join(', ')}` });
  }

  if (order && !Object.values(TypeOfOrder).includes(order as TypeOfOrder)) {
    return res.status(400).json({ error: `Invalid order parameter. Must be one of: ${Object.values(TypeOfOrder).join(', ')}` });
  }

  console.log(`${req.method} ${req.url} with q=${query}, repo=${repoName}, sort=${sort || 'none'}, order=${order || 'none'}`);
  githubController.searchIssues(req, res, query, repoName, sort as TypeOfSortIssue, order as TypeOfOrder);
});

export default router;
