import { AdvisorDetailsTemplate } from "@/Features/userDashboard/components/templates/advisorDetailTemplate";
import { DUMMY_ADVISORS } from "@/Features/userDashboard/constants";
import { Advisor } from "@/Features/userDashboard/types";
import { GetServerSideProps } from "next";

interface AdvisorPageProps {
  advisor: Advisor;
}

const DEFAULT_USER_DATA = {
  userName: "Jude",
  netWorth: 103550.43,
  riskAttitude: "Somewhat Aggressive",
  investmentExperience: "Advanced",
};

export default function AdvisorPage({ advisor }: AdvisorPageProps) {
  return (
    <AdvisorDetailsTemplate
      advisor={advisor}
      userName={DEFAULT_USER_DATA.userName}
      netWorth={DEFAULT_USER_DATA.netWorth}
      riskAttitude={DEFAULT_USER_DATA.riskAttitude}
      investmentExperience={DEFAULT_USER_DATA.investmentExperience}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const advisor = DUMMY_ADVISORS.find((a) => a.id === params?.id);

  if (!advisor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      advisor,
    },
  };
};
