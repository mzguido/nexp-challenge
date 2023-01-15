import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter
{
    static readonly TITLE: string = 'title';
    static readonly PRICE: string = 'price';
    static readonly ENABLE: string = 'enable';

    // filter[catEnalbe]=false will show products that are not in a category and products that are in a disabled category
    static readonly CATEGORY_ENABLE: string = 'catEnable';

    getFields(): any
    {
        return [
            ProductFilter.TITLE,
            ProductFilter.ENABLE,
            ProductFilter.CATEGORY_ENABLE
        ];
    }

    getDefaultFilters(): any
    {
        return [
           { [ProductFilter.CATEGORY_ENABLE]: true}
        ];
    }
}

export default ProductFilter;
