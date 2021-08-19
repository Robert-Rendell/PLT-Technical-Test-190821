import { Service } from "typedi";
import { Features } from "../models/features";

@Service()
export class ConfigService {
  public featuresEnabled(): Features {
    // IMPROVEMENT POSSIBLE HERE
    // Use dotenv or envalid to pass in Environment variables to the node process
    // That would the host environment to configure feature flags (PATH env variables)
    // -- OUT OF SCOPE
    return {
      restockOnRefund: true,
    };
  }
}
