
import globalModel from "./global";
import authModel from "./auth";


export function registerModels(app) {
  app.model(globalModel());
  app.model(authModel());
}
