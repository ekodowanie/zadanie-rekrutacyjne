import { renderHook, act } from '@testing-library/react-hooks';
import { useTitle } from './useTitle';

describe('useTitle.ts test', () => {
  it('should set title', () => {
    renderHook(() => useTitle('Test'));
    act(() => {
      expect(document.title).toBe(`${process.env.REACT_APP_NAME} - Test`);
    });
  });
});
