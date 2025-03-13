import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyScreenProps } from "@/Features/onboarding/types";

export const CURRENCY_OPTIONS = [
  "New Zealand Dollar (NZD)",
  "Australian Dollar (AUD)",
  "Euro (EUR)",
  "British Pound (GBP)",
  "US Dollar (USD)",
  "Hong Kong Dollar (HKD)",
  "Canadian Dollar (CAD)",
  "Japanese Yen (JPY)",
  "Afghan Afghani (AFN)",
  "Albanian Lek (ALL)",
  "Algerian Dinar (DZD)",
  "East Caribbean Dollar (XCD)",
  "Argentine Peso (ARS)",
  "Armenian Dram (AMD)",
  "Aruban Florin (ANG)",
  "Azerbaijani Manat (AZN)",
  "Bahamian Dollar (BSD)",
  "Bahraini Dinar (BHD)",
  "Bangladeshi Taka (BDT)",
  "Barbadian Dollar (BBD)",
  "Belarusian Ruble (BYR)",
  "Belize Dollar (BZD)",
  "West African CFA Franc (XOF)",
  "Bermudian Dollar (BMD)",
  "Indian Rupee (INR)",
  "Bolivian Boliviano (BOB)",
  "Botswana Pula (BWP)",
  "Norwegian Krone (NOK)",
  "Brazilian Real (BRL)",
  "Brunei Dollar (BND)",
  "Bulgarian Lev (BGN)",
  "Burundian Franc (BIF)",
  "Cambodian Riel (KHR)",
  "Central African CFA Franc (XAF)",
  "Cape Verdean Escudo (CVE)",
  "Cayman Islands Dollar (KYD)",
  "Chilean Peso (CLP)",
  "Chinese Yuan (CNY)",
  "Colombian Peso (COP)",
  "Comorian Franc (KMF)",
  "Congolese Franc (CDF)",
  "Costa Rican Colón (CRC)",
  "Croatian Kuna (HRK)",
  "Cuban Peso (CUP)",
  "Cypriot Pound (CYP)",
  "Czech Koruna (CZK)",
  "Danish Krone (DKK)",
  "Djiboutian Franc (DJF)",
  "Dominican Peso (DOP)",
  "Indonesian Rupiah (IDR)",
  "Ecuadorian Sucre (ECS)",
  "Egyptian Pound (EGP)",
  "El Salvador Colon (SVC)",
  "Eritrean Nakfa (ETB)",
  "Ethiopian Birr (ETB)",
  "Estonian Kroon (EEK)",
  "Falkland Islands Pound (FKP)",
  "Fijian Dollar (FJD)",
  "CFP Franc (XPF)",
  "Gambian Dalasi (GMD)",
  "Georgian Lari (GEL)",
  "Gibraltar Pound (GIP)",
  "Guatemalan Quetzal (GTQ)",
  "Guinean Franc (GNF)",
  "Guyanese Dollar (GYD)",
  "Haitian Gourde (HTG)",
  "Honduran Lempira (HNL)",
  "Hungarian Forint (HUF)",
  "Icelandic Krona (ISK)",
  "Iranian Rial (IRR)",
  "Iraqi Dinar (IQD)",
  "Israeli Shekel (ILS)",
  "Jamaican Dollar (JMD)",
  "Jordanian Dinar (JOD)",
  "Kazakhstani Tenge (KZT)",
  "Kenyan Shilling (KES)",
  "North Korean Won (KPW)",
  "South Korean Won (KRW)",
  "Kuwaiti Dinar (KWD)",
  "Kyrgyzstani Som (KGS)",
  "Lao Kip (LAK)",
  "Latvian Lats (LVL)",
  "Lebanese Pound (LBP)",
  "Lesotho Loti (LSL)",
  "Liberian Dollar (LRD)",
  "Libyan Dinar (LYD)",
  "Swiss Franc (CHF)",
  "Lithuanian Litas (LTL)",
  "Macanese Pataca (MOP)",
  "Macedonian Denar (MKD)",
  "Malagasy Ariary (MGA)",
  "Malawian Kwacha (MWK)",
  "Malaysian Ringgit (MYR)",
  "Maldivian Rufiyaa (MVR)",
  "Maltese Lira (MTL)",
  "Mauritanian Ouguiya (MRO)",
  "Mauritian Rupee (MUR)",
  "Mexican Peso (MXN)",
  "Moldovan Leu (MDL)",
  "Mongolian Tugrik (MNT)",
  "Moroccan Dirham (MAD)",
  "Mozambican Metical (MZN)",
  "Burmese Kyat (MMK)",
  "Namibian Dollar (NAD)",
  "Nepalese Rupee (NPR)",
  "Nicaraguan Córdoba (NIO)",
  "Nigerian Naira (NGN)",
  "Omani Rial (OMR)",
  "Pakistani Rupee (PKR)",
  "Panamanian Balboa (PAB)",
  "Papua New Guinean Kina (PGK)",
  "Paraguayan Guarani (PYG)",
  "Peruvian Sol (PEN)",
  "Philippine Peso (PHP)",
  "Polish Złoty (PLN)",
  "Qatari Riyal (QAR)",
  "Romanian Leu (RON)",
  "Russian Ruble (RUB)",
  "Rwandan Franc (RWF)",
  "São Tomé and Príncipe Dobra (STD)",
  "Saudi Riyal (SAR)",
  "Seychellois Rupee (SCR)",
  "Sierra Leonean Leone (SLL)",
  "Singapore Dollar (SGD)",
  "Slovak Koruna (SKK)",
  "Solomon Islands Dollar (SBD)",
  "Somali Shilling (SOS)",
  "South African Rand (ZAR)",
  "Sri Lankan Rupee (LKR)",
  "Sudanese Pound (SDG)",
  "Surinamese Dollar (SRD)",
  "Swazi Lilangeni (SZL)",
  "Swedish Krona (SEK)",
  "Syrian Pound (SYP)",
  "Taiwanese Dollar (TWD)",
  "Tajikistani Somoni (TJS)",
  "Tanzanian Shilling (TZS)",
  "Thai Baht (THB)",
  "Tongan Paʻanga (TOP)",
  "Trinidad and Tobago Dollar (TTD)",
  "Tunisian Dinar (TND)",
  "Turkish Lira (TRY)",
  "Turkmenistan Manat (TMT)",
  "Ugandan Shilling (UGX)",
  "Ukrainian Hryvnia (UAH)",
  "United Arab Emirates Dirham (AED)",
  "Uruguayan Peso (UYU)",
  "Uzbekistani Som (UZS)",
  "Vanuatu Vatu (VUV)",
  "Venezuelan Bolívar (VEF)",
  "Vietnamese Dong (VND)",
  "Yemeni Rial (YER)",
  "Zambian Kwacha (ZMK)",
  "Zimbabwean Dollar (ZWD)",
  "Angolan Kwanza (AOA)",
  "Antarctic Dollar (AQD)",
  "Bosnian Convertible Mark (BAM)",
  "Ghanaian Cedi (GHS)",
  "Guernsey Pound (GGP)",
  "Manx Pound (IMP)",
  "Montenegrin Euro (EUR)",
  "Palestinian Dinar (JOD)",
  "Saint Helena Pound (SHP)",
  "Saint Martin Guilder (ANG)",
  "Serbian Dinar (RSD)"
];

export const CurrencyScreen = ({
  value,
  onChange,
  onBack,
  onContinue,
}:CurrencyScreenProps) => {
  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cirka mb-4">
          Let&apos;s talk about your finances: income, expenses, assets and
          liabilities
        </h1>
        <p className="text-gray-600">
          Choose your currency to submit your financial details
        </p>
      </div>
      <div className="space-y-4 mb-12">
        {/* Primary Currency Dropdown */}
        <Select value={value} onValueChange={(val) => onChange(val)}>
          <SelectTrigger className="w-full text-left h-12">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCY_OPTIONS.map((currency) => (
              <SelectItem
                key={currency}
                value={currency.toLowerCase()}
                className="cursor-pointer hover:bg-purple-50"
              >
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
