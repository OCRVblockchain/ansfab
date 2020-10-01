const required = input => {
  return input.length === 0
    ? `Обязательное поле`
    : null;
};

const minLength = min => {
  return input => input.length < min
    ? `Значение должно быть не меньше ${min} символов`
    : null;
};

const maxLength = max => {
  return input => input.length > max
    ? `Значение должно быть не больше ${max} символов`
    : null;
};

const numeric = input => {
  const re = /^\d+$/;
  return input.length === 0 || re.test(input)
    ? null
    : "Только цифры";
}

const isEmail = () => {
  const re = /\S+@\S+\.\S+/;
  return input => re.test(input)
    ? null
    : "Некорректный email адрес";
}

export { required, minLength, maxLength, numeric, isEmail };