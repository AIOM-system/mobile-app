export const parseSafe = (json: string) => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const stringifySafe = (data: any) => {
  try {
    return JSON.stringify(data);
  } catch {
    return null;
  }
}

export const convertObjectToQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");
};
