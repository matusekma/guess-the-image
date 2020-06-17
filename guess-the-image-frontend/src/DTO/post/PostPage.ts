import PostWithoutComments from "./PostWithoutComments";

export default interface PostPage {
  posts: PostWithoutComments[];
  page: number;
  pageSize: number;
  totalPages: number;
  isLast: boolean;
}

export type PostPageResponse = {
  content: PostWithoutComments[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export function convertToPostPage(response: PostPageResponse): PostPage {
  return {
    posts: response.content,
    page: response.number,
    pageSize: response.size,
    totalPages: response.totalPages,
    isLast: response.last,
  };
}
