function ComponentLabel(props) {
    const {
        label,
        className = ""
    } = props;

    if (!label) {
        return null;
    }

    return (
        <label className={`d-block mb-1 line-height-1 ${className}`}>
            <small>
                {label}
            </small>
        </label>
    );
}

export default ComponentLabel;