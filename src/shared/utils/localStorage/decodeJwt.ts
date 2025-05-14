export function decodeJWT<T = unknown>(token: string): T | null {
  try {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson) as T;
  } catch (e) {
    console.error('Error decodificando JWT:', e);
    return null;
  }
}