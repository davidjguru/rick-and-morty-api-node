import { getCharacter, getCharacters } from '.'

describe('getCharacters', () => {
  test('response schema', async () => {
    const res = await getCharacters()

    expect(res.status).toBeTruthy()
    expect(res.statusMessage).toBeTruthy()
    expect(res.data.info).toBeTruthy()
    expect(res.data.results).toBeTruthy()
  })

  test('get all', async () => {
    const res = await getCharacters()

    expect(res.data.results.length).toBe(20)
  })

  test('get by filter', async () => {
    const res = await getCharacters({ name: 'Rick', status: 'Alive' })

    res.data.results.forEach((item) => {
      expect(item.name.includes('Rick')).toBe(true)
      expect(item.status).toBe('Alive')
    })
  })

  test('pagination', async () => {
    const res = await getCharacters({ page: 2 })

    res.data.info.prev.includes('page=1')
  })
})

describe('getCharacter', () => {
  test('get by ID', async () => {
    const res = await getCharacter(1)

    expect(res.data.id).toBe(1)
  })

  test('get by IDs', async () => {
    const res = await getCharacter([1, 2])

    expect(res.data.map(({ id }: { id: number }) => id)).toStrictEqual([1, 2])
  })

  test('empty array', async () => {
    const res = await getCharacter([])

    expect(res.data).toStrictEqual([])
  })
})
