import AssignCategoryPayload from '../Payloads/AssignCategoryPayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import ICategoryRepository from 'Category/Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class AssignCategoryUseCase
{
    private repository: IProductRepository;
    private categoryRepository: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.categoryRepository = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: AssignCategoryPayload): Promise<IProductDomain>
    {
        const { id } = payload;
        const product: IProductDomain = await this.repository.getOne(id);

        // product.clearRoles();

        const category = await this.categoryRepository.getOne( payload.categoryId );

        product.setCategory(category);

        return await this.repository.save(product);
    }
}

export default AssignCategoryUseCase;
