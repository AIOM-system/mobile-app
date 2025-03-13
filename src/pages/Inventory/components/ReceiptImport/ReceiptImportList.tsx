import React, { useEffect, useState } from "react";
import {
  IonList,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { Toast } from "@capacitor/toast";
import { chevronDownCircleOutline } from "ionicons/icons";

import useReceiptImport from "@/hooks/apis/useReceiptImport";
import ItemListItem from "./components/ItemList";
import { ReceiptListSkeleton } from "./components/ReceiptListSkeleton";

interface ItemList {
  id: string;
  receiptNumber: string;
  expectedImportDate: string;
  quantity: number;
  status: string;
  warehouseLocation: string;
  note: string;
}

type Props = {
  keyword: string;
};

const ReceiptImportList: React.FC<Props> = ({ keyword }) => {
  const [receiptImports, setReceiptImports] = useState<ItemList[]>([]);

  const { getList: getListReceiptImport } = useReceiptImport();

  const fetchReceiptImports = async () => {
    try {
      const response = await getListReceiptImport(
        {
          keyword,
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

      setReceiptImports(response);
    } catch (error) {
      await Toast.show({
        text: (error as Error).message,
        duration: "short",
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchReceiptImports();
  }, []);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    fetchReceiptImports().finally(() => {
      event.detail.complete();
    });
  };

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Kéo xuống để tải lại..."
          refreshingSpinner="circles"
          refreshingText="Đang tải lại..."
        ></IonRefresherContent>
      </IonRefresher>

      <IonList>
        {!!receiptImports.length ? (
          receiptImports.map((item) => <ItemListItem key={item.id} {...item} />)
        ) : (
          <>
            <ReceiptListSkeleton />
            <ReceiptListSkeleton />
            <ReceiptListSkeleton />
          </>
        )}
      </IonList>

      {/* <IonInfiniteScroll
        onIonInfinite={(ev) => {
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
    </>
  );
};

export default ReceiptImportList;
