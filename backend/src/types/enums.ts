

enum TypeOfOrder {
    ASC = 'asc',
    DESC = 'desc'
}

enum TypeOfSortRepo {
    Created = 'created',
    Updated = 'updated',
    Stars = 'stars',
    Forks = 'forks',
}

enum TypeOfSortIssue {
    Created = 'created',
    Updated = 'updated',
    Score = 'score'
}

enum GitHubItems {
    Full_name = 'full_name',
    Description = 'description',
    Language = 'language',
    Url = 'html_url',
    Created_at = 'created_at',
    Updated_at = 'updated_at',
    Stargazers_count = 'stargazers_count',
    Forks = 'forks',
    Open_issues = 'open_issues'
}

export {
    TypeOfOrder,
    TypeOfSortRepo,
    TypeOfSortIssue,
    GitHubItems
}
