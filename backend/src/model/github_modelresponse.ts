import { DateTypes, NameAndRepo } from "../types/record";

export class GithubModelResponseItem {
    public full_name: string = '';
    public description: string = '';
    public language: string = '';
    public url: string = '';
    public created_at: DateTypes;
    public updated_at: DateTypes;
    public avatar_url: string = '';
    public stargazers_count: number = 0;
    public forks: number = 0;
    public open_issues: number = 0;
    public name_and_repo: NameAndRepo = { name: '', repo: '' };

    public constructor
    (
        full_name:        string, 
        description:      string, 
        language:         string, 
        url:              string, 
        created_at:       string, 
        updated_at:       string, 
        avatar_url:       string,
        stargazers_count: number, 
        forks:            number,
        open_issues:      number
    ) 
    {
        this.full_name = full_name;
        this.description = description;
        this.language = language;
        this.url = url;
        this.created_at = this.newDateTypes(created_at),
        this.updated_at = this.newDateTypes(updated_at),
        this.avatar_url = avatar_url
        this.stargazers_count = stargazers_count;
        this.forks = forks;
        this.open_issues = open_issues
        this.name_and_repo = this.setNameAndRepo(full_name);
    }
    
    private setFormattedDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    private setNameAndRepo(full_name: string): NameAndRepo {
        const name_and_repo = full_name.split('/');
        return {
            name: name_and_repo[0],
            repo: name_and_repo[1]
        }
    }

    private setDaysAgo(date: string): number {
        const today = new Date();
        const createdDate = new Date(date);
        return Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    private newDateTypes(date: string): DateTypes {
        return {
            raw: date,
            formatted: this.setFormattedDate(date),
            days_ago: this.setDaysAgo(date)
        }
    }
}
