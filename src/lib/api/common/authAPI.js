import { Auth } from '@aws-amplify/auth';
import client from '../client';

export const login = async ({ id, password }) => {
  try {
    const user = await Auth.signIn(id, password);
    const name = user.signInUserSession.idToken.payload.email;
    const jwt = user.signInUserSession.idToken.jwtToken;

    const response = await client.get(`/member/${name}`);
    const type = response.data.data.type;

    localStorage.setItem(
      'user',
      JSON.stringify({ user: name, jwt: jwt, type: type }),
    );

    return { data: { user: { name, jwt, type } } };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  await Auth.signOut({ global: true }).catch(() => {
    throw new Error();
  });
  try {
    localStorage.removeItem('user');
    return { message: 'Success' }; // 수정요망
  } catch (error) {
    throw new Error('로그아웃 실패');
  }
};

export const signUp = async ({ member, certCode }) => {
  const response = await Auth.signUp({
    username: member.id,
    password: member.password,
    attributes: {
      name: member.name,
      phone_number: `+82${member.phone}`,
    },
  })
    .then(async () => {
      const response = await client
        .post('/member', member)
        .then(async (resolve) => {
          if (member.type === 'E') {
            return await client.patch('/employ', {
              memberId: member.id,
              certCode: certCode,
            });
          }
          return resolve;
        });

      return response;
    })
    .catch((e) => {
      throw new Error(e.code);
    });

  return response;
};

export const checkExpire = async () => {
  let isExpired = false;
  await Auth.currentSession()
    .then((session) => {
      const accessTokenExpire = session.getAccessToken().getExpiration() - 100;
      const currentTimeSeconds = Math.round(Date.now() / 1000);
      if (accessTokenExpire < currentTimeSeconds) {
        return (isExpired = true);
      }
    })
    .catch((e) => {
      console.log(' 세션이 존재하지 않습니다. ');
      return isExpired;
    });
  return isExpired;
};

export const checkCertCode = async ({ memberId, certCode }) => {
  const response = await client.patch('/employ', {
    memberId,
    certCode,
  });
  return response;
};
