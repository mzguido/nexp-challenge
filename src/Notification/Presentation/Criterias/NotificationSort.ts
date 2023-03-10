import Sort from '../../../Shared/Presentation/Requests/Sort';

class NotificationSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly KIND: string = 'kind';

    getFields(): any
    {
        return [
            NotificationSort.NAME,
            NotificationSort.KIND
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [NotificationSort.NAME]: 'asc' }
        ];
    }
}

export default NotificationSort;
