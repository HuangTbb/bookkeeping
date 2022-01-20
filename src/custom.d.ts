type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number
  createdAt: string
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => string
  update: (id: string, oldName: string, newName: string) => 'success' | 'duplicated' | 'not found' | 'no change'
  remove: (id: string) => boolean
  save: () => void
}
type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  tagList: Tag[],
  currentTag?: Tag,
  newNameStatus: string,
}

type Result = {
  title: string,
  total?: number,
  items: RecordItem[],
  totalMoney: number
}[];