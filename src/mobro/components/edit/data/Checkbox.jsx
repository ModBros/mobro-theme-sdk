function Checkbox({name, data, onChange}) {
    return (
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
    );
}

export default Checkbox;