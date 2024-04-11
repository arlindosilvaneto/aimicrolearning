class LocalStorageService {
  // Save data to local storage
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data to local storage:', error);
      return false;
    }
  }

  // Retrieve data from local storage
  static get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return null;
    }
  }

  // Remove data from local storage
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data from local storage:', error);
      return false;
    }
  }
}

export default LocalStorageService;
