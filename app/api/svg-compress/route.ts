import { optimize } from 'svgo'
import hash from 'string-hash'

const getHashCode = (str: string) => {
  return hash(str).toString(36).slice(0,5)
}

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
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false
            },
          },
        },
        {
          name: 'cleanupIds',
        },
        {
          name: 'prefixIds',
          params: {
            delim: '',
            prefix: () =>  getHashCode(body.svg.trim()) ?? ''
          }
        },
        'removeXMLNS',
      ]
    })
    svg = data
  } catch (error) {
    return Response.json({
      code: -1,
      msg: error instanceof Error ? 'svg input parse error:' + error.message : 'svg compress failed.'
    });
  }

  return Response.json({
    code: 0,
    data: {
      svg
    }
  });
}