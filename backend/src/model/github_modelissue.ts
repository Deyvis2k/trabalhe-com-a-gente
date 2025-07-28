import { GitHubUser, DateTypes } from "../types/record";

class GitHubIssueItem{
    public url: string = '';
    public repository_url: string = '';
    public user: GitHubUser[] = [];
    public created_at: DateTypes = {
        raw: '',
        formatted: '',
        days_ago: 0
    };
    public updated_at: DateTypes = {
        raw: '',
        formatted: '',
        days_ago: 0
    };
    public closed_at: DateTypes | null = {
        raw: '',
        formatted: '',
        days_ago: 0
    };
    public score: number = 0;
    public title: string = '';
    public body: string = '';

    public constructor(
        url: string,
        repository_url: string,
        user: GitHubUser[],
        created_at: string,
        updated_at: string,
        closed_at: string,
        score: number,
        title: string,
        body: string
    ) 
    {
        this.url = url,
        this.repository_url = repository_url,
        this.user = user,
        this.created_at = this.newDateTypes(created_at),
        this.updated_at = this.newDateTypes(updated_at),
        this.closed_at = this.newCreatedDate(closed_at),
        this.score = score,
        this.title = title,
        this.body = body   
    }

    private setFormattedDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    private newCreatedDate(date: string): DateTypes | null {
        if(!date) {
            return null;
        }
        const newDate = new Date(date).toLocaleDateString();
        return {
            raw: date,
            formatted: newDate,
            days_ago: this.setDaysAgo(date)
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

export {GitHubIssueItem}
