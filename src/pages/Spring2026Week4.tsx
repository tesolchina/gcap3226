import WeekLayout from "@/components/WeekLayout";

const Spring2026Week4 = () => (
  <WeekLayout
    weekNumber={4}
    title="Simulation Modeling & Data Governance"
    description="Introduction to simulation modeling using SimPy and data governance concepts for policy analysis."
    objectives={[
      "Understand simulation modeling fundamentals",
      "Generate random variables from probability distributions",
      "Build discrete event simulations with SimPy",
      "Visualize simulation results effectively",
      "Learn about data governance principles",
    ]}
    activities={[
      "In-class simulation exercise using Jupyter Notebook",
      "Bus transit simulation modeling",
      "Data visualization workshop",
      "Data governance lecture and discussion",
    ]}
    inClassExercise={{
      title: "Simulation Modeling In-Class Exercise",
      description: "Build a bus transit simulation from Stop A to Stop B using SimPy. Generate passenger arrival data from Poisson distributions and analyze the impact on bus arrival times.",
      dataset: "Simulated bus transit data with passenger boarding",
      skills: [
        "Random number generation from Poisson distribution",
        "Discrete event simulation with SimPy",
        "Modifying generator functions for dynamic inputs",
        "Creating histograms and box-and-whisker plots",
        "Interpreting simulation output distributions",
      ],
    }}
    assessment="In-class Exercise 2 (5%)"
    assessmentLink="/spring-2026/weeks/4/in-class-exercise-2"
  />
);

export default Spring2026Week4;
