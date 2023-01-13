import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import ProductRepPayload from '../Payloads/ProductRepPayload';

interface IProductDomain extends IBaseDomain {
  title: string;
  price: number;
  enable: boolean;
  lastModifiedBy: IUserDomain;
  createdBy: IUserDomain;
  category: ICategoryDomain;

  setCategory(cat: ICategoryDomain): void 
}

export default IProductDomain;
