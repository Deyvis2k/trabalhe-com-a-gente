
export class GithubBaseModel<T> {
    total_count: number = 0;
    incomplete_results: boolean = false;
    items: T[] = [];

    constructor(total_count: number, incomplete_results: boolean, items: T[]) {
        this.total_count = total_count;
        this.incomplete_results = incomplete_results;
        this.items = items;
    }
}
