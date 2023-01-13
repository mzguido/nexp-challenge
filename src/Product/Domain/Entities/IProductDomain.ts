import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface IProductDomain extends IBaseDomain {
  title: string;
  price: number;
  enable: boolean;
  lastModifiedBy: IUserDomain;
  createdBy: IUserDomain;
}

export default IProductDomain;
