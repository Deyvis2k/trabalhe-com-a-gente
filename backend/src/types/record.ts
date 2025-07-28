

type DateTypes = {
    raw: string,
    formatted: string,
    days_ago: number
};

type NameAndRepo = {
    name: string,
    repo: string
}

type GitHubUser = {
    login: string,
    id: number,
    avatar_url: string
}

type Comparator<T> = (a: T, b: T) => number;

export {
    DateTypes,
    Comparator,
    GitHubUser,
    NameAndRepo
}
