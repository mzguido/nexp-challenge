import { DefaultContext } from 'koa';
import Router from 'koa-router';

import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ProductController from '../Controllers/ProductController';
import ProductTransformer from '../Transformers/ProductTransformer';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
// import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';

import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductAssignCategoryPayload from '../../Domain/Payloads/AssignCategoryPayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/products'
};

const ProductHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ProductController = new ProductController();

ProductHandler.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), async(ctx: DefaultContext) =>
{
    const data: ProductRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const item = await controller.save(data);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductHandler.get('/', AuthorizeKoaMiddleware(Permissions.PRODUCTS_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ProductTransformer());
    // void await responder.send(data, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer("aun no hay productos" as ResponseMessageEnum));
});

ProductHandler.put('/assign-category/:id', AuthorizeKoaMiddleware(Permissions.PRODUCTS_SAVE), async(ctx: DefaultContext) =>
{
    const data = {
        ...ctx.request.body,
        id: ctx.params.id
    };

    const product: IProductDomain = await controller.assignCategory(data as ProductAssignCategoryPayload);

    void await responder.send(product, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

// ItemKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: DefaultContext) =>
// {
//     const item = await controller.getOne(ctx.params as IdPayload);

//     void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
// });

// ItemKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: DefaultContext) =>
// {
//     const data: ItemUpdatePayload = {
//         id: ctx.params.id,
//         authUser: AuthUser(ctx),
//         ...ctx.request.body
//     };

//     const item = await controller.update(data);

//     void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
// });

// ItemKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: DefaultContext) =>
// {
//     const item = await controller.remove(ctx.params as IdPayload);

//     void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new ItemTransformer());
// });

export default ProductHandler;
