function Checkbox({name, data, onChange}) {
    return (
        <div className="form-group">
            <label>
                {name}

                <input
                    className="ml-1"
                    type="checkbox"
                    value={!!data}
                    checked={!!data}
                    onChange={(event) => onChange(!!event.target.checked)}
                />
            </label>
        </div>
    );
}

export default Checkbox;