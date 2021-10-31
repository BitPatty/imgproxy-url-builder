import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toContainPixel(
        startIndex: number,
        color: { r: number; g: number; b: number; a: number },
      ): jest.CustomMatcherResult;

      toRespondWith(statusCode: number): Promise<jest.CustomMatcherResult>;
    }
  }
}

expect.extend({
  toContainPixel(
    received: Uint8Array,
    startIndex: number,
    color: { r: number; g: number; b: number; a: number },
  ): jest.CustomMatcherResult {
    const r = received[startIndex];
    const g = received[startIndex + 1];
    const b = received[startIndex + 2];
    const a = received[startIndex + 3];

    if (r !== color.r || g !== color.g || b !== color.b || a !== color.a) {
      return {
        pass: false,
        message: () =>
          `Expected ${r}/${g}/${b}/${a}, got ${color.r}/${color.g}/${color.b}/${color.a}`,
      };
    }

    return {
      pass: true,
      message: () => '',
    };
  },
});

expect.extend({
  async toRespondWith(
    received: string,
    statusCode: number,
  ): Promise<jest.CustomMatcherResult> {
    let code: number;
    try {
      const res = await axios.get(received);
      code = res.status;
    } catch (err) {
      code = err?.response?.status;
    }

    if (code !== statusCode) {
      return {
        pass: false,
        message: () => `Expected ${statusCode}, got ${code}`,
      };
    }

    return {
      pass: true,
      message: () => '',
    };
  },
});

export default undefined;
