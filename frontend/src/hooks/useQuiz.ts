import { useState, useCallback } from 'react';
import { persistQuizState, getPersistedQuizState } from '@/lib/analytics';
import type { Question } from '@/types';

export interface QuizState {
  questions: Question[];
  answers: Record<string, string | null>;
  currentIndex: number;
  startedAt: number;
  attemptId: string;
}

export function useQuiz(attemptId: string, domainSlug: string, studentId: string) {
  const [state, setState] = useState<QuizState>(() => {
    // Restore from localStorage if same attempt
    const saved = getPersistedQuizState();
    if (saved && saved.attemptId === attemptId) {
      return {
        questions: [],
        answers: (saved.answers as Record<string, string | null>) || {},
        currentIndex: (saved.currentQuestion as number) || 0,
        startedAt: Date.now(),
        attemptId,
      };
    }
    return {
      questions: [],
      answers: {},
      currentIndex: 0,
      startedAt: Date.now(),
      attemptId,
    };
  });

  const setQuestions = useCallback((questions: Question[]) => {
    setState((prev) => ({ ...prev, questions }));
  }, []);

  const selectAnswer = useCallback(
    (questionId: string, optionId: string | null) => {
      setState((prev) => {
        // Enforce quiz rule: once an answer is submitted/chosen, it cannot be changed
        if (prev.answers[questionId]) {
          return prev;
        }
        if (!optionId) return prev;
        const newAnswers = { ...prev.answers, [questionId]: optionId };
        persistQuizState({
          attemptId,
          domainSlug,
          studentId,
          answers: newAnswers,
          startedAt: new Date().toISOString(),
          currentQuestion: prev.currentIndex,
        });
        return { ...prev, answers: newAnswers };
      });
    },
    [attemptId, domainSlug, studentId]
  );

  const goToQuestion = useCallback((index: number) => {
    setState((prev) => {
      persistQuizState({
        attemptId,
        domainSlug,
        studentId,
        answers: prev.answers,
        startedAt: new Date().toISOString(),
        currentQuestion: index,
      });
      return { ...prev, currentIndex: index };
    });
  }, [attemptId, domainSlug, studentId]);

  const goNext = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex >= prev.questions.length - 1) return prev;
      const next = prev.currentIndex + 1;
      persistQuizState({
        attemptId,
        domainSlug,
        studentId,
        answers: prev.answers,
        startedAt: new Date().toISOString(),
        currentQuestion: next,
      });
      return { ...prev, currentIndex: next };
    });
  }, [attemptId, domainSlug, studentId]);

  const goPrev = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex <= 0) return prev;
      const prev2 = prev.currentIndex - 1;
      persistQuizState({
        attemptId,
        domainSlug,
        studentId,
        answers: prev.answers,
        startedAt: new Date().toISOString(),
        currentQuestion: prev2,
      });
      return { ...prev, currentIndex: prev2 };
    });
  }, [attemptId, domainSlug, studentId]);

  const answeredCount = Object.values(state.answers).filter((v) => v !== null).length;
  const currentQuestion = state.questions[state.currentIndex] || null;
  const isLast = state.currentIndex === state.questions.length - 1;
  const isFirst = state.currentIndex === 0;

  return {
    state,
    setQuestions,
    selectAnswer,
    goToQuestion,
    goNext,
    goPrev,
    answeredCount,
    currentQuestion,
    isLast,
    isFirst,
  };
}
