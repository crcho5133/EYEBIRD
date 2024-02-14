import { useState } from "react";

const useShowRodal = () => {
  const [value, setValue] = useState(false);

  const showRodal = () => {
    setValue(true);
  };

  const hideRodal = () => {
    setValue(false);
  };

  return {
    value,
    showRodal,
    hideRodal,
  };
};

export default useShowRodal;
