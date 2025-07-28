import { TypeOfOrder } from '../types/enums';


abstract class BaseApiService<TModel, TItem> {

    protected async isQueryValid(query: string): Promise<boolean> {
        return typeof query === 'string' && query.trim().length > 0;
    }

    protected abstract emptyResponse(): TModel;

    protected setItemOrDefault(item: unknown): any {
        if(!item) {
            return '';
        }

        switch (typeof item) {
            case 'string':
                return item || '';
            case 'number':
                return isNaN(item) ? 0 : item;
            case 'boolean':
                return item;
            case 'object':
                if (Array.isArray(item)) {
                    return item.map(i => this.setItemOrDefault(i));
                }
                return item || {};
            default:
                return '';
        }
    }

    protected sortItems(
        items: TItem[],
        compareFn: (a: TItem, b: TItem) => number,
        order: TypeOfOrder
    ): TItem[] {
        return [...items].sort((a, b) => {
            const result = compareFn(a, b);
            return order === 'asc' ? result : -result;
        });
    }
}

export { BaseApiService };

