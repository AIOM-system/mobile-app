import React from "react";
import { IonList } from "@ionic/react";
import TransactionItem from "./TransactionItem";

interface TransactionItemListProps {
  items: any[];
}

const TransactionItemList: React.FC<TransactionItemListProps> = ({ items }) => {
  return (
    <IonList>
      {items.map((item) => (
        <TransactionItem key={item.id} item={item} />
      ))}
    </IonList>
  );
};

export default TransactionItemList;
