export const removeItem = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error eliminando de localStorage', err);
    }
  };