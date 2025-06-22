export const createUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min:5,
                max:40
            },
            errorMessage: "",
        },
        notEmpty: {
            errorMessage: "",
        },
        isString: {
            errorMessage: "",
        }
        
    }
}