import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';

class ProductTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(category: IProductDomain): Promise<IProductTransformer>
    {
        const createdBy = category.createdBy;
        const lastModifiedBy = category.lastModifiedBy;
        dayjs.extend(utc);

        return {
            id: category.getId(),
            title: category.title,
            price: category.price,
            enable: category.enable,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(category.createdAt).utc().unix(),
            updatedAt: dayjs(category.updatedAt).utc().unix()
        };
    }
}

export default ProductTransformer;
