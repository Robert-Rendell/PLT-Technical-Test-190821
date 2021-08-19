import { StockLevel } from "../src/models/stock-level";
import { ConfigService } from "../src/services/config.service";
import { StockService } from "../src/services/stock.service";
import { mock, instance, when, verify } from 'ts-mockito';

describe('StockService', () => {
  let stockService: StockService;
  let dependencies: {
    mockConfigService: ConfigService,
  };

  beforeAll(() => {
    StockService.TRANSACTIONS = "./resources/transactions.json";
    StockService.STOCK = "./resources/stock.json";
  });

  const mockDependencies = () => {
    dependencies = {
      mockConfigService: mock(ConfigService),
    }
    when(dependencies.mockConfigService.featuresEnabled()).thenReturn({
      restockOnRefund: true,
    });
  }

  beforeEach(() => {
    mockDependencies();
    stockService = new StockService(
      instance(dependencies.mockConfigService),
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
  });
});
