export interface GitHubUser {
  name: string,
  [key: string]: any
}

type Result<T> =
  { ok: true, data: T } |
  { ok: false, error: string }

export class GitHubClient{
  // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  public async getUser(username: string): Promise<Result<GitHubUser>>{
    const response =
      await fetch(
        `https://api.github.com/users/${username}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/vnd.github+json',
          }
        }
      );
    const data =
      await response.json();
    const result: Result<GitHubUser> =
      response.ok
        ? { ok: true, data: data as GitHubUser }
        : { ok: false, error: data.message as string }
    return result;
  }
}