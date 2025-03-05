import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { countries } from "@/Features/onboarding/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface AssetsSectionProps {
  values: {
    equity: string;
    cashEquivalents: string;
    fixedIncome: string;
    altAssets: {
      realEstate: string;
      privateEquity: string;
      hedgeFunds: string;
      commodities: string;
      cryptocurrency: string;
    };
    assetCountries: string[];
  };
  onChange: (field: string, value: string | string[] | object) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ values, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAltAssetsModalOpen, setIsAltAssetsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundColors = [
    "rgba(56, 51, 150, 0.05)",
    "rgba(225, 91, 45, 0.05)",
    "rgba(27, 24, 86, 0.05)",
    "rgba(139, 167, 141, 0.05)",
    "rgba(170, 170, 170, 0.05)",
  ];

  const formatCurrency = (value: string) => {
    if (!value) return "";

    // Remove all non-numeric characters except for the decimal point
    let numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure there is at most one decimal point
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      numericValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Format the integer part with commas
    let [integer, decimal] = numericValue.split(".");
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Ensure two decimal places
    decimal = decimal ? decimal.slice(0, 2) : "";

    return decimal ? `${integer}.${decimal}` : integer;
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field: ${field}, Value: ${value}`);

    // Remove commas before updating state
    const rawValue = value.replace(/,/g, "");

    // Allow only valid numbers
    if (/^\d*\.?\d{0,2}$/.test(rawValue)) {
      onChange(field, rawValue);
    }
  };

  const handleAltAssetsChange = (field: string, value: string) => {
    const updatedAltAssets = { ...values.altAssets, [field]: value };
    onChange("altAssets", updatedAltAssets);
  };

  const handleAddCountry = () => {
    if (selectedCountry && !values?.assetCountries?.includes(selectedCountry)) {
      const updatedCountries = values?.assetCountries
        ? [...values?.assetCountries, selectedCountry]
        : [selectedCountry];
      onChange("assetCountries", updatedCountries);
      setSelectedCountry("");
      setBgIndex((bgIndex + 1) % backgroundColors.length); // Rotate to the next color
    }
  };

  const handleRemoveCountry = (countryToRemove: string) => {
    const updatedCountries = values.assetCountries.filter(
      (country) => country !== countryToRemove
    );
    onChange("assetCountries", updatedCountries);
  };

  const calculateAltAssetsSum = () => {
    const {
      realEstate,
      privateEquity,
      hedgeFunds,
      commodities,
      cryptocurrency,
    } = values.altAssets;
    const sum = [
      realEstate,
      privateEquity,
      hedgeFunds,
      commodities,
      cryptocurrency,
    ]
      .map((val) => parseInt(val.replace(/[^0-9]/g, '')) || 0)
      .reduce((acc, curr) => acc + curr, 0);
    return formatCurrency(sum.toString());
  };

  const isComplete =
    values?.equity !== "" &&
    values?.cashEquivalents !== "" &&
    values?.fixedIncome !== "" &&
    Object.values(values?.altAssets).every((val) => val !== "") &&
    values?.assetCountries?.length > 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`text-xs mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-white border-blue-900 border text-blue-900"
            }`}
          >
            4
          </div>
          <h3 className="font-medium">Assets</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-800 text-sm font-semibold"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="What assets do you have?"
        description="Enter your asset details below."
        sectionTitle="Assets"
        nextSectionTitle="Liabilities"
        isSectionComplete={isComplete}
        isNextSectionComplete={isComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Equity (Stocks)</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.equity)}
              onChange={(e) => handleInputChange("equity", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Cash and Cash Equivalents</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.cashEquivalents)}
              onChange={(e) =>
                handleInputChange("cashEquivalents", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Fixed Income (Bonds)</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values?.fixedIncome)}
              onChange={(e) => handleInputChange("fixedIncome", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center gap-4">
            <div className="flex flex-col flex-1">
              <label>Alternative Assets</label>
              <Button
                className="bg-navy mt-1 w-fit"
                onClick={() => setIsAltAssetsModalOpen(true)}
              >
                Edit Assets
              </Button>
            </div>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={calculateAltAssetsSum()}
              readOnly
            />
          </div>

          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">
              In which country(ies) are your assets
            </label>
            <div className="flex-1 flex gap-2">
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-navy"
                onClick={handleAddCountry}
                disabled={!selectedCountry}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {values?.assetCountries?.map((country, index) => {
              const bgColor = backgroundColors[index % backgroundColors.length];
              return (
                <div
                  key={index}
                  style={{ backgroundColor: bgColor }}
                  className="text-xs px-2 py-1 rounded flex items-center gap-1"
                >
                  {country}
                  <button
                    onClick={() => handleRemoveCountry(country)}
                    className="hover:text-gray-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isAltAssetsModalOpen}
        onClose={() => setIsAltAssetsModalOpen(false)}
        title="Alternative Assets Details"
        description="Enter your alternative asset details below."
        sectionTitle="Alternative Assets"
        nextSectionTitle="Assets"
        isSectionComplete={Object.values(values.altAssets).every(
          (val) => val !== ""
        )}
        isNextSectionComplete={isComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Real Estate</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values.altAssets.realEstate)}
              onChange={(e) =>
                handleAltAssetsChange("realEstate", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Private Equity</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values.altAssets.privateEquity)}
              onChange={(e) =>
                handleAltAssetsChange("privateEquity", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Hedge Funds</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values.altAssets.hedgeFunds)}
              onChange={(e) =>
                handleAltAssetsChange("hedgeFunds", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Commodities</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values.altAssets.commodities)}
              onChange={(e) =>
                handleAltAssetsChange("commodities", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Cryptocurrency</label>
            <Input
              type="text"
              inputMode="decimal"
              className="flex-1 appearance-none"
              value={formatCurrency(values.altAssets.cryptocurrency)}
              onChange={(e) =>
                handleAltAssetsChange("cryptocurrency", e.target.value)
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { AssetsSection };
