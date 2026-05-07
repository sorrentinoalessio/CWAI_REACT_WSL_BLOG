
const FormField = ({ id, label, error, children }) => {
    return (
        <div className="form_field">
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p className="error_message">{error}</p>}
        </div>
    );
};

export default FormField;