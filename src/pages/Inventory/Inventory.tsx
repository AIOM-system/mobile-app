import { useEffect, useState } from "react";
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
  IonTitle,
} from "@ionic/react";
import { Toast } from "@capacitor/toast";
import { scanOutline, add } from "ionicons/icons";
import {
  BarcodeScanner,
  BarcodeFormat,
} from "@capacitor-mlkit/barcode-scanning";
import { Capacitor } from '@capacitor/core';

import ReceiptImportList from "./components/ReceiptImport/ReceiptImportList";
import useInventory from "@/hooks/apis/useInventory";

const InventoryScreen = () => {
  const [selectedSegment, setSelectedSegment] = useState("receipt-import");
  const [keyword, setKeyword] = useState("");
  const { updateInventoryOfReceiptImport } = useInventory();

  const handleSearch = (e: any) => setKeyword(e.detail.value || "");

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

  const SCAN_THRESHOLD = 2000;
  let listener: any = null;

  const updateDOMForOpenCamera = () => {
    // Add the detection frame with specific dimensions
    const frameContainer = document.createElement("div");
    frameContainer.innerHTML = `
        <div class="barcode-frame">
          <div class="barcode-frame-corners"></div>
        </div>
      `;
    document.body.appendChild(frameContainer);

    // Add the stop button
    const stopButtonContainer = document.createElement("div");
    stopButtonContainer.innerHTML = `
        <ion-fab vertical="bottom" horizontal="center" slot="fixed" class="scanner-stop-button">
          <ion-fab-button color="danger" onclick="window.stopScanner()">
            Stop
          </ion-fab-button>
        </ion-fab>
      `;
    document.body.appendChild(stopButtonContainer);

    // Add global function to stop scanner
    (window as any).stopScanner = () => {
      stopScan();
    };

    // Hide all UI elements and make background transparent
    document.querySelector("body")?.classList.add("scanner-active");
    document.querySelector("ion-content")?.classList.add("scanner-active");
    document.querySelector("ion-app")?.classList.add("scanner-active");

    // Apply additional styles for fullscreen
    const elements = document.querySelectorAll(
      "ion-header, ion-footer, ion-toolbar, ion-content > *:not(.barcode-scanner):not(.scanner-stop-button)"
    );
    elements.forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });
  };

  const updateDOMForCloseCamera = () => {
    // Remove the frame
    const frame = document.querySelector(".barcode-frame");
    if (frame?.parentNode) {
      frame.parentNode.removeChild(frame);
    }

    // Remove the stop button container
    const stopButton = document.querySelector(".scanner-stop-button");
    if (stopButton?.parentNode) {
      stopButton.parentNode.removeChild(stopButton);
    }

    // Remove the global function
    delete (window as any).stopScanner;

    // Remove all scanner-related classes
    document.querySelector("body")?.classList.remove("scanner-active");
    document.querySelector("ion-content")?.classList.remove("scanner-active");
    document.querySelector("ion-app")?.classList.remove("scanner-active");

    // Show all UI elements again
    const elements = document.querySelectorAll(
      "ion-header, ion-footer, ion-toolbar, ion-content > *"
    );
    elements.forEach((el) => {
      (el as HTMLElement).style.display = "";
    });
  };

  const checkPermissions = async () => {
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      await Toast.show({
        text: "Camera không được hỗ trợ",
        duration: "short",
        position: "center",
      });
      return false;
    }

    const permissionStatus = await BarcodeScanner.checkPermissions();
    if (permissionStatus.camera === "denied") {
      const requestResult = await BarcodeScanner.requestPermissions();
      console.log({ requestResult });
      if (requestResult.camera !== "granted") {
        await Toast.show({
          text: "Bạn cần cấp quyền truy cập camera để quét mã vạch",
          duration: "short",
          position: "center",
        });
        return false;
      }
    }

    return true;
  };

  const startScan = async () => {
    try {
      if (!await checkPermissions()) {
        return;
      }

      // Check if running in browser/PWA
      if (Capacitor.getPlatform() === 'web') {
        // Use web implementation
        await BarcodeScanner.startScan({
          formats: [BarcodeFormat.Code128],
        });
      } else {
        // Native implementation
        updateDOMForOpenCamera();
        await BarcodeScanner.startScan({
          formats: [BarcodeFormat.Code128]
        });
      }

      let lastScannedCode = "";
      let lastScannedTime = 0;
      let count = 0;

      // Add listener for scanned barcodes
      listener = await BarcodeScanner.addListener(
        "barcodeScanned",
        async (result) => {
          if (result.barcode) {
            const currentTime = Date.now();
            const rawValue = result.barcode.rawValue;

            // Check for duplicate scans
            if (
              rawValue === lastScannedCode &&
              currentTime - lastScannedTime < SCAN_THRESHOLD
            ) {
              return;
            }

            // Update last scanned info
            lastScannedCode = rawValue;
            lastScannedTime = currentTime;
            count++;

            console.log({
              count,
              rawValue,
              lastScannedCode,
              check:
                rawValue === lastScannedCode &&
                currentTime - lastScannedTime < SCAN_THRESHOLD,
              currentTimeMinusLastScannedTime: currentTime - lastScannedTime,
              currentTime,
              lastScannedTime,
              SCAN_THRESHOLD,
            });

            await Toast.show({
              text: `Đã quét mã: ${rawValue}`,
              duration: "short",
              position: "center",
            });
          }
        }
      );
    } catch (error) {
      console.error("Error starting scan:", error);
      await Toast.show({
        text: (error as Error).message,
        duration: "long",
        position: "top",
      });
    }
  };

  const stopScan = async () => {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        updateDOMForCloseCamera();
      }

      if (listener) {
        await listener.remove();
        listener = null;
      }
      await BarcodeScanner.stopScan();
    } catch (error) {
      console.error("Error stopping scan:", error);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

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
            <IonButton color="primary" onClick={startScan}>
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
