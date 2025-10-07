import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function DraggableList({items,onChange}:{items:any[],onChange:(any:any)=>void}){
  // Hazır kategoriye tıklanınca yeni bölüm ekle
  function addItemWithCategory(category: string) {
    const id = String(Math.random().toString(36).slice(2, 9))
    onChange([
      ...items,
      {
        id,
        title: category,
        description: '',
        category
      }
    ])
  }
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')

  useEffect(()=>{
    fetch('/api/categories').then(r=> r.ok ? r.json() : []).then((cats:string[])=> setCategories(cats)).catch(()=> setCategories([]))
  },[])

  function onDragEnd(result:any){
    if(!result.destination) return
    const newItems = Array.from(items)
    const [m] = newItems.splice(result.source.index,1)
    newItems.splice(result.destination.index,0,m)
    onChange(newItems)
  }

  function updateItem(id:string, patch:any){
    onChange(items.map(it=> it.id===id ? {...it,...patch} : it))
  }

  function addItem(){
    const id = Math.random().toString(36).slice(2,9)
    onChange([...items,{id,title:'Yeni Bölüm',description:'Açıklama ekleyebilirsiniz.', category: categories[0] || ''}])
  }

  function removeItem(id:string){
    onChange(items.filter(i=>i.id!==id))
  }

  async function handleAddCategory(){
    if(!newCategory) return
    try{
      const res = await fetch('/api/categories', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ name: newCategory }) })
      if(!res.ok) throw new Error('server error')
      const cats = await res.json()
      setCategories(cats)
      setNewCategory('')
    }catch(e){
      console.error('kategori eklenemedi', e)
    }
  }

  return (
    <div>
      <div style={{marginBottom:16,padding:12,background:'#f0f9ff',borderRadius:8,border:'1px solid #bfdbfe'}}>
        <div style={{fontWeight:600,marginBottom:8,fontSize:14}}>Hazır Kategoriler:</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          {categories.slice(0,11).map(c=> (
            <button
              key={c}
              type="button"
              onClick={()=>addItemWithCategory(c)}
              style={{
                padding:'4px 10px',
                background:'white',
                border:'1px solid #3b82f6',
                borderRadius:6,
                fontSize:12,
                color:'#1e40af',
                fontWeight:500,
                cursor:'pointer',
                transition:'background 0.2s',
                outline:'none'
              }}
              onMouseDown={e=>e.preventDefault()}
            >{c}</button>
          ))}
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center',marginTop:12}}>
          <input 
            className="input" 
            placeholder="Özel kategori ekle (isteğe bağlı)" 
            value={newCategory} 
            onChange={e=>setNewCategory(e.target.value)}
            style={{flex:1}}
          />
          <button className="btn" onClick={handleAddCategory} style={{background:'#3b82f6'}}>Ekle</button>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:15}}>CV Bölümleri</div>
        <button className="btn" onClick={addItem} style={{background:'#10b981'}}>+ Yeni Bölüm Ekle</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided)=> (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((it,idx)=> (
                <Draggable draggableId={String(it.id)} index={idx} key={it.id}>
                  {(prov,snapshot)=>(
                    <div 
                      ref={prov.innerRef} 
                      {...prov.draggableProps}
                      style={{
                        ...prov.draggableProps.style,
                        padding:12,
                        marginBottom:10,
                        background: snapshot.isDragging ? '#dbeafe' : 'white',
                        borderRadius:8,
                        display:'grid',
                        gap:8,
                        boxShadow: snapshot.isDragging ? '0 8px 16px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.08)',
                        border: '1px solid ' + (snapshot.isDragging ? '#3b82f6' : '#e5e7eb')
                      }}
                    >
                      <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                        <div {...prov.dragHandleProps} style={{
                          cursor:'grab',
                          padding:'6px 12px',
                          background:'#f3f4f6',
                          borderRadius:6,
                          border:'1px solid #d1d5db',
                          userSelect:'none',
                          fontWeight:600,
                          fontSize:12,
                          color:'#6b7280'
                        }}>⋮⋮ Taşı</div>
                        <input 
                          className="input" 
                          placeholder="Bölüm başlığı"
                          value={it.title} 
                          onChange={e=>updateItem(it.id,{title:e.target.value})}
                          style={{flex:1,minWidth:200}}
                        />
                        <select 
                          className="input" 
                          value={it.category || ''} 
                          onChange={e=>updateItem(it.id,{category:e.target.value})} 
                          style={{width:200,fontWeight:500}}
                        >
                          <option value="">⚠ Kategori seçin</option>
                          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button 
                          className="btn" 
                          onClick={()=>removeItem(it.id)} 
                          style={{background:'#ef4444',color:'white',padding:'6px 12px'}}
                        >Sil</button>
                      </div>
                      <textarea 
                        className="input" 
                        placeholder="Bu bölümün detaylı açıklamasını yazın..."
                        value={it.description} 
                        onChange={e=>updateItem(it.id,{description:e.target.value})}
                        rows={3}
                      />
                      {it.category && (
                        <div style={{fontSize:11,color:'#059669',fontWeight:500}}>
                          📁 Kategori: {it.category}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>

  )
}
