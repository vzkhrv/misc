import { useCallback, useState } from 'react';

type ReturnType = [
    boolean,
    {
        show(): void;
        hide(): void;
        toggle(): void;
    },
];

function useStateToggle(initialState = false): ReturnType {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState(val => !val), []);
    const show = useCallback(() => setState(true), []);
    const hide = useCallback(() => setState(false), []);
    return [
        state,
        {
            show,
            hide,
            toggle,
        },
    ];
}

export default useStateToggle;
