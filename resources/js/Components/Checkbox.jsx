export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-white text-gray-900 shadow-sm ' +
                className
            }
        />
    );
}
