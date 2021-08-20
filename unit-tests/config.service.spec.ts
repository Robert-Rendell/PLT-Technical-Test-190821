import { ApplicationConfig } from "../src/models/application-config";
import { Features } from "../src/models/features";
import { ConfigService } from "../src/services/config.service";

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  it('should be defined', () => {
    expect(configService).toBeDefined();
  })

  describe('featuresEnabled', () => {
    it('should return a default value', () => {
      const expected: Features = {
        restockOnRefund: true,
      };

      const actual = configService.featuresEnabled();

      expect(actual).toEqual(expected);
    });
  });
  
  describe('getApplicationConfig', () => {
    it('should return a default value', () => {
      const expected: ApplicationConfig = {
        featuresEnabled: {
          restockOnRefund: true,
        },
        stockFile: 'stock.json',
        transactionsFile: 'transactions.json'
      };

      const actual = configService.getApplicationConfig();

      expect(actual).toEqual(expected);
    });
  });
});
