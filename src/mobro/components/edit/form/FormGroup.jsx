function FormGroup(props) {
    const {
        label,
        inline = false,
        children
    } = props;
    return (
        <div className={`form-group ${inline ? "d-flex aling-items-center" : ""}`}>
            <div className={inline ? "mr-2 mb-0 d-inline-block" : ""}>
                <label className={inline ? "mb-0" : ""}>
                    {label}
                </label>
            </div>

            <div className={inline ? "flex-fill" : ""}>
                {children}
            </div>
        </div>
    );
}

export default FormGroup