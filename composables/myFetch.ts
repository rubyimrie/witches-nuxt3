export const myFetch = async (request, opts = {}) => {
    const config = useRuntimeConfig();
    const baseURL = config.public.baseURL;
    const url = new URL(request, baseURL);
    
    return await $fetch(url, opts);
      
     
  };