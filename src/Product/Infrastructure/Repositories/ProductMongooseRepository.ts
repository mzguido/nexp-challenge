import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import IProductRepository from './IProductRepository';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import IProduct from '../Schemas/ProductMongooseDocument';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from '../../Domain/Entities/Product';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, IProduct> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ['createdBy', 'lastModifiedBy', 'category']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IProduct[], IProduct> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ProductFilter.ENABLE))
        {
            const _enable = filter.get(ProductFilter.ENABLE) as string;
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(ProductFilter.ENABLE).equals(enable);
        }

        if (filter.has(ProductFilter.TITLE))
        {
            const title: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

        if (filter.has(ProductFilter.PRICE))
        {
            const title: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

         if (filter.has(ProductFilter.PRICE))
        {
            const price = filter.get(ProductFilter.PRICE);

            void queryBuilder.where(ProductFilter.PRICE).equals(price);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ProductMongooseRepository;
