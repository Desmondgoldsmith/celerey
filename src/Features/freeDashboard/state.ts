/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { getDashboardDataApi } from "./service";

interface FreeDashboardState {
  data: {
    userName: string;
    assetCountries: string[];
    netWorth: number;
    totalAssets: number;
    totalLiabilities: number;
    totalIncome: number;
    incomeAndDebt: number;
    expense:{[key: string]: string},
    allIncome:{[key: string]: string},
    income: {
      value: number;
      percent: number;
    };
    debt: {
      value: number;
      percent: number;
    };
    assets: {
      cash: {
        value: number;
        percent: number;
      };
      realEstate: {
        value: number;
        percent: number;
      };
      publicSecurities: {
        value: number;
        percent: number;
      };
      privateSecurities: {
        value: number;
        percent: number;
      };
    };
    liabilities: {
      loans: {
        value: number;
        percent: number;
      };
      mortgages: {
        value: number;
        percent: number;
      };
      creditCards: {
        value: number;
        percent: number;
      };
      assetFinance: {
        value: number;
        percent: number;
      };
      otherLiabilities: {
        value: number;
        percent: number;
      };
    };
    userFinancialKnowledge: string;
    userRiskTolerance: string;
    currency:string
  };
  error: string;
  loading: boolean;
}

// the various actions we can perform
interface FreeDashboardStore extends FreeDashboardState {
  populateDashboardData: () => Promise<void>;
}

export const useFreeDashboardStore = create<FreeDashboardStore>()(
  persist(
    immer((set) => ({
      data: {
        userName: "",
        assetCountries: [],
        netWorth: 0,
        totalAssets: 0,
        totalLiabilities: 0,
        totalIncome: 0,
        incomeAndDebt: 0,
        currency:'',
        expense: {},
        allIncome: {},
        income: {
          value: 0,
          percent: 0,
        },
        debt: {
          value: 0,
          percent: 0,
        },
        assets: {
          cash: {
            value: 0,
            percent: 0,
          },
          realEstate: {
            value: 0,
            percent: 0,
          },
          publicSecurities: {
            value: 0,
            percent: 0,
          },
          privateSecurities: {
            value: 0,
            percent: 0,
          },
        },
        liabilities: {
          loans: {
            value: 0,
            percent: 0,
          },
          mortgages: {
            value: 0,
            percent: 0,
          },
          creditCards: {
            value: 0,
            percent: 0,
          },
          assetFinance: {
            value: 0,
            percent: 0,
          },
          otherLiabilities: {
            value: 0,
            percent: 0,
          },
        },
        userFinancialKnowledge: "",
        userRiskTolerance: "",
      },
      loading: false,
      error: "",

      populateDashboardData: async () => {
        const response = await getDashboardDataApi();
        if (response.data) {
          set((state) => {
            state.data = {
              expense: response.data.expense,
              userName: response.data.user_name,
              assetCountries: response.data.asset_countries,
              netWorth: response.data.net_worth,
              totalAssets: response.data.total_assets,
              totalLiabilities: response.data.total_liabilities,
              totalIncome: response.data.total_income,
              incomeAndDebt: response.data.income_and_debt,
              income: response.data.income,
              debt: response.data.debt,
              assets: response.data.assets,
              liabilities: response.data.liabilities,
              currency: response.data.currency,
              userFinancialKnowledge:
                response.data.user_financial_knowledge,
              userRiskTolerance: response.data.user_risk_tolerance,
              allIncome:  response.data.all_income,
            };
          });
        }
      },
    })),
    {
      name: "free-dashboard-storage",
      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);
