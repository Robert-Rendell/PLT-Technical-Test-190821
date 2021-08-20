import { StockLevel } from "../src/models/stock-level";
import { ConfigService } from "../src/services/config.service";
import { StockService } from "../src/services/stock.service";
import { mock, instance, when, verify } from 'ts-mockito';
import { ResourceService } from "../src/services/resource.service";
import { Features } from "../src/models/features";

describe('StockService', () => {
  let stockService: StockService;
  let dependencies: {
    mockConfigService: ConfigService,
    mockResourceService: ResourceService,
  };

  const mockDependencies = () => {
    dependencies = {
      mockConfigService: mock(ConfigService),
      mockResourceService: new ResourceService() // POSSIBLE IMPROVEMENT - mock out fully
    }
    const mockFeatures: Features = {
      restockOnRefund: true,
    };
    when(dependencies.mockConfigService.featuresEnabled()).thenReturn(mockFeatures);
    when(dependencies.mockConfigService.getApplicationConfig()).thenReturn({
      featuresEnabled: mockFeatures,
      stockFile: 'stock.json',
      transactionsFile: 'transactions.json',
    });
  }

  beforeEach(() => {
    mockDependencies();
    stockService = new StockService(
      instance(dependencies.mockConfigService),
      dependencies.mockResourceService,
    );
  });

  it('should be defined', () => {
    expect(stockService).toBeDefined();
  });

  describe('getStockLevel', () => {
    it('should count the current stock for a given sku when refunds are restocked', async () => {
      const targetSku = 'LTV719449/39/39';
      const expectedResult = 8510;
      /**
       * Manually checking
       * 8525
       * +10
       * -7
       * -5 
       * -1
       * -9
       * -7
       * -5
       * -0
       * +9
       * = 8510
       */

      const stockLevel: StockLevel = await stockService.getStockLevel(targetSku);
      
      expect(stockLevel.qty).toEqual(expectedResult);
    });

    it('should count the current stock for a given sku when refunds are not restocked', async () => {
      const targetSku = 'LTV719449/39/39';
      const expectedResult = 8491;
      when(dependencies.mockConfigService.featuresEnabled()).thenReturn({
        restockOnRefund: false,
      });
      stockService = new StockService(
        instance(dependencies.mockConfigService),
        dependencies.mockResourceService,
      );
      /**
       * Manually checking
       * 8525
       * +10 - should not be added
       * -7
       * -5 
       * -1
       * -9
       * -7
       * -5
       * -0
       * +9 - should not be added
       * = 8491
       */

      const stockLevel: StockLevel = await stockService.getStockLevel(targetSku);
      
      expect(stockLevel.qty).toEqual(expectedResult);
    });

    it('should set the target sku', async () => {
      const targetSku = 'LTV719449/39/39';
  
      const stockLevel: StockLevel = await stockService.getStockLevel(targetSku);

      expect(stockLevel.sku).toEqual('LTV719449/39/39');
    });

    it('must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file', async (done) => {
      console.warn('POSSIBLE IMPROVEMENT: It seems I have used a deprecated way of checking errors in unit tests');
      const targetSku = 'GANDALF/MY/SKU/DOESNT/EXIST';
      try {
        await stockService.getStockLevel(targetSku);
        done.fail();
      } catch (e) {
        expect(e.message).toEqual('SKU does not exist: GANDALF/MY/SKU/DOESNT/EXIST')
        done();
      }
    });

    it('should call featuresEnabled to check if refunds should be restocked', async () => {
      const targetSku = 'LTV719449/39/39';

      await stockService.getStockLevel(targetSku);

      verify(dependencies.mockConfigService.featuresEnabled()).called();
      expect().nothing();
    });

    describe('checking individual skus', () => {
      it('')
    })
  });
});
