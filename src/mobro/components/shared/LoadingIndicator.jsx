function LoadingIndicator ({className = "", ...props}) {
    return (
        <div className={`lds-ring ${className}`} {...props}>
            <div></div>
        </div>
    );
}

export default LoadingIndicator;