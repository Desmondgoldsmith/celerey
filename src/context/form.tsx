import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFormData, setFormData } from "./formStorage"; // Import the sessionStorage utility

export const FormContext = createContext<{
  form: Partial<any>;
  setForm: Dispatch<SetStateAction<Partial<any>>>;
}>({
  form: {},
  setForm: () => null,
});

const FormProvider = ({ children }: { children: any }) => {
  /**
   * state
   */
  const [form, setForm] = useState<Partial<any>>(() => {
    // Use getFormData to retrieve initial form state from sessionStorage
    const defaultData = {}; // Define default structure if needed
    return getFormData(defaultData);
  });

  /**
   * effect
   */
  useEffect(() => {
    if (form) {
      setFormData(form); // Save form data to sessionStorage whenever it changes
    }
  }, [form]);

  return <FormContext.Provider value={{ form, setForm }}>{children}</FormContext.Provider>;
};

export default FormProvider;
