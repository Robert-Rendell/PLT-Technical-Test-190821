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
});
