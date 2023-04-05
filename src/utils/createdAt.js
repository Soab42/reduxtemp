// eslint-disable-next-line import/prefer-default-export
export const createdAt = () => {
  const now = new Date(); // create a
  const createdTime = now.toISOString();
  return createdTime;
};
