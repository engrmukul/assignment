import http from "../http-common";

class PropertyDataService {
  getAll() {
    return http.get("/properties");
  }

  get(id) {
    return http.get(`/properties/${id}`);
  }

  create(data) {
    return http.post("/properties", data);
  }

  update(id, data) {
    return http.put(`/properties/${id}`, data);
  }

  delete(id) {
    return http.delete(`/properties/${id}`);
  }

  deleteAll() {
    return http.delete(`/properties`);
  }

  findByTitle(title) {
    return http.get(`/properties?title=${title}`);
  }
}

export default new PropertyDataService();