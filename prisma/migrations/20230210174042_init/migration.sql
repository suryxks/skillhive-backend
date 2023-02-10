-- CreateTable
CREATE TABLE "VideoNotes" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL,

    CONSTRAINT "VideoNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoNotes" ADD CONSTRAINT "VideoNotes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoNotes" ADD CONSTRAINT "VideoNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
