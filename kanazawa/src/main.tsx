import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, CircleCheck, Compass, FileText, Hammer, Landmark, MapPin, Menu, Palette, X } from 'lucide-react'
import { budget, crafts, days, faq, institutions, itineraryChange, preferences, program, requirements, training } from './data'
import '@fontsource/noto-serif-tc/700.css'
import '@fontsource/noto-sans-tc/400.css'
import './style.css'

const nav = [['overview','計畫總覽'],['crafts','工藝探索'],['institutions','見習機構'],['itinerary','研修行程'],['eligibility','資格檢核']]
const phases = [['all','全部行程'],['week1','第一週'],['week2','第二週'],['final','成果階段']]
const craftOptions = [['all','全部工藝'], ...crafts.map(c => [c.id,c.name])]
const craftName = (id: string) => crafts.find(c => c.id === id)?.name
const money = (amount: number) => 'NT$' + amount.toLocaleString('zh-TW')
const dayNumber = (day: number) => String(day).padStart(2,'0')
const source = import.meta.env.BASE_URL + program.source.slice(1)
type Host = (typeof institutions)[number]
type Day = (typeof days)[number]

function Heading({label,title,children}: {label:string;title:string;children?:ReactNode}) {
 return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

function Filters({label, options, current, onChange}: {label:string;options:string[][];current:string;onChange:(id:string)=>void}) {
 return <div className="filters" role="group" aria-label={label}>{options.map(([id,name]) => <button type="button" key={id} aria-pressed={current===id} onClick={() => onChange(id)}>{name}</button>)}</div>
}

function Eligibility() {
 const key = 'kanazawa-eligibility-v1'
 const [checked,setChecked] = useState<string[]>(() => {
   try {
     const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
     return Array.isArray(saved) ? saved.filter((item): item is string => typeof item === 'string') : []
   } catch { return [] }
 })
 const count = (id:string, list:string[]) => list.filter((_,i) => checked.includes(id+i)).length
 useEffect(() => { try { localStorage.setItem(key,JSON.stringify(checked)) } catch { /* Storage may be unavailable. */ } },[checked])
 return <>
  <div className="check-grid">{([['required','必要條件',requirements],['preferred','優先條件',preferences]] as const).map(([id,title,list]) =>
   <fieldset key={id}><legend>{title}</legend>
    <div className="progress-label" aria-live="polite"><span>{id==='required' ? '必要條件完成進度' : '優先條件勾選進度（供參考）'}</span><strong>{count(id,list)}／{list.length}</strong></div>
    <progress aria-label={title + '進度'} max={list.length} value={count(id,list)} />
    {list.map((item,i) => <label className="check" key={item}><input type="checkbox" checked={checked.includes(id+i)} onChange={e => {
     const selected = e.currentTarget.checked
     setChecked(values => selected ? [...values,id+i] : values.filter(v=>v!==id+i))
    }}/><span>{item}</span></label>)}
   </fieldset>
  )}</div>
  <blockquote>非本科系、但對本次研習工程懷有「無論如何都想投入學習」之強烈意願者，亦予接受。</blockquote>
  <p className="muted">本工具僅供自我檢核，實際資格與錄取結果以官方公告為準。勾選資料只儲存在此瀏覽器。</p>
 </>
}

function DayDetails({day,onHost}: {day:Day;onHost:(host:Host)=>void}) {
 return <div className="day-details">
  <p className="eyebrow">DAY {dayNumber(day.day)} · {day.date}</p>
  <h3>{day.title}</h3>
  {day.adjusted && <p className="day-adjusted">行程已調整</p>}
  <ul>{day.activities.map(activity => <li key={activity}>{activity}</li>)}</ul>
  {day.goal && <div className="goal"><strong>學習目的</strong><p>{day.goal}</p></div>}
  {day.hosts.map(id => {
    const host = institutions.find(item => item.id === id)
    return host && <button className="text-button" key={id} onClick={()=>onHost(host)}>{host.name}<ArrowUpRight size={16}/></button>
  })}
  <p className="muted note">將視實際情況調整</p>
 </div>
}

function App() {
 const [menu,setMenu] = useState(false)
 const [craft,setCraft] = useState('')
 const [hostFilter,setHostFilter] = useState('all')
 const [host,setHost] = useState<Host | null>(null)
 const dialog = useRef<HTMLDialogElement>(null)
 const [phase,setPhase] = useState('all')
 const [dayFilter,setDayFilter] = useState('all')
 const [openDays,setOpenDays] = useState<number[]>([1])
 const [fund,setFund] = useState('personal')
 const filtered = days.filter(d => (phase==='all'||d.phase===phase) && (dayFilter==='all'||d.crafts.includes(dayFilter)))
 const expanded = filtered.filter(d => openDays.includes(d.day))
 function filterDays(nextPhase:string,nextCraft:string) {
   setPhase(nextPhase); setDayFilter(nextCraft)
   const first = days.find(d => (nextPhase==='all'||d.phase===nextPhase) && (nextCraft==='all'||d.crafts.includes(nextCraft)))
   setOpenDays(first ? [first.day] : [])
 }
 function visitDay(day:number) {
   setPhase('all'); setDayFilter('all'); setOpenDays([day])
   requestAnimationFrame(() => {
     const trigger = document.querySelector<HTMLButtonElement>('#day-' + day + ' button')
     trigger?.focus({preventScroll:true})
     trigger?.scrollIntoView({block:'start'})
   })
 }
 useEffect(() => { if (host && !dialog.current?.open) dialog.current?.showModal() },[host])

 return <>
  <a className="skip" href="#overview">跳至主要內容</a>
  <header className="site-header"><div className="wrap header-inner">
   <a href="#top" className="brand" onClick={()=>setMenu(false)}><span className="brand-mark" aria-hidden="true"><Compass size={22}/></span><span>金澤職人夢<small>KANAZAWA CRAFT JOURNEY</small></span></a>
   <button type="button" className="menu-button" aria-label={menu?'關閉選單':'開啟選單'} aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button>
   <nav onKeyDown={e=>{if(e.key==='Escape'){setMenu(false);document.querySelector<HTMLButtonElement>('.menu-button')?.focus()}}} id="navigation" className={menu?'nav is-open':'nav'} aria-label="主導覽">{nav.map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
   <a className="header-pdf" href={source} target="_blank" rel="noopener noreferrer"><FileText size={16}/>原始簡章<ArrowUpRight size={13}/></a>
  </div></header>
  <main id="top">
   <section className="hero" aria-labelledby="hero-title">
    <div className="wrap hero-inner">
     <div className="hero-copy">
      <p className="eyebrow"><span className="gold-rule"/>2027 OVERSEAS CRAFT JOURNEY <span className="hero-code">M-2-8</span></p>
      <p className="hero-jp" lang="ja">金沢・職人の世界</p>
      <h1 id="hero-title">{program.title}</h1>
      <p className="hero-motto">{program.motto}</p>
      <p className="hero-sub">{program.subtitle}</p>
      <div className="actions"><a className="button primary" href="#overview">探索計畫<ArrowDown size={17}/></a><a className="button light" href="#itinerary">查看完整行程<ArrowRight size={17}/></a></div>
     </div>
     <div className="hero-caption"><span><MapPin size={14}/> JAPAN / ISHIKAWA</span><span>工藝意象插圖</span></div>
    </div>
   </section>
   <section className="stats" aria-label="計畫核心資訊"><div className="wrap stats-inner">
    {[[program.duration+' DAYS','海外研修天數'],[program.places+' PEOPLE','見習名額'],[money(budget.total),'本案獎勵金總經費'],[program.dates,'圓夢期間']].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}
   </div></section>
   <section id="overview" className="wrap section overview">
    <div><Heading label="THE PROGRAM" title="從技藝走進地方">一趟橫跨加賀與金澤的傳統工藝研修。</Heading><p>本計畫屬於「{program.category}」，前往{program.location}，走訪窯元、工房、美術館與人才培育據點，從材料與技法出發，理解地方產業如何傳承與經營。</p><p className="muted">下列四個學習面向為本站整理分類。</p></div>
    <div className="dimensions">{[[Hammer,'工藝技術與實作'],[Palette,'職人精神與技術傳承'],[Landmark,'產業營運與人才培育'],[Compass,'品牌經營與地方創生']].map(([Icon,label])=>{
     const Mark = Icon as typeof Hammer
     return <div key={String(label)}><Mark size={23}/><h3>{String(label)}</h3></div>
    })}</div>
   </section>
   <section id="crafts" className="section crafts-section"><div className="wrap">
    <Heading label="MATERIAL & MAKING" title="四大工藝探索">從釉彩、木胎、金箔與金屬，看見石川工藝的不同質地。</Heading>
    <div className="craft-grid">{crafts.map(c=><article className="craft-card" key={c.id}>
     <button className="craft-trigger" aria-expanded={craft===c.id} aria-controls={'craft-'+c.id} onClick={()=>setCraft(craft===c.id?'':c.id)}>
      <div className={'material '+c.id}><img src={import.meta.env.BASE_URL+'images/'+c.id+'.webp'} width={640} height={426} loading="lazy" decoding="async" alt={c.name+'工藝意象插圖'}/></div><div className="craft-title"><span><small>{c.en}</small><strong>{c.name}</strong><span>{c.material}</span></span><ChevronDown size={20}/></div>
     </button>
     <div id={'craft-'+c.id} className="craft-info" hidden={craft!==c.id}>
      <p>{c.text}</p><h4>對應研修行程</h4>
      {days.filter(d=>d.crafts.includes(c.id)).map(d=><a className="text-button" key={d.day} href={`#day-${d.day}`} onClick={()=>visitDay(d.day)}>{d.date} {d.title}<ArrowRight size={15}/></a>)}
      <h4>見習機構</h4>
      {institutions.filter(i=>i.craft===c.id).map(i=><button className="text-button" key={i.id} onClick={()=>setHost(i)}>{i.name}<ArrowUpRight size={15}/></button>)}
     </div>
    </article>)}</div>
   </div></section>
   <section id="institutions" className="wrap section">
    <Heading label="WORKSHOPS & INSTITUTIONS" title="走訪七個見習機構">從作家工房到公設育成機構，認識工藝背後的人與產業。</Heading>
    <Filters label="見習機構工藝分類" options={craftOptions} current={hostFilter} onChange={setHostFilter}/>
    <div className="host-grid">{institutions.filter(i=>hostFilter==='all'||i.craft===hostFilter).map(i=><article className="host-card" key={i.id}>
     <p className="eyebrow"><MapPin size={14}/>{i.city} · {craftName(i.craft)}</p>
     <h3><button onClick={()=>setHost(i)}>{i.name}<ArrowUpRight size={17}/></button></h3>
     <p>{i.about}</p><p>{i.study}</p>
     <div className="host-links"><span><CalendarDays size={15}/>{days.filter(d=>d.hosts.includes(i.id)).map(d=>d.date).join('、')}</span><a href={i.url} target="_blank" rel="noopener noreferrer">官方連結<ArrowUpRight size={14}/></a></div>
    </article>)}</div>
   </section>
   <section id="itinerary" className="section itinerary"><div className="wrap">
    <Heading label="17-DAY ITINERARY" title="十七天研修行程">2027 年 6 月 20 日至 7 月 6 日。所有行程將視實際情況調整。</Heading>
    <aside className="itinerary-change" aria-labelledby="itinerary-change-title">
     <h3 id="itinerary-change-title">{itineraryChange.title}</h3>
     <p>{itineraryChange.text}</p>
     <p className="muted">{itineraryChange.sourceNote}</p>
    </aside>
    <div className="itinerary-filters"><Filters label="行程階段" options={phases} current={phase} onChange={v=>filterDays(v,dayFilter)}/><Filters label="行程工藝類別" options={craftOptions} current={dayFilter} onChange={v=>filterDays(phase,v)}/></div>
    <div className="results"><p aria-live="polite">{phases.find(p=>p[0]===phase)?.[1]} · {craftOptions.find(p=>p[0]===dayFilter)?.[1]} · {filtered.length} 天</p>
     <div className="actions"><button className="button outline" disabled={!filtered.length} onClick={()=>setOpenDays(filtered.map(d=>d.day))}>展開全部</button><button className="button outline" disabled={!expanded.length} onClick={()=>setOpenDays([])}>收合全部</button></div>
    </div>
    {filtered.length ? <div className="timeline">
     <div className="timeline-days">{filtered.map(d=><div className="timeline-entry" key={d.day} id={`day-${d.day}`}>
      <button aria-expanded={openDays.includes(d.day)} aria-controls={`content-${d.day} desktop-content-${d.day}`} className="day-trigger" onClick={()=>setOpenDays(old=>old.includes(d.day)?old.filter(n=>n!==d.day):[...old,d.day])}><span className="day-date"><small>DAY {dayNumber(d.day)}</small><strong>{d.date}</strong></span><span>{d.title}{d.adjusted && <span className="day-adjusted">行程已調整</span>}</span><ChevronDown size={17}/></button>
      <div className="mobile-detail" id={'content-'+d.day} hidden={!openDays.includes(d.day)}><DayDetails day={d} onHost={setHost}/></div>
     </div>)}</div>
     <div className="desktop-details" aria-label="已展開行程" hidden={!expanded.length}>{filtered.map(d=><div key={d.day} id={'desktop-content-'+d.day} hidden={!openDays.includes(d.day)}><DayDetails day={d} onHost={setHost}/></div>)}</div>
    </div> : <p className="empty">此階段沒有符合工藝篩選的行程。</p>}
   </div></section>
   <section id="eligibility" className="section wrap"><Heading label="ELIGIBILITY" title="申請資格自我檢核">逐項確認必要條件，再看看自己符合哪些優先條件。</Heading><Eligibility/></section>
   <section id="budget" className="section budget"><div className="wrap">
    <Heading label="BUDGET" title="經費規劃">獎勵金總經費包含合作單位辦理項目及青年自理項目。</Heading>
    <div className="budget-grid">
     <div><p>本案獎勵金總經費</p><p className="budget-total">{money(budget.total)}</p>
      <div className="budget-bar" role="img" aria-label={'合作單位約 89.2%，青年自理約 10.8%'}><span style={{width:budget.partner/budget.total*100+'%'}}/><span/></div>
      <div className="fund-buttons">{[['partner','合作單位辦理項目',budget.partner],['personal','青年自理項目',budget.personal]].map(([id,title,amount])=><button key={id} aria-pressed={fund===id} aria-controls="fund-details" onClick={()=>setFund(String(id))}><span>{title}</span><strong>{money(Number(amount))}</strong><ChevronDown size={16}/></button>)}</div>
      <p className="muted">青年自理項目為獎勵金內由青年自行安排支用的項目。</p>
     </div>
     <div className="fund-details" id="fund-details">
      <h3>{fund==='partner'?'合作單位辦理項目':'青年自理項目'}</h3>
      {fund==='partner' ? <><p>簡章提供合計金額，各細項未分列金額。</p><dl>{budget.partnerItems.map(([label,detail])=><div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl></> : <dl>{budget.items.map(([label,detail,amount])=><div key={label}><dt>{label}<strong>{money(amount)}</strong></dt><dd>{detail}</dd></div>)}</dl>}
     </div>
    </div>
   </div></section>
   <section id="training" className="wrap section"><Heading label="BEFORE DEPARTURE" title="行前培訓與準備">兩次培訓每次約 4 小時，合計約 8 小時。暫定臺北市辦理，採實體與線上同步方式。</Heading>
    <div className="training-grid">{training.map(t=><article key={t.title}><p className="eyebrow">{t.when}</p><h3>{t.title}</h3><p>{t.text}</p></article>)}</div>
    <p className="notice">無法參加行前培訓視同放棄錄取資格。實際場地與時間將於錄取名單確定後個別通知。</p>
   </section>
   <section id="faq" className="wrap section faq"><Heading label="INFORMATION & SOURCE" title="注意事項與資料來源"/>
    {faq.map(([question,answer])=><details key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}
    <div className="source"><div><FileText/><h3>《M-2-8 金澤職人夢》原始簡章</h3></div><div className="actions"><a className="button outline" href={source} target="_blank" rel="noopener noreferrer">開啟 PDF<ArrowUpRight size={16}/></a><a className="button primary" href={source} download="M-2-8_金澤職人夢.pdf">下載 PDF<ArrowDownToLine size={16}/></a></div><p className="source-note muted">{itineraryChange.sourceNote}</p></div>
   </section>
  </main>
  <footer><div className="wrap"><div className="brand"><CircleCheck size={21}/>{program.title} <small>KANAZAWA CRAFT JOURNEY</small></div><p>本網站為非官方資訊整理與探索頁面，內容依據青年百億海外圓夢基金計畫－海外翱翔組《M-2-8 金澤職人夢》簡章整理。實際內容以教育部青年發展署及合作單位公告為準。</p><a href="#top">返回頁首 ↑</a></div></footer>
  <dialog ref={dialog} aria-labelledby="host-title" onClose={()=>setHost(null)} onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}}>
   {host && <div className="dialog-inner">
    <button className="dialog-close" aria-label="關閉機構介紹" onClick={()=>dialog.current?.close()}><X/></button>
    <p className="eyebrow">{host.city} · {craftName(host.craft)}</p><h2 id="host-title">{host.name}</h2><p>{host.about}</p><h3>預定研習內容</h3><p>{host.study}</p><h3>對應參訪日期</h3>
    {days.filter(d=>d.hosts.includes(host.id)).map(d=><a key={d.day} className="text-button" href={`#day-${d.day}`} onClick={()=>{dialog.current?.close();visitDay(d.day)}}>{d.date} · {d.title}<ArrowRight size={16}/></a>)}
    <a className="button primary" href={host.url} target="_blank" rel="noopener noreferrer">前往官方連結<ArrowUpRight size={16}/></a>
   </div>}
  </dialog>
 </>
}

createRoot(document.getElementById('root')!).render(<App/>)
