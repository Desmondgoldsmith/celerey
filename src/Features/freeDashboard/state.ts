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
    expense: { [key: string]: string };
    allIncome: { [key: string]: string };
    totalExpense: number;
    totalExpenseFromIncome: {
      value: number;
      percentage: number;
    };
    totalIncomeFromExpense: {
      value: number;
      percentage: number;
    };
    income: {
      value: number;
      percentage: number;
    };
    debt: {
      value: number;
      percentage: number;
    };
    assets: {
      cash: {
        value: number;
        percentage: number;
      };
      realEstate: {
        value: number;
        percentage: number;
      };
      publicSecurities: {
        value: number;
        percentage: number;
      };
      privateSecurities: {
        value: number;
        percentage: number;
      };
    };
    liabilities: {
      loans: {
        value: number;
        percentage: number;
      };
      mortgages: {
        value: number;
        percentage: number;
      };
      creditCards: {
        value: number;
        percentage: number;
      };
      assetFinance: {
        value: number;
        percentage: number;
      };
      otherLiabilities: {
        value: number;
        percentage: number;
      };
    };
    userFinancialKnowledge: string;
    userRiskTolerance: string;
    currency: string;
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
        currency: "",
        expense: {},
        allIncome: {},
        income: {
          value: 0,
          percentage: 0,
        },
        debt: {
          value: 0,
          percentage: 0,
        },
        assets: {
          cash: {
            value: 0,
            percentage: 0,
          },
          realEstate: {
            value: 0,
            percentage: 0,
          },
          publicSecurities: {
            value: 0,
            percentage: 0,
          },
          privateSecurities: {
            value: 0,
            percentage: 0,
          },
        },
        totalExpense: 0,
        totalExpenseFromIncome:{
          value: 0,
          percentage: 0,
        },
        totalIncomeFromExpense: {
          value: 0,
          percentage: 0,
        },
        liabilities: {
          loans: {
            value: 0,
            percentage: 0,
          },
          mortgages: {
            value: 0,
            percentage: 0,
          },
          creditCards: {
            value: 0,
            percentage: 0,
          },
          assetFinance: {
            value: 0,
            percentage: 0,
          },
          otherLiabilities: {
            value: 0,
            percentage: 0,
          },
        },
        userFinancialKnowledge: "",
        userRiskTolerance: "",
      },
      loading: true,
      error: "",

      populateDashboardData: async () => {
        set((state) => {
          state.loading = true;
        });
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
              userFinancialKnowledge: response.data.user_financial_knowledge,
              userRiskTolerance: response.data.user_risk_tolerance,
              allIncome: response.data.all_income,
              totalExpense: response.data.total_expense,
              totalExpenseFromIncome:response.data.total_expense_from_income,
              totalIncomeFromExpense:response.data.total_income_from_expense,
            };
          });
        }

        set((state) => {
          state.loading = false;
        });
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
