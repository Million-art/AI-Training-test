export class OAuth2Token {
  accessToken: string;
  expiresAt: number; // unix seconds

  constructor(accessToken: string, expiresAt: number) {
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
  }

  get expired(): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now >= this.expiresAt;
  }

  asHeader(): string {
    // Strip control chars (e.g. \r, \n, \0) invalid in HTTP header values
    const safe = this.accessToken.replace(/[\x00-\x1f\x7f]/g, "");
    return `Bearer ${safe}`;
  }
}