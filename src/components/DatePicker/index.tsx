import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import { FC, HTMLAttributes } from 'react';

type Props = {
  value?: string;
  onChange?: (e: any) => void;
  attrs: HTMLAttributes<HTMLIonDatetimeElement>;
}

const DatePicker: FC<Props> = ({ value, onChange, attrs }) =>  {
  return (
    <>
      <IonDatetimeButton datetime={attrs.id}></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id={attrs.id}
          presentation="date-time"
          value={value || new Date().toISOString()}
          onIonChange={onChange}
          formatOptions={{
            date: {
              weekday: 'short',
              month: 'long',
              day: '2-digit',
            },
            time: {
              hour: '2-digit',
              minute: '2-digit',
            },
          }}
          {...attrs}
        />
      </IonModal>
    </>
  );
}
export default DatePicker;