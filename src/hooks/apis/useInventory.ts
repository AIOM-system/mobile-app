import { IHttpResponse } from "@/types";
import { request } from "../../helpers/axios";

const useInventory = () => {
  const updateInventoryOfReceiptImport = async (receiptNumber: string): Promise<IHttpResponse> => {
    return request.patch(`/inventory/receipt-imports/${receiptNumber}`);
  };

  return {
    updateInventoryOfReceiptImport,
  };
};

export default useInventory;