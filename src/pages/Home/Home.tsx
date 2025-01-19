import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";

const HomeScreen: React.FC = () => {
  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Welcome to back</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            This is your personal dashboard. Start managing your items today!
          </p>
          <IonButton
            expand="block"
            routerLink="/tabs/inventory"
            className="mt-4"
          >
            View Products
          </IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default HomeScreen;
