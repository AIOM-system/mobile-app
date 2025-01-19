import ModalBase from "@/components/Modal/ModalBase";
import useProduct from "@/hooks/apis/useProduct";
import { Toast } from "@capacitor/toast";
import {
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
} from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";

type Props = {
  dismiss: (data?: string | null | undefined | number, role?: string) => void;
};

const ModalSelectProduct: React.FC<Props> = ({ dismiss }) => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const { getList: getListProducts } = useProduct();

  const fetchProducts = async () => {
    try {
      const response = await getListProducts(
        {
          keyword,
          status: 'active',
        },
        1,
        10
      );

      if (!response.length) {
        await Toast.show({
          text: "Không tìm thấy kết quả",
          duration: "short",
          position: "top",
        });
      }

      setProducts(response);
    } catch (error) {
      await Toast.show({
        text: (error as Error).message,
        duration: "short",
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const handleSearch = (e: any) => {
    const keyword = e.detail.value || "";
    setKeyword(keyword);
  }

  const handleClickItem = (data: any) => {
    dismiss(data, "confirm");
  }

  return (
    <ModalBase title="Thêm sản phẩm" hasConfirmButton={false} dismiss={dismiss}>
      <div className="flex justify-between">
        <IonSearchbar
          placeholder="Tên hàng, mã sản phẩm"
          onIonInput={handleSearch}
          className="py-0"
          enterKeyHint="done"
          debounce={500}
        />
        <IonButtons slot="end">
          <IonButton color="primary">
            <IonIcon icon={filterOutline} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </div>

      <IonList>
        {!!products.length &&
          products.map((item) => (
            <ProductItem key={item.id} onClick={handleClickItem} {...item} />
          ))}
      </IonList>

    </ModalBase>
  );
};

export default ModalSelectProduct;
