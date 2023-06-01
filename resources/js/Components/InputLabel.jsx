export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-black dark:text-white text-center mb-1` + className}>
            {value ? value : children}
        </label>
    ); 
}
