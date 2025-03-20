// components/DynamicScript.tsx
import { useEffect } from "react";

const DynamicScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://tp-em.cc/NDAwNTE1.js?t=400515";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default DynamicScript;
