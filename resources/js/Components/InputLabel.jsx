export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-100 dark:text-gray-300 text-center mb-1` + className}>
            {value ? value : children}
        </label>
    );
}
