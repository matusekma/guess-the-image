import Post from "./Post";

export default interface PostPage {
  posts: Post[];
  page: number;
  pageSize: number;
  totalPages: number;
  isLast: boolean;
}

const responseExample = {
  content: [
    {
      id: 2,
      url:
        "https://matuly.blob.core.windows.net/images/image_2a4de13d-54b0-47a0-8798-9509e732686e.jpg",
      createdAt: "2020-06-15T08:27:36.803868",
      comments: [],
      user: {
        id: 1,
        username: "matusekma",
        firstName: "Marton",
        lastName: "Matusek",
        email: "matusekma@asd.asd",
      },
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    unpaged: false,
    paged: true,
  },
  totalElements: 1,
  totalPages: 1,
  last: true,
  size: 10,
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  numberOfElements: 1,
  first: true,
  empty: false,
};

export type PostPageResponse = typeof responseExample;

export function convertToPostPage(response: PostPageResponse): PostPage {
  return {
    posts: response.content,
    page: response.number,
    pageSize: response.size,
    totalPages: response.totalPages,
    isLast: response.last,
  };
}
