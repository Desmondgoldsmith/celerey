import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { AssetType, CountryType } from "../../types";

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assets: AssetType[], countries: CountryType[]) => void;
  initialAssets?: AssetType[];
  initialCountries?: CountryType[];
}

const defaultAssetTypes: AssetType[] = [
  { id: "1", category: "Real Estate", amount: 13252.13 },
  { id: "2", category: "Cash", amount: 43693.52 },
  { id: "3", category: "Public Securities", amount: 73953.05 },
  { id: "4", category: "Private Securities", amount: 85386.94 },
];

const availableCountries = [
  "South Africa",
  "Ghana",
  "United Kingdom",
  "United States",
  "Nigeria",
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Ethiopia",
];

const EditAssetModal: React.FC<EditAssetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAssets = defaultAssetTypes,
  initialCountries = [],
}) => {
  const [assets, setAssets] = useState<AssetType[]>(initialAssets);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [newAssetName, setNewAssetName] = useState("");
  const [selectedCountries, setSelectedCountries] =
    useState<any>([]);
  const [countrySearchValue, setCountrySearchValue] = useState("");

  const handleAmountChange = (id: string, value: string) => {
    const newAssets = assets.map((asset) =>
      asset.id === id ? { ...asset, amount: parseFloat(value) || 0 } : asset
    );
    setAssets(newAssets);
  };

  const handleAddAsset = () => {
    if (newAssetName.trim()) {
      const newAsset: AssetType = {
        id: `new-${Date.now()}`,
        category: newAssetName.trim(),
        amount: 0,
      };
      setAssets([...assets, newAsset]);
      setNewAssetName("");
      setShowAdditionalField(false);
    }
  };

  const handleAddCountry = () => {
    const countryToAdd = countrySearchValue.trim();
    if (
      countryToAdd &&
      !selectedCountries.some(
        (c: any) => c.name.toLowerCase() === countryToAdd.toLowerCase()
      )
    ) {
      const newCountry: CountryType = {
        id: `country-${Date.now()}`,
        name: countryToAdd,
      };
      setSelectedCountries([...selectedCountries, newCountry]);
      setCountrySearchValue("");
    }
  };

  const handleRemoveCountry = (countryId: string) => {
    setSelectedCountries(selectedCountries.filter((c: any) => c.id !== countryId));
  };

  const handleSave = () => {
    onSave(assets, selectedCountries);
    onClose();
  };

  const filteredCountries = availableCountries.filter((country) =>
    country.toLowerCase().includes(countrySearchValue.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl px-5 w-[95%] md:w-full mx-auto overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-cirka text-center mb-2">
            Edit Assets
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Modify your assets
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8"
              >
                <label className="text-base text-gray-700 min-w-0 md:min-w-[200px]">
                  {asset.category}
                </label>
                <Input
                  type="number"
                  value={asset.amount}
                  onChange={(e) => handleAmountChange(asset?.id || '0', e.target.value)}
                  className="w-full md:w-[200px] text-right"
                />
              </div>
            ))}

            {/* Add Additional Asset Field */}
            {showAdditionalField ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
                <Input
                  type="text"
                  placeholder="Please Specify"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="w-full md:min-w-[200px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddAsset();
                    }
                  }}
                />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-full md:w-[200px] text-right"
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAdditionalField(true)}
                className="text-navyLight text-sm flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Additional Asset(s)
              </button>
            )}
          </div>

          {/* Country Selection */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
              <label className="text-base text-gray-700 md:min-w-[200px]">
                In Which Country(ies) are your assets?
              </label>
              <div className="flex-1 w-full">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search countries..."
                    value={countrySearchValue}
                    onChange={(e) => setCountrySearchValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleAddCountry}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {countrySearchValue && (
                  <div className="absolute z-10 w-[calc(100%-3rem)] md:w-[200px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                    {filteredCountries.map((country) => (
                      <div
                        key={country}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setCountrySearchValue(country);
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCountries.map((country: any) => (
                    <div
                      key={country.id}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{country.name}</span>
                      <button
                        onClick={() => handleRemoveCountry(country.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full md:flex-1"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            type="button"
            className="w-full md:flex-1 bg-navy hover:bg-navyLight"
            onClick={handleSave}
          >
            Modify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssetModal;
