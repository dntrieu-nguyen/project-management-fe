"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useStore";

const useDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isTabletCollapse, setIsTabletCollapse] = useState<boolean>(false);
  const [isPcCollapse, setIsPcCollapse] = useState<boolean>(false);
  const [isLargePC, setIsLargePC] = useState<boolean>(false);
  const [isPC, setIsPC] = useState<boolean>(true);

  const { isOpenOrClose } = useAppSelector((state) => state.app);

  useEffect(() => {
    const handleResize = () => {
      // mobile
      if (window.matchMedia("(max-width: 639px)").matches) {
        setIsMobile(true);
        setIsTablet(false);
        setIsPC(false);
        setIsTabletCollapse(false);
        setIsPcCollapse(false);
        setIsLargePC(false);
      }
      // tablet
      else if (window.matchMedia("(min-width: 640px) and (max-width: 1023px)").matches) {
        setIsMobile(false);
        setIsTablet(true);
        setIsPC(false);
        setIsTabletCollapse(false);
        setIsPcCollapse(false);
        setIsLargePC(false);

        // sidebar open
        if (!isOpenOrClose) {
          setIsMobile(false);
          setIsTablet(false);
          setIsPC(false);
          setIsTabletCollapse(true);
          setIsPcCollapse(false);
          setIsLargePC(false);
        }
      }
      //   pc
      else if (window.matchMedia("(min-width: 1024px) and (max-width: 1439px)").matches) {
        setIsMobile(false);
        setIsTablet(false);
        setIsPC(false);
        setIsTabletCollapse(false);
        setIsPcCollapse(true);
        setIsLargePC(false);

        // sidebar open
        if (!isOpenOrClose) {
          setIsMobile(false);
          setIsTablet(false);
          setIsPC(false);
          setIsTabletCollapse(true);
          setIsPcCollapse(false);
          setIsLargePC(false);
        }
      }
      //   large pc
      else {
        setIsMobile(false);
        setIsTablet(false);
        setIsPC(true);
        setIsTabletCollapse(false);
        setIsPcCollapse(false);
        setIsLargePC(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpenOrClose]);

  return { mb: isMobile, tb: isTablet, pc: isPC, tbc: isTabletCollapse, pcc: isPcCollapse, lpc: isLargePC };
};

export default useDevice;
