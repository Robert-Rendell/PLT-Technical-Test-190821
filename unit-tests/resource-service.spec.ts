import { ResourceService } from "../src/services/resource.service";

describe('ResourceService', () => {
  let resourceService: ResourceService;

  beforeEach(() => {
    resourceService = new ResourceService();
  });

  it('should be defined', () => {
    expect(resourceService).toBeDefined();
  })

  describe('getTextFromFile', () => {
    it('should get the transactions json string', () => {
      const actual = resourceService.getTextFromFile("transactions.json");
      expect(actual.length).toEqual(54129);
    });

    it('should get the stock json string', () => {
      const actual = resourceService.getTextFromFile("stock.json");
      expect(actual.length).toEqual(3889);
    });
  });
});
