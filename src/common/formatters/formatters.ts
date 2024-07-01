export const formatter = {
  minutesAndSeconds: (totalSeconds: number): string => {
    if (totalSeconds < 0) {
      return "0:00";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const secondsDisplay = seconds.toString().padStart(2, "0");

    return `${minutes}:${secondsDisplay}`;
  },
  phone: (phoneNumber: string | undefined | null, ext?: string | undefined): string => {
    if (!phoneNumber) {
      return "";
    }
    const formattedExt = ext && ext.length > 0 ? ` x${ext}` : "";
    const strippedPhone = phoneNumber.replace(/\D/g, "");

    if (strippedPhone.length < 4) {
      return `${strippedPhone}${formattedExt}`;
    }

    if (strippedPhone.length < 7) {
      return `(${strippedPhone.substring(0, 3)}) ${strippedPhone.substring(3)}${formattedExt}`;
    }

    return `(${strippedPhone.substring(0, 3)}) ${strippedPhone.substring(
      3,
      6
    )}-${strippedPhone.substring(6)}${formattedExt}`;
  },
  date: (date: string | undefined | null): string => {
    if (!date) {
      return "";
    }
    const formattedDate = date.replace(/\D/g, "");

    if (formattedDate.length < 3) {
      return `${formattedDate}`;
    }

    if (formattedDate.length < 5) {
      return `${formattedDate.substring(0, 2)}/${formattedDate.substring(2, 4)}`;
    }

    return `${formattedDate.substring(0, 2)}/${formattedDate.substring(
      2,
      4
    )}/${formattedDate.substring(4, 8)}`;
  },
  creditCardExpiration: (expiration: string | undefined | null): string => {
    if (!expiration) {
      return "";
    }
    const expirationDigits = expiration.replace(/\D/g, "");

    if (expirationDigits.length < 3) {
      return `${expirationDigits}`;
    }

    return `${expirationDigits.substring(0, 2)}/${expirationDigits.substring(2)}`;
  },
};
