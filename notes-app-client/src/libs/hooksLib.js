import { useState } from 'react';

export function useFormFields(initState) {
    const [ fields, setValues ] = useState(initState);

    return [
        fields,
        function(e) {
            setValues({
                ...fields,
                [ e.target.id ]: e.target.value
            });
        }
    ];
}