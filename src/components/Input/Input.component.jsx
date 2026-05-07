import FormField from "../FormField/FormField";

const Input = ({ id, label, error, ...props }) => {
    return (
        <FormField id={id} label={label} error={error}>
            <input id={id} {...props} />
        </FormField>
    );
};  
   export default Input;            