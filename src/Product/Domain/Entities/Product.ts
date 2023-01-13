import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';


class Product extends Base implements IProductDomain {
  title: string;
  price: number;
  enable: boolean;
  category: ICategoryDomain;
  lastModifiedBy: IUserDomain;
  createdBy: IUserDomain;

  constructor() {
    super();
  }

  setCategory(cat: ICategoryDomain): void {
    this.category = cat
  }
  // getCategory(): ICategoryDomain {
  //  }
}

export default Product;
