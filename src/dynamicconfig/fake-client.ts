export interface FakeClientConfig {
  timeout: number;
}
export class FakeClient {
  constructor(private readonly config: FakeClientConfig) {}
  async fetch(str: string): Promise<string> {
    return new Promise((resolve) =>
      setTimeout(resolve, this.config.timeout, str),
    );
  }
}
