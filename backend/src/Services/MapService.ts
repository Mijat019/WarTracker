import Map from "../Models/Map";

class MapService {
  public async getAll() {
    const maps = Map.findAll();
    return maps;
  }
}

export default new MapService();
