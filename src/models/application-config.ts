import { Features } from "./features";

export interface ApplicationConfig {
  featuresEnabled: Features;
  stockFile: string;
  transactionsFile: string;
}
