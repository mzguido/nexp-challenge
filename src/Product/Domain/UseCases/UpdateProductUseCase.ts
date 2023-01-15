import ProductUpdatePayload from '../Payloads/ProductUpdatePayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductBuilder from '../Factories/ProductBuilder';

class UpdateProductUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        let item: IProductDomain = await this.repository.getOne(payload.id);

        item = new ProductBuilder(payload)
            .setProduct(item)
            .build()
            .update();

        return await this.repository.update(item);
    }
}

export default UpdateProductUseCase;
