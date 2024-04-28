export const parseURL = (url) => {
  const stringParams = url.split("?")[1];

  return stringParams?.split("&").reduce((stringParam, cur) => ({
    ...stringParam,
    [cur.split("=")[0]]: cur.split("=")[1]
  }), {});
};

export const stringToColour = (str) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}