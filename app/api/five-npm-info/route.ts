import semver from "semver";

export async function POST(req: Request) {
  try {
    const response = await fetch(`https://registry.npmjs.org/@realsee/five`);
    const data = await response.json();
  
    const versions = Object.keys(data.versions)
      .filter((version) => semver.valid(version))
      .sort((a, b) => semver.rcompare(a, b))

      return Response.json({
        code: 0,
        data: {
          latest: data['dist-tags'].latest,
          versions,
        },
      });
  } catch (error) {
    return Response.json({
      code: -1,
      msg: error instanceof Error ? 'fetch failed:' + error.message : 'fetch failed.'
    });
  }

}
