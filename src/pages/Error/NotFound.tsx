import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Không tìm thấy trang</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div id="container">
          <h1 className="text-xl">404 - Page not found</h1>
          <p>
            <IonButton routerLink="/tabs/home" routerDirection="none">
              <IonIcon icon={arrowBackOutline} />
              Trở về trang chủ
            </IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
