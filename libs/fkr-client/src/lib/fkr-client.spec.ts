import {  fkrGetToken, getCache } from "./fkr-client";


describe('fkrClient', () => {
  const OLD_ENV = process.env;
  beforeEach(async () => {
    await getCache().destroy();
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should work', async () => {
    process.env.FKR_STS_URL = 'https://example.local/fgsdf';
    process.env.FKR_FHIR_URL = 'https://example.local/fgsdf';
    process.env.FKR_CLIENT_ID = 'xxx';
    process.env.FKR_CLIENT_SECRET = 'xxx';

    const result = await fkrGetToken();
    expect(result).toEqual("gf");
  });
});
