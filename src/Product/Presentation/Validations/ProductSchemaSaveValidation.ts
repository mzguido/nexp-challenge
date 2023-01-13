import { z } from 'zod';

const CategorySchemaSaveValidation = z.object({
    title: z.string().min(2).max(50),
    enable: z.boolean().nullish(),
    price: z.number().min(0).max(1000000),
});

export default CategorySchemaSaveValidation;
