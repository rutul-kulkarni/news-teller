import axios from "axios";

export const getService = async (url: string) => {
  const { data } = await axios.get(url);

  return data;
};
