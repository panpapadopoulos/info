/**
 * Prefixes a file in public/ with the deploy base path. On a custom domain the
 * base path is empty; on https://<user>.github.io/<repo>/ it is "/<repo>".
 * next/image and plain links don't add it to static paths on their own.
 */
export const asset = (path: string) =>
  path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}` : path;
