import type { AnalysisResult } from "@/types/analysis";

export const mockAnalysisResult: AnalysisResult = {
  summary:
    "Excellent match. Your resume demonstrates strong alignment with this Data Scientist role. Your hands-on experience with Python, SQL, machine learning, and deep learning directly covers the core requirements. Strengthening your formal statistics background and adding more Power BI dashboard work would round out your profile further.",
  matchScore: 89,
  resumeSkills: [
    { name: "Python", category: "technical", proficiency: "advanced" },
    { name: "SQL", category: "technical", proficiency: "advanced" },
    { name: "Pandas", category: "technical", proficiency: "advanced" },
    { name: "NumPy", category: "technical", proficiency: "advanced" },
    { name: "Scikit-learn", category: "technical", proficiency: "advanced" },
    { name: "Machine Learning", category: "technical", proficiency: "advanced" },
    { name: "Deep Learning", category: "technical", proficiency: "intermediate" },
    { name: "Generative AI", category: "technical", proficiency: "intermediate" },
    { name: "RAG", category: "technical", proficiency: "intermediate" },
    { name: "NLP", category: "technical", proficiency: "intermediate" },
    { name: "Power BI", category: "technical", proficiency: "intermediate" },
    { name: "Data Visualization", category: "technical", proficiency: "advanced" },
    { name: "TensorFlow", category: "technical", proficiency: "intermediate" },
    { name: "Git", category: "tool", proficiency: "advanced" },
    { name: "Problem Solving", category: "soft", proficiency: "advanced" },
    { name: "Communication", category: "soft", proficiency: "intermediate" },
  ],
  jobSkills: [
    { name: "Python", category: "technical" },
    { name: "SQL", category: "technical" },
    { name: "Pandas", category: "technical" },
    { name: "NumPy", category: "technical" },
    { name: "Scikit-learn", category: "technical" },
    { name: "Machine Learning", category: "technical" },
    { name: "Data Visualization", category: "technical" },
    { name: "Statistics", category: "technical" },
    { name: "Power BI", category: "technical" },
  ],
  missingSkills: [
    {
      skill: "Statistics",
      importance: "important",
      whyItMatters:
        "This role requires designing experiments, hypothesis testing, and interpreting p-values for A/B tests and model validation. Without formal statistics knowledge, you may struggle to justify model choices and communicate statistical significance to stakeholders.",
      suggestion:
        "Review foundational statistics — probability distributions, hypothesis testing, confidence intervals, and Bayesian inference. A targeted course such as Khan Academy Statistics or the MIT OCW Statistics course would strengthen this area quickly.",
    },
  ],
  strengths: [
    {
      skill: "Python & Data Libraries",
      relevance: "high",
      note:
        "Advanced proficiency in Python with Pandas, NumPy, and Scikit-learn — the exact stack this role uses daily for data manipulation and modeling.",
    },
    {
      skill: "Machine Learning",
      relevance: "high",
      note:
        "Hands-on experience building and evaluating ML models. This directly maps to the core responsibility of developing predictive models for the team.",
    },
    {
      skill: "SQL",
      relevance: "high",
      note:
        "Strong SQL skills for querying and transforming data. Essential for extracting insights from the team's data warehouse.",
    },
    {
      skill: "Deep Learning & NLP",
      relevance: "medium",
      note:
        "Experience with deep learning and NLP goes beyond the base requirements and positions you well for advanced projects like the team's GenAI initiatives.",
    },
    {
      skill: "Data Visualization",
      relevance: "high",
      note:
        "Proficient in data visualization and Power BI. You can effectively communicate findings through dashboards and visual stories.",
    },
  ],
  recommendations: [
    {
      title: "Strengthen Statistics Fundamentals",
      description:
        "Complete a focused refresher on probability, hypothesis testing, and regression analysis. Apply these concepts to a project by running an A/B test analysis or building a statistical model from scratch.",
      priority: "high",
      category: "skill",
    },
    {
      title: "Build More Power BI Dashboards",
      description:
        "Create 2-3 end-to-end Power BI dashboards from real datasets (e.g., Kaggle) and publish them. This demonstrates the reporting and stakeholder communication skills the team needs.",
      priority: "medium",
      category: "project",
    },
    {
      title: "Contribute to an Open-Source Data Project",
      description:
        "Contribute data preprocessing, feature engineering, or modeling code to an open-source ML project on GitHub. This demonstrates collaboration skills and real-world code quality.",
      priority: "medium",
      category: "experience",
    },
    {
      title: "Practice Exploratory Data Analysis",
      description:
        "Work through 2-3 Kaggle notebooks performing full EDA on diverse datasets. Document your thought process — this builds the analytical storytelling skill critical for this role.",
      priority: "low",
      category: "skill",
    },
  ],
  interviewQuestions: [
    {
      question:
        "Walk me through your approach to building a machine learning model from raw data to production-ready predictions.",
      type: "technical",
      tips:
        "Cover the full pipeline: data cleaning with Pandas, feature engineering, train/test split, model selection with Scikit-learn, evaluation metrics, and iteration. Mention specific libraries and techniques you use at each step.",
    },
    {
      question:
        "You have a dataset with 50 columns and millions of rows. How do you decide which features matter most?",
      type: "technical",
      tips:
        "Discuss correlation analysis, feature importance from tree-based models, permutation importance, and dimensionality reduction (PCA). Mention how you handle multicollinearity and the trade-off between interpretability and performance.",
    },
    {
      question:
        "Tell me about a time your model performed well in training but poorly in production. What happened and how did you fix it?",
      type: "behavioral",
      tips:
        "Use the STAR method. Discuss data drift, train-test distribution mismatch, or overfitting. Show how you diagnosed the root cause, what adjustments you made (feature engineering, regularization, retraining), and the outcome.",
    },
    {
      question:
        "How would you explain a complex machine learning model's prediction to a non-technical stakeholder?",
      type: "situational",
      tips:
        "Emphasize using plain language, visual aids, and analogies. Mention SHAP values or LIME for explainability. Show you can translate technical results into business impact and actionable recommendations.",
    },
    {
      question:
        "What is the difference between L1 and L2 regularization, and when would you use each?",
      type: "technical",
      tips:
        "L1 (Lasso) produces sparse models by driving some coefficients to zero — useful for feature selection. L2 (Ridge) shrinks coefficients evenly — better when you believe all features contribute. Discuss elastic net as a hybrid approach.",
    },
    {
      question:
        "Describe your experience with NLP or generative AI. What challenges did you encounter and how did you solve them?",
      type: "technical",
      tips:
        "Discuss tokenization, embeddings, fine-tuning strategies, or RAG pipelines. Mention specific challenges like handling imbalanced text data, long-context windows, hallucination mitigation, or prompt engineering.",
    },
    {
      question:
        "How do you prioritize multiple data science projects with competing deadlines?",
      type: "general",
      tips:
        "Explain your framework for evaluating impact vs. effort. Mention stakeholder communication, breaking work into milestones, and knowing when to ship an 80% solution versus iterating further.",
    },
    {
      question:
        "What steps do you take to ensure your analysis is reproducible and your code is maintainable?",
      type: "general",
      tips:
        "Discuss version control with Git, virtual environments, Jupyter notebooks vs. Python scripts, logging, docstrings, and automated testing. Emphasize clean code practices and documentation habits.",
    },
  ],
};
