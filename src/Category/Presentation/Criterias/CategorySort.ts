import Sort from '../../../Shared/Presentation/Requests/Sort';

class CategorySort extends Sort
{

    static readonly TITLE: string = 'title';
    static readonly ENABLE: string = 'enable';

    getFields(): any
    {
        return [
            CategorySort.TITLE,
            CategorySort.ENABLE
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [CategorySort.TITLE]: 'asc' }
        ];
    }
}

export default CategorySort;
