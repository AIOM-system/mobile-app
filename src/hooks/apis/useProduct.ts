import { request } from "../../helpers/axios";

const useProduct = () => {
  const getList = async (
    filters?: Record<string, string>,
    page: number = 1,
    limit: number = 10
  ) => {
    const query = new URLSearchParams(filters);

    const response = await request.get(
      `/products?${query.toString()}&page=${page}&limit=${limit}`
    );
    return response.data;
  };

  const getDetail = async (id: string) => {
    const response = await request.get(`/products/${id}`);
    return response.data;
  };

  const create = async (data: any) => {
    const response = await request.post(`/products`, data);
    return response.data;
  };

  const update = async (id: string, data: any) => {
    const response = await request.put(`/products/${id}`, data);
    return response.data;
  };

  const remove = async (id: string) => {
    const response = await request.delete(`/products/${id}`);
    return response.data;
  };

  return {
    getList,
    getDetail,
    create,
    update,
    remove,
  };
};

export default useProduct;