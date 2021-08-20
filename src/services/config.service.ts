import { Service } from "typedi";
import { ApplicationConfig } from "../models/application-config";
import { Features } from "../models/features";

// IMPROVEMENT POSSIBLE HERE
// Use dotenv or envalid to pass in Environment variables to the node process
// That would the host environment to configure feature flags (PATH env variables)
// -- OUT OF SCOPE (of technical test)

@Service()
export class ConfigService {
  public featuresEnabled(): Features {
    return {
      restockOnRefund: true,
    };
  }

  public getApplicationConfig(): ApplicationConfig {
    return {
      featuresEnabled: this.featuresEnabled(),
      transactionsFile: 'transactions.json',
      stockFile: 'stock.json',
    }
  }
}
