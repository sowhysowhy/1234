import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowDownToLine, ChevronDown } from 'lucide-react'
import { budget } from './data'

function useLocalState<T>(key:string, initial:T) {
 const [value,setValue] = useState<T>(() => {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? initial } catch { return initial }
 })
 const [storageFailed,setStorageFailed] = useState(false)
 useEffect(() => {
  try { localStorage.setItem(key,JSON.stringify(value)) }
  catch { setStorageFailed(true) }
 },[key,value])
 return [value,setValue,storageFailed] as const
}

const prepGroups = [
 {name:'證件及行政',official:['確認簽證及入境相關規定。','完成旅遊保險。'],suggestions:['確認護照效期。','確認來回機票。','保存緊急聯絡資訊。']},
 {name:'行前培訓',official:['參與第一次行前培訓。','參與第二次行前培訓。','完成行前語言準備。','閱讀研習教材。','確認詳細行程及分組。'],suggestions:[]},
 {name:'個人行李',official:['準備工房實作服裝及護具。'],suggestions:['個人衣物。','充電器及行動電源。','常備個人用品。','日圓現金及支付工具。','網路及通訊準備。']},
 {name:'研修及成果紀錄',official:['規劃個人紀錄片。','確認工房攝影規範。','準備成果紀錄方式。'],suggestions:['準備筆記工具。','準備攝影及錄影設備。']},
]
const builtin = prepGroups.flatMap((group,index) => [
 ...group.official.map((label,i)=>({id:`official-${index}-${i}`,label,group:index,source:'簡章要求／培訓事項'})),
 ...group.suggestions.map((label,i)=>({id:`suggestion-${index}-${i}`,label,group:index,source:'一般準備建議'})),
])
type CustomItem = {id:string;label:string;group:number}

export function PreparationChecklist() {
 const [state,setState,storageFailed] = useLocalState<{checks:string[];custom:CustomItem[]}>('kanazawa-preparation-v1',{checks:[],custom:[]})
 const [label,setLabel] = useState('')
 const [group,setGroup] = useState(0)
 const items = [...builtin,...state.custom.map(item=>({...item,source:'自訂項目'}))]
 const done = items.filter(item=>state.checks.includes(item.id)).length
 function addItem(event:FormEvent<HTMLFormElement>) {
  event.preventDefault()
  if (!label.trim()) return
  const item = {id:crypto.randomUUID(),label:label.trim(),group}
  setState(current=>({...current,custom:[...current.custom,item]}))
  setLabel('')
 }
 function removeItem(id:string) {
  setState(current=>({custom:current.custom.filter(item=>item.id!==id),checks:current.checks.filter(check=>check!==id)}))
 }
 return <>
  <p className="muted">簡章要求及培訓事項依計畫簡章整理。一般準備建議與自訂項目供個人使用，資料保存在此瀏覽器。</p>
  {storageFailed && <p role="alert">瀏覽器未能保存清單，重新整理後可能遺失。</p>}
  <div className="tool-panel">
   <p className="progress-label" aria-live="polite"><span>完成 {done}／{items.length} 項</span><strong>{Math.round(done/items.length*100)}%</strong></p>
   <progress aria-label="行前清單進度" max={items.length} value={done}/>
   <button type="button" className="button outline" disabled={!done} onClick={()=>{
    if (window.confirm('要取消所有項目的勾選嗎？自訂項目會保留。')) setState(current=>({...current,checks:[]}))
   }}>重設全部勾選</button>
  </div>
  <div className="prep-groups">{prepGroups.map((category,index)=>{
   const groupItems = items.filter(item=>item.group===index)
   return <details key={category.name} open>
    <summary><span>{category.name}</span><span>{groupItems.filter(item=>state.checks.includes(item.id)).length}／{groupItems.length} <ChevronDown size={16}/></span></summary>
    {groupItems.map(item=><div className="prep-row" key={item.id}>
     <label className="check"><input type="checkbox" checked={state.checks.includes(item.id)} onChange={event=>{
      const checked=event.currentTarget.checked
      setState(current=>({...current,checks:checked ? [...current.checks,item.id] : current.checks.filter(id=>id!==item.id)}))
     }}/><span>{item.label}<small className="item-source">{item.source}</small></span></label>
     {item.source==='自訂項目' && <button className="button outline" type="button" aria-label={'刪除自訂項目 '+item.label} onClick={()=>removeItem(item.id)}>刪除</button>}
    </div>)}
   </details>
  })}</div>
  <form className="tool-panel tool-form" onSubmit={addItem}>
   <label>自訂準備項目<input required maxLength={100} value={label} onChange={event=>setLabel(event.target.value)}/></label>
   <label>清單分類<select value={group} onChange={event=>setGroup(Number(event.target.value))}>{prepGroups.map((category,index)=><option key={category.name} value={index}>{category.name}</option>)}</select></label>
   <button className="button primary" disabled={!label.trim()}>新增自訂項目</button>
  </form>
 </>
}

