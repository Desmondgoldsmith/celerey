import { Button } from "@/components/ui/button";
import { FormInput } from "../../molecules/formInput";
import { BioDataScreenProps } from "@/Features/onboarding/types";


export const BioDataScreen = ({
  value,
  onChange,
  onBack,
  onContinue,
}: BioDataScreenProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      value.firstName.trim() &&
      value.lastName.trim() &&
      value.dob.day &&
      value.dob.month &&
      value.dob.year
    ) {
      onContinue();
    }
  };
  // const [values, setValues] = useState({
  //   firstNAme: "",
  //   lastName: "",
  //   dob: {
  //     day: "",
  //     month: "",
  //     year: "",
  //   },
  // });

  // const changeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  return (
    <form onSubmit={handleSubmit} className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-2">
        Tell us a bit about yourself,
        <br />
        what&apos;s your first name
      </h1>
      <p className="text-gray-600 mb-8">
        We need your first name as it&apos;s written on your passport or any
        other forms of identification
      </p>
      <div className="flex flex-col gap-4">
        <FormInput
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={value.firstName}
          // onChange={(e) => {
          //   console.log("Event", e);
          //   changeValues(e);
          // }}
          onChange={(e) => {
            // console.log("Event", e);
            onChange({ ...value, firstName: e.target.value });
          }}
          required
          type="text"
        />
        <FormInput
          placeholder="Last Name"
          value={value.lastName}
          onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          required
          type="text"
        />
        <div className="flex gap-4 justify-center items-center space-x-4 text-sm">
          <select
            value={value.dob.day}
            onChange={(e) =>
              onChange({ ...value, dob: { ...value.dob, day: e.target.value } })
            }
            required
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          >
            <option value="" disabled hidden className="text-gray-500">
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
      </div>
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
          type="submit"
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={
            !value.firstName.trim() ||
            !value.lastName.trim() ||
            !value.dob.day ||
            !value.dob.month ||
            !value.dob.year
          }
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
