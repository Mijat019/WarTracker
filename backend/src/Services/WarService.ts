import War from "../Models/War";

class WarService {
  public async getAll() {
    const wars = await War.findAll();
    return wars;
  }
}

export default new WarService();
