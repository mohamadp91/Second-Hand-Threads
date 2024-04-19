import Validator from 'validator'

export const validatePassword = (password) => {
  const hasUppercase = Validator.isUppercase(
    password.split('').some((char) => char !== char.toLowerCase()),
  )
  const hasNumber = Validator.isNumeric(
    password.split('').some((char) => Validator.isNumeric(char)),
  )
  const hasSymbol =
    Validator.isAlphanumeric(password) &&
    !Validator.isAlpha(password) &&
    !Validator.isNumeric(password)

  return (
    Validator.isLength(password, { min: 8 }) &&
    hasUppercase &&
    hasNumber &&
    hasSymbol
  )
}

export const confirmPasswords = (password: string, el: string) =>
  password === el
