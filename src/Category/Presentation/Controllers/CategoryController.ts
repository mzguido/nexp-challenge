import ICategoryDomain from '../../Domain/Entities/ICategoryDomain'

import SaveCategoryUseCase from '../../Domain/UseCases/SaveCategoryUseCase';
import ListCategoriesUseCase from '../../Domain/UseCases/ListCategoriesUseCase';
// import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
// import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
// import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/CategoryUpdatePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import CategorySchemaSaveValidation from '../Validations/CategorySchemaSaveValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import CategoryFilter from '../Criterias/CategoryFilter';
import CategorySort from '../Criterias/CategorySort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import CategorySchemaUpdateValidation from '../Validations/CategorySchemaUpdateValidation';

class CategoryController
{
    public async save(payload: CategoryRepPayload): Promise<ICategoryDomain>
    {
        await ValidatorSchema.handle(CategorySchemaSaveValidation, payload);

        const useCase = new SaveCategoryUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new CategoryFilter(payload.query),
                sort: new CategorySort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListCategoriesUseCase();
        return await useCase.handle(requestCriteria);
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

export default CategoryController;
