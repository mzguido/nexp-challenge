import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';

import CategoryMinimalDataTransformer from '../../../Category/Presentation/Transformers/CategoryMinimalDataTransformer';

class ProductTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;
    private categoryTrasnformer: CategoryMinimalDataTransformer;


    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
        this.categoryTrasnformer = new CategoryMinimalDataTransformer();
    }

    public async transform(product: IProductDomain): Promise<IProductTransformer>
    {
        const createdBy = product.createdBy;
        const lastModifiedBy = product.lastModifiedBy;
        const category = product.category;
        dayjs.extend(utc);

        return {
            id: product.getId(),
            title: product.title,
            price: product.price,
            enable: product.enable,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(product.createdAt).utc().unix(),
            updatedAt: dayjs(product.updatedAt).utc().unix(),
            // @ts-ignore
            category: category ? await this.categoryTrasnformer.handle(category): null,
        };
    }
}

export default ProductTransformer;
