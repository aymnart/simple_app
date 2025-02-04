"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { RegisterForm } from "@/components/auth/register-form";

const marketingPhrases = [
  "Revolutionize your workflow with an AI-optimized inbox that learns your priorities and acts on them.",
  "AI-driven sentence autocomplete crafts replies in your tone before you finish typing.",
  "Predictive follow-up suggestions: Let AI draft responses based on email context and your past habits.",
  "Smart email summaries generated by AI ensure you never miss critical details in lengthy threads.",
  "Auto-prioritize messages with AI that analyzes urgency, relationships, and your work patterns.",
  "AI-enhanced threat detection blocks sophisticated phishing attempts before they reach you.",
  "Instantly convert messy email threads into actionable tasks with AI-powered parsing.",
  "Smart scheduling assistant: AI proposes optimal meeting times by scanning calendars and email content.",
  "Tone-checker AI polishes your messages to avoid misunderstandings, adjusting formality in real-time.",
  "Automatically translate emails into 20+ languages without losing nuance – powered by neural networks.",
  "AI attachment scanner detects sensitive data and suggests encryption before you hit ‘send’.",
  "Frictionless multitasking: Split-screen AI helps you write emails while referencing other messages.",
  "Behavioral AI nudges: Get reminders to follow up or archive based on your habits.",
  "AI-generated email templates adapt to recipients – personalize cold outreach at scale.",
  "Smart unsubscribe 2.0: AI identifies low-value subscriptions so you can declutter faster.",
  "AI-powered ‘Inbox Zero’ coach guides you to efficiency with personalized productivity tips.",
  "Sentiment analysis flags high-priority emails by recognizing frustration or urgency in messages.",
  "AI-assisted writing: Fix grammar, reduce wordiness, and perfect punctuation in one click.",
  "Auto-create meeting agendas from email threads – let AI extract action items and decisions.",
  "Future-ready AI: The more you use it, the better it adapts to your unique communication style.",
];

export default function RegisterPage() {
  const [currentQuote, setCurrentQuote] = useState(marketingPhrases[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % marketingPhrases.length);
    }, 7000); // Change quote every 8 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentQuote(marketingPhrases[quoteIndex]);
  }, [quoteIndex]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-1 flex-col items-center justify-center lg:w-full w-screen">
        <RegisterForm />
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={"/man-computer.jpg"}
          alt="Students collaborating in a modern classroom"
          className="h-full object-cover dark:brightness-[0.7] dark:grayscale"
          width={6000}
          height={4000}
          loading="lazy"
        />
        <div className=" absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/20 to-foreground/20 dark:from-background/90 dark:via-background/50 dark:to-background/30" />
        <div className="absolute bottom-0 left-0 right-0 text-white p-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-lg font-medium italic max-w-lg text-balance mx-auto">
                {currentQuote}
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
