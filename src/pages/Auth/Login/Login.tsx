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

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        return setError("Vui lòng nhập đầy đủ thông tin");
      }

      const response = await login(username, password);

      if (response.statusCode !== 200) {
        return setError(JSON.stringify({ username, password, response }));
      }

      setUsername("");
      setPassword("");
      setError("");

      setTimeout(() => {
        history.push("/tabs/home");
      }, 600);
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
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
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
                  value={password}
                  onIonInput={(e) => setPassword(e.detail.value!)}
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
