import IProductDomain from '../../Domain/Entities/IProductDomain'

import SaveProductUseCase from '../../Domain/UseCases/SaveProductUseCase';
import ListProductsUseCase from '../../Domain/UseCases/ListProductsUseCase';
// import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
// import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
// import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ProductSchemaSaveValidation from '../Validations/ProductSchemaSaveValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import ProductFilter from '../Criterias/ProductFilter';
import ProductSort from '../Criterias/ProductSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ProductSchemaUpdateValidation from '../Validations/ProductSchemaUpdateValidation';

import AssignCategorySchemaValidation from '../Validations/AssignCategorySchemaValidation';

import AssignCategoryPayload from '../../Domain/Payloads/AssignCategoryPayload';
import AssignCategoryUseCase from '../../Domain/UseCases/AssignCategoryUseCase';

class ProductController
{
    public async save(payload: ProductRepPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle(ProductSchemaSaveValidation, payload);

        const useCase = new SaveProductUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new ProductFilter(payload.query),
                sort: new ProductSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListProductsUseCase();
        return await useCase.handle(requestCriteria);
    }

      public async assignCategory(payload: AssignCategoryPayload): Promise<IProductDomain>
    {
        await ValidatorSchema.handle( AssignCategorySchemaValidation, payload);

        const useCase = new AssignCategoryUseCase();
        return await useCase.handle(payload);
    }

    // public async getOne(payload: IdPayload): Promise<ICategoryDomain>
    // {
    //     await ValidatorSchema.handle(IdSchemaValidation, payload);

    //     const useCase = new GetItemUseCase();
    //     return await useCase.handle(payload);
    // }

    // public async update(payload: ItemUpdatePayload): Promise<ICategoryDomain>
    // {
    //     await ValidatorSchema.handle(ItemSchemaUpdateValidation, payload);

    //     const useCase = new UpdateItemUseCase();
    //     return await useCase.handle(payload);
    // }

    // public async remove(payload: IdPayload): Promise<ICategoryDomain>
    // {
    //     await ValidatorSchema.handle(IdSchemaValidation, payload);

    //     const useCase = new RemoveItemUseCase();
    //     return await useCase.handle(payload);
    // }
}

export default ProductController;
