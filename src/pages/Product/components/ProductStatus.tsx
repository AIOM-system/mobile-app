import { PRODUCT_STATUS } from "@/common/constants/product";
import { FC } from "react";

type Props = {
  status: string;
}

export const ProductStatus: FC<Props> = ({ status }) => {
  switch (status) {
    case PRODUCT_STATUS.DRAFT:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:border-transparent">
          Nháp
        </span>
      );
    case PRODUCT_STATUS.ACTIVE:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
          Hoạt động
        </span>
      );
    case PRODUCT_STATUS.INACTIVE:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
          Không hoạt động
        </span>
      );
    default:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
          {status}
        </span>
      );
  }
}