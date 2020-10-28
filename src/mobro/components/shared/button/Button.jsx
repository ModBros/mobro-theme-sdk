function Button(props) {
    const {
        variant = "primary",
        className = null,
        onClick,
        children
    } = props;

    return (
        <button type={"button"} className={`btn btn-${variant} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;