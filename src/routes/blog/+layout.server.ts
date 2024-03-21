import * as db from "$lib/server/db.js";

export function load() {
  const data = db.getData();
  return {
    posts: data.map((post) => ({
      id: post.id,
      title: post.title,
    })),
  };
}
