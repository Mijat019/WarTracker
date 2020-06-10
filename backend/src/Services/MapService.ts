import Map from "../Models/Map";

class MapService {
  public async getAll() {
    const maps = Map.findAll();
    return maps;
  }
  public async getMapByName(mapName: string) {
    const map = await Map.findOne({
      where: { name: mapName }
    });
    return map;
  }
}

export default new MapService();
