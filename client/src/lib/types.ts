export type Screenshot = {
    id: string;
    statusMessage: string;
    userId: string;
    userProvidedUrl: string;
    status: string;
    imageUrl: string;
    createdAt: Date;
  };
  
export type ScreenshotData = {
    number: number;
    status: string;
    type: string;
    host: string;
    options: string;
    timeSec: string;
    size: string;
    timeStamp: string;
  };