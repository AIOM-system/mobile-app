import { IonToast } from '@ionic/react';

type Button = {
  text: string;
  role: string;
}

type Props = {
  trigger: string;
  message: string;
  extraClassName?: string;
  duration?: number;
  buttons?: Button[];
}

function Toast(props: Props) {
  return (
    <IonToast
      trigger={props.trigger}
      duration={3000}
      message={props.message}
      className={props.extraClassName}
      buttons={[
        {
          text: 'Đóng',
          role: 'cancel',
        },
        ...(props.buttons || [])
      ]}
    ></IonToast>
  );
}

export default Toast;