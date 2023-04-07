export class FancyDate extends Date {
  expiresAt: Date;

  constructor(expiresAt = "0") {
    super();
    this.expiresAt = new Date(expiresAt);
  }

  getClientTZ() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getExpiresAtAsTimeStamp() {
    return this.expiresAt.getTime();
  }

  getRemaindedMinutes() {
    return Math.floor((this.getExpiresAtAsTimeStamp() - Date.now()) / 60000);
  }

  getRemindedSeconds() {
    return Math.floor((this.getExpiresAtAsTimeStamp() - Date.now()) / 1000);
  }

  getRemaindedMMSS() {
    return new Date(this.getExpiresAtAsTimeStamp() - Date.now())
      .toISOString()
      .slice(14, 19);
  }

  getRemaindedMMSSFromSeconds(seconds: number) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
  }

  getDateWithMinutesFromNow(minutes: number) {
    return new Date(new Date().getTime() + minutes * 60000).toISOString();
  }
}

export const createTimer = (expiresAt: string) => new FancyDate(expiresAt);
