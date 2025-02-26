import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url) => {

   const [state, setState] = useState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
   });

   useEffect(() => {
      getFetch();
   }, [url]);

   const setIsLoading = () => {
      setState({
         data: null,
         isLoading: true,
         hasError: false,
         error: null,
      })
   }

   const getFetch = async () => {
      console.log(localCache[url]);

      if(localCache[url]){
         console.log('Usando cache');
         setState({
            data: localCache[url],
            isLoading: false,
            hasError: false,
            error: null,
         });
         return;
      }

      setIsLoading();

      const resp = await fetch(url);

      await new Promise( resolve => setTimeout(resolve, 1000));

      if( !resp.ok ){
         setState({
            data: null,
            isLoading: false,
            hasError: true,
            error: {
               code: resp.status,
               message: resp.statusText
            }
         });
         return;
      }

      const data = await resp.json();
      localCache[url] = data;
      setState({
         data,
         isLoading: false,
         hasError: false,
         error: null,
      })

   }

   return {
      data: state.data,
      isLoading: state.isLoading,
      hasError: state.hasError,
   }
}
