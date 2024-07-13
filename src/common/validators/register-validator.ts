export const RegisterValidator = {
  userName: (userName: string): string[] => {
    const errors: string[] = [];
    if (!userName) errors.push("Username is required");

    if (userName.length > 50) errors.push("Username limited to 50 characters");

    return errors;
  },
  email: (email: string): string[] => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: string[] = [];
    if (!email) errors.push("Email is required");

    if (!emailRegex.test(email)) {
      errors.push("Email  must include a valid format");
    }

    return errors;
  },
  country: (country: string): string[] => {
    const errors: string[] = [];
    if (!country) errors.push("Country is required");

    return errors;
  },
  password: (password: string): string[] => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const errors: string[] = [];
    if (!password) errors.push("Password is required");
    if (password.length < 8) errors.push("Password must have minimum length of 8");
    if (password.length > 20) errors.push("Password must have maximum length of 20");

    if (!passwordRegex.test(password))
      errors.push(
        "password must include a capital letter, use at least one lowercase letter, consists of at least one digit and at least one special symbol"
      );

    return errors;
  },
  termsAndConditions: (termsAndConditions: boolean): string[] => {
    const errors: string[] = [];
    if (termsAndConditions === false) errors.push("Terms and Conditions are required");

    return errors;
  },
};
