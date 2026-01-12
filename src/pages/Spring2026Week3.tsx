import WeekLayout from "@/components/WeekLayout";

const Spring2026Week3 = () => (
  <WeekLayout
    weekNumber={3}
    title="Regression Analysis & Group Formation"
    description="Apply regression analysis techniques to real policy data and form project groups for the semester."
    objectives={[
      "Practice linear and logistic regression analysis",
      "Compare forward and backward variable selection methods",
      "Interpret regression results for policy insights",
      "Create exploratory data visualizations",
      "Form effective research teams and select topics",
    ]}
    activities={[
      "In-class regression exercise using Jupyter Notebook",
      "Analysis of Hong Kong Waste Charging Policy survey data",
      "Team formation activities",
      "Topic selection workshop",
    ]}
    inClassExercise={{
      title: "Regression Analysis In-Class Exercise",
      description: "Analyze Hong Kong Waste Charging Policy survey data using linear and logistic regression. Explore the relationship between support levels and various demographic/attitudinal factors.",
      dataset: "Hong Kong Waste Charging Policy Survey Data",
      skills: [
        "Linear regression with statsmodels",
        "Logistic regression for binary outcomes",
        "Forward and backward variable selection",
        "Data visualization with matplotlib",
        "Interpreting regression coefficients and p-values",
      ],
    }}
    assessment="In-class Exercise 1 (5%)"
    assessmentLink="/spring-2026/weeks/3/in-class-exercise-1"
  />
);

export default Spring2026Week3;
