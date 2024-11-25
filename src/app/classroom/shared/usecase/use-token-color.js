import { useEffect,useState } from "react";

export const useTokenColor = () => {
  const [tokenColor, setTokenColor] = useState("#ffffff");

  useEffect(() => {
    const getTokenColor = () => {
      const schoolDataJson = localStorage.getItem("schoolData");
      const schoolData = JSON.parse(schoolDataJson);

      return schoolData?.theme_json_text || "#ffffff";
    };

    setTokenColor(getTokenColor());
  }, []);

  return { tokenColor };
};
