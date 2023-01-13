import IUserDomain from 'Auth/Domain/Entities/IUserDomain';
import ICategoryDomain from 'Category/Domain/Entities/ICategoryDomain';

interface ProductRepPayload {
  price: number;
  title: string;
  enable: boolean;
  //   category: Category;
  // category: string;
  category: ICategoryDomain;
  authUser: IUserDomain;
}

export default ProductRepPayload;
