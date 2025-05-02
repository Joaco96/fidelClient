export const setItem = <T>(key: string, value: T): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error('Error guardando en localStorage', err);
    }
  };