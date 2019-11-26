import { renderHook, act } from '@testing-library/react-hooks'
import {useKeys} from "./useKeys";

test('initial value', () => {
  const { result } = renderHook(() => useKeys());
  expect(result.current.keys).toEqual([0]);
});

test('add', () => {
  const { result } = renderHook(() => useKeys());

  act(() => {
    result.current.add();
    result.current.add();
    result.current.add();
  });

  expect(result.current.keys).toEqual([0, 1, 2, 3]);
});

test('remove', () => {
  const { result } = renderHook(() => useKeys());

  act(() => {
    result.current.add();
    result.current.add();
    result.current.add();
    result.current.remove(1);
    result.current.remove(2);
  });

  expect(result.current.keys).toEqual([0, 3]);
});

test('remove and add', () => {
  const { result } = renderHook(() => useKeys());

  act(() => {
    result.current.remove(0);
    result.current.add();
  });

  expect(result.current.keys).toEqual([0]);
});
