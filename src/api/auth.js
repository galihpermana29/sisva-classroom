import api from '.';

const Auth = {
  login(payload) {
    const headers = {
      'X-Sisva-Source': 'test',
    };

    return api.post(`/user/login`, payload, { headers });
  },
};

export default Auth;
