import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */
export const posts = [
  {
    _id: uuid(),
    post_img:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    media_type: "image",
    content: "NASA's stunning image captures Earth's delicate beauty from space, showcasing the vibrant blue planet cradled by the protective embrace of the ozone layer.",
    likes: {
      likeCount: 32,
      likedBy: [],
      dislikedBy: [],
    },
    username: "gurramcharan",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2023-05-04")),
    createdAt: new Date("2023-05-04"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    post_img:
      "https://images.news18.com/ibnlive/uploads/2023/08/pm-modi--16920749743x2.jpg?impolicy=website&width=510&height=356",
    media_type: "image",
    content: "Independence Day 2023: India Working On 6G Launch, 'Task Force' Created, Says PM Modi",
    likes: {
      likeCount: 23,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anju_123",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2023-04-12")),
    createdAt: new Date("2023-04-12"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    post_img:
      "https://www.hindustantimes.com/ht-img/img/2023/08/09/550x309/earth_1691575027071_1691575027664.png",
    media_type: "image",
    content:
      "Chandrayaan-3 gets closer to Moon after fourth orbit reduction manoeuvre",
    likes: {
      likeCount: 104,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anju_123",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2023-01-09")),
    createdAt: new Date("2023-01-09"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    post_img:
      "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    media_type: "image",
    content: "Google Confirms It Doesn't Use User Data To Train AI Models Without Consent",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    username: "emmi",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2022-12-08")),
    createdAt: new Date("2022-12-08"),

    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    post_img:
      "https://imgeng.jagran.com/images/2023/aug/elon-musk-vs-mark-zuckerberg16877842769231691945604341.jpg",
    media_type: "image",
    content: "'Knock, Knock...': Elon Musk Accepts Mark Zuckerberg's Challenge For Cage Fight",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anil@2002",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2022-09-02")),
    createdAt: new Date("2022-09-02"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    post_img:
      "https://images.unsplash.com/photo-1678483789107-0029c61fdcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80",
    media_type: "image",
    content:
      "ChatGPT Creator OpenAI Says AI Tools Can Be Effective In Content Moderation",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    username: "virat@18",
    createdAt_format: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeZone: "Australia/Sydney",
    }).format(new Date("2023-07-12")),
    createdAt: new Date("2023-07-12"),
    updatedAt: formatDate(),
  },
];
