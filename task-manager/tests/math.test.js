import {describe, expect, test} from '@jest/globals';
import { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } from "../src/math.js";

test('test sum', () => {
    let total = calculateTip(10, .3);
    expect(total).toBe(13);

    total = calculateTip(10);
    expect(total).toBe(12.5);
});

describe('Test conversion functions', () => {
    test('Should convert 32 F to 0 C', () => {
        const res = fahrenheitToCelsius(32);
        expect(res).toBe(0); 
    });

    test('Should convert 0 C to 32 F', () => {
        const res = celsiusToFahrenheit(0);
        expect(res).toBe(32); 
    });
});

test('Should add two numbers async/await', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});