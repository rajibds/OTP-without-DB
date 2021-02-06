import urlTemplate from 'url-template';

function url(template, params) {
  const myParams = { ...params };
  if (myParams.format === undefined) {
    myParams.format = 'json';
  }
  return urlTemplate.parse(template).expand(myParams);
}

const routes = {
  otps: {
    generate: params => url('/otps/generate{.format}{?email}', params),
  },
};

export default routes;
