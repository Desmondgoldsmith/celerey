import { Button } from "@/components/ui/button";
import { FormInput } from "../../molecules/formInput";
import { BioDataScreenProps } from "@/Features/onboarding/types";
import { useForm } from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { countries } from "@/Features/onboarding/countries";
import clsx from "clsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const prefixOptions = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

export const BioDataScreen = ({
  value,
  onChange,
  onBack,
  onContinue,
}: BioDataScreenProps) => {
  const { form, setForm } = useForm();
  const [query, setQuery] = useState("");
  const [dualCitizenshipQuery, setDualCitizenshipQuery] = useState("");
  const [isCitizenshipFocused, setIsCitizenshipFocused] = useState(false);
  const [isDualCitizenshipFocused, setIsDualCitizenshipFocused] =
    useState(false);
  const [hasDualCitizenship, setHasDualCitizenship] = useState(false); // Track dual citizenship state

  useEffect(() => {
    console.log("Form state updated:", form);
  }, [form]);

  useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country.code === value.citizenship
    );

    if (selectedCountry) {
      setQuery(selectedCountry.name);
    }

    const selectedDualCountry = countries.find(
      (country) => country.code === value.dualCitizenship
    );

    if (selectedDualCountry) {
      setDualCitizenshipQuery(selectedDualCountry.name);
      setHasDualCitizenship(true); // Default to checked if a second country is entered
    }
  }, [value.citizenship, value.dualCitizenship]);

  const filteredCountries = query
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  const filteredDualCountries = dualCitizenshipQuery
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(dualCitizenshipQuery.toLowerCase())
      )
    : countries;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    if (
      value.prefix &&
      value.firstName.trim() &&
      value.lastName.trim() &&
      value.dob.day &&
      value.dob.month &&
      value.dob.year &&
      value.citizenship
    ) {
      setForm((form) => ({
        ...form,
        personal_info: {
          ...value,
        },
      }));

      console.log("Form state updated:", form);
      onContinue();
    } else {
      console.log("Form validation failed");
    }
  };

  const handleCountrySelect = (countryCode: string, countryName: string) => {
    setQuery(countryName);
    onChange({ ...value, citizenship: countryCode });
    setIsCitizenshipFocused(false); 
  };

  const handleDualCountrySelect = (
    countryCode: string,
    countryName: string
  ) => {
    setDualCitizenshipQuery(countryName);
    onChange({ ...value, dualCitizenship: countryCode });
    setIsDualCitizenshipFocused(false); 
  };

  const handleDualCitizenshipChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setHasDualCitizenship(isChecked);
    if (!isChecked) {
      onChange({ ...value, dualCitizenship: "" });
      setDualCitizenshipQuery(""); // Clear the second country input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-6">Tell us a bit about yourself</h1>
      {/* <p className="text-gray-600 mb-8">
        We need your first information as it&apos;s written on your passport or
        any other forms of identification.
      </p> */}

      <div className="grid gap-4">
        {/* Prefix Dropdown */}
        <div className="grid grid-cols-3 items-center">
          <label className="text-left text-gray-600 font-medium whitespace-nowrap text-sm">
            Prefix
          </label>
          <Select
            value={value.prefix}
            onValueChange={(val) => onChange({ ...value, prefix: val })}
            required
          >
            <SelectTrigger className="col-span-2 flex-1 px-4 py-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
              <SelectValue placeholder="Prefix" />
            </SelectTrigger>
            <SelectContent>
              {prefixOptions.map((prefix) => (
                <SelectItem key={prefix} value={prefix}>
                  {prefix}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* First Name Input */}
        <div className="grid grid-cols-3 text-left items-center">
          <label className=" text-gray-600 font-medium whitespace-nowrap text-sm">
            First Name
          </label>
          <div className="col-span-2">
            <FormInput
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={value.firstName}
              onChange={(e) => {
                onChange({ ...value, firstName: e.target.value });
              }}
              required
              type="text"
            />
          </div>
        </div>
        {/* Last Name Input */}
        <div className="grid grid-cols-3 text-left items-center">
          <label className=" text-gray-600 font-medium whitespace-nowrap text-sm">
            Last Name
          </label>
          <div className="col-span-2">
            <FormInput
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
              required
              type="text"
            />
          </div>
        </div>

        {/* Date of Birth Label and Dropdowns */}
        <div className="grid grid-cols-3 items-center gap-2 text-sm">
          <label className="text-gray-600 text-left text-sm font-helvetica">
            Date of Birth
          </label>
          <div className="col-span-2 flex gap-1">
            {/* Day Dropdown */}
            <Select
              value={value.dob.day}
              onValueChange={(val) =>
                onChange({ ...value, dob: { ...value.dob, day: val } })
              }
              required
            >
              <SelectTrigger className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(31).keys()].map((day) => (
                  <SelectItem key={day + 1} value={(day + 1).toString()}>
                    {day + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Month Dropdown */}
            <Select
              value={value.dob.month}
              onValueChange={(val) =>
                onChange({ ...value, dob: { ...value.dob, month: val } })
              }
              required
            >
              <SelectTrigger className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Dropdown */}
            <Select
              value={value.dob.year}
              onValueChange={(val) =>
                onChange({ ...value, dob: { ...value.dob, year: val } })
              }
              required
            >
              <SelectTrigger className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(100).keys()].reverse().map((year) => (
                  <SelectItem
                    key={2019 - year}
                    value={(2019 - year).toString()}
                  >
                    {2019 - year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Citizenship Dropdown with Searchable Combobox */}
        <div className="grid grid-cols-3 text-left items-center">
          <label className="text-gray-600 text-sm font-helvetica font-medium whitespace-nowrap">
            Country of Citizenship
          </label>
          <div className="relative col-span-2">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const newValue = e.target.value;
                setQuery(newValue);

                if (newValue === "") {
                  onChange({ ...value, citizenship: "" });
                }
              }}
              onFocus={() => setIsCitizenshipFocused(true)}
              onBlur={() =>
                setTimeout(() => setIsCitizenshipFocused(false), 200)
              }
              placeholder="Type to search..."
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy w-full"
            />
            {isCitizenshipFocused && filteredCountries.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className={clsx(
                      "p-2 hover:bg-gray-100 cursor-pointer",
                      value.citizenship === country.code && "bg-gray-200"
                    )}
                    onMouseDown={() =>
                      handleCountrySelect(country.code, country.name)
                    }
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dual Citizenship Checkbox */}
        <div className="grid grid-cols-3 text-left items-center">
          <label className="text-gray-600 text-sm font-helvetica font-medium whitespace-nowrap">
            Dual Citizenship
          </label>
          <div className="col-span-2">
            <input
              type="checkbox"
              checked={hasDualCitizenship}
              onChange={handleDualCitizenshipChange}
              className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Second Citizenship Dropdown */}
        {hasDualCitizenship && (
          <div className="grid grid-cols-3 text-left items-center">
            <label className="text-gray-600 text-sm font-helvetica font-medium whitespace-nowrap">
              Second Country of Citizenship
            </label>
            <div className="relative col-span-2">
              <input
                type="text"
                value={dualCitizenshipQuery}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setDualCitizenshipQuery(newValue);

                  if (newValue === "") {
                    onChange({ ...value, dualCitizenship: "" });
                  }
                }}
                onFocus={() => setIsDualCitizenshipFocused(true)}
                onBlur={() =>
                  setTimeout(() => setIsDualCitizenshipFocused(false), 200)
                }
                placeholder="Type to search..."
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy w-full"
              />
              {isDualCitizenshipFocused && filteredDualCountries.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                  {filteredDualCountries.map((country) => (
                    <div
                      key={country.code}
                      className={clsx(
                        "p-2 hover:bg-gray-100 cursor-pointer",
                        value.dualCitizenship === country.code && "bg-gray-200"
                      )}
                      onMouseDown={() =>
                        handleDualCountrySelect(country.code, country.name)
                      }
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={
            !value.prefix ||
            !value.firstName.trim() ||
            !value.lastName.trim() ||
            !value.dob.day ||
            !value.dob.month ||
            !value.dob.year ||
            !value.citizenship
          }
          type="submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