const categories = ['獎勵金','機票','保險','餐飲','交通','購物','工藝材料','其他']
type EntryKind = 'income'|'expense'
type Currency = 'TWD'|'JPY'
type EntryForm = {date:string;kind:EntryKind;name:string;category:string;currency:Currency;amount:string;note:string}
type Entry = Omit<EntryForm,'amount'> & { id:string; amount:number }
const entryType = {income:'收入',expense:'支出'}
const positive = (value:string) => Number.isFinite(Number(value)) && Number(value)>0
const twd = (amount:number) => 'NT$'+amount.toLocaleString('zh-TW',{maximumFractionDigits:2})
const today = () => {
 const now = new Date()
 return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-')
}
const blankEntry = ():EntryForm => ({date:today(),kind:'expense',name:'',category:'其他',currency:'TWD',amount:'',note:''})

function csvCell(value:string|number) {
 const content = typeof value==='string' && /^[\s\uFEFF]*[=+@-]|^[\t\r\n]/.test(value) ? "'"+value : String(value)
 return '"'+content.replaceAll('"','""')+'"'
}

export function ExpenseTracker() {
 const [state,setState,storageFailed] = useLocalState<{rate:string;entries:Entry[]}>('kanazawa-expenses-v1',{rate:'0.22',entries:[]})
 const [form,setForm] = useState(blankEntry)
 const [editing,setEditing] = useState<string|null>(null)
 const [filterDate,setFilterDate] = useState('')
 const [filterKind,setFilterKind] = useState('all')
 const [error,setError] = useState('')
 const rate = Number(state.rate)
 const rateValid = positive(state.rate)
 const convert = (entry:Entry) => entry.currency==='JPY' ? entry.amount*rate : entry.amount
 const filtered = state.entries.filter(entry=>(!filterDate||entry.date===filterDate)&&(filterKind==='all'||entry.kind===filterKind))
  .sort((a,b)=>b.date.localeCompare(a.date))
 const income = state.entries.filter(entry=>entry.kind==='income').reduce((sum,entry)=>sum+convert(entry),0)
 const expense = state.entries.filter(entry=>entry.kind==='expense').reduce((sum,entry)=>sum+convert(entry),0)
 const totalsAvailable = rateValid && Number.isFinite(income) && Number.isFinite(expense)
 function update<K extends keyof EntryForm>(field:K,value:EntryForm[K]) {
  setForm(current=>({...current,[field]:value}))
  setError('')
 }
 function cancelEdit() {
  setEditing(null); setForm(blankEntry()); setError('')
 }
 function save(event:FormEvent<HTMLFormElement>) {
  event.preventDefault()
  if (!form.name.trim() || !positive(form.amount) || !form.date) {
   setError('請輸入日期、項目名稱與有效的正數金額。')
   return
  }
  const entry:Entry = {...form,id:editing ?? crypto.randomUUID(),name:form.name.trim(),amount:Number(form.amount)}
  setState(current=>({...current,entries:editing ? current.entries.map(previous=>previous.id===editing ? entry : previous) : [...current.entries,entry]}))
  cancelEdit()
 }
 function remove(entry:Entry) {
  if (!window.confirm('確定刪除「'+entry.name+'」？')) return
  setState(current=>({...current,entries:current.entries.filter(item=>item.id!==entry.id)}))
  if (editing===entry.id) cancelEdit()
 }
 function exportCsv() {
  const rows = [
   ['日期','類型','項目名稱','分類','幣別','原幣金額','換算匯率（TWD/JPY）','折合新臺幣','備註'],
   ...filtered.map(entry=>[entry.date,entryType[entry.kind],entry.name,entry.category,entry.currency,entry.amount,entry.currency==='JPY'?rate:'',Number(convert(entry).toFixed(2)),entry.note]),
  ]
  const csv = '\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}))
  const link = document.createElement('a')
  link.href=url; link.download='kanazawa-expenses.csv'
  document.body.append(link); link.click(); link.remove()
  window.setTimeout(()=>URL.revokeObjectURL(url),1000)
 }
 return <>
  <p className="muted">記帳資料保存在此瀏覽器。總覽計算所有紀錄，日期與類型篩選適用於下方清單和 CSV 匯出。</p>
  {storageFailed && <p role="alert">瀏覽器未能保存紀錄，重新整理後可能遺失。</p>}
  <div className="tool-panel tool-form">
   <label>1 日圓等於多少新臺幣<input type="number" inputMode="decimal" step="any" min="0" value={state.rate} aria-invalid={!rateValid} onChange={event=>setState(current=>({...current,rate:event.target.value}))}/></label>
   <p className="muted">預填 0.22 為示例，請依需要調整。{rateValid ? `目前使用 1 JPY = ${state.rate} TWD。` : '請輸入有效的正數匯率。'}</p>
  </div>
  <dl className="expense-totals" aria-live="polite">{([['總收入',income],['總支出',expense],['目前餘額',income-expense]] as const).map(([label,amount])=><div key={label}><dt>{label}</dt><dd>{totalsAvailable?twd(amount):'—'}</dd></div>)}</dl>
  <form id="expense-form" className="tool-panel" onSubmit={save}>
   <h3>{editing?'編輯收支紀錄':'新增收支紀錄'}</h3>
   <div className="tool-form">
    <label>日期<input type="date" required value={form.date} onChange={event=>update('date',event.target.value)}/></label>
    <label>類型<select value={form.kind} onChange={event=>update('kind',event.target.value as EntryKind)}><option value="income">收入</option><option value="expense">支出</option></select></label>
    <label>項目名稱<input id="expense-name" required maxLength={100} value={form.name} onChange={event=>update('name',event.target.value)}/></label>
    <label>分類<select value={form.category} onChange={event=>update('category',event.target.value)}>{categories.map(category=><option key={category}>{category}</option>)}</select></label>
    <label>幣別<select value={form.currency} onChange={event=>update('currency',event.target.value as Currency)}><option value="TWD">新臺幣 TWD</option><option value="JPY">日圓 JPY</option></select></label>
    <label>金額<input type="number" inputMode="decimal" step="any" min="0" required value={form.amount} onChange={event=>update('amount',event.target.value)}/></label>
    <label className="tool-wide">備註<textarea maxLength={500} rows={2} value={form.note} onChange={event=>update('note',event.target.value)}/></label>
   </div>
   {error && <p role="alert" className="tool-error">{error}</p>}
   <div className="actions"><button className="button primary">{editing?'儲存修改':'新增紀錄'}</button>{editing&&<button className="button outline" type="button" onClick={cancelEdit}>取消編輯</button>}</div>
  </form>
  <div className="tool-panel">
   <h3>收支紀錄</h3>
   <div className="tool-form">
    <label>依日期篩選<input type="date" value={filterDate} onChange={event=>setFilterDate(event.target.value)}/></label>
    <label>依收支類型篩選<select value={filterKind} onChange={event=>setFilterKind(event.target.value)}><option value="all">全部類型</option><option value="income">收入</option><option value="expense">支出</option></select></label>
    <button type="button" className="button outline" disabled={!filtered.length||!totalsAvailable} onClick={exportCsv}>匯出 CSV<ArrowDownToLine size={16}/></button>
   </div>
   <p className="muted" aria-live="polite">顯示 {filtered.length} 筆，共 {state.entries.length} 筆紀錄。</p>
   {filtered.length===0 && <p>目前沒有符合的收支紀錄。</p>}
   {filtered.map(entry=><article className="expense-entry" key={entry.id}>
    <div><h4>{entry.name}</h4><p>{entry.date} · {entryType[entry.kind]} · {entry.category}</p><p>{entry.currency} {entry.amount.toLocaleString('zh-TW')}{entry.currency==='JPY' && ' · 折合 '+(totalsAvailable?twd(convert(entry)):'—')}</p>{entry.note&&<p className="entry-note">{entry.note}</p>}</div>
    <div className="actions">
     <button type="button" className="button outline" aria-label={'編輯 '+entry.name} onClick={()=>{
      setEditing(entry.id); setForm({...entry,amount:String(entry.amount)}); setError('')
      document.getElementById('expense-name')?.focus()
     }}>編輯</button>
     <button type="button" className="button outline" aria-label={'刪除 '+entry.name} onClick={()=>remove(entry)}>刪除</button>
    </div>
   </article>)}
  </div>
  <aside className="tool-panel"><h3>官方經費參考</h3>
   <p>本案獎勵金總經費 {twd(budget.total)}。合作單位辦理項目 {twd(budget.partner)}，青年自理項目 {twd(budget.personal)}。</p>
   <p>青年自理項目包含{budget.items.map(([name,,amount])=>name+' '+twd(amount)).join('、')}。這些參考金額不會自動加入個人收支。</p>
   <a className="text-button" href="#budget">查看官方經費圖表</a>
  </aside>
 </>
}
