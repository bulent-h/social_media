import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ children, className = '', isFocused = false ,defualtValue='', ...props  }, ref  ) {
    // const input = ref ? ref : useRef();

    // useEffect(() => {
    //     if (isFocused) {
    //         input.current.focus();
    //     }
    // }, []);

    return (
        <>
            {/* <input
                {...props}
                type={type}
                className={
                    'px-7 bg-opacity-60  appearance-none overflow-hidden text-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-none focus:border-none focus:border-gray-300 focus:ring-gray-300 focus:dark:ring-gray-700 shadow-sm hover:bg-white' +
                    className
                }
                ref={input}
            /> */}
            <select
                {...props}
                className={'mt-1 border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-200 dark:focus:border-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-md shadow-sm ' +
                    className
                }
            >
                <option value={defualtValue}> {defualtValue}</option>
                {children}
            </select>
        </>
    );
});
