import CategoryRepPayload from '../Payloads/CategoryRepPayload';
import ICategoryDomain from '../Entities/ICategoryDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import CategoryRepository from '../../Infrastructure/Repositories/ICategoryRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import CategoryBuilder from '../Factories/CategoryBuilder';

class SaveProductUseCase {
  private repository: CategoryRepository;

  constructor() {
    const { container } = getRequestContext();
    this.repository = container.resolve<CategoryRepository>(
      REPOSITORIES.ICategoryRepository
    );
  }

  async handle(payload: CategoryRepPayload): Promise<ICategoryDomain> {
    const category: ICategoryDomain = new CategoryBuilder(payload)
      .setCategory()
      .build()
      .create();

    return await this.repository.save(category);
  }
}

export default SaveProductUseCase;
