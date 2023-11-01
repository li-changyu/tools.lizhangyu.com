import { optimize } from 'svgo'

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.svg) {
    return Response.json({
      code: -1,
      msg: 'svg is required.'
    });
  }

  let svg = ''
  try {
    const { data } = optimize(body.svg.trim(), {
      multipass: true,
    })
    svg = data
  } catch (error: any) {
    return Response.json({
      code: -1,
      msg: 'svg input parse error:' + error.message 
    });
  }

  return Response.json({
    code: -1,
    data: {
      svg
    }
  });
}