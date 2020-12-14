function Button(props) {
    const {
        variant = "primary",
        className = null,
        round = false,
        size = null,
        onClick,
        children,
        ...buttonProps
    } = props;

    const roundCls = round ? "btn-round" : "";
    const sizeCls = size ? `btn-${size}` : "";

    return (
        <button
            {...buttonProps}
            type={"button"}
            className={`btn btn-${variant} ${className} ${roundCls} ${sizeCls}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;