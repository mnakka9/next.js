import { createNext, FileRef } from 'e2e-utils'
import { NextInstance } from 'test/lib/next-modes/base'
import { renderViaHTTP } from 'next-test-utils'
import path from 'path'

describe('app-dir alias handling', () => {
  if ((global as any).isNextDeploy) {
    it('should skip next deploy for now', () => {})
    return
  }

  if (process.env.NEXT_TEST_REACT_VERSION === '^17') {
    it('should skip for react v17', () => {})
    return
  }

  let next: NextInstance

  beforeAll(async () => {
    next = await createNext({
      files: new FileRef(path.join(__dirname, 'app-alias')),
      dependencies: {
        react: '0.0.0-experimental-cb5084d1c-20220924',
        'react-dom': '0.0.0-experimental-cb5084d1c-20220924',
        typescript: 'latest',
        '@types/react': 'latest',
        '@types/node': 'latest',
      },
    })
  })
  afterAll(() => next.destroy())

  it('should handle typescript paths alias correctly', async () => {
    const html = await renderViaHTTP(next.url, '/button')
    expect(html).toContain('<button>click</button>')
  })
})
