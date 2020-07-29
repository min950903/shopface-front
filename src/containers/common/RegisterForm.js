import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/common/AuthForm';
import {
  changeInput,
  initializeForm,
  registerMember,
} from '../../modules/common/auth';
import AuthTemplate from '../../components/common/AuthTemplate';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { register, auth, authError, isRegister } = useSelector(({ auth }) => ({
    register: auth.register,
    user: auth.user,
    authError: auth.authError,
    isRegister: auth.isRegister,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        type: 'register',
        id: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const member = register;
    if (
      [
        member.id,
        member.password,
        member.name,
        member.phone,
        member.email,
      ].includes('')
    ) {
      setError('빈칸을 모두 입력해주세요');
      return;
    }
    dispatch(registerMember({ member }));
  };

  useEffect(() => {
    setError(null);
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError !== null) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (isRegister === 'Success') {
      history.push('/login');
    }
  }, [history, isRegister]);

  return (
    <AuthTemplate>
      <AuthForm
        type="register"
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </AuthTemplate>
  );
};

export default withRouter(RegisterForm);
