import { error } from "@sveltejs/kit";
import * as db from "$lib/server/db.js";

export function load({ params }) {
  const data = db.getData();
  const post = data.find((post) => post.id === Number(params.id));

  if (!post) throw error(404);

  return {
    post,
  };
}
