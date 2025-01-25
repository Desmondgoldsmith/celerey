import { Button } from "@/components/ui/button";
import { FormInput } from "../../molecules/formInput";
import { BioDataScreenProps } from "@/Features/onboarding/types";
import { citizenshipOptions } from "@/Features/onboarding/constants";
import {useForm} from "@/hooks/useForm";
import { useEffect } from "react";

const prefixOptions = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

export const BioDataScreen = ({
  value,
  onChange,
  onBack,
  onContinue,
}: BioDataScreenProps) => {

  const { form, setForm } = useForm();
  useEffect(() => {
    console.log("Form state updated:", form);
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (
      value.prefix &&
      value.firstName.trim() &&
      value.lastName.trim() &&
      value.dob.day &&
      value.dob.month &&
      value.dob.year &&
      value.citizenship &&
      value.residentCountry
    ) {

      setForm( (form) => ({
        ...form,
        personal_info : {
          ...value
        }
      }));

      console.log("Form state updated:", form);
      onContinue();

    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-2">
        Tell us a bit about yourself,
        <br />
        what&apos;s your first name
      </h1>
      <p className="text-gray-600 mb-8">
        We need your first name as it&apos;s written on your passport or any
        other forms of identification.
      </p>

      <div className="flex flex-col gap-4">
        {/* Prefix Dropdown */}
        <select
          value={value.prefix}
          onChange={(e) => onChange({ ...value, prefix: e.target.value })}
          required
          className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        >
          <option value="" disabled hidden>
            Prefix
          </option>
          {prefixOptions.map((prefix) => (
            <option key={prefix} value={prefix}>
              {prefix}
            </option>
          ))}
        </select>

        {/* First Name Input */}
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

        {/* Last Name Input */}
        <FormInput
          placeholder="Last Name"
          value={value.lastName}
          onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          required
          type="text"
        />

        {/* Date of Birth Dropdowns */}
        <div className="flex gap-4 justify-center items-center text-sm">
          <select
            value={value.dob.day}
            onChange={(e) =>
              onChange({ ...value, dob: { ...value.dob, day: e.target.value } })
            }
            required
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          >
            <option value="" disabled hidden>
              Day
            </option>
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>

          <select
            value={value.dob.month}
            onChange={(e) =>
              onChange({
                ...value,
                dob: { ...value.dob, month: e.target.value },
              })
            }
            required
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Month</option>
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
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={value.dob.year}
            onChange={(e) =>
              onChange({
                ...value,
                dob: { ...value.dob, year: e.target.value },
              })
            }
            required
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Year</option>
            {[...Array(100).keys()].map((year) => (
              <option key={year + 1920} value={year + 1920}>
                {year + 1920}
              </option>
            ))}
          </select>
        </div>

        {/* Citizenship Dropdown */}
        <select
          value={value.citizenship}
          onChange={(e) => onChange({ ...value, citizenship: e.target.value })}
          required
          className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        >
          <option value="">Select Country</option>

          {citizenshipOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Dual Citizenship Dropdown (Optional) */}
        <select
          value={value.dualCitizenship}
          onChange={(e) =>
            onChange({ ...value, dualCitizenship: e.target.value })
          }
          className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        >
          <option value="">Do you hold dual citizenship? (Optional)</option>
          {citizenshipOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Resident Country Dropdown */}
        <select
          value={value.residentCountry}
          onChange={(e) =>
            onChange({ ...value, residentCountry: e.target.value })
          }
          required
          className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        >
          <option value="">Select Country</option>

          {citizenshipOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
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
          // onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={
            !value.prefix ||
            !value.firstName.trim() ||
            !value.lastName.trim() ||
            !value.dob.day ||
            !value.dob.month ||
            !value.dob.year ||
            !value.citizenship ||
            !value.residentCountry
          }
          type = "submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
