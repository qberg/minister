export type OTPRequestResult = {
  success: boolean;
  otp?: string;
  message: string;
  blockedUntil?: Date;
  waitSeconds?: number;
};

export type OTPVerifyResult = {
  success: boolean;
  message: string;
  attemptsRemaining?: number;
};
