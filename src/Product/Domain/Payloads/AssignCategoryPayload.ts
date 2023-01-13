import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

interface ProductAssignCategoryPayload extends IdPayload
{
    categoryId: string;
}

export default ProductAssignCategoryPayload;
