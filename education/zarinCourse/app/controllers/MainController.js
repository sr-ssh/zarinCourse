let appConfig = require("config");
const Pay = require(`${config.path.models.root}/v1/Pay`);

module.exports = class MainController {
  constructor() {
    this.model = { Pay };
  }
};
