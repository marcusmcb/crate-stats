import { describe, expect, it } from 'vitest';
import { calculateTagHealth } from '../src/legacy/calculateTagHealth';
describe('calculateTagHealth', () => {
    it('returns zeros when totalCount is 0', () => {
        expect(calculateTagHealth(5, 0)).toEqual({
            percentage_with_tag: 0,
            empty_tag_count: 0,
        });
    });
    it('calculates percentage and empty count', () => {
        expect(calculateTagHealth(3, 10)).toEqual({
            percentage_with_tag: 30,
            empty_tag_count: 7,
        });
    });
    it('rounds to 2 decimals', () => {
        expect(calculateTagHealth(1, 3)).toEqual({
            percentage_with_tag: 33.33,
            empty_tag_count: 2,
        });
    });
});
