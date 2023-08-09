import http from 'http';
import { Transform } from 'stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamCOntent = Buffer.concat(buffers).toString()

  console.log(fullStreamCOntent)

  return res.end(fullStreamCOntent)
});

server.listen(3334);