export type UrlRec = {
   slug: string,
   url: string,
   id: number,
   user: string;
}

export type JSONApiResult = {
   data: Array<{attributes: UrlRec}>
}