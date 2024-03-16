export const emailValidation = {
  required: '이메일을 입력해주세요',
  pattern: {
    value:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    message: '이메일 형식에 맞지 않습니다.',
  },
};

export const nicknameValidation = {
  required: '닉네임을 입력해주세요',
  minLength: { value: 2, message: '닉네임은 최소 2글자 이상이어야 합니다' },
  maxLength: { value: 6, message: '닉네임은 최대 6글자입니다.' },
  pattern: {
    value: /^[가-힣a-zA-Z0-9]+$/,
    message: '닉네임은 한글, 알파벳, 숫자만 입력해주세요!',
  },
};

export const passwordValidation = {
  required: '비밀번호를 입력해주세요',
  minLength: { value: 6, message: '비밀번호는 최소 6글자 이상이어야 합니다' },
  maxLength: { value: 8, message: '비밀번호는 최대 8글자입니다.' },
};

export const password2Validation = (password: string) => ({
  required: '비밀번호를 재입력해주세요',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 6글자 이상이어야 합니다',
  },
  maxLength: {
    value: 8,
    message: '비밀번호는 최대 8글자입니다.',
  },
  validate: {
    matchPassword: (value: any) =>
      value === password || '비밀번호가 일치하지 않습니다.',
  },
});
