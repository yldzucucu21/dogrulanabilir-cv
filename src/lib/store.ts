import fs from 'fs'
import path from 'path'

type Cv = { id: string; title: string; items: any[]; profile?: any; stamps?: Stamp[] }
type Stamp = { id: string; timestamp: number; payload: any }
type DbShape = { cvs: Cv[]; stamps: Stamp[]; categories: string[] }

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

function readDb(): DbShape {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(raw) as DbShape
  } catch (err) {
    const initial: DbShape = { cvs: [], stamps: [], categories: [] }
    try { fs.mkdirSync(path.dirname(DB_PATH), { recursive: true }) } catch {}
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2))
    return initial
  }
}

function writeDb(db: DbShape) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')
}

export const db = {
  save(body: any) {
    const data = readDb()
    const id = Math.random().toString(36).slice(2, 9)
    const cv: Cv = {
      id,
      title: body.title || 'Untitled',
      items: body.items || [],
      profile: body.profile || {},
      stamps: body.stamps || []
    }
    data.cvs.push(cv)
    writeDb(data)
    return cv
  },
  getAll() {
    const data = readDb()
    return data.cvs
  },
  getById(id: string) {
    const data = readDb()
    return data.cvs.find(c => c.id === id)
  },
  saveStampToCv(cvId: string, s: Stamp){
    const data = readDb()
    const cv = data.cvs.find(c => c.id === cvId)
    if(!cv) return null
    cv.stamps = cv.stamps || []
    cv.stamps.push(s)
    data.stamps.push(s)
    writeDb(data)
    return s
  },
  saveStamp(s: Stamp){
    const data = readDb()
    data.stamps.push(s)
    writeDb(data)
    return s
  },
  getStamps(){
    const data = readDb()
    return data.stamps
  },
  // categories
  getCategories(){
    const data = readDb()
    return data.categories || []
  },
  addCategory(name: string){
    const data = readDb()
    if(!data.categories) data.categories = []
    if(!data.categories.includes(name)) data.categories.push(name)
    writeDb(data)
    return data.categories
  }
}
