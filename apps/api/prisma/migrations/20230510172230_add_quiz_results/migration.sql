-- CreateTable
CREATE TABLE "QuizResult" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quizId" UUID NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResultAnswer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resultId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "selectedId" UUID NOT NULL,

    CONSTRAINT "QuizResultAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResultAnswer" ADD CONSTRAINT "QuizResultAnswer_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "QuizResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResultAnswer" ADD CONSTRAINT "QuizResultAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResultAnswer" ADD CONSTRAINT "QuizResultAnswer_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "QuizAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
