export const getItem = <T>(key: string): T | null => {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? (JSON.parse(serialized) as T) : null;
    } catch (err) {
      console.error('Error leyendo desde localStorage', err);
      return null;
    }
  };