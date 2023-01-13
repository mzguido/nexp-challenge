import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter
{
  static readonly TITLE: string = 'title';
  static readonly PRICE: string = 'price';
  static readonly ENABLE: string = 'enable';
//   category: string;

    getFields(): any
    {
        return [
            ProductFilter.TITLE,
            ProductFilter.ENABLE
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default ProductFilter;
