type Response<T> = { status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }

export default function <T = any>(promises: (() => Promise<T>)[], poolSize = 50): Promise<Response<T>[]> {
  return new Promise((resolve) => {
    const results: Response<T>[] = []
    let activeCount = 0
    let currentIndex = 0

    function processNext() {
      // console.log('Active Pool count', activeCount, results.length)
      if (currentIndex >= promises.length) {
        if (activeCount === 0) {
          resolve(results)
        }
        return
      }

      const index = currentIndex++
      activeCount++

      // Execute the next promise in the pool
      promises[index]()
        .then((result) => {
          results[index] = { status: 'fulfilled', value: result }
        })
        .catch((error) => {
          results[index] = { status: 'rejected', reason: error }
        })
        .finally(() => {
          activeCount--
          processNext()
        })
    }

    // Start the initial batch of promises
    for (let i = 0; i < poolSize; i++) {
      processNext()
    }
  })
}
