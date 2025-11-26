"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuestionDetailPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/Courses/${cid}/Quizzes/${qid}/questions`);
  }, [cid, qid, router]);

  return <div>Redirecting...</div>;
}
