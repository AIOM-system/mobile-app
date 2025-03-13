import React, { useRef } from "react";
import Barcode from "react-barcode";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { close, printOutline, barcode } from "ionicons/icons";

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
  productName?: string;
  productCode?: string;
}

const BarcodeModal: React.FC<Props> = ({
  isOpen,
  onDidDismiss,
  productName,
  productCode,
}) => {
  const barcodeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (barcodeRef.current) {
      const win = window.open("");
      win?.document.write(`
        <html>
          <head>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              .container { text-align: center; }
              .product-name { margin-bottom: 16px; font-size: 14px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="product-name">${productName || ""}</div>
              ${barcodeRef.current.innerHTML}
            </div>
          </body>
        </html>
      `);
      win?.document.close();
      win?.print();
      win?.close();
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      breakpoints={[0, 0.5, 0.75]}
      initialBreakpoint={0.75}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="font-medium">Mã vạch sản phẩm</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-xl p-4 mb-6 flex flex-col items-center">
            {productCode ? (
              <>
                <div className="text-sm text-gray-500 mb-4">{productName}</div>
                <div ref={barcodeRef}>
                  <Barcode
                    value={productCode}
                    width={1.5}
                    height={80}
                    fontSize={14}
                    margin={10}
                    displayValue={true}
                  />
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <IonIcon icon={barcode} className="text-4xl mb-2" />
                <p className="text-sm">Chưa có mã vạch</p>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full gap-3">
            <IonButton expand="block" onClick={handlePrint} className="h-12">
              <IonIcon icon={printOutline} slot="start" />
              In mã vạch
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BarcodeModal;
