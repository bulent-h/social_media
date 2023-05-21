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
                'px-7 bg-opacity-60 drop-shadow-2xl appearance-none overflow-hidden text-center rounded-full bg-black text-white focus:border-black focus:ring-gray-500 shadow-sm hover:bg-white' +
                className
            }
            ref={input}
        />
    );
});
