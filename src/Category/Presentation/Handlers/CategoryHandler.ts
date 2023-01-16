import { DefaultContext } from 'koa';
import Router from 'koa-router';

import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import CategoryController from '../Controllers/CategoryController';
// import CategoryTransformer from '../Transformers/CategoryTransformer';
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
});

CategoryHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: DefaultContext) =>
{
    const category = await controller.getOne(ctx.params as IdPayload);

    void await responder.send(category, ctx, StatusCode.HTTP_OK, new CategoryTransformer());
});

CategoryHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: DefaultContext) =>
{
    const data: CategoryUpdatePayload = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const category = await controller.update(data);

    void await responder.send(category, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

CategoryHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: DefaultContext) =>
{
    const category = await controller.remove(ctx.params as IdPayload);

    void await responder.send(category, ctx, StatusCode.HTTP_CREATED, new CategoryTransformer());
});

export default CategoryHandler;
