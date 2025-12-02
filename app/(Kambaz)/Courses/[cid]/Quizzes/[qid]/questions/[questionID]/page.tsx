"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Not sure if I still need this after moving all logic to the questions page?
// TO DO: Decide
export default function QuestionDetailPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/Courses/${cid}/Quizzes/${qid}/questions`);
  }, [cid, qid, router]);

  return;
}
