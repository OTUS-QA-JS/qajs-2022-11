import { expect, test} from "@jest/globals";
import login from '../helper.js'

test('returns a token', async () => {
    const token = await login();
    expect(typeof token).toBe('string');
  });



