import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import MenuBar from "../MenuBar/MenuBar";

type Props = {
  component: React.ReactNode;
  isHeaderDefault?: boolean;
}

const MenuLayout: React.FC<Props> = ({ component, isHeaderDefault }) => {
  return (
    <>
      <MenuBar />
      <IonPage id="main-content">
        {isHeaderDefault && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        )}

        {component}
      </IonPage>
    </>
  );
}

export default MenuLayout;