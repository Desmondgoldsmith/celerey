import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
// import { FinancialInfoFormData } from "@/Features/onboarding/types";

const STORAGE_KEY = "app-storage"; // Simple and static

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
    if (typeof window !== "undefined") {
      // Check if there's a stored value in localStorage
      const storedData = window.localStorage.getItem(STORAGE_KEY);
      console.log("storedData", storedData);
      if (storedData) {
        return JSON.parse(storedData); // Return parsed data if available
      } else {
        // If no stored data, add a default object to localStorage
        const defaultData = {}; // Define your default structure here
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData; // Return the default structure
      }
    }
    return {}; // Return an empty object if window is not available
  });

  /**
   * effect
   */
  useEffect(() => {
    if (form && typeof window !== "undefined") {
      // Save form data to localStorage whenever it changes
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }
  }, [form]);

  return <FormContext.Provider value={{ form, setForm }}>{children}</FormContext.Provider>;
};

export default FormProvider;
