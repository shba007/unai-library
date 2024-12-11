export default function <T>(
  stream: ReadableStream<T>,
  readFunction: (value: T) => void,
) {
  const reader = stream.getReader();

  reader.read().then(function processText({ done, value }) {
    if (done) {
      return;
    }

    readFunction(value);

    return reader.read().then(processText);
  });
}
