import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import ICategoryMinimalDataTransformer from './ICategoryMinimalDataTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';

class CategoryTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(category: ICategoryDomain): Promise<ICategoryMinimalDataTransformer>
    {
        dayjs.extend(utc);

        return {
            id: category.getId(),
            title: category.title,
            enable: category.enable,
        };
    }
}

export default CategoryTransformer;
