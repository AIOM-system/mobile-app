import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const ProductDetailScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center text-2xl font-bold text-indigo-600">
            Welcome
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex items-center justify-center h-full bg-gray-100">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Hello, AIOM System!
          </h2>
          <p className="mt-2 text-gray-500">
            Now you can style components easily.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetailScreen;
