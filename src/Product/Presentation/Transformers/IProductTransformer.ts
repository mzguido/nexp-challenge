import IUserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/IUserMinimalDataTransformer';
import ICategoryTransformer from '../../../Category/Presentation/Transformers/ICategoryTransformer';
interface IProductTransformer
{
    id: string;
    title: string;
    price: number;
    enable: boolean;
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
    category: ICategoryTransformer;
}

export default IProductTransformer;
