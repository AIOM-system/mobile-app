import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCheckbox,
  IonInputPasswordToggle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../../hooks";
import { Toast } from "@capacitor/toast";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const { username, password } = formData;

      if (!username || !password) {
        return setError("Vui lòng nhập đầy đủ thông tin");
      }

      const response = await login(username, password);

      if (response.statusCode !== 200 || !response.data) {
        return setError(JSON.stringify(response));
      }

      setFormData({ username: "", password: "" });
      setError("");

      await Toast.show({
        text: "Đăng nhập thành công",
        duration: "short",
        position: "center",
      });

      history.push("/tabs/home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome back</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Đăng nhập
        </h1>
        <IonGrid>
          {error && (
            <IonRow>
              <IonCol>
                <IonText color="danger">{error}</IonText>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  type="text"
                  fill="solid"
                  label="Tên đăng nhập"
                  labelPlacement="stacked"
                  errorText="Tên đăng nhập không hợp lệ"
                  debounce={500}
                  onIonInput={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value as string,
                    }))
                  }
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  type="password"
                  fill="solid"
                  label={"Mật khẩu"}
                  labelPlacement="stacked"
                  errorText="Mật khẩu không đúng"
                  clearInput
                  debounce={400}
                  onIonInput={(e) => 
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value as string,
                    }))
                  }
                >
                  <IonInputPasswordToggle slot="end" color="dark" />
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCheckbox labelPlacement="end">Ghi nhớ đăng nhập</IonCheckbox>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>
                Đăng nhập
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
