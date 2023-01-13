import IUserDomain from 'Auth/Domain/Entities/IUserDomain';

interface CategoryRepPayload {
  title: string;
  enable: boolean;
  authUser: IUserDomain;
}

export default CategoryRepPayload;
