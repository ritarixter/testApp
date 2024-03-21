export const prerender = false;
export const ssr = false;

export const load = ({ url }) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
