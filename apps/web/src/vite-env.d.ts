/// <reference types="vite/client" />

declare module '*.yml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any;
  export default data;
}
