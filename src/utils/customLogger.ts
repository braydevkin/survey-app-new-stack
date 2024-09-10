export const customLogger = (message: string, ...rest: string[]) => {
  console.debug(message, ...rest);
};
