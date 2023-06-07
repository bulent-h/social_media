import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'px-7 bg-opacity-60  appearance-none overflow-hidden text-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-none focus:border-none focus:border-gray-300 focus:ring-gray-300 focus:dark:ring-gray-700 shadow-sm hover:bg-white' +
                className
            }
            ref={input}
        />

    );
});
