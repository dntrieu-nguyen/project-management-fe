"use client";
import database from "@/lib/firebase/firebaseConfig";
import { convertObjectToArray } from "@/utils/utils";
import { onValue, ref, query, endAt, limitToLast, off, orderByKey } from "firebase/database";
import React, { useCallback } from "react";
import { useAppSelector } from "./useStore";

interface IFirebase {
  path: string;
  endpoint: string;
}

interface FirebaseData {
  key: string;
  [key: string]: any;
}

const useFirebase = (props: IFirebase) => {
  const [data, setData] = React.useState<FirebaseData[]>([]);
  const [lastRecord, setLastRecord] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
  const [noMoreMessage, setNoMoreMessage] = React.useState<string>("");

  const { currentUser } = useAppSelector((state) => state.auth);

  // Load 5 latest notifications
  React.useEffect(() => {
    const dataRef = ref(database, `${props.path}/${props.endpoint}`);
    const queryRef = query(dataRef, limitToLast(5));

    const fetchData = () => {
      setLoading(true);
      const listener = onValue(
        queryRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value) {
            const newValue = convertObjectToArray(value);
            const reverseValue = [...newValue].reverse();
            setLastRecord(newValue[0]?.key ?? null);
            setData(reverseValue);
            setNoMoreMessage("");
          } else {
            setData([]);
            setNoMoreMessage("No data");
            setLastRecord(null);
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        },
      );

      setLoading(false);
      return () => {
        off(dataRef, "value", listener);
      };
    };

    fetchData();

    return () => {
      off(dataRef);
    };
  }, [props.path, props.endpoint, currentUser]);

  const loadMore = useCallback(() => {
    if (!lastRecord || isLoadingMore || noMoreMessage) return;
    setIsLoadingMore(true);
    const dataRef = ref(database, `${props.path}/${props.endpoint}`);
    const queryRef = query(dataRef, orderByKey(), endAt(lastRecord), limitToLast(6));
    onValue(
      queryRef,
      (snapshot) => {
        const value = snapshot.val();
        if (value) {
          const newValue = convertObjectToArray(value);

          if (newValue.length > 1) {
            const rawData = newValue.slice(0, -1);

            // update last record
            setLastRecord(rawData[0].key);
            const updateData = [...rawData].reverse();

            // update newData
            setData((prevData) => [...prevData, ...updateData]);
          } else {
            setNoMoreMessage("No more data to load");
          }
        }
        setIsLoadingMore(false);
      },
      (error: any) => {
        setNoMoreMessage(`Error loading more data: ${error?.message}`);
        setIsLoadingMore(false);
      },
    );
  }, [data, lastRecord, props.path, props.endpoint, isLoadingMore, noMoreMessage]);

  return { data, loading, loadMore, isLoadingMore, noMoreMessage };
};

export default useFirebase;
