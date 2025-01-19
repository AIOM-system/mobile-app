import { request } from "../../helpers/axios";

const useSupplier = () => {
  const getList = async (
    filters?: Record<string, string>,
    page: number = 1,
    limit: number = 10
  ) => {
    const query = new URLSearchParams(filters);

    const response = await request.get(
      `/suppliers?${query.toString()}&page=${page}&limit=${limit}`
    );
    return response.data;
  };
  
  return {
    getList,
  };
};

export default useSupplier;