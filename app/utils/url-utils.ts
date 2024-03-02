

export class URLUtils {

   isValidUrl(url: string): boolean {
      try {
         new URL(url);
         return true;
       } catch(err:any) {
         return false;
       }
   }

   getProtocol(url: string): string {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol;
      return protocol;
   }

   getUrlWithoutProtocol(url: string): string {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol;
      let withoutProtocol = url.replace(protocol, ''); // should replace first occurance.

      // need to trim initial / (could be many of them).
      while(withoutProtocol.startsWith('/'))
         withoutProtocol = withoutProtocol.replace('/', '');

      return withoutProtocol;
   }
}