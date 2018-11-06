const applyJourneyData = {
  questions: {
    "question-1": {
      id: "question-1",
      content: "Email",
      hint: "We'll send you an email to confirm your identity",
      button: "Set me up"
    },
    "question-2": {
      id: "question-2",
      content: "Confirm your identity",
      hint: "",
      button: "Set me up"
    },
    "question-3": {
      id: "question-3",
      content: "Search for your organisation",
      hint: "Enter organisation name",
      button: "Search"
    },
    "question-4": {
      id: "question-4",
      content: "Select your organisation",
      hint: "Or search again",
      button: "Search"
    }
  },
  sections: {
    "section-1": {
      id: "section-1",
      title: "Organisation details",
      questionIds: ["question-1", "question-2", "question-3", "question-4"]
    },
    "section-2": {
      id: "section-2",
      title: "Declarations",
      questionIds: []
    },
    "section-3": {
      id: "section-3",
      title: "Financial health check",
      questionIds: []
    }
  },
  // Facilitate section ordering
  sectionOrder: ["section-1", "section-2", "section-3"]
};

export default applyJourneyData;
