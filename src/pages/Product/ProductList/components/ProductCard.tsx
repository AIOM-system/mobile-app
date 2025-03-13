import { FC } from "react";
import { useHistory } from "react-router";
import { formatCurrencyWithoutSymbol } from "@/helpers/formatters";
import { IonText } from "@ionic/react";

interface ProductCardProps {
  product: {
    id: string;
    productName: string;
    productCode: string;
    costPrice: number;
    sellingPrice: number;
    status: string;
    category: string;
    inventory?: number;
    unit?: string;
  };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tabs/product/${product.id}`);
  };

  const getInventoryStatus = (inventory: number = 0) => {
    if (inventory === 0) return { color: "text-red-500", status: "Hết hàng" };
    if (inventory <= 5)
      return { color: "text-orange-500", status: "Sắp hết hàng" };
    return { color: "text-green-500", status: "Còn hàng" };
  };

  const inventoryStatus = getInventoryStatus(product.inventory);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-start relative">
      <div
        className="flex-1 flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
          <span className="text-gray-400 text-2xl">+</span>
        </div>
        <div className="flex-1">
          <IonText color="dark">
            <h3 className="font-medium">{product.productName}</h3>
          </IonText>
          <IonText>
            <i className="text-sm text-gray-500">{product.productCode}</i>
          </IonText>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-xs text-gray-500">Giá vốn</p>
              <p className="font-bold">
                {formatCurrencyWithoutSymbol(product.costPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Giá bán</p>
              <p className="font-bold">
                {formatCurrencyWithoutSymbol(product.sellingPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[100px]">
        <div className="text-right space-y-2">
          <div className="flex flex-col items-end">
            <div className={`text-sm ${inventoryStatus.color} font-medium`}>
              {product.inventory || 0} {product.unit || ""}
            </div>
            <div className="text-xs text-gray-500">
              {inventoryStatus.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
