const resolve_links = require("./server");

/**
 * Test if `resolve_links` returns a plain object
 */
test('resolve_links returns an object', async () => {
    const result = await resolve_links([
        "https://www.example.com/css/style1.css",
        "https://www.example.com/css/style2.css",
        "https://www.example.com/css/style3.css",
        "https://www.example.com/css/style4.css"
    ]);
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(false);
    expect(typeof result).not.toBe('function');
});

/**
 * Test if `fetch` has been called 4 times with 4 links as parameters
 */
test('fecth is called inside resolve_links 4 times with 4 links as parameters', async () => {
    const spy = jest.spyOn(global, 'fetch');
    await resolve_links([
        "https://www.example.com/css/style1.css",
        "https://www.example.com/css/style2.css",
        "https://www.example.com/css/style3.css",
        "https://www.example.com/css/style4.css"
    ]);
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockRestore();
});

/**
 * Test if `fetch` has been called 0 times with empty array as parameter
 */
test('fecth is called inside resolve_links 0 times with empty array as parameter', async () => {
    const spy = jest.spyOn(global, 'fetch');
    await resolve_links([]);
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
});