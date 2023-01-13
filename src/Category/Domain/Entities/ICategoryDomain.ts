import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ICategoryDomain extends IBaseDomain {
  title: string;
  enable: boolean;
  createdBy: IUserDomain;
  lastModifiedBy: IUserDomain;
}

export default ICategoryDomain;
