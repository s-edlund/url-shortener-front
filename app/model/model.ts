export type UrlRec = {
   slug: string,
   url: string,
   id: number,
   user: string;
   visits?: number;
}

export type JSONApiResult = {
   data: Array<{attributes: UrlRec}>
}