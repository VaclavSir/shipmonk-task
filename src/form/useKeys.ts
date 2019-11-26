import { useCallback, useState } from "react";

export function useKeys(initialCount = 1) {
    const [keys, setKeys] = useState<ReadonlyArray<number>>(
        new Array(initialCount).fill(null).map((_, index) => index)
    );
    const add = useCallback(() => {
        setKeys(keys => keys.length ? [...keys, keys[keys.length - 1] + 1] : [0]);
    }, []);
    const remove = useCallback((indexToRemove: number) => {
        setKeys(keys => keys.filter(index => index !== indexToRemove));
    }, []);

    return {
        keys,
        add,
        remove,
    }
}
