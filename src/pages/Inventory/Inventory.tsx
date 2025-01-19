import { useState } from "react";
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonMenuButton,
} from "@ionic/react";
import { Toast } from "@capacitor/toast";
import { scanOutline, add } from "ionicons/icons";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";

import ReceiptImportList from "./components/ReceiptImport/ReceiptImportList";
import useInventory from "@/hooks/apis/useInventory";

const InventoryScreen = () => {
  const [selectedSegment, setSelectedSegment] = useState("receipt-import");
  const [keyword, setKeyword] = useState("");
  const { updateInventoryOfReceiptImport } = useInventory();

  const handleSearch = (e: any) => {
    const keyword = e.detail.value || "";
    setKeyword(keyword);
  };

  const updateInventory = async (receiptNumber: string) => {
    try {
      if (!receiptNumber) {
        return await Toast.show({
          text: "Không tìm thấy phiếu",
          duration: "short",
          position: "center",
        });
      }

      const response = await updateInventoryOfReceiptImport(receiptNumber);

      await Toast.show({
        text: response.message,
        duration: "long",
        position: "center",
      });
    } catch (error) {
      await Toast.show({
        text: (error as Error).message,
        duration: "long",
        position: "top",
      });
    }
  };

  const scanBarcode = async () => {
    try {
      const granted = await requestPermissions();
      if (!granted) {
        return await Toast.show({
          text: "Bạn cần cấp quyền truy cập camera để quét mã vạch",
          duration: "short",
          position: "center",
        });
      }

      const { barcodes } = await BarcodeScanner.scan();

      const barcodeValue = barcodes.find((barcode) => barcode.rawValue);
      const receiptNumber = barcodeValue?.rawValue || "";

      await updateInventory(receiptNumber);
    } catch (error: any) {
      await Toast.show({
        text: (error as Error).message,
        duration: "long",
        position: "top",
      });
    }
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  };

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          {/* Segment */}
          <IonSegment
            value={selectedSegment}
            onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
          >
            <IonSegmentButton value="receipt-import">
              <IonLabel>Nhập kho</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="check-inventory">
              <IonLabel>Kiểm kho</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {/* End Segment */}
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Tìm kiếm..."
            onIonInput={handleSearch}
            className="py-0"
            showClearButton="focus"
          />
          <IonButtons slot="end">
            <IonButton color="primary" onClick={scanBarcode}>
              <IonIcon icon={scanOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {selectedSegment === "receipt-import" ? (
        <ReceiptImportList keyword={keyword} />
      ) : (
        <></>
      )}

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink={`/tabs/${selectedSegment}/create`}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default InventoryScreen;
