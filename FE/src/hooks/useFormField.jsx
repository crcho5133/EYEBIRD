import { useState } from "react";

function useFormField(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const onChange = (newValue) => {
    setValue(newValue);
    setIsValid(true);
    setHasChecked(false);
  };

  const clear = () => {
    setValue("");
    setIsValid(false);
    setHasChecked(false);
  };

  return {
    value,
    isValid,
    hasChecked,
    onChange,
    setValue,
    setIsValid,
    setHasChecked,
    clear,
  };
}

export default useFormField;
