import { useState } from "react";

function useRodal() {
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
}

export default useRodal;
