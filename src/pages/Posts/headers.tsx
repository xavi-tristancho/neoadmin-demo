import { posts } from "./fixtures/posts";

const headers = {
  type: "CRUD", // Specify the header as a `CRUD` type
  options: {
    name: "Post", // Name the sidebar option and the page title
    route: { path: "/posts", home: true }, // Specify the page url
    requests: {
      findRequest: () => Promise.resolve(posts),
      findOneRequest: ({ id }) => {
        return Promise.resolve(posts.find((post) => post.id === parseInt(id)));
      },
      upsertRequest: (item) => {
        const nextItem = {
          ...item,
          id: posts.length + 1,
        };
        console.log(item);
        posts.push(nextItem);
        return Promise.resolve(nextItem);
      },
    },
    tableOptions: {
      isEditable: true, // Enable edit rows
      isDeletable: true, // Enable delete rows
    },
  },
  sections: [
    {
      fields: [
        {
          label: "Image",
          property: "image",
          type: "image",
        },
        {
          label: "Title",
          property: "title",
          type: "text",
        },
        {
          label: "Date",
          property: "date",
          type: "date",
        },
        {
          label: "Content",
          property: "content",
          type: "html",
        },
        {
          label: "Category",
          property: "category",
          type: "multiselect",
          relation: {
            isMulti: false,
            name: "category",
            nameProps: ["category"],
            options: posts.map((post) => ({
              value: post.category,
              label: post.category,
            })),
          },
        },
        {
          property: "visible",
          tableOptions: {
            show: false,
          },
          type: "checkbox",
        },
      ],
    },
  ],
};

export default headers;