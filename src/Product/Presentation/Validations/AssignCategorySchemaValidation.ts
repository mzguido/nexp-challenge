import { z } from 'zod';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

const PartialAssignCategorySchemaValidation = z.object({
    categoryId: z.string()
});

const AssignCategorySchemaValidation = PartialAssignCategorySchemaValidation.merge(IdSchemaValidation);

export default AssignCategorySchemaValidation;
