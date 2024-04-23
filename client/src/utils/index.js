export const parseURL = (url) => {
  const stringParams = url.split("?")[1];

  return stringParams?.split("&").reduce((stringParam, cur) => ({
    ...stringParam,
    [cur.split("=")[0]]: cur.split("=")[1]
  }), {});
};