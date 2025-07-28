type NameAndRepo = {
  name: string,
  repo: string
}

type DateTypes = {
    raw: string,
    formatted: string,
    days_ago: number
}

type GitHubUser = {
    login: string,
    id: number,
    avatar_url: string
}

export type { DateTypes, NameAndRepo, GitHubUser };
