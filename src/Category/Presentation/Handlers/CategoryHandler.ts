import { DefaultContext } from 'koa';
import Router from 'koa-router';

import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import CategoryController from '../Controllers/CategoryController';
// import ItemTransformer from '../Transformers/ItemTransformer';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import CategoryRepPayload from '../../Domain/Payloads/CategoryRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import CategoryUpdatePayload from '../../Domain/Payloads/CategoryUpdatePayload';
import CategoryTransformer from '../Transformers/CategoryTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/categories'
};

const CategoryHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: CategoryController = new CategoryController();

CategoryHandler.post('/', AuthorizeKoaMiddleware(Permissions.CATEGORIES_SAVE), async(ctx: DefaultContext) =>
{
    const data: CategoryRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const category = await controller.save(data);

    void await responder.send(category, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

CategoryHandler.get('/', AuthorizeKoaMiddleware(Permissions.CATEGORIES_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new CategoryTransformer());
    // void await responder.send(data, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer("aun no hay categorias" as ResponseMessageEnum));
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

export default CategoryHandler;
