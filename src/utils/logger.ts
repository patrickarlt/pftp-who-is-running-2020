export function logger(...messages: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...messages);
  }
}