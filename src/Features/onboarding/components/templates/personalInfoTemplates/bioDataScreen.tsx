import { Button } from "@/components/ui/button";
import { FormInput } from "../../molecules/formInput";
import { BioDataScreenProps } from "@/Features/onboarding/types";
import { useForm } from "@/hooks/useForm";
import { useEffect } from "react";
import { countries } from "@/Features/onboarding/countries";
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
      setForm((form) => ({
        ...form,
        personal_info: {
          ...value,
        },
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
        <Select
          value={value.prefix}
          onValueChange={(val) => onChange({ ...value, prefix: val })}
          required
        >
          <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
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
          name="lastName"
          id="lastName"
          value={value.lastName}
          onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          required
          type="text"
        />

        {/* Date of Birth Dropdowns */}
        <div className="flex gap-4 justify-center items-center text-sm">
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
              {[...Array(100).keys()].map((year) => (
                <SelectItem key={2019 - year} value={(2019 - year).toString()}>
                  {2019 - year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Citizenship Dropdown */}
        <Select
          value={value.citizenship}
          onValueChange={(val) => onChange({ ...value, citizenship: val })}
          required
        >
          <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Dual Citizenship Dropdown (Optional) */}
        <Select
          value={value.dualCitizenship}
          onValueChange={(val) => onChange({ ...value, dualCitizenship: val })}
        >
          <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
            <SelectValue placeholder="Do you hold dual citizenship? (Optional)" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Resident Country Dropdown */}
        <Select
          value={value.residentCountry}
          onValueChange={(val) => onChange({ ...value, residentCountry: val })}
          required
        >
          <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder-gray-500">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            !value.citizenship ||
            !value.residentCountry
          }
          type="submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
