export default function ({className = "", ...props}) {
    return (
        <div className={`lds-ring ${className}`} {...props}>
            <div></div>
        </div>
    );
}