export const LoginValidator = {
  userName: (userName: string): string[] => {
    const errors: string[] = [];
    if (!userName) errors.push('Username is required');

    if (userName.length > 50) errors.push('Username limited to 50 characters');

    return errors;
  },
  password: (password: string): string[] => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const errors: string[] = [];
    if (!password) errors.push('Password is required');
    if (password.length < 8)
      errors.push('Password must have minimum length of 8');
    if (password.length > 20)
      errors.push('Password must have maximum length of 20');

    if (!passwordRegex.test(password))
      errors.push(
        'password must include a capital letter, use at least one lowercase letter, consists of at least one digit'
      );

    return errors;
  },
};
