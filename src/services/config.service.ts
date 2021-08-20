import { Service } from "typedi";
import { ApplicationConfig } from "../models/application-config";
import { Features } from "../models/features";

// IMPROVEMENT POSSIBLE HERE
// Use dotenv or envalid to pass in Environment variables to the node process
// That would the host environment to configure feature flags (PATH env variables)
// -- OUT OF SCOPE (of technical test)

@Service()
export class ConfigService {
  private appConfig: ApplicationConfig;

  constructor() {
    this.appConfig = {
      featuresEnabled: {
        restockOnRefund: true,
      },
      transactionsFile: 'transactions.json',
      stockFile: 'stock.json',
    }
  }

  public getFeatureFlags(): Features {
    return this.appConfig.featuresEnabled;
  }

  public getApplicationConfig(): ApplicationConfig {
    return this.appConfig;
  }

  /**
   * Setting flags to 'True' means they are enabled.
   * 'False' means the feature is disabled
   */
  public setFeatureFlags(features: Features): void {
    this.appConfig.featuresEnabled = features;
  }
}
