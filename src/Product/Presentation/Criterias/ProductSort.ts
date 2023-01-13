import Sort from '../../../Shared/Presentation/Requests/Sort';

class ProductSort extends Sort
{
  static readonly TITLE: string = 'title';
  static readonly PRICE: string = 'price';

    getFields(): any
    {
        return [
            ProductSort.TITLE,
            ProductSort.PRICE
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {
                [ProductSort.TITLE]: 'asc',
                [ProductSort.PRICE]: 'asc',
            }
        ];
    }
}

export default ProductSort;
