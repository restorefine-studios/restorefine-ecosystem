"use client";

import { createContext, useCallback, useContext, useReducer, useRef } from "react";
import { pushGTMEvent, type GTMEventMap } from "@/lib/gtm";

type FormState = {
  currentStep: number;
  mainService: string | null;
  serviceType: string | null;
  budget: string | null;
  timeline: string | null;
  customTimeline: string | null;
  isSubmitted: boolean;
  submissionData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  } | null;
};

type FormAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_MAIN_SERVICE"; payload: string }
  | { type: "SET_SERVICE_TYPE"; payload: string }
  | { type: "SET_BUDGET"; payload: string }
  | { type: "SET_TIMELINE"; payload: string }
  | { type: "SET_CUSTOM_TIMELINE"; payload: string }
  | { type: "SET_SUBMITTED"; payload: boolean }
  | { type: "SET_SUBMISSION_DATA"; payload: FormState["submissionData"] };

const initialState: FormState = {
  currentStep: 1,
  mainService: null,
  serviceType: null,
  budget: null,
  timeline: null,
  customTimeline: null,
  isSubmitted: false,
  submissionData: null,
};

const FormContext = createContext<
  | {
      state: FormState;
      dispatch: React.Dispatch<FormAction>;
      trackStepComplete: (params: GTMEventMap["enquiry_step_complete"]) => void;
    }
  | undefined
>(undefined);

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_MAIN_SERVICE":
      return { ...state, mainService: action.payload, serviceType: null };
    case "SET_SERVICE_TYPE":
      return { ...state, serviceType: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "SET_TIMELINE":
      return { ...state, timeline: action.payload, customTimeline: null };
    case "SET_CUSTOM_TIMELINE":
      return { ...state, customTimeline: action.payload };
    case "SET_SUBMITTED":
      return { ...state, isSubmitted: action.payload };
    case "SET_SUBMISSION_DATA":
      return { ...state, submissionData: action.payload };
    default:
      return state;
  }
}

export function ContactFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const completedGtmSteps = useRef(new Set<number>());

  const trackStepComplete = useCallback((params: GTMEventMap["enquiry_step_complete"]) => {
    if (completedGtmSteps.current.has(params.step)) return;
    completedGtmSteps.current.add(params.step);
    pushGTMEvent("enquiry_step_complete", params);
  }, []);

  return (
    <FormContext.Provider value={{ state, dispatch, trackStepComplete }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return context;
}
