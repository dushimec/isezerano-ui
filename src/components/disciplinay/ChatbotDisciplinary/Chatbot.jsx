import React from "react";
import { Chatbot as SimpleChatbot } from "react-simple-chatbot";

const Chatbot = () => {
  const chatbotData = [
    {
      question: "How to edit attendance records?",
      answer: "To edit an attendance record, navigate to the specific date, click 'Edit', update the status, and save your changes.",
    },
    {
      question: "How to view attendance reports?",
      answer: "Go to the reports section, select 'Attendance', filter by date range, and click 'Generate Report'.",
    },
    {
      question: "What do the colors on the dashboard mean?",
      answer: "Colors indicate attendance status: green is good attendance, red needs attention.",
    },
    {
      question: "How is attendance percentage calculated?",
      answer: "It's calculated as (attended sessions / total sessions) × 100.",
    },
  ];

  const steps = chatbotData.map((item, index) => ({
    id: `step-${index}`,
    message: item.question,
    trigger: `answer-${index}`,
  }));

  
  const responses = chatbotData.map((item, index) => ({
    id: `answer-${index}`,
    message: item.answer,
    end: true,
  }));

  return (
    <div>
      <h1>My Chatbot</h1>
      <SimpleChatbot
        steps={[...steps, ...responses]} 
      />
    </div>
  );
};

export default Chatbot;
