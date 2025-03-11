import * as React from "react";
import { Button } from "@/components/ui/button";
import { OptionCard } from "@/Features/onboarding/components/molecules/knowledgeOptionCard";
import { KnowledgeInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/Features/userDashboard/state";
import Spinner from "@/components/ui/spinner";
import { SubmitScreen } from "./submitScreen";

interface PageProps {
  value: KnowledgeInfoSchema;
  onChange: (updates: Partial<KnowledgeInfoSchema>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const QUESTIONS = [
  {
    id: "realEstateKnowledge",
    question:
      "🏡 How much do you know about real estate (residential, commercial, industrial, REITs, etc.)?",
    options: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "informed", value: "Informed" },
    ],
    experienceQuestion: {
      id: "realEstateExperience",
      question:
        "🏡 How much investing experience do you have with real estate (residential, commercial, industrial, REITs, etc.)?",
      options: [
        { id: "none", value: "None" },
        { id: "1-3", value: "1 to 3 years" },
        { id: "over3Years", value: "More Than 3 Years" },
      ],
    },
  },
  {
    id: "altAssetsKnowledge",
    question:
      "🖼️ How much do you know about alternative assets, such as crypto, fine art, etc.?",
    options: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "informed", value: "Informed" },
    ],
    experienceQuestion: {
      id: "altAssetsExperience",
      question:
        "🖼️ How much experience do you have with alternative assets, such as crypto, fine art, etc.?",
      options: [
        { id: "none", value: "None" },
        { id: "1-3", value: "1 to 3 years" },
        { id: "over3Years", value: "More Than 3 Years" },
      ],
    },
  },
  {
    id: "leveragedInvestmentsKnowledge",
    question:
      "💰 How much do you know about leveraged investments (such as Lombard lending, mortgages, etc.)?",
    options: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "informed", value: "Informed" },
    ],
    experienceQuestion: {
      id: "leveragedInvestmentsExperience",
      question:
        "💰 How much investing experience do you have with leveraged investments (such as Lombard lending, mortgages, etc.)?",
      options: [
        { id: "none", value: "None" },
        { id: "1-3", value: "1 to 3 years" },
        { id: "over3Years", value: "More Than 3 Years" },
      ],
    },
  },
];


export const Page5: React.FC<PageProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const { loading, saveKnowledgeInfo, resetOnboarding } = useOnboardingStore();
  const { populateDashboardData } = useDashboardStore();

  const router = useRouter();

  const [showSubmitScreen, setShowSubmitScreen] = React.useState(false);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    const updates: Partial<KnowledgeInfoSchema> = { [questionId]: optionId };

    if (optionId === "none") {
      // If "none" is selected for knowledge, set the corresponding experience to "none"
      const experienceQuestionId = QUESTIONS.find((q) => q.id === questionId)
        ?.experienceQuestion?.id;
      if (experienceQuestionId) {
        updates[experienceQuestionId] = "none";
      }
    } else {
      // If a non-"none" option is selected for knowledge, reset the corresponding experience to undefined
      const experienceQuestionId = QUESTIONS.find((q) => q.id === questionId)
        ?.experienceQuestion?.id;
      if (experienceQuestionId) {
        updates[experienceQuestionId] = undefined; // Reset to undefined
      }
    }

    onChange(updates);
  };

  // Check if all required questions are answered
  const allQuestionsAnswered = QUESTIONS.every((question) => {
    const knowledgeAnswered =
      value[question.id] !== undefined && value[question.id] !== ""; // Knowledge question is answered
    if (value[question.id] === "none") {
      // If "none" is selected for knowledge, no need to check the experience question
      return true;
    } else if (question.experienceQuestion) {
      // If a non-"none" option is selected, the experience question must be answered
      const experienceAnswered =
        value[question.experienceQuestion.id] !== undefined &&
        value[question.experienceQuestion.id] !== "";
      return knowledgeAnswered && experienceAnswered;
    }
    return knowledgeAnswered; // If no experience question, only check knowledge question
  });

  const save = async () => {
    try {
      await saveKnowledgeInfo();
      await populateDashboardData();
      resetOnboarding();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    if (allQuestionsAnswered) {
      await save()
      setShowSubmitScreen(true);
    }
  };

  if (showSubmitScreen) {
    return (
      <SubmitScreen
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl text-center font-cirka pb-5 border-b">
        Financial Knowledge and Experience
      </h1>

      {QUESTIONS.map((question) => (
        <React.Fragment key={question.id}>
          <div className="flex flex-col md:flex-row gap-4 border-b py-3 mb-3 items-center">
            <h2 className="flex-1 font-helvetica text-center md:text-left">
              {question.question}
            </h2>
            <div className="flex-1 flex gap-4 items-end">
              {question.options.map((option) => (
                <OptionCard
                  key={option.id}
                  question={option.value}
                  selected={value[question.id] === option.id}
                  onClick={() => handleOptionSelect(question.id, option.id)}
                />
              ))}
            </div>
          </div>
          {value[question.id] !== "none" &&
            value[question.id] !== undefined &&
            value[question.id] !== "" &&
            question.experienceQuestion && (
              <div className="flex flex-col md:flex-row gap-4 border-b py-3 mb-3 items-center">
                <h2 className="flex-1 font-helvetica text-center md:text-left">
                  {question.experienceQuestion.question}
                </h2>
                <div className="flex-1 flex gap-4 items-end">
                  {question.experienceQuestion.options.map((option) => (
                    <OptionCard
                      key={option.id}
                      question={option.value}
                      selected={
                        value[question.experienceQuestion.id] === option.id
                      }
                      onClick={() =>
                        handleOptionSelect(
                          question.experienceQuestion.id,
                          option.id
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}
        </React.Fragment>
      ))}

      <div className="flex gap-4 max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!allQuestionsAnswered || loading}
        >
          {loading && <Spinner />} Continue
        </Button>
      </div>
    </div>
  );
};
